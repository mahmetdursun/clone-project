import type { SonparcaProduct } from "@/types/sonparca";

import type { SonparcaProductWithAccent } from "./ProductCard";

const IMAGE_BASE = "/sites/sonparca-com-32cbe5a4/root-8a5edab2/images/";

/** "Çok Satanlar" carousel data. */
export const bestSellerProducts: SonparcaProduct[] = [
  {
    id: "product-02",
    name: "MGA Genel Amaçlı Fren ve Balata Temizleme Spreyi",
    price: "128,42",
    image: `${IMAGE_BASE}product-02.webp`,
  },
  {
    id: "product-03",
    name: "Passat, Caddy, A3, Corolla İç Yakıt Depo Kapağı (OEM: 1J0201550AN)",
    price: "380,50",
    image: `${IMAGE_BASE}product-03.webp`,
  },
  {
    id: "product-04",
    name: "Mitsubishi Lancer ve ASX Motor Yağ Seviye Çubuğu (MD373734)",
    price: "388,25",
    image: `${IMAGE_BASE}product-04.webp`,
  },
  {
    id: "product-01",
    name: "Bosch Yağ Filtresi 09864B7063",
    price: "208,64",
    image: `${IMAGE_BASE}product-01.webp`,
    href: "/urun-detayi/bosch-yag-filtresi-09864b7063-p-PEqo3N7Soc",
  },
  {
    id: "product-05",
    name: "Bosch PY21W Sinyal Ampulü (12V 21W) - OEM 6216A4",
    price: "30,31",
    image: `${IMAGE_BASE}product-05.webp`,
  },
  {
    id: "product-06",
    name: "Polo, T5, Passat, Golf 4, Bora Ön Silecek Fiskiye Memesi 6E0955985A",
    price: "111,60",
    image: `${IMAGE_BASE}product-06.webp`,
  },
  {
    id: "product-10-battery",
    name: "Varta 55 Ah Akü D59DAR",
    price: "4.908,25",
    image: `${IMAGE_BASE}product-10-battery.webp`,
  },
  {
    id: "product-07",
    name: "Sonparça Depo Şamandırası MNDMMP020004",
    price: "3.307,50",
    image: `${IMAGE_BASE}product-07.webp`,
  },
  {
    id: "product-08",
    name: "Sonparça Ön Panjur ROOT151285",
    price: "1.123,78",
    image: `${IMAGE_BASE}product-08.webp`,
  },
  {
    id: "product-09",
    name: "Sonparça Sol Motor Takozu 022210A024116",
    price: "2.270,89",
    image: `${IMAGE_BASE}product-09.webp`,
  },
  {
    id: "product-11-salincak-1",
    name: "Bsg Alt Sol Salıncak 40315060",
    price: "1.119,97",
    image: `${IMAGE_BASE}product-11-salincak-1.webp`,
  },
  {
    id: "product-12-salincak-2",
    name: "Ayd Sağ Alt Salıncak AYD22028",
    price: "1.580,76",
    image: `${IMAGE_BASE}product-12-salincak-2.webp`,
  },
];

/** "Yeni Gelenler" carousel data. */
export const newArrivalProducts: SonparcaProductWithAccent[] = [
  {
    id: "product-12-salincak-2-new",
    brandLabel: "AYD",
    name: "Ayd Sağ Alt Salıncak AYD22028",
    price: "1.580,76",
    image: `${IMAGE_BASE}product-12-salincak-2.webp`,
  },
  {
    id: "product-13-sis-bakalit",
    brandLabel: "ORJINAL",
    name: "Orjinal Sis Bakalit Ön 1632655780",
    price: "7.073,61",
    image: `${IMAGE_BASE}product-13-sis-bakalit.webp`,
  },
  {
    id: "product-14-silecek",
    brandLabel: "BOSCH",
    name: "Bosch Ön Cam Sileceği 3397014826",
    price: "1.369,99",
    image: `${IMAGE_BASE}product-14-silecek.webp`,
  },
  {
    id: "product-15-salincak-3",
    brandLabel: "BSG",
    name: "Bsg Sağ Alt Salıncak 75315047",
    price: "1.216,40",
    image: `${IMAGE_BASE}product-15-salincak-3.webp`,
  },
  {
    id: "product-16-salincak-4",
    brandLabel: "BSG",
    name: "Bsg Alt Sol Salıncak 75315048",
    price: "1.216,40",
    image: `${IMAGE_BASE}product-16-salincak-4.webp`,
  },
  {
    id: "product-17-buji",
    brandLabel: "DENSO",
    name: "Denso İridyum Buji FC16HRQ8",
    price: "882,71",
    image: `${IMAGE_BASE}product-17-buji.webp`,
    accent: true,
  },
];
