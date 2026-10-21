import type { Metadata } from "next";
import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { LoginCard } from "@/components/sites/sonparca-com-32cbe5a4/auth-giris-03cc2c81/LoginCard";

export const metadata: Metadata = {
  title: "Giriş Yap | KaportaBizde",
  description:
    "KaportaBizde hesabınıza e-posta ve şifrenizle giriş yapın veya Google / Facebook ile devam edin.",
};

export default function GirisPage() {
  return (
    <>
      <SiteHeader />
      <LoginCard />
    </>
  );
}
