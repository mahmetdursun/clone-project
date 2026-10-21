import type { Metadata } from "next";

import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { RegisterCard } from "@/components/sites/sonparca-com-32cbe5a4/auth-kayit-ol-e754a58f/RegisterCard";

export const metadata: Metadata = {
  title: "Hesap Oluştur | KaportaBizde",
};

export default function KayitOlPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <RegisterCard />
      </main>
      <Footer />
    </>
  );
}
