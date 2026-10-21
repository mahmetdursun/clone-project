# ProductListingCard Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/ProductListingCard.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/on-tampon-9ed11181/desktop-01-header-toolbar-grid-row1.jpg`
- **Interaction model:** static content; quantity stepper + add-to-cart are presentational interactive controls (no cart backend, matches homepage `ProductCard` convention)

## DOM Structure

This card renders **two parallel layouts in the same markup**, toggled purely by Tailwind
breakpoint classes (`flex sm:hidden` vs `hidden sm:block`) — NOT by JS/state. This is different
from the homepage's carousel `ProductCard` (which is single-layout, fixed width). Implement as
one component with both blocks present; Tailwind handles which one paints.

```
<article class="bg-white border border-gray-200 border-l-4 border-l-success sm:border-l-0 sm:border-t-4 sm:border-t-success overflow-hidden rounded">
  <!-- MOBILE ROW LAYOUT (< sm) -->
  <div class="flex sm:hidden p-2.5 gap-2.5">
    <a class="block flex-shrink-0 relative">
      <div class="w-24 h-24 bg-gray-50 rounded overflow-hidden">
        <img class="w-full h-full object-contain" />
      </div>
    </a>
    <div class="flex-1 min-w-0 flex flex-col">
      <a class="block mb-1.5"><h3 class="text-sm font-medium text-light-text-primary leading-tight line-clamp-2 hover:text-accent transition-colors whitespace-break-spaces">{name}</h3></a>
      <div class="flex items-center justify-between gap-2 mb-1">
        <span class="text-sm font-bold text-accent">{price} TL</span>
        <button class="h-8 w-8 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white rounded-md shadow-sm transition-all duration-200 flex items-center justify-center"><CartIcon /></button>
      </div>
    </div>
  </div>

  <!-- DESKTOP CARD LAYOUT (>= sm) -->
  <div class="hidden sm:block p-2.5 lg:p-3">
    <div class="aspect-square mb-2 relative bg-white rounded overflow-hidden">
      <a class="block h-full"><img class="w-full h-full object-contain" /></a>
    </div>
    <div class="flex flex-col gap-1.5">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-semibold text-light-text-muted uppercase truncate bg-gray-100 px-1.5 py-0.5 rounded">{badge}</span>
        <span class="text-info font-medium flex items-center gap-0.5 text-xs"><CheckIcon /> {shipEstimate}</span>
      </div>
      <div class="flex items-baseline gap-1.5"><span class="text-base lg:text-lg font-bold text-accent">{price} TL</span></div>
      <a class="block"><h3 class="font-medium text-light-text-primary text-xs lg:text-sm leading-snug line-clamp-2 hover:text-accent transition-colors whitespace-break-spaces">{name}</h3></a>
      <div class="text-[9px] lg:text-[10px] text-light-text-muted/60 truncate">{sku}</div>
      <div class="w-full mt-1">
        <div class="flex items-center bg-white rounded-md justify-end">
          <!-- quantity control -->
          <div class="flex items-center bg-white border-b border-gray-200 border-l border-t rounded-l-md">
            <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"><MinusIcon/></button>
            <span class="w-8 text-center text-sm font-medium text-gray-700">{qty}</span>
            <button class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"><PlusIcon/></button>
          </div>
          <button class="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-r-md text-sm hover:bg-gray-700 disabled:opacity-60 transition-all duration-200"><CartIcon/></button>
        </div>
      </div>
    </div>
  </div>
</article>
```

## Computed Styles (exact values from getComputedStyle, desktop card, 1440px viewport)

