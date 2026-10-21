# ProductGallery Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/ProductGallery.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/desktop-1440-01-hero-buybox.jpg` (left column) and the cropped product photo itself.
- **Interaction model:** static layout + hover-scale on the image; zoom affordance is presentational only (no lightbox network dependency — out of scope per skill defaults).

## DOM Structure
```
div.card (white bg, border, rounded-lg, overflow-hidden)
  div.relative.aspect-square.group (image stage, bg-gray-50)
    Image (fill, object-contain)
    button.absolute (zoom affordance, top-right corner, opacity-0 group-hover:opacity-100)
  div.absolute.bottom (SKU badge pill, bottom-left over the image stage)
```
Only one image exists for this product (verified via live DOM: exactly one `<img alt="Bosch Yağ Filtresi 09864B7063">` on the page) — no thumbnail rail.

## Computed Styles (from live screenshot measurement + site conventions)
### Container
- `bg-white border border-gray-200 rounded-lg overflow-hidden` (same card treatment as `ProductCard.tsx`).
- Max width ~369px on desktop (matches left column width in the 2-col grid at 1440px), full width on mobile.

### Image stage
- `relative aspect-square bg-gray-50 overflow-hidden` (aspect-square exactly as `ProductCard.tsx`'s image container).
- Image: `object-contain transition-transform duration-300` + `group-hover:scale-105` on stage hover (`group` class on the stage div).
- Padding around image inside stage: `p-6` on desktop (image reads visually inset, larger than the 190px catalog thumbnails, `p-2` there — this hero image is much bigger so more inset breathing room is used), `p-4` on mobile.

### SKU badge
- Pill: `absolute left-3 bottom-3 bg-gray-100 text-gray-600 text-xs font-mono px-2 py-1 rounded`.
- Text: `SKU BR1000ST114088VH00000`.

### Zoom affordance button
- `absolute top-3 right-3 flex items-center justify-center size-8 rounded-full bg-white/90 text-gray-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-sp-accent`.
- Icon: Lucide `ZoomIn`, `size-4`.
- `aria-label="Yakınlaştır"`.

## States & Behaviors
### Hover on image stage
- **Trigger:** `:hover` on the stage container (CSS `group`).
- **Before:** image `scale-100`, zoom button `opacity-0`.
- **After:** image `scale-105`, zoom button `opacity-100`.
- **Transition:** `transition-transform duration-300` (image), `transition-opacity` default 150ms (button).

## Assets
- `public/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/images/bosch-yag-filtresi-09864b7063.png` — real product photo (cropped directly from the live rendered page; includes the site's own watermark background pattern as it appears live).

## Text Content (verbatim)
- Alt text: `Bosch Yağ Filtresi 09864B7063`
- SKU badge: `SKU BR1000ST114088VH00000`
- Zoom label: `Yakınlaştır`

## Responsive Behavior
- **Desktop (1440px):** left column of the 2-col hero grid, roughly square, ~369–500px wide.
- **Tablet (768px):** full width of the stacked single column, capped `max-w-md mx-auto` so it doesn't stretch too wide.
- **Mobile (390px):** full width, `aspect-square` maintained, padding reduces to `p-4`.
