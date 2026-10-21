# PolicyHero Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-gizlilik-politikasi-6264bf87/PolicyHero.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-gizlilik-politikasi-6264bf87/desktop-1440-top.jpg`
- **Interaction model:** static

## DOM Structure
```
<div class="container mx-auto max-w-screen-xl overflow-x-hidden px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 text-gray-700">
  <header class="border-b border-gray-200 pb-4 md:pb-6 mb-6 md:mb-8">
    <h1 class="text-xl md:text-2xl lg:text-3xl font-bold mb-2 break-words">...</h1>
    <p class="text-xs md:text-sm text-gray-500">Son Güncelleme Tarihi: ...</p>
    <p class="mt-4 text-sm md:text-base leading-relaxed whitespace-normal break-words">...intro...</p>
  </header>
```
Note: the `container mx-auto max-w-screen-xl ...` wrapper div is the shared outer wrapper for the whole page — implement it once in `PolicyHero.tsx` as the opening wrapper and leave it open (render children via composition in the page), OR simpler: put the wrapper div in the page (`page.tsx`) and have `PolicyHero` and `PolicyContent`/`PolicyFaq` each render only their own inner markup as siblings inside it. This spec assumes the latter (page.tsx owns the outer container div).

## Computed Styles (exact literal Tailwind classes from DOM)

### Outer container (owned by page.tsx, not this component)
- `container mx-auto max-w-screen-xl overflow-x-hidden px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 text-gray-700`

### header
- `border-b border-gray-200 pb-4 md:pb-6 mb-6 md:mb-8`

### h1
- `text-xl md:text-2xl lg:text-3xl font-bold mb-2 break-words`

### "last updated" p
- `text-xs md:text-sm text-gray-500`

### intro p
- `mt-4 text-sm md:text-base leading-relaxed whitespace-normal break-words`

## States & Behaviors
N/A — fully static, no hover/click/scroll behavior on this block.

## Text Content (verbatim)
- H1: `Son Parça Gizlilik ve Kişisel Verilerin Korunması Politikası`
- Last updated: `Son Güncelleme Tarihi: 28/05/2025`
- Intro paragraph:
  `Son Parça ("biz", "bize", "bizim") olarak; https://www.sonparca.com ("Site") üzerinden sunduğumuz hizmetlerde kişisel verilerinizin güvenliğini ve gizliliğini önemsiyoruz. Bu politika, kişisel verilerinizi hangi amaçlarla işlediğimizi, kimlerle ve hangi şartlarda paylaştığımızı, haklarınızı ve başvuru kanallarınızı özetler.`

## Assets
None.

## Responsive Behavior
- **Desktop (1440px):** h1 renders at `lg:text-3xl`, container padding `lg:px-8 lg:py-10`.
- **Tablet (768px):** h1 at `md:text-2xl`, container `md:px-6 md:py-8`, header `md:pb-6 md:mb-8`.
- **Mobile (390px, below 768px):** h1 at base `text-xl`, container `px-4 py-6`, header `pb-4 mb-6`. (Extracted from literal Tailwind classes — live mobile viewport screenshot could not be captured this session due to a shared-browser `resize_window` failure; see `BEHAVIORS.md`.)
- **Breakpoint:** 768px (`md:`), with an additional step at 1024px (`lg:`) for the h1 and container padding only.