- Card: `borderRadius: 4px`, `borderTop: 4px solid rgb(34,197,94)` (`border-t-4 border-t-success`, success = tailwind green-500 `#22c55e`), `backgroundColor: rgb(255,255,255)`, width ~282.5px in a 4-col grid at this viewport, `fontFamily: Inter, ...` (matches project's Inter font already configured)
- Badge span: `fontSize: ~10px, fontWeight: 600, color: text-light-text-muted (rgb(91,91,91)-ish muted gray), textTransform: uppercase, backgroundColor: rgb(243,244,246) (gray-100), padding: 2px 6px, borderRadius: 4px`
- Shipping span ("1-3 Gün"): `color: rgb(59,130,246)` (`text-info` = blue-500), `fontSize: 12px, fontWeight: 500`
- Price: `fontSize: 16-18px (text-base lg:text-lg), fontWeight: 700, color: rgb(255,114,34)` (`text-sp-accent`)
- Name (h3): `fontSize: 12-14px (text-xs lg:text-sm), fontWeight: 500, color: rgb(25,40,49), line-clamp: 2`
- SKU: `fontSize: 9-10px, color: text-light-text-muted at 60% opacity, truncate`
- Quantity stepper buttons: `width/height: 32px (w-8 h-8), color: rgb(156,163,175) (gray-400), hover: rgb(75,85,99) (gray-600)`
- Quantity display: `width: 32px, fontSize: 14px, fontWeight: 500, color: rgb(55,65,81) (gray-700)`
- Cart button (desktop, attached to stepper): `backgroundColor: rgb(31,41,55) (gray-800), color: white, padding: 8px 16px, borderRadius: 0 6px 6px 0 (rounded-r-md), hover: rgb(55,65,81) (gray-700)`
- Cart button (mobile, standalone icon button): `width/height: 32px (h-8 w-8), backgroundColor: gray-800, borderRadius: 6px (rounded-md), hover: gray-700, active: gray-900`

## States & Behaviors

### Stock-status accent border
- Green (`success`, `#22c55e`) border appears on **every** card sampled (20/20) in this category —
  implemented as a fixed green accent for all cards since no out-of-stock example was observed in
  this dataset; expose it as a `status: "success"` prop (default) for future extensibility rather
  than hard-coding, but only implement the green/success visual for this clone.
- Side: `border-l-4` on mobile (`<sm`), `border-t-4` on desktop (`sm:`).

### Hover
- Name `h3`: `hover:text-accent` (orange) with `transition-colors`.
- Quantity stepper buttons: icon color lightens `hover:text-gray-600`.
- Cart button: background lightens `hover:bg-gray-700` (desktop), `active:bg-gray-900` (mobile variant only observed `active` state in mobile markup — apply consistently to both for polish).

### Quantity stepper
- **Trigger:** click `+`/`-`
- Local component state (`useState<number>(1)`), min 1, no visible max in source. Presentational only — updates the displayed qty, no cart persistence (matches homepage `ProductCard`/`data.ts` convention of no real cart backend).

## Per-Component Content (real sample data — 20 real products captured from page 1 of https://www.sonparca.com/on-tampon)

| # | badge | name | sku | price | image |
|---|-------|------|-----|-------|-------|
| 1 | SonParça | Sonparça Ön Tampon Orta İzgara 3263080 | BR1000ST036855VH00000 | 1.713,53 TL | product-01.webp |
| 2 | ORJINAL | Orjinal Ön Tampon Orta İzgara 9813566480 | BR1000ST118370VH00000 | 32.992,99 TL | product-02.webp |
| 3 | EURO PUMB | Euro Pumb Ön Tampon Orta İzgara SKO07OC130 | BR1000ST120662VH00000 | 2.227,63 TL | product-03.webp |
| 4 | ORJINAL | Orjinal Ön Tampon Orta İzgara 86560J7000 | BR1000ST121052VH00000 | 8.602,90 TL | product-04.webp |
| 5 | SonParça | Sonparça Ön Tampon Orta İzgara LV4B17K945AA5UAW | BR1000ST121175VH00000 | 27.728,91 TL | product-05.webp |
| 6 | SonParça | Sonparça Ön Tampon Orta İzgara MIT07AX015 | BR1000ST121361VH00000 | 3.197,57 TL | product-06.webp |
| 7 | SonParça | Sonparça Ön Tampon Orta İzgara HUN07TU070 | BR1000ST121564VH00000 | 1.918,54 TL | product-07.webp |
| 8 | ORJINAL | Orjinal Ön Tampon Orta İzgara 86530H8AG0 | BR1000ST121667VH00000 | 23.140,74 TL | product-08.webp |
| 9 | ORJINAL | Orjinal Ön Tampon Orta İzgara SU001B2074 | BR1000ST121700VH00000 | 15.121,89 TL | product-09.webp |
| 10 | ORJINAL | Orjinal Ön Tampon Orta İzgara SU001B1929 | BR1000ST121702VH00000 | 22.917,96 TL | product-10.webp |
| 11 | SonParça | Sonparça Ön Tampon Orta İzgara HON07CI104 | BR1000ST122030VH00000 | 959,27 TL | product-11.webp |
| 12 | SonParça | Sonparça Ön Tampon Orta İzgara DAC07SA127 | BR1000ST122372VH00000 | 2.637,98 TL | product-12.webp |
| 13 | SonParça | Sonparça Ön Tampon Orta İzgara FOR07CO061 | BR1000ST122553VH00000 | 12.457,23 TL | product-13.webp |
| 14 | SonParça | Sonparça Ön Tampon Orta İzgara 210268 | BR1000ST123030VH00000 | 1.358,91 TL | product-14.webp |
| 15 | ORJINAL | Orjinal Ön Tampon Orta İzgara 865602WAA0 | BR1000ST123116VH00000 | 4.640,95 TL | product-15.webp |
| 16 | ORJINAL | Orjinal Ön Tampon Orta İzgara 622545490R | BR1000ST123182VH00000 | 5.136,51 TL | product-16.webp |
| 17 | ORJINAL | Orjinal Ön Tampon Orta İzgara 86531AA000 | BR1000ST123377VH00000 | 7.439,39 TL | product-17.webp |
| 18 | SonParça | Sonparça Ön Tampon Orta İzgara CIT07C4097 | BR1000ST123510VH00000 | 4.076,89 TL | product-18.webp |
| 19 | SonParça | Sonparça Ön Tampon Orta İzgara CIT07C4071 | BR1000ST123511VH00000 | 2.985,73 TL | product-19.webp |
| 20 | ORJINAL | Orjinal Ön Tampon Orta İzgara 622563079R | BR1000ST123689VH00000 | 13.275,48 TL | product-20.webp |

All 20 images downloaded to `public/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/images/product-01.webp` … `product-20.webp`. Shipping estimate for all: `1-3 Gün`.

## Assets
- `product-01.webp` … `product-20.webp` under `public/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/images/`
- Icons (lucide-react): `ShoppingCart` (cart button), `Minus`/`Plus` (stepper), `Check` (shipping check — small inline checkmark before "1-3 Gün", use lucide `Check` at `size-3`).

## Responsive Behavior
- **Desktop (≥1024px, `lg`):** vertical card layout, `aspect-square` image, `p-3` padding, `text-sm`/`text-lg` type scale.
- **Small desktop/tablet (640-1023px, `sm`):** same vertical card layout as desktop but `p-2.5` padding and smaller `text-xs`/`text-base` type scale (the `lg:` variants step up from this base).
- **Mobile (<640px):** row layout — 96×96px thumbnail + name/price/cart-icon only (no badge, no SKU, no shipping estimate, no quantity stepper shown — condensed for space).
- **Breakpoint:** `sm` (640px) is the hard layout switch (`flex sm:hidden` / `hidden sm:block`); `lg` (1024px) is a secondary type/spacing scale-up within the desktop layout.
