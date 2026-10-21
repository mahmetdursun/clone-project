import type { Metadata } from "next";

import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { ChassisLookupHero } from "@/components/sites/sonparca-com-32cbe5a4/sase-numarasi-ile-parca-sorgulama-331ed4a8/ChassisLookupHero";
import { HowItWorksSection } from "@/components/sites/sonparca-com-32cbe5a4/sase-numarasi-ile-parca-sorgulama-331ed4a8/HowItWorksSection";
import { ChassisSeoContent } from "@/components/sites/sonparca-com-32cbe5a4/sase-numarasi-ile-parca-sorgulama-331ed4a8/ChassisSeoContent";
import { ChassisFaq } from "@/components/sites/sonparca-com-32cbe5a4/sase-numarasi-ile-parca-sorgulama-331ed4a8/ChassisFaq";
import { AlternateSearchCta } from "@/components/sites/sonparca-com-32cbe5a4/sase-numarasi-ile-parca-sorgulama-331ed4a8/AlternateSearchCta";

export const metadata: Metadata = {
  title: "Şasi Numarası ile Yedek Parça Sorgulama | VIN Kodu Arama | KaportaBizde",
  description:
    "Şasi numaranızı girin, aracınıza %100 uyumlu parçaları anında bulun. 17 haneli VIN kodunuzla saniyeler içinde doğru yedek parçaya ulaşın.",
};

export default function ChassisNumberLookupPage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full flex-grow">
        <ChassisLookupHero />
        <HowItWorksSection />
        <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <ChassisSeoContent />
          <ChassisFaq />
        </div>
        <AlternateSearchCta />
      </main>
      <Footer />
    </>
  );
}
