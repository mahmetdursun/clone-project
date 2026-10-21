import type { LucideIcon } from "lucide-react";
import {
  Lightbulb,
  Disc,
  Thermometer,
  Cog,
  Zap,
  Settings2,
  Wrench,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Vehicle cascade data
// ---------------------------------------------------------------------------

// VEHICLE_BRANDS / VEHICLE_MODELS_BY_BRAND / VEHICLE_SPECS used to be a
// hand-curated ~28-brand subset captured live from sonparca.com's own
// vehicle-selector API (see docs/research/vehicle-cascade-raw/ for that raw
// capture). They now come from a much larger, user-supplied Türkiye Araç
// Kataloğu 1970-2026 (146 marka, 1813 model) — see
// scripts/generate-vehicle-catalog.py and vehicle-catalog-tr.ts for the full
// provenance. That source mixes verified Turkish-market data (2006-2026,
// TSB Kasko Değer Listesi) with unverified international-market data
// (1970-2005), and some models are missing fuel/engine info — the cascade
// UI (VehicleCascadeTab) skips those steps automatically when the data for
// that specific model doesn't have it. This is intentionally not fully
// clean yet; expect another merge pass once more brand/model data arrives.
export { VEHICLE_BRANDS, VEHICLE_MODELS_BY_BRAND, VEHICLE_SPECS } from "./vehicle-catalog-tr";

export interface VehicleModelSpecs {
  years: number[];
  fuels: string[];
  engines: string[];
}

// Fallbacks only — in practice VehicleCascadeTab always has a VEHICLE_SPECS
// entry for every brand/model it offers (every (Marka, Seri/Model) pair in
// the catalog gets one, even if its fuels/engines end up empty), so these
// are never actually read. Kept in sync with the full catalog's real range.
export const VEHICLE_YEARS: number[] = Array.from(
  { length: 2026 - 1970 + 1 },
  (_, i) => 1970 + i,
);

export const VEHICLE_FUELS = ["Benzin", "Dizel", "Hibrit", "Elektrik", "Benzin & LPG", "CNG"] as const;
export const VEHICLE_ENGINES = ["1.3", "1.6"] as const;

export interface SelectedVehicle {
  brand: string;
  model: string;
  year: number;
  fuel: string;
  engine: string;
}

// ---------------------------------------------------------------------------
// How it works
// ---------------------------------------------------------------------------

export const HOW_IT_WORKS_STEPS = [
  {
    icon: "car" as const,
    title: "Aracınızı Seçin",
    description:
      "Marka-model seçin, şasi numarası girin veya garajınızdaki aracı seçin.",
  },
  {
    icon: "wrench" as const,
    title: "Bakım Paketi Seçin",
    description:
      "Periyodik bakım, fren bakımı gibi hazır paketlerden birini seçin.",
  },
  {
    icon: "checklist" as const,
    title: "Parçaları Seçin",
    description:
      "Her adımda aracınıza uyumlu ürünleri inceleyip sepetinize ekleyin.",
  },
  {
    icon: "cart" as const,
    title: "Toplu Sepete Ekleyin",
    description: "Seçtiğiniz tüm parçaları tek seferde sepetinize ekleyin.",
  },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const WIZARD_FAQ = [
  {
    q: "Bakım Robotu nedir ve nasıl çalışır?",
    a: "Bakım Robotu, aracınızı tanımlamanızın ardından size özel bakım paketleri ve uyumlu parçaları adım adım sunan akıllı bir seçim asistanıdır.",
  },
  {
    q: "Seçtiğim parçalar aracıma uygun mu?",
    a: "Evet. Marka, model, yıl, yakıt ve motor hacmi bilgilerinize göre yalnızca aracınıza uygun parçalar listelenir.",
  },
  {
    q: "Bir adımı atlayabilir miyim?",
    a: "Opsiyonel olarak işaretlenen adımları \"Atla\" butonuyla geçebilirsiniz. Zorunlu adımlarda devam etmek için bir seçim yapmanız gerekir.",
  },
  {
    q: "Tüm parçaları tek seferde sepete ekleyebilir miyim?",
    a: "Evet. Özet ekranındaki \"Tümünü Sepete Ekle\" butonuyla seçtiğiniz tüm parçaları tek seferde sepetinize ekleyebilirsiniz.",
  },
];

// ---------------------------------------------------------------------------
// SEO content blocks (verbatim from the live site)
// ---------------------------------------------------------------------------

export interface SeoBlock {
  h2?: string;
  h3?: string;
  paragraphs: string[];
  table?: { headers: string[]; rows: string[][] };
}

export const WIZARD_SEO_CONTENT: SeoBlock[] = [
  {
    h2: "Bakım Robotu ile Periyodik Bakım Parçası Seçimi",
    paragraphs: [
      "Periyodik bakım aracınızın ömrünü uzatan ve sürüş güvenliğinizi koruyan en kritik rutindir. Birçok sürücü bakım zamanı geldiğinde hangi parçaların değişeceğini ve bunların aracına uyup uymayacağını kestiremez. Yağ, filtre, fren ve buji gibi onlarca bakım parçası arasında doğru seçimi yapmak teknik bilgi gerektirir. Bakım Robotu tam bu noktada devreye girerek size adım adım rehberlik eder. Aracınızı seçtiğiniz an yalnızca uyumlu parçaları önünüze getirir.",
      "2026 yılının akıllı altyapısı sayesinde bakım listenizi dakikalar içinde hazırlarsınız. Sistemimiz hazır bakım paketleri sunarak hangi adımda hangi parçayı seçmeniz gerektiğini netçe gösterir. Aracınıza uygun yağ filtresinden hava filtresine, fren balatasından triger setine kadar tüm bileşenleri tek bir akışta sepetinize eklersiniz. Böylece sanayide saatlerce ürün arama ve yanlış parça alma stresini geride bırakırsınız. Bakım Robotu bütçenizi de zamanınızı da korur.",
    ],
  },
  {
    h3: "Bakım Robotu Nasıl Çalışır?",
    paragraphs: [
      "Bakım Robotu karmaşık katalogları sizin yerinize tarayan akıllı bir asistandır. Önce aracınızı tanımlar, ardından bir bakım paketi seçmenizi ister ve her adımda yalnızca aracınıza uyumlu ürünleri listeler. Bu sayede yanlış parça alma korkusu yaşamadan tüm bakımınızı tek seferde tamamlarsınız. Algoritmamız hata payını sıfıra indirerek deneme yanılma yöntemini ortadan kaldırır.",
    ],
  },
  {
    h3: "Aracınıza Özel Uyumlu Listeleme",
    paragraphs: [
      "Aracınızı marka-model seçerek, şasi numarası girerek veya garajınızdaki kayıtlı araçtan seçtiğiniz an sistem motor tipinizi ve donanım özelliklerinizi tanır. Her adımda ekranda beliren parçaların aracınıza yüzde yüz uyacağını kesin olarak bilirsiniz. Şasi numaranızla daha hassas sonuç almak isterseniz şase numarası ile parça sorgulama aracımızı da kullanabilirsiniz.",
    ],
  },
  {
    h3: "Adım Adım Toplu Sepete Ekleme",
    paragraphs: [
      "Her bakım paketi yağ, filtre, fren ve ateşleme gibi mantıklı adımlara bölünmüştür. Bir adımda ürününüzü seçer, ihtiyaç duymadığınız opsiyonel adımları atlar ve bir sonraki adıma geçersiniz. Tüm adımları tamamladığınızda özet ekranında seçtiğiniz parçaların tamamını tek tıkla sepetinize eklersiniz. Bu düzen sayesinde tek tek arama yaparak harcadığınız uzun dakikaları kazanca çevirirsiniz.",
    ],
    table: {
      headers: [
        "Karşılaştırma Kriteri",
        "Klasik Bakım Alışverişi",
        "Bakım Robotu ile Seçim",
      ],
      rows: [
        ["Parça Uyum Garantisi", "Belirsiz ve Riskli", "Aracınıza Tam Uyumlu"],
        ["Liste Hazırlama Hızı", "Tek Tek ve Yavaş", "Adım Adım ve Hızlı"],
        ["Eksik Parça Riski", "Sıkça Unutulur", "Paket Adımları Hatırlatır"],
        ["Sepete Ekleme Şekli", "Ürün Ürün Eklenir", "Tümü Tek Tıkla Eklenir"],
      ],
    },
  },
  {
    h2: "Periyodik Bakım Neden Önemlidir?",
    paragraphs: [],
  },
  {
    h3: "Motor Ömrünü Uzatan Düzenli Bakım",
    paragraphs: [
      "Aracınızın motoru binlerce parçanın uyum içinde çalıştığı hassas bir sistemdir. Zamanında değiştirilmeyen yağ ve filtreler sürtünmeyi artırarak motor aksamını hızla yıpratır. Düzenli periyodik bakım bu aşınmayı engelleyerek aracınızın ilk günkü performansını korur. Bakım takvimi hakkında genel bilgi için bu kaynağı inceleyebilirsiniz.",
    ],
  },
  {
    h3: "Yakıt Tasarrufu ve Güvenli Sürüş",
    paragraphs: [
      "Temiz bir hava filtresi ve doğru çalışan bujiler motorun verimli yanmasını sağlayarak yakıt tüketimini gözle görülür şekilde düşürür. Aşınmış fren balataları ise durma mesafesini uzatarak güvenliğinizi tehlikeye atar. Zamanında yapılan bakım hem cebinizi korur hem de yollarda sizi ve sevdiklerinizi güvende tutar. Bakım Robotu bu kritik parçaları unutmamanızı sağlar.",
    ],
    table: {
      headers: [
        "Bakım Kalemi",
        "Genel Değişim Aralığı",
        "İhmal Edilince Sonucu",
      ],
      rows: [
        ["Motor Yağı ve Yağ Filtresi", "10-15 Bin Km", "Motorda Ağır Aşınma"],
        [
          "Hava ve Polen Filtresi",
          "15-30 Bin Km",
          "Performans ve Verim Kaybı",
        ],
        ["Fren Balatası ve Diski", "30-50 Bin Km", "Fren Mesafesinde Uzama"],
        ["Buji ve Triger Seti", "40-90 Bin Km", "Ateşleme ve Motor Arızası"],
      ],
    },
  },
  {
    h2: "Hazır Bakım Paketleri ile Kolay Seçim",
    paragraphs: [],
  },
  {
    h3: "İhtiyacınıza Uygun Paket Seçimi",
    paragraphs: [
      "Bakım Robotu farklı ihtiyaçlar için hazırlanmış bakım paketleri sunar. Genel periyodik bakım paketinden fren bakım paketine, ağır kış hazırlığından uzun yol bakımına kadar birçok seçenek arasından aracınıza ve mevsime uygun olanı seçersiniz. Her paket o bakımda gereken parçaları mantıklı adımlar halinde içerir; böylece hiçbir önemli kalemi atlamazsınız.",
    ],
  },
  {
    h3: "Opsiyonel Adımları Atlama Esnekliği",
    paragraphs: [
      "Her sürücünün bakım ihtiyacı farklıdır. Bu nedenle paket adımlarının bir kısmı opsiyonel olarak işaretlenir ve dilerseniz atlayabilirsiniz. Zorunlu adımlarda ise aracınızın sağlığı için gerekli parçayı seçerek devam etmeniz önerilir. Bir bakımı tamamladıktan sonra başka bir paketle devam ederek seçtiğiniz parçaları otomatik olarak sepetinize aktarabilirsiniz.",
    ],
    table: {
      headers: ["Bakım Paketi Türü", "İçerdiği Tipik Parçalar", "Önerilen Durum"],
      rows: [
        [
          "Genel Periyodik Bakım",
          "Yağ, Yağ ve Hava Filtresi",
          "Rutin Km Bakımı",
        ],
        [
          "Fren Bakım Paketi",
          "Balata, Disk, Fren Hidroliği",
          "Fren Performans Kaybında",
        ],
        [
          "Triger/Zincir ve Tahrik Kayış Paketi",
          "Triger Seti, Kayışlar, Gergi Rulmanları",
          "Motor Tipine Göre 60-120 Bin Km",
        ],
        [
          "Ateşleme Bakım Paketi",
          "Buji, Bobin, Triger Seti",
          "Yüksek Km Araçlarda",
        ],
      ],
    },
  },
  {
    h2: "Aracınızı Tanımlamanın Üç Yolu",
    paragraphs: [],
  },
  {
    h3: "Şasi Numarası ile Hassas Eşleştirme",
    paragraphs: [
      "On yedi haneli şasi numaranız aracınızın fabrikadan çıktığı günkü tüm teknik verilerini barındırır. Bu kodu girdiğinizde Bakım Robotu motor tipinize ve donanımınıza birebir uyan parçaları getirir. En hassas sonucu almak isteyenler için şase numarası ile parça sorgulama en güvenli yöntemdir.",
    ],
  },
  {
    h3: "Marka Model ve Yıl ile Pratik Seçim",
    paragraphs: [
      "Ruhsatınıza o an ulaşamıyorsanız aracınızın marka, model ve üretim yılını seçerek de doğru parçalara hızla ulaşırsınız. Adım adım yönlendiren araç seçerek parça sorgulama arayüzümüz kullanımı son derece kolaydır. Sitede zaten seçili bir aracınız varsa Bakım Robotu onu otomatik olarak hatırlar ve doğrudan paket seçimine geçirir.",
    ],
    table: {
      headers: ["Tanımlama Yöntemi", "İstenen Bilgi", "Uyum Hassasiyeti"],
      rows: [
        ["Şasi Numarası ile Arama", "17 Haneli Kimlik Kodu", "En Yüksek Hassasiyet"],
        [
          "Marka Model ve Yıl Seçimi",
          "Marka, Model, Yıl, Motor",
          "Yüksek Hassasiyet",
        ],
        [
          "Garajdan Araç Seçimi",
          "Kayıtlı Araç Kaydı",
          "Tek Tıkla Hızlı Erişim",
        ],
      ],
    },
  },
  {
    h2: "Bakım Parçası Bulunamazsa Ne Yapmalı?",
    paragraphs: [],
  },
  {
    h3: "Özel Parça Talep Formu",
    paragraphs: [
      "Klasik araçlar veya özel donanımlı modeller için aradığınız bakım parçası her zaman standart listelerde bulunmayabilir. Böyle durumlarda özel parça talep formumuzu doldurarak ihtiyacınızı bize iletebilirsiniz. Uzmanlarımız geniş tedarik ağını harekete geçirerek nadir bulunan parçaları sizin için araştırır.",
    ],
  },
  {
    h3: "Uzman Desteği ve İletişim",
    paragraphs: [
      "Hangi bakım paketinin aracınıza uygun olduğundan emin değilseniz veya teknik bir sorunuz varsa uzman ekibimiz size yardımcı olmaya hazırdır. Aklınıza takılan her soruyu iletişim kanallarımız üzerinden bize iletebilirsiniz. Amacımız bakım sürecinizi olabildiğince kolay ve güvenli hale getirmektir.",
    ],
    table: {
      headers: ["Durum", "Önerilen Adım", "Sağladığı Fayda"],
      rows: [
        ["Parça Listede Yok", "Özel Talep Formu Doldur", "Nadir Parçaya Erişim"],
        ["Paket Seçiminde Kararsızlık", "Uzman Desteği Al", "Doğru Bakım Planı"],
        ["Araç Tanımlanamıyor", "Şasi ile Arama Dene", "Kesin Uyum Garantisi"],
      ],
    },
  },
  {
    h2: "Kaliteli Bakım Parçasının Önemi",
    paragraphs: [],
  },
  {
    h3: "Standartlara Uygun Üretim",
    paragraphs: [
      "Bakımda kullanılan parçanın kalitesi aracınızın performansını ve güvenliğini doğrudan belirler. Fabrika standartlarına uygun üretilmiş bileşenler motorun verimini korur ve uzun ömürlü kullanım sunar. Kalite belgeleri ve mevzuat hakkında bilgi almak için yasal Türk Standardları Enstitüsü kaynaklarına göz atabilirsiniz.",
    ],
  },
  {
    h3: "İade Derdi Olmadan Doğru Alışveriş",
    paragraphs: [
      "Bakım Robotu yalnızca aracınıza uyumlu parçaları listelediği için yanlış ürün alıp iade etme derdini ortadan kaldırır. Gelen parçalar doğrudan aracınıza uyduğu için ustanız bakımı zaman kaybetmeden tamamlar. Bu kusursuz düzen hem paranızı hem zamanınızı korur ve stressiz bir bakım deneyimi sunar.",
    ],
    table: {
      headers: ["Parça Kalitesi", "Performans Etkisi", "Uzun Vadeli Maliyet"],
      rows: [
        [
          "Standartlara Uygun Parça",
          "İlk Günkü Performans",
          "Ciddi Tasarruf Sağlar",
        ],
        [
          "Uyumsuz Parça Kullanımı",
          "İade ile uğraşma, zaman kaybı",
          "Yeni Arızalar Doğurur",
        ],
        [
          "Bakımın Ertelenmesi",
          "Zincirleme Aşınma",
          "Yüksek Revizyon Gideri",
        ],
      ],
    },
  },
  {
    h2: "Akıllı Bakım ile Aracınız Her Zaman Yolda",
    paragraphs: [
      "Periyodik bakım yorucu bir görev gibi görünse de Bakım Robotu bu süreci sade ve keyifli hale getirir. Aracınızı seçin, ihtiyacınıza uygun bakım paketini belirleyin ve her adımda aracınıza yüzde yüz uyumlu parçaları tek seferde sepetinize ekleyin. İster şasi numaranızla ister marka-model seçerek başlayın; sonuç her zaman doğru parça ve gönül rahatlığıdır. Aracınızın sağlığını güvence altına almak için Bakım Robotu ile bakım listenizi hemen oluşturun.",
    ],
  },
];

// ---------------------------------------------------------------------------
// Maintenance packages
// ---------------------------------------------------------------------------

export interface PartProduct {
  id: string;
  name: string;
  brand: string;
  price: string;
  sku: string;
  inStock: boolean;
}

export interface PartCategory {
  id: string;
  name: string;
  optional: boolean;
  products: PartProduct[];
}

export interface MaintenancePackage {
  id: string;
  title: string;
  description: string;
  groupCount: number;
  icon: LucideIcon;
  categories: PartCategory[];
}

export const MAINTENANCE_PACKAGES: MaintenancePackage[] = [
  {
    id: "periyodik-bakim-bilesenleri",
    title: "Periyodik Bakım Bileşenleri",
    description:
      "Aracınızın ilk günkü performansını koruması ve motor ömrünün uzaması için ihtiyaç duyduğunuz tüm filtre ve yağ gruplarına tek tıkla ulaşın.",
    groupCount: 5,
    icon: Wrench,
    categories: [
      {
        id: "hava-filtresi",
        name: "Hava Filtresi",
        optional: true,
        products: [
          {
            id: "bosch-hava-filtresi-f026400114",
            name: "Bosch Hava Filtresi F026400114",
            brand: "BOSCH",
            price: "608,94",
            sku: "BR1000ST066536VH00000",
            inStock: true,
          },
          {
            id: "sonparca-hava-filtresi-wa21050",
            name: "Sonparça Hava Filtresi WA21050",
            brand: "SONPARÇA",
            price: "438,62",
            sku: "BR1000ST099451VH00000",
            inStock: true,
          },
        ],
      },
      {
        id: "yag-filtresi",
        name: "Yağ Filtresi",
        optional: true,
        products: [
          {
            id: "bosch-yag-filtresi-f026407092",
            name: "Bosch Yağ Filtresi F026407092-F026407397",
            brand: "BOSCH",
            price: "308,04",
            sku: "BR1000ST043612VH00000",
            inStock: true,
          },
        ],
      },
      {
        id: "polen-filtresi",
        name: "Polen Filtresi",
        optional: true,
        products: [
          {
            id: "bosch-polen-filtresi-09864b5006",
            name: "Bosch Polen Filtresi 09864B5006",
            brand: "BOSCH",
            price: "176,57",
            sku: "BR1000ST087424VH00000",
            inStock: true,
          },
          {
            id: "sonparca-polen-filtresi-wpyzz08",
            name: "Sonparça Polen Filtresi WPYZZ08",
            brand: "SONPARÇA",
            price: "99,50",
            sku: "BR1000ST085918VH00000",
            inStock: true,
          },
          {
            id: "orjinal-polen-filitre-kapagi-8854842020",
            name: "Orjinal Polen Filitre Kapağı 8854842020",
            brand: "ORJINAL",
            price: "542,88",
            sku: "BR1000ST128238VH00000",
            inStock: true,
          },
        ],
      },
      {
        id: "yakit-filtresi",
        name: "Yakıt Filtresi",
        optional: true,
        products: [],
      },
      {
        id: "yag",
        name: "Yağ",
        optional: true,
        products: [],
      },
    ],
  },
  {
    id: "aydinlatma-gorus-ve-bakim",
    title: "Aydınlatma, Görüş ve Bakım",
    description:
      "Gece sürüşlerinde ve zorlu hava koşullarında yolunuzu mükemmel aydınlatacak parçalarla görüşünüzü daima net tutun.",
    groupCount: 5,
    icon: Lightbulb,
    categories: [
      {
        id: "on-far-ampulu",
        name: "Ön Far Ampulü",
        optional: true,
        products: [
          {
            id: "osram-on-far-ampulu-h7",
            name: "Osram H7 Ön Far Ampulü",
            brand: "OSRAM",
            price: "412,30",
            sku: "BR2000ST011234VH00000",
            inStock: true,
          },
        ],
      },
      {
        id: "silecek-takimi",
        name: "Silecek Takımı",
        optional: true,
        products: [
          {
            id: "bosch-silecek-takimi",
            name: "Bosch Aerotwin Ön Silecek Takımı",
            brand: "BOSCH",
            price: "689,00",
            sku: "BR2000ST022341VH00000",
            inStock: true,
          },
        ],
      },
      { id: "sinyal-ampulu", name: "Sinyal Ampulü", optional: true, products: [] },
      { id: "fiskiye-memesi", name: "Fıskiye Memesi", optional: true, products: [] },
      { id: "far-cami", name: "Far Camı", optional: true, products: [] },
    ],
  },
  {
    id: "fren-sistemi",
    title: "Fren Sistemi",
    description:
      "Güvenli bir sürüş ve kusursuz duruş performansı için aracınıza en uygun fren diski ve balata setlerini hemen keşfedin.",
    groupCount: 6,
    icon: Disc,
    categories: [
      {
        id: "on-fren-balatasi",
        name: "Ön Fren Balatası",
        optional: true,
        products: [
          {
            id: "bosch-on-fren-balatasi",
            name: "Bosch Ön Fren Balata Seti",
            brand: "BOSCH",
            price: "1.240,00",
            sku: "BR3000ST011122VH00000",
            inStock: true,
          },
        ],
      },
      {
        id: "arka-fren-balatasi",
        name: "Arka Fren Balatası",
        optional: true,
        products: [],
      },
      { id: "on-fren-diski", name: "Ön Fren Diski", optional: true, products: [] },
      { id: "arka-fren-diski", name: "Arka Fren Diski", optional: true, products: [] },
      { id: "fren-hidroligi", name: "Fren Hidroliği", optional: true, products: [] },
      { id: "el-freni-teli", name: "El Freni Teli", optional: true, products: [] },
    ],
  },
  {
    id: "sogutma-sistemi",
    title: "Soğutma Sistemi",
    description:
      "Motorunuzun her mevsim ideal sıcaklıkta çalışmasını ve aşırı ısınmaya karşı korunmasını sağlayan soğutma sistemi parçalarını edinin.",
    groupCount: 7,
    icon: Thermometer,
    categories: [
      {
        id: "radyator",
        name: "Radyatör",
        optional: true,
        products: [
          {
            id: "sonparca-radyator",
            name: "Sonparça Motor Radyatörü",
            brand: "SONPARÇA",
            price: "2.150,00",
            sku: "BR4000ST011231VH00000",
            inStock: true,
          },
        ],
      },
      { id: "antifriz", name: "Antifriz", optional: true, products: [] },
      { id: "termostat", name: "Termostat", optional: true, products: [] },
      { id: "su-pompasi", name: "Su Pompası", optional: true, products: [] },
      { id: "radyator-hortumu", name: "Radyatör Hortumu", optional: true, products: [] },
      { id: "fan-motoru", name: "Fan Motoru", optional: true, products: [] },
      { id: "genlesme-tanki", name: "Genleşme Tankı", optional: true, products: [] },
    ],
  },
  {
    id: "triger-zincir-tahrik-kayis",
    title: "Triger/Zincir ve Tahrik Kayış Sistemleri",
    description:
      "Motorunuzun kalbini koruyan ve olası ağır hasarların önüne geçen triger ile V kayışı setlerini eksiksiz bir şekilde tamamlayın.",
    groupCount: 5,
    icon: Cog,
    categories: [
      {
        id: "triger-seti",
        name: "Triger Seti",
        optional: true,
        products: [
          {
            id: "gates-triger-seti",
            name: "Gates Triger Kayış Seti",
            brand: "GATES",
            price: "1.860,00",
            sku: "BR5000ST011432VH00000",
            inStock: true,
          },
        ],
      },
      { id: "v-kayisi", name: "V Kayışı", optional: true, products: [] },
      { id: "gergi-rulmani", name: "Gergi Rulmanı", optional: true, products: [] },
      { id: "su-pompasi-2", name: "Su Pompası", optional: true, products: [] },
      { id: "krank-keceleri", name: "Krank Keçeleri", optional: true, products: [] },
    ],
  },
  {
    id: "suspansiyon-yuruyen-aksam",
    title: "Süspansiyon ve Yürüyen Aksam",
    description:
      "Yoldaki tüm pürüzleri unutturacak ve sürüş konforunuzu yeniden zirveye taşıyacak alt takım parçalarını kolayca seçin.",
    groupCount: 6,
    icon: Settings2,
    categories: [
      {
        id: "amortisor",
        name: "Amortisör",
        optional: true,
        products: [
          {
            id: "sachs-amortisor",
            name: "Sachs Ön Amortisör",
            brand: "SACHS",
            price: "1.980,00",
            sku: "BR6000ST011533VH00000",
            inStock: true,
          },
        ],
      },
      { id: "salincak", name: "Salıncak", optional: true, products: [] },
      { id: "rotil", name: "Rotil", optional: true, products: [] },
      { id: "stabilizator", name: "Stabilizatör Çubuğu", optional: true, products: [] },
      { id: "amortisor-takozu", name: "Amortisör Takozu", optional: true, products: [] },
      { id: "aks-kemikleri", name: "Aks Kemikleri", optional: true, products: [] },
    ],
  },
  {
    id: "atesleme-sistemi",
    title: "Ateşleme Sistemi",
    description:
      "Yakıt tasarrufu sağlamak ve motorunuzun çekiş gücünü maksimuma çıkarmak için gereken birinci sınıf ateşleme ürünlerini inceleyin.",
    groupCount: 3,
    icon: Zap,
    categories: [
      {
        id: "buji",
        name: "Buji",
        optional: true,
        products: [
          {
            id: "denso-buji",
            name: "Denso İridyum Buji",
            brand: "DENSO",
            price: "882,71",
            sku: "BR7000ST011634VH00000",
            inStock: true,
          },
        ],
      },
      { id: "ates-bobini", name: "Ateş Bobini", optional: true, products: [] },
      { id: "buji-kablosu", name: "Buji Kablosu", optional: true, products: [] },
    ],
  },
  {
    id: "debriyaj-sistemi",
    title: "Debriyaj Sistemi",
    description:
      "Vites geçişlerinizi pürüzsüzleştirecek ve aracınızın gücünü yola kayıpsız aktaracak debriyaj setleriyle sürüş keyfinizi yenileyin.",
    groupCount: 6,
    icon: Cog,
    categories: [
      {
        id: "debriyaj-seti",
        name: "Debriyaj Seti",
        optional: true,
        products: [
          {
            id: "valeo-debriyaj-seti",
            name: "Valeo Debriyaj Baskı Balata Seti",
            brand: "VALEO",
            price: "3.420,00",
            sku: "BR8000ST011735VH00000",
            inStock: true,
          },
        ],
      },
      { id: "debriyaj-rulmani", name: "Debriyaj Rulmanı", optional: true, products: [] },
      { id: "volan", name: "Volan", optional: true, products: [] },
      { id: "debriyaj-hidroligi", name: "Debriyaj Hidroliği", optional: true, products: [] },
      { id: "debriyaj-teli", name: "Debriyaj Teli", optional: true, products: [] },
      { id: "vites-kolu-burcu", name: "Vites Kolu Burcu", optional: true, products: [] },
    ],
  },
];

export interface CartSelection {
  productId: string;
  qty: number;
}

/** productId -> selection, scoped per package via a Record<packageId, Record<productId, CartSelection>> at the page level. */
export type PackageSelections = Record<string, CartSelection>;
