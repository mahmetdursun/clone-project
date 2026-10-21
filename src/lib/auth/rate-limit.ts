import "server-only";

import { and, eq, gt, sql } from "drizzle-orm";

import { getDb } from "@/lib/db/client";
import { authAttempts } from "@/lib/db/auth-schema";

/**
 * Basit, veritabanı tabanlı kaba kuvvet (brute-force) koruması — harici bir
 * servise (Upstash/Redis) ihtiyaç duymadan çalışır. Hem e-posta hem IP
 * bazlı ayrı ayrı sınırlanır: biri tek bir hesabı denerken diğeri tek bir
 * IP'den çok sayıda hesabı denemeyi (credential stuffing / spray) engeller.
 */
const WINDOW_MINUTES = 15;

const MAX_FAILURES: Record<"login" | "register", number> = {
  login: 8,
  register: 5,
};

export async function isRateLimited(
  kind: "login" | "register",
  identifier: string,
): Promise<boolean> {
  try {
    const db = getDb();
    const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);

    const rows = await db
      .select({ count: sql<number>`count(*)` })
      .from(authAttempts)
      .where(
        and(
          eq(authAttempts.kind, kind),
          eq(authAttempts.identifier, identifier),
          eq(authAttempts.success, 0),
          gt(authAttempts.createdAt, windowStart),
        ),
      );

    const failedCount = Number(rows[0]?.count ?? 0);
    return failedCount >= MAX_FAILURES[kind];
  } catch {
    // DB henüz kurulmadıysa (DATABASE_URL yok) rate limiting'i sessizce
    // atla — bu, geliştirme sırasında auth akışını kilitlememek için.
    return false;
  }
}

export async function recordAttempt(
  kind: "login" | "register",
  identifier: string,
  success: boolean,
): Promise<void> {
  try {
    const db = getDb();
    await db.insert(authAttempts).values({
      kind,
      identifier,
      success: success ? 1 : 0,
    });
  } catch {
    // Best-effort — kayıt başarısız olsa bile giriş/kayıt akışını bozma.
  }
}

/** İstemcinin IP adresini proxy header'larından çıkarır (Cloudflare/Vercel dahil). */
export function getClientIp(headers: Headers): string {
  return (
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
