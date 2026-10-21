# FAQSection Specification (static, expanded Q&A)

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/FAQSection.tsx`
- **Screenshot:** bottom of `desktop-1440-02-description-specs.jpg` / top of `desktop-1440-03-faq-accordion.jpg`
- **Interaction model:** static (always expanded — SEO/AI-answer block, distinct from the accordion below it)

## DOM Structure
```
section (bg-white border rounded-lg p-6)
  h2 "Sıkça Sorulan Sorular" (orange-left-bar heading)
  div.qa-list (space-y-4)
    div.qa-item x5
      div.avatar "S" (circular, accent bg)
      div
        p.question (bold)
        p.answer (muted)
  ul.policy-bullets (space-y-1, text-sm text-gray-600, • bullets)
```

## Computed Styles
- Heading: identical treatment to `ProductDescription` H2.
- Avatar: `flex items-center justify-center size-7 rounded-full bg-sp-accent text-white text-xs font-bold shrink-0` containing literal "S".
- Question: `font-semibold text-gray-900 text-sm`.
- Answer: `text-sm text-gray-600 mt-1`.
- QA item row: `flex items-start gap-3`.
- Policy bullets: rendered as a `ul.list-disc list-inside` (source uses "•" glyphs — rendered as native disc bullets for clean typography), `text-sm text-gray-600 space-y-1 pt-2 border-t border-gray-100 mt-4`.

## States & Behaviors
N/A — static content block, no interactivity.

## Text Content (verbatim)
```
Sıkça Sorulan Sorular

S — Bosch Yağ Filtresi 09864B7063 hangi araçlara uyumludur?
Ürünün aracınıza uyumluluğunu kontrol etmek için araç seçimi yapabilir veya VIN (şase) numaranız ile sorgulama gerçekleştirebilirsiniz.

S — Bosch Yağ Filtresi 09864B7063 OEM kodu nedir?
Bu ürünün OEM referans kodu 46544820 olup orijinal parça standardına uygun olarak üretilmiştir.

S — Bosch Yağ Filtresi 09864B7063 ne zaman kargoya verilir?
Stokta mevcut olan bu ürün aynı gün kargoya verilir. Kargo süresi bulunduğunuz lokasyona göre değişiklik gösterebilir.

S — Bosch Yağ Filtresi 09864B7063 fiyatı ne kadar?
Bosch Bosch Yağ Filtresi 09864B7063 ürününün güncel fiyatı 208,64 TL olup, kargo ücreti 196.89 TL'dir.

S — Bosch Yağ Filtresi 09864B7063 için alternatif marka var mı?
Bu ürünün BLUEPRINT, MANDO, ORJINAL, SonParça markalarında muadil alternatifleri mevcuttur. Alternatif markaları ürün sayfasında karşılaştırabilirsiniz.

Bullets:
- Teknik destek için müşteri hizmetlerimizle iletişime geçebilirsiniz.
- Saat 15:00'a kadar verilen siparişlerde aynı gün kargoya verilir.
- Tedarik edilemeyen veya uyumsuz ürünlerde tarafınıza bilgi verilir, değişim veya iade seçeneklerini tarafınıza sunuyoruz.
- Ürün uyumluğu konusunda emin değilseniz, satın almadan önce müşteri hizmetlerimizden destek alabilirsiniz.
```
(Note the source text has a literal duplicated "Bosch" in the price question's answer sentence — reproduced verbatim as it appears live.)

## Assets
None.

## Responsive Behavior
- **All breakpoints:** single column, no layout change; avatar+text row stays `flex items-start` at every width (text wraps naturally).
