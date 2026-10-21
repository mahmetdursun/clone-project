import type { Metadata } from "next";

import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { TermsHero } from "@/components/sites/sonparca-com-32cbe5a4/us-kullanim-sartlari-9bef851b/TermsHero";
import { TermsContent } from "@/components/sites/sonparca-com-32cbe5a4/us-kullanim-sartlari-9bef851b/TermsContent";
import { TermsFaq } from "@/components/sites/sonparca-com-32cbe5a4/us-kullanim-sartlari-9bef851b/TermsFaq";

export const metadata: Metadata = {
  title: "Kullanım Koşulları | KaportaBizde",
};

export default function KullanimSartlariPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-grow w-full pb-16 md:pb-0">
        <div className="container mx-auto p-3 md:p-6 lg:p-8 max-w-screen-xl overflow-x-hidden">
          <TermsHero />
          <TermsContent />
          <TermsFaq />
        </div>
      </main>
      <Footer />
    </>
  );
}
