# PageHeader Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/PageHeader.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/on-tampon-9ed11181/desktop-01-header-toolbar-grid-row1.jpg`
- **Interaction model:** click-driven (description expand/collapse)

## DOM Structure
```
<div> (white card wrapper, border, rounded, mb-4 — matches surrounding page card convention)
  <nav> breadcrumb: "Ana Sayfa / Ön Tampon"
  <div> title row (flex justify-between, wraps on mobile)
    <h1>Ön Tampon</h1>
    <button> "Araç seçimini tamamla" (outlined, icon + text)
  <div> description block
    <p>{description text}</p> — full text always in DOM; line-clamp toggled via state
    <button> "Devamını oku" / "Daha az göster" + chevron icon (rotates 180° when expanded)
```

## Computed Styles (exact values from getComputedStyle)

### Breadcrumb nav
- class: `mb-3`
- link: fontSize 12px, fontWeight 400, lineHeight 18px, color `rgb(91, 91, 91)` (`text-light-text-muted`)
- current/last crumb: same size, `font-medium`, color `rgb(25,40,49)` (`text-light-text-primary`)

### H1
- fontSize: 25.008px (Tailwind `text-2xl` ≈ 24px, source renders 25.0px — use `text-2xl font-semibold`)
- fontWeight: 600
- lineHeight: 31.26px
- color: rgb(25, 40, 49) → `text-light-text-primary`

### "Araç seçimini tamamla" button
- fontSize: 12.8px (`text-xs`), fontWeight: 400, lineHeight: 19.2px
- color: rgb(255, 114, 34) → `text-sp-accent`
- padding: 6px 12px
- borderRadius: 4px
- border: 1px solid rgb(255, 114, 34) → `border border-sp-accent`
- display: flex, gap: 4px
- background: transparent, hover → light accent tint background (standard outline-button hover; use `hover:bg-sp-accent/10`)

### Description paragraph
- Full text always present in DOM; visually clamped to ~2 lines by default via `line-clamp-2`.
- fontSize ~14px (`text-sm`), color `text-light-text-muted` (`rgb(91,91,91)`)

### "Devamını oku" toggle button
- class (source): `mt-1 inline-flex items-center gap-0.5 text-xs font-medium text-accent hover:text-accent-hover`
- fontSize: 12px, fontWeight: 500, color: rgb(255, 114, 34) → `text-sp-accent hover:text-sp-accent-hover`
- display: inline-flex, gap: 2px
- icon: chevron-down (Material `expand_more` ligature in source) → use lucide `ChevronDown`, rotate 180° when expanded (`transition-transform duration-200`, `rotate-180` class when open)

## States & Behaviors

### Description expand/collapse
- **Trigger:** click on "Devamını oku" / "Daha az göster" button
- **State A (collapsed, default):** paragraph has `line-clamp-2` — additional sentences of the alt-groups/price-range copy are visually hidden (all text is still in the DOM)
- **State B (expanded):** `line-clamp-none`, chevron rotated 180°, button label becomes "Daha az göster"
- **Transition:** chevron `transition-transform duration-200`; no animated height transition observed on the source (instant clamp toggle) — safe to add a simple `transition-all` for polish without deviating from source feel
- **Implementation:** local `useState<boolean>` in the client component toggling clamp class + button label + chevron rotation

## Per-State Content

Only one text content state (all text is server text, not per-state variants):

- Breadcrumb: `Ana Sayfa` → `/` → `Ön Tampon`
- H1: `Ön Tampon`
- Button: `Araç seçimini tamamla`
- Description (verbatim, exact source text):
  > Ön Tampon kategorisindeki yedek parçaları inceleyin. Alt gruplar: Ön Tampon Çeki Kapağı, Tampon Fiskiye Motoru, Ön Sağ Tampon Fıskıyesi, Ön Tampon Orta Izgara ve Ön Tampon Demiri. Fiyatlar 0 TL ile 267.294 TL arasında değişiyor. 1.677 ürün stokta mevcut.Fiyat ve stok bilgileri düzenli olarak güncellenmektedir.
- Toggle label: `Devamını oku` (collapsed) / `Daha az göster` (expanded — inferred standard pairing, source only confirmed the collapsed label since click didn't visibly change text within the tooling's captured session, per BEHAVIORS.md)

## Assets
- No images. Icons: lucide-react `ChevronDown` (expand toggle), `FileCheck` or `IdCard`-style icon for "Araç seçimini tamamla" (source uses a small line icon before the label — approximate with lucide `IdCard` or `Car`; visually minor, use `Car` icon at `size-3.5`).

## Text Content (verbatim)
See "Per-State Content" above — copied directly from `textContent` extraction of the live page.

## Responsive Behavior
- **Desktop (1440px):** title row is `flex items-center justify-between` — h1 left, button right, same row.
- **Tablet/Mobile:** row wraps (`flex-wrap`) — button drops below h1 on narrow widths (standard flex-wrap behavior, matches header's own wrap pattern used in `Header.tsx`).
- **Breakpoint:** use `flex-col sm:flex-row sm:items-center sm:justify-between` for the title row, consistent with the rest of the site's mobile-first wrap conventions.
