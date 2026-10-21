import Image from "next/image";
import { LayoutGrid } from "lucide-react";

import type { SonparcaCategory } from "@/types/sonparca";

const IMAGE_BASE = "/sites/sonparca-com-32cbe5a4/root-8a5edab2/categories/";

export const categories: SonparcaCategory[] = [
  { slug: "yag-filtresi", label: "Yağ Filtresi", image: `${IMAGE_BASE}yag-filtresi.webp` },
  { slug: "hava-filtresi", label: "Hava Filtresi", image: `${IMAGE_BASE}hava-filtresi.webp` },
  { slug: "polen-filtresi", label: "Polen Filtresi", image: `${IMAGE_BASE}polen-filtresi.webp` },
  {
    slug: "mazot-filtreleri-sensorleri",
    label: "Mazot Filtreleri / Sensörleri",
    image: `${IMAGE_BASE}mazot-filtreleri.webp`,
  },
  { slug: "benzin-filtreleri", label: "Benzin Filtreleri", image: `${IMAGE_BASE}benzin-filtreleri.webp` },
  {
    slug: "oto-bakim-urunleri",
    label: "Oto Bakım Ürünleri",
    image: `${IMAGE_BASE}oto-bakim-urunleri.webp`,
  },
  {
    slug: "vites-kolu-ve-parcalari",
    label: "Vites Kolu ve Parçaları",
    image: `${IMAGE_BASE}vites-kolu-ve-parcalari.webp`,
  },
  {
    slug: "ampuller-aydinlatma-urunleri",
    label: "Ampüller / Aydınlatma Ürünleri",
    image: `${IMAGE_BASE}ampuller-aydinlatma-urunleri.webp`,
  },
  { slug: "on-fren-sistemi", label: "Ön Fren Sistemi", image: `${IMAGE_BASE}on-fren-balatasi.webp` },
  { slug: "arka-fren-sistemi", label: "Arka Fren Sistemi", image: `${IMAGE_BASE}arka-fren-balatasi.webp` },
  { slug: "on-fren-diski", label: "Ön Fren Diski", image: `${IMAGE_BASE}on-fren-diski.webp` },
  { slug: "arka-fren-diski", label: "Arka Fren Diski", image: `${IMAGE_BASE}on-fren-diski.webp` },
  {
    slug: "arka-fren-kampanasi",
    label: "Arka Fren Kampanası",
    image: `${IMAGE_BASE}arka-fren-balatasi.webp`,
  },
  { slug: "buji", label: "Buji", image: `${IMAGE_BASE}buji.webp` },
  { slug: "atesleme-sistemi", label: "Ateşleme Sistemi", image: `${IMAGE_BASE}bobin.webp` },
  {
    slug: "sensorler-musurler",
    label: "Sensörler / Müşürler",
    image: `${IMAGE_BASE}sensorler-musurler.webp`,
  },
  { slug: "aku", label: "Akü", image: `${IMAGE_BASE}aku.webp` },
  { slug: "debriyaj-sistemi", label: "Debriyaj Sistemi", image: `${IMAGE_BASE}debriyaj-seti.webp` },
  { slug: "devridaim", label: "Devridaim", image: `${IMAGE_BASE}devirdaim.webp` },
  { slug: "v-kayisi", label: "V Kayışı", image: `${IMAGE_BASE}v-kayis.webp` },
  { slug: "triger-seti", label: "Triger Seti", image: `${IMAGE_BASE}triger-seti.webp` },
  {
    slug: "sogutma-isitma-radyator",
    label: "Soğutma / Isıtma / Radyatör",
    image: `${IMAGE_BASE}radyator.webp`,
  },
  {
    slug: "interkol-ve-parcalari",
    label: "İnterkol ve Parçaları",
    image: `${IMAGE_BASE}radyator.webp`,
  },
  { slug: "suspansiyon-sistemi", label: "Süspansiyon Sistemi", image: `${IMAGE_BASE}amortisor.webp` },
  { slug: "motor-yagi", label: "Motor Yağı", image: `${IMAGE_BASE}motor-yagi.webp` },
  { slug: "sanziman-yagi", label: "Şanzıman Yağı", image: `${IMAGE_BASE}sanziman-yagi.webp` },
  { slug: "antifriz", label: "Antifriz", image: `${IMAGE_BASE}antifriz.webp` },
  { slug: "far-ve-parcalari", label: "Far ve Parçaları", image: `${IMAGE_BASE}far.webp` },
  {
    slug: "stop-reflektor-plaka-lambasi",
    label: "Stop / Reflektör / Plaka Lambası",
    image: `${IMAGE_BASE}stop.webp`,
  },
  { slug: "sis-lambalari", label: "Sis Lambaları", image: `${IMAGE_BASE}sis-lambalari.webp` },
  { slug: "silecek", label: "Silecek", image: `${IMAGE_BASE}silecek.webp` },
  { slug: "ayna", label: "Ayna", image: `${IMAGE_BASE}ayna.webp` },
  { slug: "termostat", label: "Termostat", image: `${IMAGE_BASE}termostat.webp` },
  {
    slug: "klima-kompresoru",
    label: "Klima Kompresörü",
    image: `${IMAGE_BASE}klima-kompresoru.webp`,
  },
  { slug: "on-tampon", label: "Ön Tampon", image: `${IMAGE_BASE}on-tampon.webp` },
  { slug: "arka-tampon", label: "Arka Tampon", image: `${IMAGE_BASE}arka-tampon.webp` },
  {
    slug: "camurluk-sinyali",
    label: "Çamurluk Sinyali",
    image: `${IMAGE_BASE}camurluk-sinyali.webp`,
  },
  { slug: "tampon-reflektorleri", label: "Tampon Reflektörleri", image: `${IMAGE_BASE}reflektor.webp` },
  { slug: "davlumbaz-pacaliklar", label: "Davlumbaz / Paçalıklar", image: `${IMAGE_BASE}davlumbaz.webp` },
  {
    slug: "camurluk-ve-parcalari",
    label: "Çamurluk ve Parçaları",
    image: `${IMAGE_BASE}camurluk.webp`,
  },
];

export function CategoryGrid() {
  return (
    <section>
      <div className="bg-dark-bg rounded-t-lg px-4 py-3 flex items-center gap-2">
        <LayoutGrid className="h-5 w-5 text-sp-accent" />
        <div>
          <p className="font-semibold text-dark-text-primary">
            Popüler Yedek Parça Kategorileri
          </p>
          <p className="text-xs text-dark-text-muted">
            En çok tercih edilen yedek parça kategorileri
          </p>
        </div>
      </div>
      <div className="bg-white border border-t-0 border-gray-200 rounded-b-lg p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <a
              key={category.slug}
              href={
                category.slug === "on-tampon"
                  ? "/on-tampon"
                  : `/kategori/${category.slug}`
              }
              className="group relative flex flex-col h-full bg-white border border-gray-200 rounded overflow-hidden hover:border-sp-accent/40 hover:shadow-sm transition-all"
            >
              <div className="relative block aspect-square bg-gray-50 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  sizes="(min-width: 1024px) 12.5vw, (min-width: 640px) 25vw, 50vw"
                  className="object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-center text-xs font-medium text-gray-700 px-2 py-2 line-clamp-2">
                {category.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
