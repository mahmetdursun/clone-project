# ValuesGrid Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/ValuesGrid.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/desktop-2-values-nedenbiz.jpg` (top portion, "Değerlerimiz")
- **Interaction model:** hover-only (card shadow)

## DOM Structure (per card)
```
<section class="w-full py-12 md:py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">Değerlerimiz</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-6 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 mr-3">
            <!-- icon -->
          </div>
          <h3 class="text-lg font-semibold text-gray-800">Kalite</h3>
        </div>
        <p class="text-gray-600">Daima en kaliteli yedek parçaları sunmak için çalışıyoruz.</p>
      </div>
      <!-- x4 total -->
    </div>
  </div>
</section>
```

## Computed Styles
- Section bg: `bg-gray-50` = rgb(249,250,251), `py-12 md:py-16`
- h2: fontSize 31.248px (`text-3xl` md), fontWeight 600, color rgb(31,41,55), `mb-8`, centered
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6` (gap = 24px)
- Card: backgroundColor white, borderRadius 6px, padding 24px, boxShadow = Tailwind `shadow-sm` at rest, `shadow-md` on hover, `transition-shadow duration-300` (300ms)
- Icon chip: `w-10 h-10` (40x40px), `rounded-md` (6px), `bg-blue-50` = rgb(239,246,255), icon color `text-blue-600` = rgb(37,99,235), `mr-3` (12px) gap to title
- Card title h3: fontSize 18px (`text-lg`), fontWeight 600, color rgb(31,41,55)
- Card description p: fontSize 16px, color rgb(75,85,99)

## States & Behaviors
### Hover
- **Element:** each value card
- **Trigger:** `:hover`
- **Before:** `shadow-sm` (0 1px 3px rgba(0,0,0,.08), 0 1px 2px -1px rgba(0,0,0,.08))
- **After:** `shadow-md` (0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1))
- **Transition:** `transition-shadow duration-300` (box-shadow only, 300ms, default ease)

## Assets
Icons: Material Symbols glyphs on source site → mapped to lucide-react equivalents (icon-library substitution, matching project convention of Lucide icons):
- "verified" → `BadgeCheck`
- "handshake" → `Handshake`
- "local_shipping" → `Truck`
- "build" → `Wrench`
All icons rendered at `size-5` (20px) inside the 40x40 chip, color `text-blue-600`.

## Text Content (verbatim, 4 cards in order)
1. Kalite — "Daima en kaliteli yedek parçaları sunmak için çalışıyoruz."
2. Güven — "Müşteri memnuniyeti ve güven bizim için en önemli değerlerdir."
3. Hızlı Teslimat — "Siparişlerinizi en kısa sürede size ulaştırmak için çalışıyoruz."
4. Uzmanlık — "Alanında uzman ekibimizle doğru parçayı seçmenize yardımcı oluyoruz."

## Responsive Behavior
- **Desktop (≥1024px, `lg:`):** 4 columns
- **Tablet (640–1023px, `sm:`):** 2 columns
- **Mobile (<640px):** 1 column
- **Breakpoints:** 640px (`sm`), 1024px (`lg`)
