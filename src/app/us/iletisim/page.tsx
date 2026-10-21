import type { Metadata } from "next";
import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { ContactHero } from "@/components/sites/sonparca-com-32cbe5a4/us-iletisim-b7101001/ContactHero";
import { ContactInfoCards } from "@/components/sites/sonparca-com-32cbe5a4/us-iletisim-b7101001/ContactInfoCards";
import { ContactMapSection } from "@/components/sites/sonparca-com-32cbe5a4/us-iletisim-b7101001/ContactMapSection";
import { WorkingHoursSection } from "@/components/sites/sonparca-com-32cbe5a4/us-iletisim-b7101001/WorkingHoursSection";
import { ContactFAQ } from "@/components/sites/sonparca-com-32cbe5a4/us-iletisim-b7101001/ContactFAQ";

export const metadata: Metadata = {
  title: "İletişim | KaportaBizde",
  description: "KaportaBizde ile iletişime geçebileceğiniz tüm kanallarımız.",
};

export default function IletisimPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-gray-50">
        <ContactHero />
        <ContactInfoCards />
        <ContactMapSection />
        <WorkingHoursSection />
        <ContactFAQ />
      </main>
      <Footer />
    </>
  );
}
