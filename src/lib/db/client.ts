/**
 * Veritabanı bağlantı istemcisi (Postgres + Drizzle ORM).
 *
 * DATABASE_URL, diğer tedarikçi kimlik bilgileri gibi .env.local
 * içinde tutulur (git'e girmez). Henüz bir Postgres örneğiniz yoksa:
 * - Ofis sunucunuzda (92.44.217.13) kendi Postgres'inizi kurabilirsiniz, ya da
 * - Yönetilen bir servis (Neon, Supabase, Railway) kullanabilirsiniz.
 * Hangisini seçerseniz seçin, bağlantı string'ini DATABASE_URL'e yazmanız
 * yeterli — kod tarafında değişiklik gerekmez.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as productSchema from "./schema";
import * as authSchema from "./auth-schema";

const schema = { ...productSchema, ...authSchema };

function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL tanımlı değil. .env.local içine DATABASE_URL=postgres://... ekleyin.",
    );
  }
  return url;
}

// Next.js dev modunda hot-reload sırasında bağlantı havuzunun (pool)
// tekrar tekrar oluşmaması için global'de önbelleğe alıyoruz.
declare global {
  var __dbClient: ReturnType<typeof postgres> | undefined;
  var __db: ReturnType<typeof drizzle<typeof schema>> | undefined;
}

/**
 * DB bağlantısı BURADA, sadece gerçekten çağrıldığında kurulur (lazy) —
 * DATABASE_URL henüz tanımlı olmasa bile bu dosyanın import edilmesi
 * (ör. build/typecheck sırasında) hataya yol açmaz. Bağlantı sadece
 * getDb() gerçekten bir sorgu için çağrıldığında açılır.
 */
export function getDb() {
  if (!global.__db) {
    if (!global.__dbClient) {
      global.__dbClient = postgres(getDatabaseUrl(), { max: 10 });
    }
    global.__db = drizzle(global.__dbClient, { schema });
  }
  return global.__db;
}

export * as productSchema from "./schema";
export * as authSchema from "./auth-schema";
