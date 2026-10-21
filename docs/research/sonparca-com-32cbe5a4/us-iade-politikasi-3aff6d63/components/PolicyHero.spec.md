# PolicyHero Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-iade-politikasi-3aff6d63/PolicyHero.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-iade-politikasi-3aff6d63/desktop-1440-top.jpg`
- **Interaction model:** static

## DOM Structure
```
<header class="border-b border-gray-200 pb-4 md:pb-6 mb-6 md:mb-8">
  <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 break-words">...</h1>
  <p class="text-xs md:text-sm text-gray-500">Son Güncelleme Tarihi: ...</p>
</header>
<p class="mt-4 text-sm md:text-base leading-relaxed">...intro...</p>
```
Note: the intro paragraph is a sibling AFTER the `<header>`, not inside it (both are direct children of the page's outer content container, which this component does not own — it just renders these two nodes as a fragment; the outer `container mx-auto max-w-screen-xl ...` div lives in the page/`PolicySections` wrapper — see page assembly).

## Computed Styles (literal Tailwind classes, DOM is Angular + Tailwind utility markup — see task note on preferring literal classes)

### header
- `border-b border-gray-200 pb-4 md:pb-6 mb-6 md:mb-8`

### h1
- `text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 break-words`

### "last updated" p
- `text-xs md:text-sm text-gray-500`

### intro paragraph
- `mt-4 text-sm md:text-base leading-relaxed`
- Note: inherits `text-gray-700` from the ancestor container (`text-gray-700` set once on `div.container`), not re-declared per element.

## States & Behaviors
N/A — purely static text, no hover/focus states on any element in this component.

## Text Content (verbatim)
- H1: `Son Parça İade ve Değişim Politikası`
- Date line: `Son Güncelleme Tarihi: 28/05/2025`
- Intro paragraph: `Son Parça olarak, otomotiv yedek parça sektörünün teknik hassasiyetini dikkate alarak; hem sizi hem de satıcı haklarını koruyan bir iade politikası uyguluyoruz. Aşağıdaki maddeler, sipariş, teslimat ve olası iade süreçlerinde geçerli olacak temel kuralları açıklar.`

## Assets
None.

## Responsive Behavior
- **Desktop (1440px):** H1 renders at `lg:text-3xl`.
- **Tablet (768px):** H1 at `md:text-2xl`, header bottom padding/margin at `md:pb-6 md:mb-8`.
- **Mobile (390px, class-derived — see BEHAVIORS.md gap note):** H1 at base `text-xl`, header `pb-4 mb-6`, intro paragraph `text-sm`.
- **Breakpoints:** `md:` = 768px, `lg:` = 1024px (Tailwind defaults).
