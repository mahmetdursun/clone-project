# FilterSidebar Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/FilterSidebar.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/on-tampon-9ed11181/desktop-01-header-toolbar-grid-row1.jpg` (top of sidebar), `desktop-02-sidebar-marka-grid-row2-3.jpg` (Marka panel)
- **Interaction model:** click-driven (accordion open/close), client-side checkbox selection (no live backend in clone)

## DOM Structure
```
<aside> (desktop: static column ~280-300px wide; mobile: hidden behind a "Filtreler" toggle button)
  <div> accordion item — Kategori
    <button> "Kategori" + chevron (rotate on open/close)
    <div class="py-3 px-4"> (panel, visible when open)
      <input placeholder="Kategori ara..."> (client-side text filter over the list)
      <ul>/<a> list: Fren Sistemi, Süspansiyon Sistemi, Motor, Kaporta / Trim, Elektrik Aksamı,
                      Şanzıman, Diferansiyel, Egzoz, Oto Bakım Ürünleri, Oto İç Aksesuarları,
                      Yağ / Antifriz, Filtreler
      (each <a href="/on-tampon?categoryId=<uuid>">) — full navigation links, not client filters
  <div> accordion item — Marka
    <button> "Marka" + chevron
    <div class="py-3 px-4">
      <input placeholder="Marka ara...">
      <div class="max-h-[~180px] overflow-y-auto"> checkbox list (own scrollbar):
        AYD, BSG, CABU, DERELI, DOGANER, EURO PUMB, FASE, GVA, İTHAL, JKP, KAYA, MAHER, MARAL,
        MGA, MOTOEC, ORJINAL, SonParça
```

## Computed Styles (exact values from getComputedStyle)

### Accordion header button ("Kategori" / "Marka")
- class (source): `flex items-center justify-between w-full text-left`
- label span class: `font-medium text-light-text-primary`
- Wrapping container padding: `py-3 px-4` for the panel below the header

### Category/brand search input
- Standard text input: `w-full text-sm border border-gray-200 rounded px-3 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sp-accent/40` (inferred from site-wide input convention already used in `Header.tsx` search bar — border/radius/focus-ring pattern matches)

### Category link item
- Plain link, no visible per-item background in default state (screenshot shows flat list, no borders between rows)
- hover: color shifts to accent orange (site-wide link hover convention, `hover:text-sp-accent`)
- fontSize ~14px, color `text-light-text-primary` default

### Marka checkbox row
- `<input type="checkbox">` + `<label>` text, fontSize ~14px, `text-light-text-primary`
- Scroll container: fixed max-height with `overflow-y-auto` (source shows ~9 rows visible with a visible scrollbar thumb before needing to scroll for the rest of the 17 brands)

### "Filtreler" mobile toggle button (collapsed sidebar affordance)
- class (source): `w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded text-light-text-primary hover:bg-light-bg-muted shadow-sm transition-colors`
- Contains a filter icon (lucide `SlidersHorizontal` or `Filter`) + "Filtreler" label (`font-medium`)

## States & Behaviors

### Accordion open/close
- **Trigger:** click on section header button
- **State A (open, default on load):** panel visible, chevron pointing up/rotated
- **State B (closed):** panel hidden (`hidden` / height 0), chevron pointing down
- **Transition:** simple show/hide, chevron `transition-transform duration-200 rotate-180` when open
- **Implementation:** local `useState` per accordion section (both default **open** to match source's initial state)

### Category search filter
- Client-side text filter over the visible category link list (typing narrows the list) — implemented with local state filtering the static array by substring match (case-insensitive), since this is a small fixed list.

### Marka checkbox selection
- Presentational controlled checkboxes (local `useState<string[]>` of selected brand codes). No live product re-fetch in the clone (no backend) — matches the project's mock-data scope.

### Mobile collapse
- Below `lg`, the sidebar's accordions are hidden behind the "Filtreler" toggle button (renders inline above the grid). Clicking it would open a drawer/panel with the same Kategori/Marka accordions — implemented as a simple `useState` toggle showing/hiding the same `FilterSidebar` content in a modal-less inline reveal, keeping the clone simple and avoiding a rebuild of the full site's drawer transition (not observable within the tooling's viewport constraints — see BEHAVIORS.md tooling note).

## Text Content (verbatim)

Kategori items: Fren Sistemi, Süspansiyon Sistemi, Motor, Kaporta / Trim, Elektrik Aksamı, Şanzıman, Diferansiyel, Egzoz, Oto Bakım Ürünleri, Oto İç Aksesuarları, Yağ / Antifriz, Filtreler

Marka items: AYD, BSG, CABU, DERELI, DOGANER, EURO PUMB, FASE, GVA, İTHAL, JKP, KAYA, MAHER, MARAL, MGA, MOTOEC, ORJINAL, SonParça

Search placeholders: `Kategori ara...`, `Marka ara...`

## Assets
- Icons only (lucide-react): `ChevronDown` (accordion), `Search` (reuse pattern from Header), `SlidersHorizontal` (mobile Filtreler toggle).

## Responsive Behavior
- **Desktop (≥1024px / `lg`):** static left column, ~280-300px wide, both accordions open by default, flows with page (not sticky).
- **Tablet/Mobile (<1024px):** column hidden; a "Filtreler" button appears inline above the product grid toolbar to reveal the same content (see Mobile collapse above).
- **Breakpoint:** `hidden lg:block` for the static column; `lg:hidden` for the mobile toggle button.
