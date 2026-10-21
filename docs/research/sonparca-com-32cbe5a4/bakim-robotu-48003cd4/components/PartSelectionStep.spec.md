# PartSelectionStep + PartProductCard Specification (Stage 3)

## Overview
- Target files:
  - `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/PartSelectionStep.tsx`
  - `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/PartProductCard.tsx`
- Interaction model: click-driven; inner pill sub-tabs (jump to any category) + sequential Geri/Atla/İleri nav; per-product Seç → qty stepper + Seçildi.

## PartSelectionStep DOM structure
```
<div>
  <SelectedVehicleBar .../>
  <div class="mt-6 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <button onClick={onBackToPackages}><ArrowLeft /></button>
      <h2 class="font-semibold text-lg text-light-text-primary">{pkg.title}</h2>
    </div>
    <button class="flex items-center gap-2 rounded-md bg-orange-50 px-4 py-2 text-sm font-semibold text-sp-accent">
      <ShoppingCart class="size-4" /> Seçilenler ({totalSelectedCount})
    </button>
  </div>
  <div class="mt-4 flex flex-wrap gap-2">
    {pkg.categories.map((cat, i) => (
      <button class={cn("flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium", i===activeIndex ? "bg-sp-accent text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
        <span class="flex size-4 items-center justify-center rounded-full text-[10px]">{i+1}</span> {cat.name}
      </button>
    ))}
  </div>
  <div class="mt-4 rounded-lg border border-gray-200 p-5">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <h3 class="font-semibold text-light-text-primary">{cat.name}</h3>
        <span class="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-gray-500">Opsiyonel</span>
      </div>
      <span class="text-sm text-gray-400">{activeIndex+1} / {pkg.categories.length}</span>
    </div>
    {cat.products.length === 0 ? <EmptyCategoryState /> : (
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cat.products.map(p => <PartProductCard key={p.id} product={p} selection={selections[p.id]} onSelect={...} onQtyChange={...} />)}
      </div>
    )}
  </div>
  <div class="mt-4 flex items-center justify-between rounded-lg border border-gray-200 p-4">
    <button class="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium disabled:opacity-40" disabled={activeIndex===0}><ArrowLeft class="size-4"/> Geri</button>
    <button class="text-sm text-gray-500 hover:text-gray-700">Atla</button>
    <button class="flex items-center gap-2 rounded-md bg-sp-accent px-5 py-2.5 text-sm font-semibold text-white">
      {isLast ? <>Özete Git <Receipt class="size-4" /></> : <>İleri <ArrowRight class="size-4" /></>}
    </button>
  </div>
</div>
```

`EmptyCategoryState`:
```
<div class="flex flex-col items-center gap-2 py-12 text-center text-gray-400">
  <LockKeyholeOpen class="size-8" />
  <p class="text-sm">Bu adım için aracınıza uygun ürün bulunamadı.</p>
  <p class="text-sm">Bu adım opsiyonel; "Atla" diyerek devam edebilirsiniz.</p>
</div>
```

## PartProductCard DOM & states
```
<div class="overflow-hidden rounded-lg border border-gray-200">
  <div class="h-1 w-full bg-green-500" /> {/* in-stock accent bar */}
  <div class="relative aspect-square bg-gray-50"><Image .../></div>
  <div class="p-3 space-y-1">
    <div class="flex items-center justify-between">
      <span class="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-gray-500">{brand}</span>
      <span class="flex items-center gap-1 text-xs font-medium text-green-600"><Check class="size-3" /> Stokta</span>
    </div>
    <p class="text-base font-bold text-sp-accent">{price} TL</p>
    <p class="line-clamp-2 text-sm font-medium text-light-text-primary">{name}</p>
    <p class="truncate text-[10px] text-gray-400">{sku}</p>
    {!selected ? (
      <button class="mt-2 w-full rounded-md border border-sp-accent py-2 text-sm font-medium text-sp-accent flex items-center justify-center gap-1"><Plus class="size-4"/> Seç</button>
    ) : (
      <div class="mt-2 flex items-center gap-2">
        <div class="flex items-center rounded-md border border-gray-200">
          <button class="flex size-8 items-center justify-center text-gray-400"><Minus class="size-3.5"/></button>
          <span class="w-6 text-center text-sm">{qty}</span>
          <button class="flex size-8 items-center justify-center text-gray-400"><Plus class="size-3.5"/></button>
        </div>
        <button class="flex flex-1 items-center justify-center gap-1 rounded-md bg-sp-accent py-2 text-sm font-medium text-white"><Check class="size-4"/> Seçildi</button>
      </div>
    )}
  </div>
</div>
```

## Real content — "Periyodik Bakım Bileşenleri" package, 5 categories (verbatim from live extraction; other 7 packages get mock category/product data in `data.ts` following the same shape — same level of realism, generic plausible Turkish part names/brands/prices, NOT literal copy-paste since only this one package's product data was captured live)

1. **Hava Filtresi** (OPSİYONEL, 1/5) — 2 products:
   - Bosch Hava Filtresi F026400114 — BOSCH — 608,94 TL — SKU BR1000ST066536VH00000 — Stokta
   - Sonparça Hava Filtresi WA21050 — SONPARÇA — 438,62 TL — SKU BR1000ST099451VH00000 — Stokta
2. **Yağ Filtresi** (OPSİYONEL, 2/5) — 1 product:
   - Bosch Yağ Filtresi F026407092-F026407397 — BOSCH — 308,04 TL — SKU BR1000ST043612VH00000 — Stokta
3. **Polen Filtresi** (OPSİYONEL, 3/5) — 3 products:
   - Bosch Polen Filtresi 09864B5006 — BOSCH — 176,57 TL — SKU BR1000ST087424VH00000
   - Sonparça Polen Filtresi WPYZZ08 — SONPARÇA — 99,50 TL — SKU BR1000ST085918VH00000
   - Orjinal Polen Filitre Kapağı 8854842020 — ORJINAL — 542,88 TL — SKU BR1000ST128238VH00000
4. **Yakıt Filtresi** (OPSİYONEL, 4/5) — EMPTY state ("Bu adım için aracınıza uygun ürün bulunamadı.")
5. **Yağ** (OPSİYONEL, 5/5) — EMPTY state (same copy)

## Props
- `PartSelectionStep`: `{ vehicle, pkg: PackageWithCategories, onBackToPackages: () => void, onGoToSummary: (selections) => void }`
- `PartProductCard`: `{ product: PartProduct, qty: number, selected: boolean, onToggle: () => void, onQtyChange: (qty:number) => void }`

## Behavior notes
- Clicking a pill sub-tab jumps `activeIndex` directly (no validation).
- "Geri" disabled on first category, otherwise decrements `activeIndex`.
- "Atla"/"İleri" both advance `activeIndex`; on the last category the primary button becomes "Özete Git" and calls `onGoToSummary`.
- Selecting/deselecting a product updates a package-scoped `selections` map lifted to the parent page so the "Seçilenler (N)" counter and Stage 4 summary stay in sync.
- Product image/name/brand click is a plain non-navigating element in this clone (no product-detail deep link needed for mock data) — do not wire real `/urun-detayi/...` routes except optionally for the one already-cloned SKU if trivial; otherwise omit the link entirely to avoid a dead route.

## Assets
lucide-react: `ArrowLeft`, `ArrowRight`, `ShoppingCart`, `Receipt`, `LockKeyholeOpen`, `Check`, `Plus`, `Minus`.
