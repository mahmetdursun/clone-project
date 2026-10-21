# SummaryStep Component Spec (Stage 4 of the wizard, "Ozet")

## Overview
- Target file: `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/SummaryStep.tsx`
- Interaction model: click-driven, mock "add to cart" (local state only, no real backend per project scope).

## DOM structure
```
<div>
  <SelectedVehicleBar .../>
  <button class="mt-4 flex items-center gap-1 text-sm font-medium text-sp-accent" onClick={onBackToParts}><ArrowLeft class="size-4"/> Adımlara dön</button>
  <div class="mt-4 rounded-lg border border-gray-200">
    <div class="flex items-center gap-2 border-b border-gray-100 p-5">
      <Receipt class="size-5 text-sp-accent" />
      <div><h2 class="font-bold text-light-text-primary">Seçim Özeti</h2><p class="text-sm text-light-text-muted">{pkg.title} · {vehicle.brand} {vehicle.model}</p></div>
    </div>
    <div class="divide-y divide-gray-100">
      {lineItems.map(item => (
        <div class="flex items-center gap-4 p-5">
          <span class="text-xs font-semibold uppercase text-sp-accent">{item.categoryName}</span>
          <div class="relative size-14 shrink-0 rounded bg-gray-50"><Image .../></div>
          <div class="min-w-0 flex-1">
            <p class="truncate font-medium text-light-text-primary">{item.name}</p>
            <p class="text-xs text-gray-400">{item.brand}</p>
          </div>
          <div class="flex items-center rounded-md border border-gray-200">
            <button><Minus class="size-3.5"/></button><span class="w-6 text-center text-sm">{item.qty}</span><button><Plus class="size-3.5"/></button>
          </div>
          <button class="text-gray-300 hover:text-red-500"><Trash2 class="size-4"/></button>
          <span class="w-24 text-right font-bold text-sp-accent">{item.price} TL</span>
        </div>
      ))}
    </div>
    <div class="flex items-center justify-between p-5">
      <p class="text-sm text-gray-500">{itemCount} ürün · {totalQty} adet</p>
      <button class="flex items-center gap-2 rounded-md bg-sp-accent px-5 py-2.5 text-sm font-semibold text-white"><ShoppingCart class="size-4"/> Tümünü Sepete Ekle</button>
    </div>
  </div>

  <section class="mt-8">
    <h2 class="flex items-center gap-2 font-bold text-light-text-primary"><Sparkles class="size-5 text-sp-accent"/> Bakımınız Bitmedi mi?</h2>
    <p class="text-sm text-light-text-muted mt-1">Aracınız için başka bir bakım paketiyle devam edin. Seçtiğiniz parçalar otomatik olarak sepetinize eklenir.</p>
    <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {remainingPackages.map(pkg => (
        <button class="flex items-start gap-3 rounded-lg border border-gray-200 p-4 text-left hover:border-sp-accent">
          <div class="size-12 shrink-0 rounded bg-gray-50 flex items-center justify-center">{icon}</div>
          <div class="min-w-0">
            <h3 class="font-medium text-light-text-primary">{pkg.title}</h3>
            <p class="line-clamp-2 text-xs text-light-text-muted mt-0.5">{pkg.description}</p>
            <div class="mt-1.5 flex items-center gap-3 text-xs">
              <span class="text-gray-400">{pkg.groupCount} adım</span>
              <span class="flex items-center gap-1 font-medium text-sp-accent">Devam et <ArrowRight class="size-3.5"/></span>
            </div>
          </div>
        </button>
      ))}
    </div>
  </section>
</div>
```

## Text content (verbatim)
- "Adımlara dön", "Seçim Özeti", "Tümünü Sepete Ekle", "Bakımınız Bitmedi mi?", "Aracınız için başka bir bakım paketiyle devam edin. Seçtiğiniz parçalar otomatik olarak sepetinize eklenir."
- Cross-sell cards: same 8 package titles/descriptions as `PackageSelectionStep` MINUS whichever package is currently active; "N adım" label (same count as "N kategori gurubu" from Stage 2) + "Devam et" (not "Başla").

## Behavior
- "Tümünü Sepete Ekle": since there is no real cart/backend, on click show a lightweight local confirmation (toggle label to "Eklendi" with a check icon for a few seconds) — no real cart persistence.
- Qty +/- and trash icon mutate the lifted `selections` state (trash removes the line item entirely).
- Clicking a cross-sell card calls `onContinueWithPackage(pkg)` which the parent page uses to jump back into Stage 3 scoped to that package while KEEPING existing selections.

## Props
`{ vehicle, pkg, selections, allPackages, onQtyChange, onRemove, onBackToParts, onContinueWithPackage }`

## Assets
lucide-react: `ArrowLeft`, `Receipt`, `Minus`, `Plus`, `Trash2`, `ShoppingCart`, `Sparkles`, `ArrowRight`.
