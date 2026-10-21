# ProductCard + ProductCarousel Specification

## Overview
- **Target files:**
  - `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/ProductCard.tsx`
  - `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/ProductCarousel.tsx` (reusable — instantiated twice on the page: "Çok Satanlar" and "Yeni Gelenler")
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/root-8a5edab2/desktop-02-quicklinks-bestsellers.jpg` and `desktop-03-newarrivals-categories.jpg`
- **Interaction model:** click-driven horizontal scroll with hover-revealed arrows

## DOM Structure
```
<section>
  <div class="bg-dark-bg rounded-t-lg px-4 py-3 flex items-center gap-2">
    icon (sparkles/trending) + <div><p class="font-semibold text-dark-text-primary">{title}</p><p class="text-xs text-dark-text-muted">{subtitle}</p></div>
  <div class="relative bg-white rounded-b-lg border border-t-0 border-gray-200 p-4">
    <button class="carousel-arrow left-2"> chevron-left (appears on container hover)
    <div class="flex gap-4 overflow-x-auto scroll-smooth snap-x"> (scrollable track)
      N × ProductCard
    <button class="carousel-arrow right-2"> chevron-right
```

### ProductCard
```
<div class="group shrink-0 w-[190px] snap-start bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
  <div class="relative aspect-square bg-gray-50">
    <img class="absolute inset-0 w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300">
  <div class="p-3">
    {brandLabel && <p class="text-[10px] font-bold uppercase text-gray-400 tracking-wide">{brandLabel}</p>}
    <p class="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5em]">{name}</p>
    <div class="mt-2 flex items-center justify-between">
      <span class="font-bold text-gray-900">{price} TL</span>
      <button class="w-8 h-8 rounded-md bg-dark-bg text-white flex items-center justify-center hover:bg-sp-accent transition-colors"> cart icon
```

## Computed Styles
- Card width: fixed `190px` (`shrink-0`), image area `aspect-square`, `bg-gray-50`.
- Image: `object-fit: contain`, `padding: 8px`, `mix-blend-mode: multiply` (removes white product-shot background so it blends with the card bg), hover → `scale(1.05)` over `300ms`.
- Section header bar: `background:#192831`, `rounded-t-lg`, title `text-dark-text-primary font-semibold`, subtitle `text-dark-text-muted text-xs`.
- Card border/shadow: `border border-gray-200 rounded-lg`, hover → `shadow-md` token (`0 4px 6px -1px rgb(0 0 0/.08), 0 2px 4px -2px rgb(0 0 0/.08)`), `transition-shadow`.
- Price: `font-bold`, `text-gray-900`, ~16px.
- Cart button: 32×32px, `bg-dark-bg` (#192831), white icon, `rounded-md`, hover → `bg-sp-accent` (#ff7222).
- Brand badge (Yeni Gelenler cards only, e.g. "BSG"/"DENSO"): `text-[10px] font-bold uppercase text-gray-400`; note one sample ("Denso İridyum Buji") renders the product name itself in orange/accent color — treat as an optional `accent` prop on the title for featured items.

## States & Behaviors
- **INTERACTION MODEL: click-driven horizontal scroll**, arrows appear on carousel-container hover (`opacity-0 group-hover:opacity-100 transition-opacity`) and scroll the track by one card-width + gap on click (`scrollBy({left: ±(190+16), behavior:'smooth'})`).
- Card hover: image scales 1.05 (300ms), card shadow → `shadow-md`.
- Cart button hover: background swaps dark→accent orange.
- Track uses native scroll-snap (`snap-x` on container, `snap-start` on cards) so it also supports touch/trackpad swipe.

## Assets (representative real product photos downloaded)
Use these paths cycling across both carousel instances (mock/representative — do not need exact 1:1 card-for-card match with live inventory, per skill's "mock data for demo purposes" allowance, but images/names/prices below are real extracted content):
`/sites/sonparca-com-32cbe5a4/root-8a5edab2/images/product-01.webp` through `product-17-buji.webp`

## Text Content — "Çok Satanlar" (verbatim sample, real data)
| Image | Name | Price |
|---|---|---|
| product-02 | MGA Genel Amaçlı Fren ve Balata Temizleme Spreyi | 128,42 TL |
| product-03 | Passat, Caddy, A3, Corolla İç Yakıt Depo Kapağı (OEM: 1J0201550AN) | 380,50 TL |
| product-04 | Mitsubishi Lancer ve ASX Motor Yağ Seviye Çubuğu (MD373734) | 388,25 TL |
| product-01 | Bosch Yağ Filtresi 09864B7063 | 208,64 TL |
| product-05 | Bosch PY21W Sinyal Ampulü (12V 21W) - OEM 6216A4 | 30,31 TL |
| product-06 | Polo, T5, Passat, Golf 4, Bora Ön Silecek Fiskiye Memesi 6E0955985A | 111,60 TL |
| product-10-battery | Varta 55 Ah Akü D59DAR | 4.908,25 TL |
| product-07 | Sonparça Depo Şamandırası MNDMMP020004 | 3.307,50 TL |
| product-08 | Sonparça Ön Panjur ROOT151285 | 1.123,78 TL |
| product-09 | Sonparça Sol Motor Takozu 022210A024116 | 2.270,89 TL |
| product-11-salincak-1 | Bsg Alt Sol Salıncak 40315060 | 1.119,97 TL |
| product-12-salincak-2 | Ayd Sağ Alt Salıncak AYD22028 | 1.580,76 TL |

Section title: "Çok Satanlar" / subtitle "En popüler ürünlerimiz". Icon: flame/trending.

## Text Content — "Yeni Gelenler" (verbatim sample, real data, with brand badges)
| Image | Brand | Name | Price |
|---|---|---|---|
| product-12-salincak-2 | AYD | Ayd Sağ Alt Salıncak AYD22028 | 1.580,76 TL |
| product-13-sis-bakalit | ORJINAL | Orjinal Sis Bakalit Ön 1632655780 | 7.073,61 TL |
| product-14-silecek | BOSCH | Bosch Ön Cam Sileceği 3397014826 | 1.369,99 TL |
| product-15-salincak-3 | BSG | Bsg Sağ Alt Salıncak 75315047 | 1.216,40 TL |
| product-16-salincak-4 | BSG | Bsg Alt Sol Salıncak 75315048 | 1.216,40 TL |
| product-17-buji | DENSO | Denso İridyum Buji FC16HRQ8 (title rendered in accent orange) | 882,71 TL |

Section title: "✨ Yeni Gelenler" / subtitle "En yeni ürünleri inceleyin".

## Responsive Behavior
- **Desktop (1440px):** ~6-7 cards visible, horizontal scroll for the rest.
- **Mobile (390px):** ~1.5 cards visible (edge-peek pattern), same scroll-snap mechanics, arrow buttons hidden (rely on touch swipe) below `md`.
- **Breakpoint:** arrows `hidden md:flex`.
