# ChassisNumberTab Specification

## Overview
- Target file: `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/ChassisNumberTab.tsx`
- Interaction model: click/type-driven, static (no backend VIN lookup — mock only, per project scope).

## DOM structure
```
<div class="rounded-lg border border-orange-100 bg-orange-50 p-4 flex items-start justify-between gap-4">
  <div class="flex items-start gap-3">
    <span icon-badge #> </span>
    <div><strong>17 Haneli Şasi Numarası</strong><p>Ruhsatınızdaki şasi numarasını girerek aracınızı hızlıca bulun</p></div>
  </div>
  <a class="text-sm text-sp-accent shrink-0">? Nerede Bulurum?</a>
</div>
<div class="mt-4 flex gap-2">
  <div class="relative flex-1">
    <input placeholder="ÖRN: WBAGN61050DW12345" maxLength={17} />
    <span class="absolute right-3 ... text-xs text-gray-400">{value.length}/17</span>
  </div>
  <button class="bg-sp-accent text-white rounded-md px-5 flex items-center gap-2">
    <Search /> Araç Bul
  </button>
</div>
<p class="mt-3 text-sm text-gray-500 text-center">
  Şasi numarasını bilmiyor musunuz? <button class="text-sp-accent font-medium">Araç özelliklerini seçin →</button>
</p>
```

## Text content (verbatim)
- "17 Haneli Şasi Numarası"
- "Ruhsatınızdaki şasi numarasını girerek aracınızı hızlıca bulun"
- "Nerede Bulurum?"
- placeholder: "ÖRN: WBAGN61050DW12345"
- "Araç Bul"
- "Şasi numarasını bilmiyor musunuz?"
- "Araç özelliklerini seçin →"

## Behavior
- Controlled input, `useState<string>("")`, uppercase transform, capped at 17 chars, live counter "N/17".
- "Araç Bul" button: disabled unless length === 17; on click, since there's no backend, show a simple inline message "Bu özellik demo modunda kullanılamıyor" OR (preferred, simpler and matches scope) just no-op / console log — keep UI honest that it's a mock.
- "Araç özelliklerini seçin →" click calls a prop `onSwitchToVehicleTab()` to switch the parent tab back to "Araç Seçin".

## Props
`{ onSwitchToVehicleTab: () => void }`

## Assets
lucide-react: `Hash` (# icon badge), `HelpCircle` or `CircleHelp`, `Search`.
