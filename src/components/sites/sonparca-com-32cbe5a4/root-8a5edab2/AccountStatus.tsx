"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";

import { SignOutButton } from "@/components/account/SignOutButton";

/**
 * Header, hemen her sayfada render olduğu için oturum durumunu BURADA
 * sunucu tarafında (auth()) okumuyoruz — bu, siteyi baştan sona dinamik
 * yapıp ana sayfa/ürün sayfaları gibi statik üretilebilecek sayfaların
 * statik kalma avantajını (hız, SEO) yok ederdi. Bunun yerine next-auth/react
 * `useSession()` ile İSTEMCİ tarafında, sayfa hidrasyonundan sonra okuyoruz
 * (bkz. src/app/layout.tsx'teki SessionProvider). Kısa bir an için "Giriş
 * Yap" durumu görünüp oturum açıksa "Hesabım"a geçebilir — bu, statik
 * sayfa üretimini korumak için kabul edilen bir tradeoff.
 *
 * Gerçek/yetkili oturum kontrolü (örn. /hesabim/* sayfalarına erişim) hâlâ
 * sunucu tarafında yapılıyor — bkz. src/components/account/AccountShell.tsx.
 */
export function AccountStatus() {
  const { data: session, status } = useSession();

  if (status === "authenticated" && session.user) {
    return (
      <div className="flex items-center gap-2 text-sm text-dark-text-primary">
        <Link
          href="/hesabim"
          className="flex items-center gap-1.5 transition-colors hover:text-sp-accent"
        >
          <User className="size-4 text-dark-text-muted" />
          <span className="max-w-[140px] truncate">
            {session.user.name || session.user.email}
          </span>
        </Link>
        <span className="text-dark-text-muted">·</span>
        <SignOutButton className="flex items-center gap-1 text-dark-text-muted transition-colors hover:text-sp-accent" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-sm text-dark-text-primary">
      <User className="size-4 text-dark-text-muted" />
      <Link href="/auth/giris" className="transition-colors hover:text-sp-accent">
        Giriş Yap
      </Link>
      <span className="text-dark-text-muted">/</span>
      <Link href="/auth/kayit-ol" className="transition-colors hover:text-sp-accent">
        Kayıt Ol
      </Link>
    </div>
  );
}
