# VehicleCascadeTab Specification

## Overview
- Target file: `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/VehicleCascadeTab.tsx`
- Interaction model: click-driven, 5-level CASCADE (see BEHAVIORS.md). Each level click advances immediately; no explicit "next" button within the cascade.
- Reuses the same 28-brand list style as `root-8a5edab2/VehicleFinder.tsx` but implements the FULL cascade (brand→model→year→fuel→engine) which the homepage widget does not.

## Levels (state machine)
`level: "brand" | "model" | "year" | "fuel" | "engine"`, plus accumulated `selection: { brand?, model?, year?, fuel?, engine? }`.

1. **brand** — badge "1", title "Araç Markası", counter "28 seçenek". Search input `Ara...`. Grid of 28 brand buttons (`grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3`). Click brand → append chip, level="model".
2. **model** — badge "2", title "Araç Modeli", counter "{N} seçenek" (mock: use a fixed representative list of ~10-13 model names per brand from `data.ts`, may reuse the same generic mock list across brands to stay in-scope for a static clone). Grid of model buttons (image thumbnail placeholder + name) `grid-cols-3 sm:grid-cols-4 lg:grid-cols-7`. Click → append chip, level="year".
3. **year** — badge "3", title "Üretim Yılı", counter "{N} seçenek". Grid of years e.g. 1987-2024 (`grid-cols-4 sm:grid-cols-6 lg:grid-cols-7`). Click → append chip, level="fuel".
4. **fuel** — badge "4", title "Yakıt", counter "2 seçenek". Two buttons "Benzin" / "Dizel" (`flex gap-3`, NOT full grid). Click → append chip, level="engine".
5. **engine** — badge "5", title "Motor Hacmi", counter "2 seçenek". Two buttons e.g. "1.3"/"1.6". Click → call `onVehicleComplete({brand, model, year, fuel, engine})`.

## Breadcrumb chips
Row above the search input, `flex flex-wrap gap-2 mb-4`, rendered only once level > "brand". Each chip: `inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700` + an `X` icon button (lucide, size-3.5) that truncates `selection` back to that level (click chip's X → go back to re-choosing from that point, clearing subsequent levels).

## Per-level header row
`<div class="flex items-center justify-between">` containing:
- Left: `<span class="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">{levelIndex}</span>` + `<h3 class="font-semibold text-light-text-primary">{levelTitle}</h3>`
- Right: `<span class="text-sm text-gray-400">{count} seçenek</span>`

## Search input (all levels except fuel/engine which have too few options)
Same as homepage `VehicleFinder` `BrandStep`: `Search` icon absolute-left, `Ara...` placeholder, `rounded-md border border-gray-200 py-2 pr-3 pl-9 text-sm ... focus-visible:ring-2 focus-visible:ring-sp-accent`.

## Grid item button style
`rounded-md border border-gray-200 py-3 text-center font-medium text-gray-700 transition-colors hover:border-sp-accent/40 hover:bg-orange-50`. Model-level items additionally show a car silhouette thumbnail above the label (use lucide `Car` icon in a gray box as a stand-in — the live site's actual car photos are per-model catalog images we do not have licensed/downloadable equivalents for at mock-data scope).

## Decorative footer (below the grid, "Araç Seçin" tab only, all levels)
- A muted decorative graphic: represent with a simple centered lucide icon trio (`Filter`, `Disc`, `Disc` or similar) at low opacity `text-gray-200`, since the source uses a custom line-art SVG illustration not extractable as a downloadable asset within scope.
- Dark hint bar: `flex items-center gap-2 bg-gray-900 text-gray-300 text-sm rounded-b-lg px-4 py-3 -mx-6 -mb-6 mt-6` (or panel-width) with `HelpCircle` icon (orange) + text that changes per level:
  - brand: "Aracınızı bulmak için marka seçin"
  - model: "Şimdi modelinizi seçin"
  - year: "Üretim yılını seçin"
  - fuel: "Yakıt tipini seçin"
  - engine: "Motor hacmini seçerek tamamlayın"

## Empty search results
"{Kategori} bulunamadı" centered gray text, matches `FilterSidebar` convention.

## Responsive
- Grids collapse to `grid-cols-3` at mobile per BEHAVIORS.md inferred convention.
- Breadcrumb chips wrap (`flex-wrap`).

## Assets
lucide-react: `Search`, `X`, `HelpCircle`, `Car`, `Filter`, `Disc`.
