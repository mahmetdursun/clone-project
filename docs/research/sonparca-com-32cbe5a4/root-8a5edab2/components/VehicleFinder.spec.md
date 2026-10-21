# VehicleFinder Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/VehicleFinder.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/root-8a5edab2/desktop-01-hero-vehicle-finder.jpg`
- **Interaction model:** click-driven (tabs switch panel; brand grid has a live text filter)

## DOM Structure
```
<section class="bg-dark-bg"> (directly under header, full width, no top margin)
  <div container>
    <div header-row flex justify-between>
      <div> icon (briefcase/car) + "Aracınızı Bulun" (bold) + "Aracınıza uygun parçaları bulun" (muted subtitle)
      <div tabs> 3 pill buttons: "# Şasi No", "🚗 Araç Seçin" (active/orange), "🏠 Garajım"
    <div panel bg-white rounded>
      <div step-header> green numbered circle "1" + "Araç Markası" ... right-aligned "28 seçenek"
      <p muted> "Aracınızın markasını seçerek başlayın"
      <input search "Ara...">
      <div grid grid-cols-7 gap-3> 28 brand buttons (Audi, Chery, Chevrolet, Citroen, Cupra, Dacia, Ds, Fiat, Ford, Honda, Hyundai, Kia, Mazda, Mercedes, Mg, Mini, Mitsubishi, Nissan, Opel, Peugeot, Renault, Seat, Skoda, Tesla, Togg, Toyota, Volkswagen, Volvo)
      <img> large greyscale line-art illustration (oil filter / air filter) bottom-right of panel, decorative
    <div status-strip bg-dark-bg-light> help-circle icon (orange) + "Aracınızı bulmak için marka seçin"
```

## Computed Styles
### Section wrapper
- backgroundColor: `#192831`
- padding: `py-6` approx (24px vertical)

### Tab pills
- Inactive: `bg-dark-bg-light` (#2a3d4a), `text-dark-text-primary`, `rounded-md`, `px-4 py-2`
- Active ("Araç Seçin"): `bg-sp-accent` (#ff7222), white text, same radius/padding
- Hover (inactive): background lightens toward `dark-bg-lighter` (#3b4f5c)

### Panel
- backgroundColor: `#ffffff`, `rounded-lg`, padding ~24px, `shadow-sm`
- Step badge "1": `bg-emerald-500`-ish green circle, 24px, white bold number, `rounded-full`
- "28 seçenek" badge: `text-gray-400 text-sm`

### Brand grid
- `grid grid-cols-4 lg:grid-cols-7 gap-3` (7 columns × 4 rows desktop = 28 items)
- Each button: `border border-gray-200 rounded-md py-3 text-center font-medium text-gray-700`, hover → `border-sp-accent/40 bg-orange-50`

### Status strip
- backgroundColor: `#2a3d4a` (dark-bg-light), `text-dark-text-muted`, icon `text-sp-accent`, padding `12px 16px`, full width under panel

## States & Behaviors
- **Tab switch (click-driven):** clicking "Şasi No" / "Garajım" swaps panel content — homepage sweep only captured the "Araç Seçin" (default/active) panel; implement the other two as placeholder panels with the same white-card shell (not fully specified — out of pixel-perfect scope for this pass, but tab buttons themselves must be built pixel-accurate and clickable).
- **Brand search filter:** typing in the "Ara..." input client-side filters the 28 brand buttons by name match (implement with local `useState` + `.filter()`).
- **Brand button click:** starts a drill-down flow — out of homepage scope; make it a no-op `onClick` (or console log) for this clone.

## Assets
- Illustration: decorative line-art of filters — not downloaded (out of critical path); use a simple inline SVG or omit gracefully with equivalent empty space if unavailable.
- Icons: `lucide-react` — `Hash` (Şasi No), `Car` (Araç Seçin), `Warehouse` (Garajım), `HelpCircle` (status strip), `Search` (filter input)

## Text Content (verbatim)
- "Aracınızı Bulun" / "Aracınıza uygun parçaları bulun"
- Tabs: "Şasi No", "Araç Seçin", "Garajım"
- "1" / "Araç Markası" / "28 seçenek"
- "Aracınızın markasını seçerek başlayın"
- Brand list (exact order): Audi, Chery, Chevrolet, Citroen, Cupra, Dacia, Ds, Fiat, Ford, Honda, Hyundai, Kia, Mazda, Mercedes, Mg, Mini, Mitsubishi, Nissan, Opel, Peugeot, Renault, Seat, Skoda, Tesla, Togg, Toyota, Volkswagen, Volvo
- Status strip: "Aracınızı bulmak için marka seçin"

## Responsive Behavior
- **Desktop (1440px):** brand grid 7 columns.
- **Mobile (390px):** brand grid collapses to 3 columns (standard Tailwind `grid-cols-3 sm:grid-cols-4 lg:grid-cols-7`); tabs row wraps if needed, header row stacks (icon+title above tabs).
- **Breakpoint:** `lg` (1024px).
