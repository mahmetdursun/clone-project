import type { Metadata } from "next";

import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { SepetimClient } from "@/components/sites/sonparca-com-32cbe5a4/sepetim-6f2b1ac0/SepetimClient";

export const metadata: Metadata = {
  title: "Sepetim | KaportaBizde",
  description: "Sepetinizdeki ürünleri görüntüleyin, teslimat adresinizi ve ödeme yönteminizi seçerek siparişinizi tamamlayın.",
};

export default function SepetimPage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full flex-grow bg-light-bg pb-16 md:pb-0">
        <SepetimClient />
      </main>
      <Footer />
    </>
  );
}
