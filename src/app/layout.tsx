import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartUndoToast } from "@/components/cart/CartUndoToast";
import { CartProvider } from "@/hooks/use-cart";
import "./globals.css";

export const metadata: Metadata = {
  title: "KaportaBizde | Yedek Parça Ara, Şasi Numarası ile Bul",
  description:
    "Şasi numarası veya araç seçerek 1.2 milyondan fazla ürün arasından aracınıza uygun yedek parçayı saniyeler içinde bulun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50 text-stone-900">
        {/*
          Oturum durumunu (Header'daki "Giriş Yap" / "Hesabım") istemci
          tarafında okumak için SessionProvider — bilerek server-side auth()
          yerine bunu tercih ettik: Header hemen hemen her sayfada render
          olduğu için sunucu tarafında auth() çağırmak siteyi tamamen
          dinamikleştirip (SEO/performans için önemli) statik sayfa
          üretimini (ana sayfa, ürün sayfaları vb.) devre dışı bırakıyordu.
          Gerçek/yetkili oturum kontrolü hâlâ /hesabim/* sayfalarında
          AccountShell.tsx içinde sunucu tarafında yapılıyor.
        */}
        <SessionProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <CartUndoToast />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
