# ProductToolbar & Pagination Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/ProductToolbar.tsx` and
  `src/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/Pagination.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/on-tampon-9ed11181/desktop-01-header-toolbar-grid-row1.jpg` (toolbar); pagination captured via live text-extraction (see BEHAVIORS.md — a saved screenshot could not be produced before the tooling's redirect fired, source text/structure is exact from DOM read)
- **Interaction model:** static (toolbar); pagination buttons are page-navigation links (static in the clone, no real backend paging)

## ProductToolbar

### DOM Structure
```
<div class="flex items-center justify-between mb-3">
  <h2>Ürünler</h2>
  <span>{count} sonuç bulundu</span>
</div>
```

### Computed Styles
- Container: `flex items-center justify-between`, small bottom margin before the grid.
- "Ürünler" heading: font-semibold, `text-base` or `text-lg`, `text-light-text-primary` — matches
  other section headings on the site (e.g. `CategoryGrid`'s "Popüler Yedek Parça Kategorileri" pattern, though smaller here since it's a plain heading not inside a dark banner).
- Result count span: `text-sm text-light-text-muted`, right-aligned.

### Text Content (verbatim)
- `Ürünler`
- `6810 sonuç bulundu` (dynamic count — use the real captured value as the static demo value)

## Pagination

### DOM Structure
```
<nav class="flex items-center justify-between mt-4">
  <div class="flex items-center gap-1">
    <button>«</button>  <!-- first page -->
    <button>‹</button>  <!-- prev page -->
    <button class="active">1</button>
    <button>2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>›</button>  <!-- next page -->
    <button>»</button>  <!-- last page -->
  </div>
  <span>Toplam 6810 kayıttan 1-20 arası gösteriliyor</span>
</nav>
```

### Styles (visually derived from screenshot — exact getComputedStyle could not be captured before
the session's tooling redirect fired mid-pagination-hover-test; see BEHAVIORS.md. Values below are
a faithful, low-risk reconstruction from the screenshot pixels + the site's consistent button
conventions used elsewhere, e.g. rounded, bordered, `text-sm` pill buttons):
- Page-number buttons (inactive): `w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors`
- Active page button ("1"): `w-8 h-8 flex items-center justify-center rounded border border-sp-accent/30 bg-sp-accent/10 text-sm font-medium text-sp-accent` (light accent-tinted pill, consistent with the site's orange accent used for active/selected states elsewhere, e.g. the "Araç Seçin" active tab pill seen in the vehicle-selector modal)
- Prev/next/first/last arrow buttons: `w-8 h-8 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed`
- Result-range text: `text-sm text-light-text-muted`

### Text Content (verbatim)
- Buttons: `«`, `‹`, `1`, `2`, `3`, `4`, `5`, `›`, `»`
- `Toplam 6810 kayıttan 1-20 arası gösteriliyor`

### States & Behaviors
- Page `1` is active (highlighted) since this is the first page.
- First/prev buttons would be disabled on page 1 in a real paginator; since this clone has no
  backend pagination, render them as disabled (`«`, `‹` grayed out, `cursor-not-allowed`) to match
  the expected "on first page" state truthfully for the static page-1 snapshot being built.
- Clicking page numbers/next would be a `?page=N` link in the real site — implement as plain
  `<button>` elements (no real navigation) since this is a static single-page snapshot clone
  consistent with the project's "mock data for demo purposes" scope default.

## Responsive Behavior
- **Desktop:** pagination row is a single flex row, buttons + result text side by side (`justify-between`).
- **Mobile:** wraps to two lines if needed (`flex-wrap`), buttons remain the same size (all touch-friendly `w-8 h-8` already).
