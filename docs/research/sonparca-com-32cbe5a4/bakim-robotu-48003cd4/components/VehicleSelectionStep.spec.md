# VehicleSelectionStep Specification (Stage 1 shell)

## Overview
- Target file: `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/VehicleSelectionStep.tsx`
- Interaction model: click-driven (tab switch), composes `VehicleCascadeTab`, `ChassisNumberTab`, `GarageTab`, plus static `HowItWorksSection` / `WizardFaqSection` / `WizardSeoContent` below.

## DOM structure
```
<section>
  <header centered> icon(wrench, peach circle bg-orange-50) / h1 "Bakım Robotu" / p subtitle </header>
  <div bordered rounded-lg overflow-hidden>
    <TabBar> Araç Seçin | Şasi No | Garajım </TabBar>
    <div p-6>{activeTab panel}</div>
  </div>
  <HowItWorksSection />
  <WizardFaqSection />
  <WizardSeoContent />
</section>
```

## Text content (verbatim)
- H1: "Bakım Robotu"
- Subtitle: "Aracınıza özel periyodik bakım parçalarını adım adım seçin, tek seferde sepetinize ekleyin. Başlamak için aracınızı seçin."
- Tab labels: "Araç Seçin" (icon: SlidersHorizontal/tune), "Şasi No" (icon: QrCode/qr_code_2), "Garajım" (icon: Warehouse/garage)

## Tab bar styling
`flex border-b border-gray-200`; each tab button `flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 -mb-px`; active = `border-sp-accent text-sp-accent`; inactive = `border-transparent text-gray-500 hover:text-gray-700`.

## Props
`{ onVehicleComplete: (vehicle: SelectedVehicle) => void }` — called by `VehicleCascadeTab` (or the guest link in `GarageTab`, or "Araç Bul" mock in `ChassisNumberTab`) once a full vehicle is resolved, which the parent page uses to advance to Stage 2.

## Responsive
- Icon header, tab bar: unchanged across breakpoints (already narrow).
- Panel padding reduces `p-4` on mobile, `p-6` on `sm:` and up.

## Assets
lucide-react: `SlidersHorizontal`, `QrCode`, `Warehouse`, `Wrench`.
