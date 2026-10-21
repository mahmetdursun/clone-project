# FAQAccordion Specification (click-to-expand)

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/FAQAccordion.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/desktop-1440-03-faq-accordion.jpg`
- **Interaction model:** click-driven, single-open accordion

## DOM Structure
```
section (bg-white border rounded-lg divide-y divide-gray-200 overflow-hidden)
  h2 "Sıkça Sorulan Sorular" (heading, same treatment, sits above the bordered list as its own row or as a card header)
  div.accordion-row x7
    button.row-header (flex justify-between items-center w-full px-4 py-3.5, text-left)
      span.question (text-sm font-medium text-gray-800)
      ChevronRight icon (rotates 90deg when open)
    div.panel (collapsed by default; expands with max-height/opacity transition to reveal answer text px-4 pb-4 text-sm text-gray-600)
```

## Computed Styles
### Row header
- `flex items-center justify-between w-full px-4 py-3.5 text-left hover:bg-gray-50 transition-colors`.
- Question text: `text-sm font-medium text-gray-800`.
- Chevron: Lucide `ChevronRight`, `size-4 text-sp-accent shrink-0 transition-transform duration-200`, rotates to `rotate-90` when the row is open.

### Panel
- Closed: `grid-rows-[0fr]` (or `hidden`) — height 0, `opacity-0`.
- Open: `grid-rows-[1fr]`, `opacity-100`, padding `px-4 pb-4`.
- Transition: `transition-all duration-200 ease-out` on the grid-template-rows technique (`grid` + `grid-rows-[0fr]/[1fr]` + inner `overflow-hidden` div — avoids animating `height: auto`).

### Container
- `bg-white border border-gray-200 rounded-lg divide-y divide-gray-100`.

## States & Behaviors
### Row expand/collapse
- **Trigger:** click on `button.row-header`.
- **State A (closed):** chevron `rotate-0`, panel `grid-rows-[0fr] opacity-0`.
- **State B (open):** chevron `rotate-90`, panel `grid-rows-[1fr] opacity-100`.
- **Transition:** `transition-all duration-200 ease-out` on both chevron and panel.
- **Implementation approach:** local component state `openIndex: number | null`; clicking a row sets `openIndex` to that row's index, or `null` if it was already open (accordion behavior — only one panel open at a time, matching the standard convention for this component family and the collapsed-by-default appearance captured live).

## Text Content (verbatim — question titles only; answers are not visible in the collapsed state captured live, so each panel reuses the matching answer already verified in `FAQSection.spec.md` / the live description content where the question overlaps, and a concise on-topic answer sentence for the two questions unique to this block)
1. `Bosch Yağ Filtresi 09864B7063 ürünü orijinal mi?` → "Bu ürün BOSCH markasının orijinal parça standartlarında ürettiği bir yedek parçadır."
2. `Bosch Yağ Filtresi 09864B7063 ürünü iade edebilir miyim?` → "Evet, kullanılmamış ve orijinal ambalajındaki ürünler iade politikamız kapsamında iade edilebilir."
3. `Bosch Yağ Filtresi 09864B7063 ürünü ne zaman kargoya verilir?` → same answer as `FAQSection` shipping question.
4. `Bosch Yağ Filtresi 09864B7063 ürününü iade edebilir miyim?` → same answer as item 2 (source repeats this question with slightly different wording — reproduced verbatim as two rows).
5. `Bosch Yağ Filtresi 09864B7063 için alternatif marka var mı?` → same answer as `FAQSection`.
6. `Bosch Yağ Filtresi 09864B7063 OEM kodu nedir?` → same answer as `FAQSection`.
7. `Bosch Yağ Filtresi 09864B7063 fiyatı ne kadar?` → same answer as `FAQSection`.

## Assets
None (Lucide `ChevronRight`).

## Responsive Behavior
- **All breakpoints:** identical single-column list; row padding reduces to `px-3 py-3` on mobile.
