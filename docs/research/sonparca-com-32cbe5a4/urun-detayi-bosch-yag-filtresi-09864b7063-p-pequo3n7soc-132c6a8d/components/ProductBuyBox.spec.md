# ProductBuyBox Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/ProductBuyBox.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/desktop-1440-01-hero-buybox.jpg` (right column)
- **Interaction model:** click-driven quantity stepper and add-to-cart (local state only, no backend)

## DOM Structure
```
div (right column, flex flex-col gap-3)
  div.badges (flex gap-2)
    span "Yağ Filtresi" (category pill)
    span "BOSCH" (brand pill)
    span "• Stokta" (stock pill)
  h1 "Bosch Yağ Filtresi 09864B7063"
  div.chips (flex flex-wrap gap-2)
    span "OEM 46544820"
    span "Ürün Kodu 09864B7063"
    span "SKU BR1000ST114088VH00000"
  div.price-card (border rounded-lg p-4, flex justify-between)
    div.price-left
      p "SATIŞ FİYATI" (label)
      p "208,64 TL" + "/ Adet" (big orange price)
    div.price-right (text-right)
      p "🚚 Kargo: 196.89 TL"
      p "✓ Stokta" (green)
  div.actions (flex items-center gap-3)
    button "Bilgi Alın" (WhatsApp-green outline, icon)
    div.stepper (border rounded-md, flex items-center) [−] [1] [+]
    button (cart icon, dark bg square)
```

## Computed Styles
### Badges row
- Category pill: `bg-orange-50 text-sp-accent text-xs font-medium px-2.5 py-1 rounded-full` (soft accent tint, matches `sp-accent` family already defined in `globals.css`).
- Brand pill: `bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full`.
- Stock pill: `flex items-center gap-1 text-emerald-600 text-xs font-medium` with a `size-1.5 rounded-full bg-emerald-500` dot before "Stokta".

### Title
- `text-2xl md:text-3xl font-bold text-gray-900` (matches page heading weight used for section titles elsewhere, scaled up for the H1).

### Code chips
- `bg-gray-50 border border-gray-200 text-gray-600 text-xs font-mono px-2.5 py-1 rounded`.
- Row: `flex flex-wrap gap-2`.

### Price card
- `border border-gray-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3`.
- "SATIŞ FİYATI" label: `text-xs font-semibold text-gray-500 tracking-wide`.
- Price: `text-3xl font-bold text-sp-accent` + `/ Adet` as `text-sm font-normal text-gray-400 ml-1`.
- Shipping line: `text-sm text-gray-600` with Lucide `Truck` `size-4 inline` + bold amount `font-semibold text-gray-900`.
- Stock line: `text-sm text-emerald-600 font-medium flex items-center gap-1 justify-end` with Lucide `Check` `size-4`.

### Actions row
- "Bilgi Alın" button: `flex items-center gap-2 border border-emerald-500 text-emerald-600 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-emerald-50 transition-colors`, Lucide/brand `MessageCircle` icon `size-4` (WhatsApp-style green).
- Stepper: `flex items-center border border-gray-200 rounded-md overflow-hidden`; − and + buttons `size-9 flex items-center justify-center text-gray-600 hover:bg-gray-50`; count `w-8 text-center text-sm font-medium`.
- Cart button: `size-10 flex items-center justify-center rounded-md bg-dark-bg text-white hover:bg-sp-accent transition-colors` (identical pattern to `ProductCard.tsx` cart button), Lucide `ShoppingCart` `size-4`.

## States & Behaviors
### Quantity stepper
- **Trigger:** click `-`/`+`.
- **Behavior:** local `useState<number>(1)`, clamped to minimum 1 (no stock-max cap known), `-` disabled (opacity-40, cursor-not-allowed) when value is 1.

### Add to cart button
- **Trigger:** click.
- **Behavior:** local-only (no real cart/backend). On click, briefly show pressed/hover state; no navigation.
- Hover: `bg-dark-bg` → `bg-sp-accent`, `transition-colors`.

### "Bilgi Alın" button
- Hover: background tints `emerald-50`, `transition-colors`.

## Text Content (verbatim)
- `Yağ Filtresi`, `BOSCH`, `Stokta`
- `Bosch Yağ Filtresi 09864B7063`
- `OEM 46544820`, `Ürün Kodu 09864B7063`, `SKU BR1000ST114088VH00000`
- `SATIŞ FİYATI`, `208,64 TL`, `/ Adet`
- `Kargo: 196.89 TL`
- `Stokta`
- `Bilgi Alın`

## Assets
None (Lucide icons: `Truck`, `Check`, `MessageCircle`, `ShoppingCart`, `Minus`, `Plus`).

## Responsive Behavior
- **Desktop (1440px):** price card is a single row (price left, shipping/stock right-aligned); actions row is a single row.
- **Tablet (768px):** same as desktop, widths compress with the column.
- **Mobile (390px):** price card wraps: price block stacks above shipping/stock block (`flex-col` at `<sm`, `sm:flex-row`); actions row wraps to two lines if needed (`flex-wrap`), "Bilgi Alın" full-width first, then stepper + cart button side by side underneath.
