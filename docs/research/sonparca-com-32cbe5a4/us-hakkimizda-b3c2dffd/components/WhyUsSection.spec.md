# WhyUsSection Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/WhyUsSection.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/desktop-2-values-nedenbiz.jpg` (bottom portion, "Neden Biz?")
- **Interaction model:** static (no hover effect observed on these items — no `hover:` classes present)

## DOM Structure (per item)
```
<section class="w-full py-12 md:py-16 bg-white">
  <div class="container mx-auto px-4">
    <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center">Neden Biz?</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="text-center">
        <div class="w-16 h-16 bg-blue-50 rounded-md flex items-center justify-center mx-auto mb-4">
          <!-- icon, text-2xl text-blue-600 -->
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Kaliteli Ürünler</h3>
        <p class="text-gray-600">Sadece güvenilir üreticilerden tedarik ettiğimiz orijinal ve muadil ürünlerle hizmet veriyoruz.</p>
      </div>
      <!-- x3 total -->
    </div>
  </div>
</section>
```

## Computed Styles
- Section bg: white, `py-12 md:py-16`
- h2: same as other sections — `text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-center`
- Grid: `grid-cols-1 md:grid-cols-3 gap-8` (32px gap)
- Icon chip: `w-16 h-16` (64x64px), `bg-blue-50` rounded-md, centered via `mx-auto`, `mb-4`; icon itself `text-2xl` (24px) `text-blue-600`
- Item title h3: `text-lg font-semibold text-gray-800 mb-2`, centered (`text-center` on parent)
- Item description p: `text-gray-600`, centered

## States & Behaviors
N/A — no hover/click classes present on this section's markup.

## Assets
Icons (Material Symbols → lucide-react):
- "star" → `Star`
- "schedule" → `Clock`
- "support_agent" → `Headphones`
All rendered at `size-6` (24px), color `text-blue-600`, centered in the 64x64 chip.

## Text Content (verbatim, 3 items in order)
1. Kaliteli Ürünler — "Sadece güvenilir üreticilerden tedarik ettiğimiz orijinal ve muadil ürünlerle hizmet veriyoruz."
2. Hızlı Teslimat — "Siparişlerinizi hızlı bir şekilde hazırlayıp, güvenilir kargo firmalarımızla adresinize ulaştırıyoruz."
3. Teknik Destek — "Uzman ekibimiz, parça seçimi ve teknik konularda her türlü desteği size sunmaktadır."

## Responsive Behavior
- **Desktop (≥768px, `md:`):** 3 columns
- **Mobile (<768px):** 1 column, stacked, each item still centered
- **Breakpoint:** 768px (`md`)
