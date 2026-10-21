# AlternativeBrandsSection Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/AlternativeBrandsSection.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/desktop-1440-01-hero-buybox.jpg` (bottom strip, "Aynı Parça · Diğer Markalar")
- **Interaction model:** static cards, click-through links

## DOM Structure
```
section
  div.heading-row (flex justify-between items-center)
    h2 (orange left-border accent) "Aynı Parça · Diğer Markalar"
    span.badge "3 alternatif stokta"
  p.helper "OEM 46544820 referansıyla uyumlu, alternatif markalar."
  div.grid (4 cols desktop / 2 tablet / 1-2 mobile)
    AlternativeBrandCard x4 (Blueprint, Bosch [current/highlighted], Mando [out of stock], Orjinal) + SonParça card on its own row-wrap
```

## Computed Styles
### Heading
- `text-lg font-bold text-gray-900 pl-3 border-l-4 border-sp-accent` (matches `CategoryGrid`'s icon+heading row visual weight, adapted to the orange-left-bar pattern seen in the screenshot for both this section and "Ürün Açıklaması").
- Badge: `bg-orange-50 text-sp-accent text-xs font-medium px-2.5 py-1 rounded-full`.
- Helper text: `text-sm text-gray-500 mt-1 mb-4`.

### Grid
- `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3`.

### Card (default)
- `border border-gray-200 rounded-lg p-3 bg-white` .
- Header row: brand name `text-sm font-semibold text-gray-900 uppercase` + stock dot/label right-aligned (`text-emerald-600` "• Stokta" or `text-gray-400` "• Stokta yok").
- Part code: `text-sm text-gray-500 mt-1`.
- Footer link: `text-sp-accent text-sm font-medium hover:underline` "İncele →", or `text-gray-300` em-dash `—` when it's the current product's own card.

### Card (current/highlighted — BOSCH)
- Adds `border-sp-accent ring-1 ring-sp-accent/30` to visually indicate "this is the product you're viewing".

### Card (out of stock — MANDO)
- Stock label `text-gray-400`, part code muted, no "İncele" link (shows `—` instead), card slightly desaturated (`opacity-80`) — no hover lift.

## States & Behaviors
### Card hover (in-stock, non-current cards)
- **Trigger:** `:hover`.
- **Before:** `border-gray-200`, no shadow.
- **After:** `hover:border-sp-accent/40 hover:shadow-sm`.
- **Transition:** `transition-all` (matches `CategoryGrid` card hover exactly).

## Text Content (verbatim)
- Heading: `Aynı Parça · Diğer Markalar`
- Badge: `3 alternatif stokta`
- Helper: `OEM 46544820 referansıyla uyumlu, alternatif markalar.`
- Cards:
  1. BLUEPRINT — Stokta — ADM52107 — İncele →
  2. BOSCH — Stokta — 09864B7063 — — (current product, no link)
  3. MANDO — Stokta yok — MOF4612 — (no link)
  4. ORJINAL — Stokta — HYU2630002752 — İncele →
  5. SonParça — Stokta — VW02750 — İncele →

## Assets
None (text-only cards; Lucide not required beyond a dot rendered via a `span` with `bg-*-500 rounded-full`).

## Responsive Behavior
- **Desktop (1440px):** 4 columns, 5th card (SonParça) wraps to a new row alone.
- **Tablet (768px):** 2 columns.
- **Mobile (390px):** 1 column, full-width cards.
