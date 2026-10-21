import { heroIntro, lastUpdated } from "./data";

export function PolicyHero() {
  return (
    <header className="mb-6 border-b border-gray-200 pb-4 md:mb-8 md:pb-6">
      <h1 className="mb-2 break-words text-xl font-bold md:text-2xl lg:text-3xl">
        KaportaBizde Gizlilik ve Kişisel Verilerin Korunması Politikası
      </h1>
      <p className="text-xs text-gray-500 md:text-sm">
        Son Güncelleme Tarihi: {lastUpdated}
      </p>
      <p className="mt-4 whitespace-normal break-words text-sm leading-relaxed md:text-base">
        {heroIntro}
      </p>
    </header>
  );
}
