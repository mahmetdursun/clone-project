import type { Metadata } from "next";

import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { RequestFormHero } from "@/components/sites/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/RequestFormHero";
import { SEOContentCard } from "@/components/sites/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/SEOContentCard";
import { RequestFormFaq } from "@/components/sites/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/RequestFormFaq";

export const metadata: Metadata = {
  title: "Otomobil Yedek Parça Talebi | Ücretsiz Fiyat Teklifi | KaportaBizde",
  description:
    "Aracınız için ihtiyacınız olan yedek parçayı talep edin. Ücretsiz fiyat teklifi alın. Birçok marka ve model için hızlı tedarik hizmeti.",
};

export default function PartRequestFormPage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full flex-grow pb-16 md:pb-0">
        <RequestFormHero />
        <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <SEOContentCard />
          <RequestFormFaq />
        </div>
      </main>
      <Footer />
    </>
  );
}
