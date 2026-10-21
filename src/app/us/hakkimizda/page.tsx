import type { Metadata } from "next";

import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { HeroBanner } from "@/components/sites/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/HeroBanner";
import { StoryMissionSection } from "@/components/sites/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/StoryMissionSection";
import { ValuesGrid } from "@/components/sites/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/ValuesGrid";
import { WhyUsSection } from "@/components/sites/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/WhyUsSection";
import { ContactFaqSection } from "@/components/sites/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/ContactFaqSection";

export const metadata: Metadata = {
  title: "Hakkımızda - KaportaBizde",
};

export default function HakkimizdaPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroBanner />
        <StoryMissionSection />
        <ValuesGrid />
        <WhyUsSection />
        <ContactFaqSection />
      </main>
      <Footer />
    </>
  );
}
