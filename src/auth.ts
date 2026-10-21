import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";

import { getDb } from "@/lib/db/client";
import { users, accounts, sessions, verificationTokens } from "@/lib/db/auth-schema";
import { verifyPassword } from "@/lib/auth/password";
import { loginSchema } from "@/lib/auth/validation";
import { isRateLimited, recordAttempt, getClientIp } from "@/lib/auth/rate-limit";

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}

class TooManyAttemptsError extends CredentialsSignin {
  code = "too_many_attempts";
}

// DATABASE_URL henüz tanımlı değilse (ör. proje ilk kez klonlandığında)
// getDb() çağrısı hata fırlatır — bu dosyanın import edilmesi (route
// handler/build sırasında) o yüzden çökmemeli. Adapter'ı SADECE bağlantı
// bilgisi varsa kuruyoruz; yoksa Credentials girişi de zaten aynı sebeple
// çalışmayacaktır (authorize() içinde getDb() çağrıldığında hata verir),
// ama en azından uygulamanın geri kalanı build/typecheck'te patlamaz.
const db = process.env.DATABASE_URL ? getDb() : undefined;

/**
 * Auth.js (NextAuth v5) merkezi yapılandırması.
 *
 * Güvenlik notları:
 * - Şifreler asla bu dosyadan/loglardan geçmez düz metin olarak saklanmaz;
 *   sadece bcrypt hash karşılaştırması yapılır (bkz. lib/auth/password.ts).
 * - Credentials provider kullanıldığı için Auth.js zorunlu olarak JWT
 *   oturum stratejisi kullanır (DB session tablosu OAuth-only akışlar için
 *   şemada hazır duruyor ama bu modda kullanılmıyor).
 * - Giriş denemeleri hem e-posta hem IP bazlı rate limit'e tabidir
 *   (bkz. lib/auth/rate-limit.ts) — kaba kuvvet/credential-stuffing koruması.
 * - Google/Facebook kimlik bilgileri (Client ID/Secret) .env.local'de
 *   tanımlı değilse o sağlayıcı sessizce listeden çıkarılır; site
 *   kimlik bilgisiz de (sadece e-posta/şifre ile) çalışmaya devam eder.
 * - Google e-postaları sağlayıcı tarafından her zaman doğrulanmış geldiği
 *   için aynı e-postayla var olan bir hesaba otomatik bağlanmasına izin
 *   veriyoruz (allowDangerousEmailAccountLinking). Facebook için bu
 *   varsayılan KAPALI bırakıldı — e-posta çakışması olursa Auth.js
 *   kullanıcıyı asıl giriş yöntemiyle girmeye yönlendirir
 *   (OAuthAccountNotLinked hatası), bu daha temkinli/güvenli davranıştır.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: db
    ? DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
      })
    : undefined,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
  trustHost: true,
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    ...(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET
      ? [
          Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
          }),
        ]
      : []),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(rawCredentials, request) {
        const parsed = loginSchema.safeParse(rawCredentials);
        if (!parsed.success) throw new InvalidCredentialsError();

        const { email, password } = parsed.data;
        const ip = getClientIp(request.headers);

        // Hem e-posta hem IP bazlı rate limit — biri aşıldıysa dene bile.
        if ((await isRateLimited("login", email)) || (await isRateLimited("login", ip))) {
          throw new TooManyAttemptsError();
        }

        const database = getDb();
        const [user] = await database
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        const passwordOk =
          user?.passwordHash != null && (await verifyPassword(password, user.passwordHash));

        await Promise.all([
          recordAttempt("login", email, passwordOk),
          recordAttempt("login", ip, passwordOk),
        ]);

        if (!user || !passwordOk) throw new InvalidCredentialsError();

        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],
  pages: {
    signIn: "/auth/giris",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
