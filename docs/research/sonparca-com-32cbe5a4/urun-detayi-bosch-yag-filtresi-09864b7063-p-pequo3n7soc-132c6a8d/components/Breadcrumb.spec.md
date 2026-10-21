# Breadcrumb Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/Breadcrumb.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/desktop-1440-01-hero-buybox.jpg` (top strip)
- **Interaction model:** static

## DOM Structure
`nav > ol/div (flex, gap-2, items-center)` containing: home icon + "Ana Sayfa" link, "/" separator, "Yağ Filtresi" link, "/" separator, current page (bold, non-link).

## Computed Styles
- Container: `flex items-center gap-2 text-sm text-gray-500 mb-4` (matches existing muted small-text convention used for helper copy across the site, e.g. `CategoryGrid` subtitle `text-xs text-dark-text-muted`, scaled up one step to `text-sm` since this sits on a white page background not the dark bar).
- Home icon: Lucide `Home`, `size-4`, inline before "Ana Sayfa".
- Links: `hover:text-sp-accent transition-colors`.
- Current (last) crumb: `font-medium text-gray-900`, not a link.
- Separator: literal `/` glyph, `text-gray-300`.

## States & Behaviors
- Hover on link crumbs: color transitions to `sp-accent` (`transition-colors`), consistent with every other text link on the site.

## Text Content (verbatim)
`Ana Sayfa / Yağ Filtresi / Bosch Yağ Filtresi 09864B7063`

## Assets
None (Lucide `Home` icon only).

## Responsive Behavior
- **Desktop/Tablet/Mobile:** identical single-row flex layout; truncate long crumb text with `truncate` + `min-w-0` on the current-page span so it never wraps the layout at 390px.
