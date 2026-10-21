/**
 * Kimlik doğrulama (Auth.js / NextAuth v5) şeması.
 *
 * Bu tablolar `schema.ts`'teki parça-eşleştirme şemasından tamamen
 * ayrı ama aynı Postgres veritabanında yaşar (DATABASE_URL paylaşılır,
 * tablo isimleri çakışmaz).
 *
 * - `users.passwordHash`: sadece e-posta/şifre ile kayıt olan kullanıcılarda
 *   dolu olur (bcrypt hash'i, 12 salt round). Google/Facebook ile giren
 *   kullanıcılarda bu alan null'dur — biz onların şifresini hiç görmeyiz.
 *   Düz metin şifre HİÇBİR ZAMAN veritabanına yazılmaz, loglanmaz.
 * - `accounts`: her bir OAuth bağlantısı (google/facebook) burada tutulur,
 *   bir kullanıcı hem şifreyle hem Google ile giriş yapabilir (aynı e-posta
 *   üzerinden otomatik bağlanır — bkz. src/lib/auth.ts `allowDangerousEmailAccountLinking`
 *   notu).
 * - `sessions`: Credentials provider ile Auth.js zorunlu olarak JWT oturum
 *   stratejisi kullanır (bkz. src/lib/auth.ts), yani bu tablo OAuth-only
 *   akışlar için hazır dursun diye var, günlük akışta kullanılmaz.
 * - `verificationTokens`: e-posta doğrulama / şifre sıfırlama gibi
 *   token tabanlı akışlar için (ileride eklenebilir).
 */

import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";

export const users = pgTable("app_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),

  // Sadece email/şifre ile kayıt olanlarda dolu — bcrypt hash'i.
  // OAuth-only kullanıcılarda null.
  passwordHash: text("password_hash"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accounts = pgTable(
  "app_accounts",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compositePk: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("app_sessions", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "app_verification_tokens",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compositePk: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

/**
 * Giriş/kayıt denemesi kayıtları — kaba kuvvet (brute-force) ve otomatik
 * bot denemelerine karşı basit, veritabanı tabanlı rate limiting için.
 * Harici bir servise (Upstash/Redis) ihtiyaç duymadan çalışır; bkz.
 * src/lib/auth-rate-limit.ts.
 */
export const authAttempts = pgTable("app_auth_attempts", {
  id: uuid("id").defaultRandom().primaryKey(),
  // "login" | "register"
  kind: text("kind").notNull(),
  // Hem e-posta hem IP bazlı sınırlama için ikisi de ayrı ayrı saklanır.
  identifier: text("identifier").notNull(),
  success: integer("success").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
