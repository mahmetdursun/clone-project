import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Search } from "lucide-react";

import { AccountStatus } from "./AccountStatus";
import { CartNavButton } from "./CartNavButton";
import { GarajimNavLink } from "./GarajimNavLink";

const TOP_BAR_LINKS = [
  { label: "Hakkımızda", href: "/us/hakkimizda" },
  { label: "İletişim", href: "/us/iletisim" },
  { label: "Gizlilik Politikası", href: "/us/gizlilik-politikasi" },
  { label: "Kullanım Koşulları", href: "/us/kullanim-sartlari" },
  { label: "İade Politikası", href: "/us/iade-politikasi" },
  { label: "Sipariş Takibi", href: "#" },
];

export function TopBar() {
  return (
    <div className="bg-dark-bg py-2 text-sm text-dark-text-muted">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4">
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="tel:08503022508"
            className="flex items-center gap-1.5 transition-colors hover:text-dark-text-primary"
          >
            <Phone className="size-3.5" />
            <span>0850 302 25 08</span>
          </a>
          <a
            href="mailto:destek@sonparca.com"
            className="flex items-center gap-1.5 transition-colors hover:text-dark-text-primary"
          >
            <Mail className="size-3.5" />
            <span>destek@sonparca.com</span>
          </a>
        </div>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {TOP_BAR_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="transition-colors hover:text-dark-text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-dark-bg shadow-[0_1px_3px_0_rgb(0_0_0_/_0.08),0_1px_2px_-1px_rgb(0_0_0_/_0.08)]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-2 lg:h-16 lg:flex-nowrap lg:py-0">
          <Link
            href="/"
            className="order-1 flex shrink-0 items-center gap-2 text-xl font-bold text-dark-text-primary"
          >
            <Image
              src="/sites/sonparca-com-32cbe5a4/shared/logo.png"
              alt="KaportaBizde"
              width={293}
              height={185}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <div className="order-3 w-full lg:order-2 lg:mx-4 lg:w-auto lg:min-w-0 lg:max-w-xl lg:flex-1 xl:max-w-2xl">
            <form role="search" className="flex">
              <input
                type="search"
                name="q"
                placeholder="Şasi, parça numarası veya ürün kodu ile arayın"
                className="h-10 w-full rounded-l-md border border-transparent bg-white px-3 text-sm text-light-text-primary outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
              />
              <button
                type="submit"
                aria-label="Ara"
                className="flex h-10 shrink-0 items-center justify-center rounded-r-md bg-sp-accent px-4 text-white transition-colors hover:bg-sp-accent-hover"
              >
                <Search className="size-4" />
              </button>
            </form>
          </div>

          <div className="order-2 flex items-center space-x-4 lg:order-3">
            <AccountStatus />

            <GarajimNavLink />

            <CartNavButton />
          </div>
        </div>
      </div>
    </header>
  );
}

export function SiteHeader() {
  return (
    <>
      <TopBar />
      <Header />
    </>
  );
}
