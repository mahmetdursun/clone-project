import type { Metadata } from "next";

import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { PolicyHero } from "@/components/sites/sonparca-com-32cbe5a4/us-iade-politikasi-3aff6d63/PolicyHero";
import { PolicyContent } from "@/components/sites/sonparca-com-32cbe5a4/us-iade-politikasi-3aff6d63/PolicyContent";
import { PolicyFaq } from "@/components/sites/sonparca-com-32cbe5a4/us-iade-politikasi-3aff6d63/PolicyFaq";

export const metadata: Metadata = {
  title: "İade Politikası | KaportaBizde",
};

export default function IadePolitikasiPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-grow w-full pb-16 md:pb-0">
        <div className="container mx-auto max-w-screen-xl overflow-x-hidden px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 text-gray-700">
          <PolicyHero />
          <PolicyContent />
          <PolicyFaq />
        </div>
      </main>
      <Footer />
    </>
  );
}
