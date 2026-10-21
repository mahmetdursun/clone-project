import { Suspense } from "react";

import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { YedekParcaClient } from "@/components/sites/sonparca-com-32cbe5a4/yedek-parca-9c4e2f18/YedekParcaClient";

// SiteHeader oturum durumunu okuyan bir Server Component olduğu için bu
// dosya da bir Server Component olmalı; etkileşimli mantık YedekParcaClient'a
// taşındı. YedekParcaClient useSearchParams() kullanıyor (ana ekrandan/
// SelectedVehicleSummary'den gelen ?brand=&model=&year=&fuel=&engine=
// parametrelerini okumak için) — bu yüzden Suspense sınırı içinde render
// edilmesi gerekiyor (bkz. bakim-robotu/page.tsx'teki aynı desen).
export default function YedekParcaPage() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={null}>
        <YedekParcaClient />
      </Suspense>
      <Footer />
    </>
  );
}
