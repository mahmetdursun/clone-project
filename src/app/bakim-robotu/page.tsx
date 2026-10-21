import { Suspense } from "react";

import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { BakimRobotuWizard } from "./BakimRobotuWizard";

// SiteHeader artık oturum durumunu okuyan bir Server Component (bkz.
// Header.tsx) — bu yüzden onu render eden bu dosya da bir Server Component
// olmalı; sihirbazın etkileşimli mantığı BakimRobotuWizard'a taşındı.
// BakimRobotuWizard useSearchParams() kullanıyor (ana ekrandan gelen
// ?brand=&model=... parametrelerini okumak için) — bu yüzden Suspense
// sınırı içinde render edilmesi gerekiyor.
export default function BakimRobotuPage() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={null}>
        <BakimRobotuWizard />
      </Suspense>
      <Footer />
    </>
  );
}
