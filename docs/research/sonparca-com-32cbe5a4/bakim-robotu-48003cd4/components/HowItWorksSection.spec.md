# HowItWorksSection Specification

## Overview
- Target file: `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/HowItWorksSection.tsx`
- Interaction model: static.

## DOM structure
```
<section class="mt-10">
  <h2 class="text-center text-xl font-bold text-light-text-primary mb-6">Nasıl Çalışır?</h2>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {steps.map(step => (
      <div class="rounded-lg border border-gray-200 p-5 text-center">
        <span class="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-orange-50 text-sp-accent">{icon}</span>
        <p class="text-sm font-semibold text-sp-accent">{n}. Adım</p>
        <h3 class="mt-1 font-semibold text-light-text-primary">{title}</h3>
        <p class="mt-1 text-sm text-light-text-muted">{desc}</p>
      </div>
    ))}
  </div>
</section>
```

## Text content (verbatim, 4 items)
1. Icon: car (directions_car) — "1. Adım" — "Aracınızı Seçin" — "Marka-model seçin, şasi numarası girin veya garajınızdaki aracı seçin."
2. Icon: wrench (build) — "2. Adım" — "Bakım Paketi Seçin" — "Periyodik bakım, fren bakımı gibi hazır paketlerden birini seçin."
3. Icon: checklist — "3. Adım" — "Parçaları Seçin" — "Her adımda aracınıza uyumlu ürünleri inceleyip sepetinize ekleyin."
4. Icon: shopping_cart — "4. Adım" — "Toplu Sepete Ekleyin" — "Seçtiğiniz tüm parçaları tek seferde sepetinize ekleyin."

## Assets
lucide-react: `Car`, `Wrench`, `ClipboardCheck`, `ShoppingCart`.
