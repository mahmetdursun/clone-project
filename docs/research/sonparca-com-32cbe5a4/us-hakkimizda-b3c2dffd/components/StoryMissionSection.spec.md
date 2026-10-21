# StoryMissionSection Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/StoryMissionSection.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/desktop-1-hero-story.jpg` (bottom portion)
- **Interaction model:** static

## DOM Structure
```
<section class="w-full py-12 md:py-16 bg-white">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Son Parça Hikayemiz</h2>
        <p class="text-gray-600 mb-4">...paragraph 1...</p>
        <p class="text-gray-600">...paragraph 2...</p>
      </div>
      <div class="flex justify-center">
        <div class="w-full max-w-md p-6 bg-gray-50 rounded-md shadow-sm">
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-800 mb-3">Misyonumuz</h3>
            <p class="text-gray-600">...</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold text-gray-800 mb-3">Vizyonumuz</h3>
            <p class="text-gray-600">...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

## Computed Styles
- Section bg: white, `py-12 md:py-16`
- Grid: `grid-cols-1 md:grid-cols-2 gap-8 items-center`
- h2 "Son Parça Hikayemiz": fontSize 31.248px (`text-3xl` at md), fontWeight 600, color rgb(31,41,55), marginBottom 16px
- Body paragraphs: fontSize 16px, color rgb(75,85,99) = `text-gray-600`, lineHeight 24px, `mb-4` on first paragraph only
- Mission/Vision card wrapper: `flex justify-center` outer, inner card `w-full max-w-md p-6 bg-gray-50 rounded-md shadow-sm` — backgroundColor rgb(249,250,251), borderRadius 6px, padding 24px, boxShadow `0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.08)` (Tailwind `shadow-sm`), maxWidth 448px
- h3 ("Misyonumuz"/"Vizyonumuz"): fontSize 20px (`text-xl`), fontWeight 600, color rgb(31,41,55), marginBottom 12px
- Misyonumuz block has `mb-6` below it separating from Vizyonumuz block; Vizyonumuz block has no bottom margin.

## States & Behaviors
N/A — fully static.

## Assets
None.

## Text Content (verbatim)
- H2: "Son Parça Hikayemiz"
- Paragraph 1: "Son Parça olarak, otomotiv yedek parça sektöründe güvenilir çözümler sunmak amacıyla yola çıktık. Müşterilerimize en kaliteli ürünleri, en uygun fiyatlarla sunarak sektörde fark yaratmayı hedefliyoruz."
- Paragraph 2: "Deneyimli ekibimiz ve güçlü tedarikçi ağımız sayesinde, ihtiyacınız olan yedek parçalara hızlı ve güvenli bir şekilde ulaşmanızı sağlıyoruz. Her zaman müşteri memnuniyetini ön planda tutarak, satış öncesi ve sonrası destek hizmetlerimizle yanınızdayız."
- Misyonumuz heading + body: "Misyonumuz" / "Müşterilerimize en kaliteli otomotiv yedek parçalarını, rekabetçi fiyatlarla sunarak araç bakım ve onarım süreçlerinde güvenilir bir çözüm ortağı olmak."
- Vizyonumuz heading + body: "Vizyonumuz" / "Otomotiv yedek parça sektöründe müşteri memnuniyeti ve ürün kalitesiyle öne çıkan, sektörde referans gösterilen bir marka olmak."

## Responsive Behavior
- **Desktop (≥768px):** 2-column grid, text/mission side by side, `py-16`
- **Mobile (<768px):** 1-column stack (story text first, then mission/vision card below), `py-12`
- **Breakpoint:** 768px (`md`)
