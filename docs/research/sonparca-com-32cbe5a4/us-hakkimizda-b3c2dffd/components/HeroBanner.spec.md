# HeroBanner Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/HeroBanner.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/desktop-1-hero-story.jpg` (top portion)
- **Interaction model:** static

## DOM Structure
```
<section class="w-full bg-gradient-to-r from-blue-50 to-gray-50">
  <div class="container mx-auto px-4 py-16 md:py-24">
    <div class="text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Hakkımızda</h1>
      <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"> Kaliteli Yedek Parça Çözümleri </p>
    </div>
  </div>
</section>
```

## Computed Styles (exact values from getComputedStyle, at 1440px viewport)
- Section: `backgroundImage: linear-gradient(to right, rgb(239, 246, 255), rgb(249, 250, 251))` = Tailwind `bg-gradient-to-r from-blue-50 to-gray-50`
- h1: fontSize 39.056px (Tailwind `text-4xl` at md+), fontWeight 700, color rgb(31,41,55) = `text-gray-800`, marginBottom 16px, lineHeight 58.584px
- p: fontSize 20px (`text-xl` at md+), color rgb(75,85,99) = `text-gray-600`, maxWidth 768px (`max-w-3xl`)

## States & Behaviors
N/A — fully static, no hover/click/scroll behavior on this section.

## Assets
None.

## Text Content (verbatim)
- H1: "Hakkımızda"
- Subtitle: "Kaliteli Yedek Parça Çözümleri"

## Responsive Behavior
- **Desktop (≥768px, Tailwind `md:`):** `py-24` section padding, `text-4xl` h1, `text-xl` subtitle
- **Mobile (<768px):** `py-16` section padding, `text-3xl` h1, `text-lg` subtitle
- **Breakpoint:** 768px (Tailwind `md`)
- Use exactly the Tailwind classes above — they are the verbatim classes read from the live DOM, not estimates.
