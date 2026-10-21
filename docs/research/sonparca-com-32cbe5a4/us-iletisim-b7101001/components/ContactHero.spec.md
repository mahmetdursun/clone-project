# ContactHero Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-iletisim-b7101001/ContactHero.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-iletisim-b7101001/desktop-top-1920.jpg`
- **Interaction model:** static

## DOM Structure
```
section (gradient bg)
  div (container)
    div (text-center)
      h1 "İletişim"
      p  subtitle
```

## Computed Styles / exact Tailwind classes (read directly from live DOM — see BEHAVIORS.md quirk note)

### Container
- section: `w-full bg-gradient-to-r from-blue-50 to-gray-50`
- inner div: `container mx-auto px-4 py-12 md:py-16`
- text wrapper: `text-center`

### h1
- classes: `text-3xl md:text-4xl font-semibold text-gray-800 mb-2`
- computed (at reported 1920px window): fontSize ~39px (this is a rendering artifact of the shared window not being at 1440px — use the Tailwind classes as ground truth, not the raw px reading)

### p (subtitle)
- classes: `text-lg text-gray-600 max-w-3xl mx-auto`

## States & Behaviors
N/A — fully static section, no hover/click/scroll behavior.

## Text Content (verbatim)
- Heading: "İletişim"
- Subtitle: "Son Parça ile iletişime geçebileceğiniz tüm kanallarımız."

## Assets
None.

## Responsive Behavior
- **Desktop (≥768px, `md:`):** larger heading (`text-4xl`), more vertical padding (`py-16`).
- **Mobile (<768px):** `text-3xl` heading, `py-12` padding.
- **Breakpoint:** 768px (`md:`).
