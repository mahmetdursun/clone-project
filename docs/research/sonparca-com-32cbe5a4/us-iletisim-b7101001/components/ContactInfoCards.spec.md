# ContactInfoCards Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-iletisim-b7101001/ContactInfoCards.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-iletisim-b7101001/desktop-top-1920.jpg`
- **Interaction model:** static layout, hover-only on links/icons

## DOM Structure
```
section.container.mx-auto.px-4.py-8.md:py-12
  div.grid.grid-cols-1.lg:grid-cols-12.gap-8
    div (card, x4) .bg-white.p-6.rounded-md.shadow-sm.border.border-gray-100.lg:col-span-6
      div.flex.items-start
        div.bg-blue-50.p-3.rounded-md > svg icon (h-6 w-6 text-blue-600)
        div.ml-4
          h3.text-lg.font-medium.text-gray-800  (title)
          p.text-gray-600.mt-1                  (description line)
          a or p                                 (value line, styled per card)
          p.text-sm.text-gray-500.mt-1          (extra line, phone card only)
```

## Computed Styles (exact Tailwind classes from live DOM)

### Grid wrapper
- `grid grid-cols-1 lg:grid-cols-12 gap-8`

### Each card
- `bg-white p-6 rounded-md shadow-sm border border-gray-100 lg:col-span-6`
- icon wrapper: `bg-blue-50 p-3 rounded-md`
- icon: `h-6 w-6 text-blue-600` — use lucide-react equivalents of the source's heroicons-outline paths:
  - Telefon → `Phone`
  - E-posta → `Mail`
  - Adres → `MapPin`
  - Sosyal Medya → `MessageCircle` (source path matches a speech-bubble/chat icon)
- title: `h3.text-lg.font-medium.text-gray-800`
- description paragraph: `p.text-gray-600.mt-1`

### Card 1 — Telefon
- value link: `a.text-blue-600.font-medium.mt-1.block.hover:underline` href=`tel:0850 302 25 08`
- extra line: `p.text-sm.text-gray-500.mt-1` = "Hafta içi: 09:00 - 18:00"

### Card 2 — E-posta
- value link: `a.text-blue-600.font-medium.mt-1.block.hover:underline` href=`mailto:destek@sonparca.com`

### Card 3 — Adres
- value: plain `p` (no link), text is the address, styled like the value line (dark text, not blue) — matches `p.text-gray-800.mt-1` pattern (no link/hover state)

### Card 4 — Sosyal Medya
- icon row: `div.flex.space-x-4.mt-3`
- each social link: `a.text-blue-600.hover:text-blue-800` wrapping an inline SVG icon (~20-24px). Use lucide-react `Instagram`, `Facebook`, `Twitter` (X) icons at `size-5` or `size-6` to match.
- hrefs: Instagram `https://www.instagram.com/sonparca34/`, Facebook `https://www.facebook.com/sonparca34`, X `https://www.x.com/sonparca34` — real external links, `target="_blank" rel="noopener noreferrer"`.

## States & Behaviors

### Hover — value links (phone/email)
- **Before:** `text-blue-600`, no underline
- **After:** underline appears (`hover:underline`)
- **Transition:** none specified (instant, native `text-decoration`)

### Hover — social icons
- **Before:** `text-blue-600`
- **After:** `text-blue-800`
- **Transition:** use `transition-colors` for a smooth clone-quality feel (source didn't specify a duration, this is a safe non-regressive addition consistent with the rest of the site, e.g. Footer.tsx social icons use `transition-colors`).

## Text Content (verbatim)
- Card 1: "Telefon" / "Bize hemen ulaşmak için:" / "0850 302 25 08" / "Hafta içi: 09:00 - 18:00"
- Card 2: "E-posta" / "Sorularınız ve önerileriniz için:" / "destek@sonparca.com"
- Card 3: "Adres" / "Merkez Ofisimiz:" / "Avcılar Sanayi Sitesi No:10 (Oto Yılmaz Yedek Parça Yanı), 34325 Avcılar/İstanbul"
- Card 4: "Sosyal Medya" / "Bizi takip edin:"

## Assets
None (icons are lucide-react components, no downloaded images).

## Responsive Behavior
- **Desktop (≥1024px, `lg:`):** 2×2 grid (`lg:grid-cols-12` with each card `lg:col-span-6`).
- **Mobile/Tablet (<1024px):** single column (`grid-cols-1`), cards stack full-width.
- **Breakpoint:** 1024px (`lg:`).
