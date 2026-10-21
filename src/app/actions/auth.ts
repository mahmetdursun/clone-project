"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";

import { auth, signIn } from "@/auth";
import { getDb } from "@/lib/db/client";
import { users } from "@/lib/db/auth-schema";
import { hashPassword } from "@/lib/auth/password";
import { registerSchema } from "@/lib/auth/validation";
import { isRateLimited, recordAttempt, getClientIp } from "@/lib/auth/rate-limit";
import { verifyTurnstileToken } from "@/lib/auth/turnstile";

export type RegisterResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * E-posta/şifre ile hesap oluşturma. Server Action olduğu için tamamen
 * sunucuda çalışır — şifre hiçbir zaman istemciye geri dönmez, sadece
 * bcrypt hash'i veritabanına yazılır (bkz. lib/auth/password.ts).
 */
export async function registerUser(input: {
  email: string;
  password: string;
  turnstileToken?: string | null;
}): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Geçersiz bilgiler." };
  }
  const { email, password, turnstileToken } = parsed.data;

  const requestHeaders = await headers();
  const ip = getClientIp(requestHeaders);

  if ((await isRateLimited("register", email)) || (await isRateLimited("register", ip))) {
    return {
      ok: false,
      message: "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.",
    };
  }

  const turnstileOk = await verifyTurnstileToken(turnstileToken, ip);
  if (!turnstileOk) {
    await recordAttempt("register", email, false);
    await recordAttempt("register", ip, false);
    return { ok: false, message: "Güvenlik doğrulaması başarısız oldu. Sayfayı yenileyip tekrar deneyin." };
  }

  let db;
  try {
    db = getDb();
  } catch {
    return {
      ok: false,
      message:
        "Hesap sistemi henüz yapılandırılmadı (DATABASE_URL eksik). Lütfen site yöneticisiyle iletişime geçin.",
    };
  }

  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing) {
    await recordAttempt("register", email, false);
    await recordAttempt("register", ip, false);
    return { ok: false, message: "Bu e-posta adresi zaten kayıtlı. Giriş yapmayı deneyin." };
  }

  const passwordHash = await hashPassword(password);

  try {
    await db.insert(users).values({ email, passwordHash });
  } catch {
    await recordAttempt("register", email, false);
    await recordAttempt("register", ip, false);
    return { ok: false, message: "Hesap oluşturulurken bir hata oluştu. Tekrar deneyin." };
  }

  await recordAttempt("register", email, true);
  await recordAttempt("register", ip, true);

  // Hesap oluşturulduktan hemen sonra otomatik giriş yap.
  await signIn("credentials", { email, password, redirect: false });

  return { ok: true };
}

/** Header'da/sayfalarda oturum durumunu göstermek için kullanılan yardımcı. */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}
