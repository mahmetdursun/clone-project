import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

/**
 * Next.js 16'da "middleware" adı "proxy" olarak değiştirildi (bkz.
 * node_modules/next/dist/docs/.../proxy.md). Bu dosya eski middleware.ts'in
 * yerini alır.
 *
 * Kasıtlı olarak `@/auth`'u (dolayısıyla Postgres/Drizzle client'ını) BURADA
 * import ETMİYORUZ — proxy ayrı, sınırlı bir bundle'da derleniyor ve
 * `postgres` paketinin kullandığı Node yerleşikleri (net/tls/perf_hooks) bu
 * bundle'da çözülemiyor. Bunun yerine next-auth/jwt'in `getToken()`
 * fonksiyonuyla SADECE cookie'deki JWT'yi doğruluyoruz (DB'ye gitmeden) —
 * bu zaten Next.js'in kendi dokümantasyonunun önerdiği "iyimser (optimistic)
 * kontrol" yaklaşımı.
 *
 * ASIL güvenlik sınırı src/components/account/AccountShell.tsx içindeki
 * sunucu taraflı auth() kontrolüdür — proxy sadece hızlı bir
 * yönlendirme/UX katmanıdır, TEK koruma katmanı DEĞİLDİR.
 */
export default async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/auth/giris", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Sadece korunması gereken /hesabim/* altında çalışır — diğer tüm
  // rotalarda (ana sayfa, ürün sayfaları, Auth.js'in kendi API rotası vb.)
  // gereksiz yere devreye girmez.
  matcher: ["/hesabim/:path*"],
};
