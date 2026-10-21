import "server-only";

import bcrypt from "bcryptjs";

/**
 * Şifre hash'leme — bcryptjs, 12 salt round (2^12 tur). Düz metin şifre
 * BURADAN sonra hiçbir yere (DB, log, hata mesajı) yazılmaz; sadece bu
 * hash saklanır. bcrypt tek yönlüdür: hash'ten şifreyi geri çıkarmak
 * (biz dahil kimse için) mümkün değildir.
 */
const SALT_ROUNDS = 12;

export async function hashPassword(plainPassword: string): Promise<string> {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

export async function verifyPassword(
  plainPassword: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(plainPassword, passwordHash);
}
