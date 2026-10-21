import type { Metadata } from "next";

import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { PolicyHero } from "@/components/sites/sonparca-com-32cbe5a4/us-gizlilik-politikasi-6264bf87/PolicyHero";
import { PolicyContent } from "@/components/sites/sonparca-com-32cbe5a4/us-gizlilik-politikasi-6264bf87/PolicyContent";
import { PolicyFaq } from "@/components/sites/sonparca-com-32cbe5a4/us-gizlilik-politikasi-6264bf87/PolicyFaq";

export const metadata: Metadata = {
  title: "Gizlilik Politikası - KaportaBizde",
};

export default function GizlilikPolitikasiPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="container mx-auto max-w-screen-xl overflow-x-hidden px-4 py-6 text-gray-700 md:px-6 md:py-8 lg:px-8 lg:py-10">
          <PolicyHero />
          <PolicyContent />
          <PolicyFaq />
        </div>
      </main>
      <Footer />
    </>
  );
}
