# ContactMapSection Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-iletisim-b7101001/ContactMapSection.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-iletisim-b7101001/desktop-map-hours.jpg`
- **Interaction model:** static (source uses a live Google Maps iframe; per assignment scope we reproduce a static styled placeholder with the real address instead of embedding a live third-party map)

## DOM Structure
```
section.w-full.py-10
  div.container.mx-auto.px-4
    h2.text-2xl.font-semibold.text-gray-800.mb-6.text-center "Bize Ulaşın"
    div.w-full.h-96.rounded-md.overflow-hidden.shadow-sm.border.border-gray-100
      [live Google Maps iframe in source — replaced with static placeholder]
```

## Computed Styles (exact Tailwind classes from live DOM)
- section: `w-full py-10`
- container: `container mx-auto px-4`
- heading: `text-2xl font-semibold text-gray-800 mb-6 text-center`
- map frame wrapper: `w-full h-96 rounded-md overflow-hidden shadow-sm border border-gray-100`

## Placeholder design (our substitution for the live iframe)
Build a static block matching the wrapper's exact dimensions/styling (`w-full h-96 rounded-md overflow-hidden shadow-sm border border-gray-100`) containing:
- A light gray/blue map-toned background (e.g. `bg-gray-100` with a subtle grid pattern, or simply `bg-gradient-to-br from-blue-50 to-gray-100`) — do not fabricate a fake interactive map UI.
- A centered `MapPin` (lucide-react) pin icon in `text-blue-600`.
- The real business name "SonParça" and real address text below/near the pin: "Firuzköy, Bulvarı Avcılar Belediye Sanayi Sitesi C Blok No:12/15, 34325 Avcılar/İstanbul" (this is the more precise address shown on the actual Google Maps pin card, distinct from — but consistent with — the shorter address in the info cards section).
- A small "Haritada Görüntüle" (View on map) link/button styled as a secondary action pointing to the real Google Maps place (`https://www.google.com/maps/search/?api=1&query=SonParça+Avcılar+İstanbul`) opened in a new tab — this keeps real, working functionality without embedding the live iframe.

## States & Behaviors
- No hover/click behavior on the map placeholder graphic itself.
- The "Haritada Görüntüle" link: standard link hover (e.g. `hover:underline`), consistent with other secondary links on the page.

## Text Content (verbatim)
- Heading: "Bize Ulaşın"
- Map pin business name (from live Google Maps card): "SonParça"
- Map pin address (from live Google Maps card): "Firuzköy, Bulvarı Avcılar Belediye Sanayi Sitesi C Blok No:12/15, 34325 Avcılar/İstanbul"
- Rating shown on live map card: "4,5 ★ (21)" — optional decorative detail, not required.

## Assets
None downloaded (no static map image was captured — a live iframe is out of scope per assignment; the placeholder is built with CSS/gradient + lucide icon, not a generated image, so no Atlas Cloud fallback is needed).

## Responsive Behavior
- **All breakpoints:** `w-full h-96` — fixed 384px height, full container width at every size (no responsive height variants observed in source).
