# ProductDescription Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/ProductDescription.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/desktop-1440-02-description-specs.jpg`
- **Interaction model:** static

## DOM Structure
```
section (white card: bg-white border border-gray-200 rounded-lg p-6)
  h2 "Ürün Açıklaması" (orange-left-bar heading, same treatment as AlternativeBrandsSection)
  p (body copy)
  h3 "Teknik Özellikler"
  table.tech-specs (bordered key/value rows)
  div.price-delivery (borderless key/value rows: Fiyat, Kargo, Kargolama)
  h3 "Muadil ve Alternatif Parça Kodları"
  p (intro line)
  ul (bulleted Brand — Code list)
```

## Computed Styles
### Container
- `bg-white border border-gray-200 rounded-lg p-6 space-y-6`.

### Headings
- H2: `text-lg font-bold text-gray-900 pl-3 border-l-4 border-sp-accent` (identical treatment to `AlternativeBrandsSection` heading).
- H3: `text-base font-semibold text-gray-900 mt-2`.

### Body copy
- `text-sm text-gray-600 leading-relaxed`.

### Tech specs table
- `w-full border border-gray-200 rounded-md overflow-hidden text-sm` with `divide-y divide-gray-200` rows.
- Row: `flex` (or `grid grid-cols-2`) — left cell `bg-gray-50 text-gray-500 font-medium px-4 py-2.5 w-1/3`, right cell `px-4 py-2.5 text-gray-900 font-medium`.
- "Stok" value cell specifically: `text-emerald-600 font-semibold` (value "Mevcut").

### Price/delivery summary
- `flex items-center justify-between text-sm py-1` per row; label `text-gray-500`, value `font-semibold text-gray-900` (Kargolama value uses same weight, not accent-colored — this is a plain summary, distinct from the accent-colored hero price).

### Muadil list
- `list-disc list-inside text-sm text-gray-700 space-y-1`.
- Each item: `<strong>{brand}</strong> — {code}`.

## States & Behaviors
- N/A — fully static informational content, no hover/click affordances beyond default text selection.

## Text Content (verbatim)
```
Ürün Açıklaması
Bosch Yağ Filtresi 09864B7063, yağ filtresi kategorisindeki yedek parça ürünüdür. 46544820 OEM koduna sahip bu ürün, orijinal parça standartlarında üretilmiştir. Araç uyumluluğunu kontrol etmek için VIN (şase) numaranız ile sorgulama yapabilirsiniz.

Teknik Özellikler
Ürün Kodu: 09864B7063
OEM Kodu: 46544820
Marka: BOSCH
Kategori: Yağ Filtresi
Paketleme: Adet
Stok: Mevcut

Fiyat: 208,64 TL
Kargo: 196.89 TL
Kargolama: Aynı gün

Muadil ve Alternatif Parça Kodları
Bu ürünün farklı markalardan muadil alternatifleri mevcuttur:
- Blueprint — ADM52107
- Mando — MOF4612
- Orjinal — HYU2630002752
- Sonparça — VW02750
```

## Assets
None.

## Responsive Behavior
- **Desktop (1440px):** table key column fixed at `w-1/3`; price/delivery rows inline.
- **Tablet (768px):** unchanged (table already narrow enough).
- **Mobile (390px):** table key column shrinks to `w-2/5` so value column keeps breathing room; card padding reduces `p-4`.
