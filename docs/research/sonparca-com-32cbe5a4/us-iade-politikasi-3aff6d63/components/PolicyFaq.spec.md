# PolicyFaq Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-iade-politikasi-3aff6d63/PolicyFaq.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-iade-politikasi-3aff6d63/desktop-1440-section8-faq.jpg`
- **Interaction model:** click-driven (independent per-item toggle — see BEHAVIORS.md for verification method)

## DOM Structure
```
<div class="mt-6">
  <h2 class="text-lg font-semibold text-light-text-primary mb-4">İade Politikası - Sıkça Sorulan Sorular</h2>
  <div class="space-y-3">
    {items.map(item => (
      <div class="border border-gray-200 rounded-md overflow-hidden">
        <button class="w-full px-4 sm:px-5 py-3 sm:py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3">
          <h3 class="font-medium text-light-text-primary text-sm sm:text-base">{item.question}</h3>
          <span class="flex items-center justify-center text-light-text-muted flex-shrink-0"><Icon /></span>
        </button>
        {open && (
          <div class="px-4 sm:px-5 pb-4 bg-gray-50 border-t border-gray-100">
            <p class="text-sm leading-relaxed pt-3 text-gray-500">{item.answer}</p>
          </div>
        )}
      </div>
    ))}
  </div>
</div>
```
Notes on custom color tokens seen in source: `text-light-text-primary` computed to `rgb(25, 40, 49)` (map to Tailwind `text-gray-900`), `text-light-text-muted` computed to `rgb(91, 91, 91)` (map to Tailwind `text-gray-500`) — this project doesn't have those custom tokens configured, so use the closest standard Tailwind gray equivalents per computed color match above.

## Computed/literal styles
- Outer heading: `text-lg font-semibold text-gray-900 mb-4`
- List wrapper: `space-y-3`
- Item card: `border border-gray-200 rounded-md overflow-hidden`
- Button: `w-full px-4 sm:px-5 py-3 sm:py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3`
- Question `h3`: `font-medium text-gray-900 text-sm sm:text-base`
- Icon wrapper: `flex items-center justify-center text-gray-500 flex-shrink-0`, icon size `16px` (`text-base` in source's Material Symbols font — use `h-4 w-4` lucide icon)
- Answer panel wrapper (only rendered when open): `px-4 sm:px-5 pb-4 bg-gray-50 border-t border-gray-100`
- Answer `p`: `text-sm leading-relaxed pt-3 text-gray-500`

## States & Behaviors

### Click-to-expand (per item, independent)
- **Trigger:** click anywhere on the button (question row).
- **State A (collapsed):** icon = chevron/expand-more glyph; answer panel is not rendered in the DOM at all (verified: `container.children.length === 1` when collapsed).
- **State B (expanded):** icon = collapse/expand-less glyph; answer panel div is mounted as a sibling right after the button.
- **Transition:** none explicit on the panel itself in the source (instant mount/unmount); button background has `transition-colors duration-150` for its own hover state only. Implementation: plain conditional render via local `useState<boolean>` per item (e.g., a `Set<number>` of open indices, or an array of booleans) — no animation library needed to match source fidelity, though a `grid-rows-[0fr]→[1fr]` CSS transition is an acceptable non-regressive enhancement if desired since it doesn't contradict the source's instant behavior visually at normal interaction speed. Keep it simple: match source with instant show/hide.
- **Multiplicity:** CONFIRMED via live testing — opening item 1, then item 2 (item 1 remained open), then items 3 and 4 (all 4 remained open simultaneously). This is **independent state per item**, not an exclusive/single-open accordion. Implementation must allow multiple items open at once.

### Hover
- Button: `bg-white` → `hover:bg-gray-50`, `transition-colors duration-150`.

## Per-State Content (verbatim, all 4 items — extracted by clicking each and reading `textContent`)

1. **Q:** İade süresi ne kadar?
   **A:** Ürünü teslim aldığınız tarihten itibaren 14 gün içinde iade işlemi başlatabilirsiniz. Süre, kargonun size teslim edildiği tarihten itibaren başlar.
2. **Q:** Hangi ürünler iade edilemez?
   **A:** Kullanılmış, hasarlı veya orijinal ambalajı açılmış ürünler iade edilemez. Araç üzerine monte edilmiş parçalar da iade kapsamı dışındadır.
3. **Q:** İade kargo ücreti kim tarafından karşılanır?
   **A:** İade kargo ücreti Son Parça tarafından karşılanır. Size gönderilen ücretsiz kargo etiketini kullanarak kolayca iade gönderimi yapabilirsiniz.
4. **Q:** İade tutarı ne zaman hesabıma yansır?
   **A:** İade edilen ürün depomuzda kontrol edildikten sonra 3-5 iş günü içinde ödemeniz iade edilir. Kredi kartı ile yapılan ödemelerde banka sürecine bağlı olarak 1-2 ekstre dönemi sürebilir.

## Assets
- Icon: use `lucide-react` `ChevronDown` rotated 180° when open (or swap to `ChevronUp`) in place of the source's `material-symbols-outlined` `expand_more`/`expand_less` glyphs — visually equivalent, acceptable substitution (icon font not an inline SVG/downloadable asset).

## Responsive Behavior
- **Desktop (1440px) / Tablet (768px):** button padding `sm:px-5 sm:py-4`, question text `sm:text-base`.
- **Mobile (390px, class-derived per documented gap):** button padding `px-4 py-3`, question text `text-sm`.
- **Breakpoint:** `sm:` = 640px.

This must be a Client Component (`"use client"`) since it owns interactive open/closed state.
