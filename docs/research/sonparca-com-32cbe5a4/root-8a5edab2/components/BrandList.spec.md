# BrandList Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/BrandList.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/root-8a5edab2/desktop-04-categories-brandlist.jpg`
- **Interaction model:** click-driven accordion disclosure (collapsed by default; use shadcn Collapsible/Accordion primitive)

## DOM Structure
```
<section>
  <div class="bg-dark-bg rounded-t-lg px-4 py-3 flex items-center gap-2">
    briefcase icon + <div><p class="font-semibold text-dark-text-primary">Tüm Araç Markaları ve Modelleri</p><p class="text-xs text-dark-text-muted">Aracınızın markasını seçerek uyumlu yedek parçalara ulaşın</p></div>
  <div class="bg-white border border-t-0 border-gray-200 rounded-b-lg p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-1">
      20x <button class="flex items-center justify-between w-full px-3 py-3 rounded hover:bg-gray-50 transition-colors">
        <span class="text-sm text-gray-800">{brand} Yedek Parça</span>
        <span class="flex items-center gap-2 text-gray-400"><span class="text-xs bg-gray-100 rounded px-1.5 py-0.5">{count}</span><ChevronDown size={16}/></span>
```

## Computed Styles
- Row: `px-3 py-3 rounded`, hover → `bg-gray-50`, `transition-colors`.
- Label: `text-sm text-gray-800`.
- Count badge: `text-xs bg-gray-100 text-gray-500 rounded px-1.5 py-0.5`.
- Chevron: `text-gray-400`, 16px, rotates 180° when that row's panel is expanded (`transition-transform duration-200`).

## States & Behaviors
- **Click-driven accordion:** clicking a row toggles an expand/collapse panel beneath it (model list for that brand) — not captured during the homepage sweep (rows stayed collapsed throughout). Implement with shadcn `Collapsible` per row, chevron rotates on expand, collapsed by default, panel content can be a simple placeholder list ("Modeller yakında") since live model data wasn't part of the homepage scope.
- Row hover: background tint only, no border change.

## Assets
- Icons: `lucide-react` `Briefcase` (header), `ChevronDown` (row toggle).

## Text Content (verbatim, brand — count, exact order)
Fiat — 34, Renault — 30, Hyundai — 25, Citroen — 24, Peugeot — 23, Volkswagen — 21, Ford — 18, Opel — 18, Toyota — 17, Kia — 17, Skoda — 14, Nissan — 13, Audi — 12, Mazda — 12, Mitsubishi — 10, Dacia — 8, Seat — 8, Chevrolet — 8, Honda — 7, Mercedes — 3

Each row label: "`{Brand}` Yedek Parça" (e.g. "Fiat Yedek Parça").

Section title: "Tüm Araç Markaları ve Modelleri" / subtitle "Aracınızın markasını seçerek uyumlu yedek parçalara ulaşın".

## Responsive Behavior
- **Desktop (1440px):** 4 columns.
- **Tablet (768px):** 2 columns.
- **Mobile (390px):** 1 column.
- **Breakpoint:** `sm` (640px) → 2 col, `lg` (1024px) → 4 col.
