import "server-only";

/**
 * Cloudflare Turnstile doğrulaması (görünmez CAPTCHA / bot koruması).
 *
 * TURNSTILE_SECRET_KEY .env.local'de tanımlı değilse bu fonksiyon sessizce
 * `true` döner — yani Turnstile henüz kurulmadıysa giriş/kayıt akışı
 * kilitlenmez, sadece o ek koruma katmanı devrede olmaz. Anahtarlar
 * eklendiği an otomatik aktifleşir, kod tarafında başka değişiklik gerekmez.
 */
export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: token,
          ...(remoteIp ? { remoteip: remoteIp } : {}),
        }),
      },
    );
    const data = (await response.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    // Cloudflare'e ulaşılamadıysa güvenli taraf: doğrulamayı reddet.
    return false;
  }
}

/** İstemci tarafında widget'ı göstermek için site key'in tanımlı olup olmadığını bildirir. */
export function getTurnstileSiteKey(): string | null {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? null;
}
