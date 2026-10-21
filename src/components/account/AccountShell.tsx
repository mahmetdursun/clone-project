import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { AccountSidebarNav } from "@/components/account/AccountSidebarNav";
import { SignOutButton } from "@/components/account/SignOutButton";

/**
 * Tüm /hesabim/* sayfalarının paylaştığı kabuk — burada yapılan oturum
 * kontrolü asıl (authoritative) güvenlik sınırıdır: proxy.ts'teki kontrol
 * sadece hızlı/iyimser bir yönlendirmedir (bkz. proxy.ts yorumu), burada
 * her sayfa render'ında sunucu tarafında gerçek oturum doğrulanır.
 */
export async function AccountShell({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/giris?callbackUrl=/hesabim");
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-[60vh] w-full bg-light-bg">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
            <h1 className="text-2xl font-bold text-light-text-primary">
              Hesabım
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-sm text-light-text-muted">
                {session.user.email}
              </span>
              <SignOutButton />
            </div>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row">
            <AccountSidebarNav />
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
