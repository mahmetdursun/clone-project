# WizardFaqSection Specification

## Overview
- Target file: `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/WizardFaqSection.tsx`
- Interaction model: click-driven accordion (each item toggles independently, same pattern as existing `FAQAccordion.tsx` in `us-hakkimizda-b3c2dffd`/`urun-detayi-.../FAQAccordion.tsx` — reuse that visual convention: chevron rotates 180deg on open, border-b divider between items).

## DOM structure
```
<section class="mt-10">
  <h2 class="text-lg font-bold text-light-text-primary mb-4">Sıkça Sorulan Sorular</h2>
  <div class="divide-y divide-gray-200 rounded-lg border border-gray-200">
    {items.map(item => (
      <div>
        <button class="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-light-text-primary">
          {item.q} <ChevronDown class={cn("size-4 transition-transform", open && "rotate-180")} />
        </button>
        {open && <p class="px-5 pb-4 text-sm text-light-text-muted">{item.a}</p>}
      </div>
    ))}
  </div>
</section>
```

## Text content (verbatim — questions confirmed live; answers are reasonable mock copy consistent with the site's tone since accordions were not expanded during recon, kept brief and on-topic)
1. Q: "Bakım Robotu nedir ve nasıl çalışır?" — A: "Bakım Robotu, aracınızı tanımlamanızın ardından size özel bakım paketleri ve uyumlu parçaları adım adım sunan akıllı bir seçim asistanıdır."
2. Q: "Seçtiğim parçalar aracıma uygun mu?" — A: "Evet. Marka, model, yıl, yakıt ve motor hacmi bilgilerinize göre yalnızca aracınıza uygun parçalar listelenir."
3. Q: "Bir adımı atlayabilir miyim?" — A: "Opsiyonel olarak işaretlenen adımları 'Atla' butonuyla geçebilirsiniz. Zorunlu adımlarda devam etmek için bir seçim yapmanız gerekir."
4. Q: "Tüm parçaları tek seferde sepete ekleyebilir miyim?" — A: "Evet. Özet ekranındaki 'Tümünü Sepete Ekle' butonuyla seçtiğiniz tüm parçaları tek seferde sepetinize ekleyebilirsiniz."

## Assets
lucide-react: `ChevronDown`.
