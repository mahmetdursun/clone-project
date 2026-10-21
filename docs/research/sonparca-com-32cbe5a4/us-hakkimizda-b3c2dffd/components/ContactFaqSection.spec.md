# ContactFaqSection Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/ContactFaqSection.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-hakkimizda-b3c2dffd/desktop-3-contact-faq.jpg`
- **Interaction model:** click-driven (FAQ accordion); contact pills are static

## DOM Structure
```
<section class="w-full py-12 md:py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">İletişime Geçin</h2>
      <p class="text-gray-600 mb-6">Her türlü soru ve önerileriniz için bizimle iletişime geçebilirsiniz. Size yardımcı olmaktan memnuniyet duyarız.</p>
      <div class="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <div class="bg-white p-4 rounded-md shadow-sm flex items-center">
          <div class="mr-3 text-blue-600"><!-- Phone icon --></div>
          <div class="text-left">
            <p class="text-gray-500 text-sm mb-1">Telefon</p>
            <p class="text-gray-800 font-medium">0850 302 25 08</p>
          </div>
        </div>
        <div class="bg-white p-4 rounded-md shadow-sm flex items-center">
          <div class="mr-3 text-blue-600"><!-- Mail icon --></div>
          <div class="text-left">
            <p class="text-gray-500 text-sm mb-1">E-posta</p>
            <p class="text-gray-800 font-medium">destek@sonparca.com</p>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ accordion, NOT inside the max-w-3xl centered wrapper -->
    <div>
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Hakkımızda - Sıkça Sorulan Sorular</h2>
      <div class="space-y-3">
        <div class="border border-gray-200 rounded-md overflow-hidden">
          <button type="button" class="w-full px-4 sm:px-5 py-3 sm:py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between gap-3">
            <h3 class="font-medium text-gray-800 text-sm sm:text-base">Son Parça hangi markaların parçalarını satıyor?</h3>
            <!-- ChevronDown (closed) / ChevronUp (open) icon, text-gray-400 -->
          </button>
          <div role="region" class="px-4 sm:px-5 pb-4 bg-gray-50 border-t border-gray-100">
            <p class="text-gray-500 text-sm leading-relaxed pt-3">Mercedes, Audi, Volkswagen, Ford, Opel, Renault, Peugeot, Toyota, Honda ve 50'den fazla markanın orijinal ve muadil yedek parçalarını sunuyoruz.</p>
          </div>
        </div>
        <!-- x3 total, each independently toggleable -->
      </div>
    </div>
  </div>
</section>
```

## Computed Styles
- Section bg: `bg-gray-50`, `py-12 md:py-16`
- Intro block: `max-w-3xl mx-auto text-center`; h2 `text-2xl md:text-3xl font-semibold text-gray-800 mb-4`; p `text-gray-600 mb-6`
- Contact pill row: `flex flex-col sm:flex-row justify-center gap-4 mb-8`
- Contact pill card: `bg-white p-4 rounded-md shadow-sm flex items-center`; icon wrap `mr-3 text-blue-600`; label p `text-gray-500 text-sm mb-1`; value p `text-gray-800 font-medium`
- FAQ block heading: `text-lg font-semibold text-gray-800 mb-4` (note: smaller/left-aligned than the section h2 above it, and NOT wrapped in the `max-w-3xl` centered container — full container width)
- FAQ item wrapper: `border border-gray-200 rounded-md overflow-hidden`; list wrapper `space-y-3` (12px gap between items)
- FAQ button: `w-full px-4 sm:px-5 py-3 sm:py-4 text-left bg-white hover:bg-gray-50 transition-colors`, flex row with question + chevron, `justify-between`
- FAQ question text: `font-medium text-gray-800 text-sm sm:text-base`
- FAQ answer panel: `role="region"`, `px-4 sm:px-5 pb-4 bg-gray-50 border-t border-gray-100`; answer text `text-gray-500 text-sm leading-relaxed pt-3`

## States & Behaviors
### FAQ accordion — click-driven, multi-open (independent toggles, NOT exclusive)
- **Trigger:** click on question button
- **State A (closed):** icon = ChevronDown, answer panel not rendered
- **State B (open):** icon = ChevronUp, answer panel rendered below with `bg-gray-50 border-t border-gray-100` and slide/fade look
- **Transition:** use the existing sibling pattern from `src/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/FAQAccordion.tsx` (grid-rows `1fr`/`0fr` + opacity, `transition-all duration-200 ease-out`) for a smooth expand, but **each item's open state must be independent** (use an array/Set of open indices, not a single `openIndex`, since the live site allows multiple simultaneously open — confirmed by clicking all 3 in sequence and all remained open).
- Icon swap: `ChevronDown` (lucide) when closed → `ChevronUp` (lucide) when open (glyph swap, matches source `expand_more`/`expand_less` swap; do not just rotate one icon).
### Button hover
- `bg-white` → `hover:bg-gray-50`, `transition-colors`

## Assets
Icons (Material Symbols → lucide-react):
- "call" → `Phone`
- "email" → `Mail`
- "expand_more" → `ChevronDown`, "expand_less" → `ChevronUp`

## Text Content (verbatim)
- Heading: "İletişime Geçin"
- Paragraph: "Her türlü soru ve önerileriniz için bizimle iletişime geçebilirsiniz. Size yardımcı olmaktan memnuniyet duyarız."
- Contact pill 1: label "Telefon", value "0850 302 25 08"
- Contact pill 2: label "E-posta", value "destek@sonparca.com"
- FAQ heading: "Hakkımızda - Sıkça Sorulan Sorular"
- FAQ items (question / answer):
  1. "Son Parça hangi markaların parçalarını satıyor?" / "Mercedes, Audi, Volkswagen, Ford, Opel, Renault, Peugeot, Toyota, Honda ve 50'den fazla markanın orijinal ve muadil yedek parçalarını sunuyoruz."
  2. "Son Parça mağazası nerede?" / "Fiziksel mağazamız Avcılar Sanayi Sitesi No:10 (Oto Yılmaz Yedek Parça Yanı), 34325 Avcılar/İstanbul adresinde bulunmaktadır. Ayrıca online mağazamız üzerinden 7/24 sipariş verebilirsiniz."
  3. "Son Parça'nın avantajları nelerdir?" / "Geniş ürün yelpazesi, uygun fiyat garantisi ve hızlı kargo başlıca avantajlarımızdır. Şasi numarası ile %100 uyumlu parça bulma imkanı sunuyoruz. Müşteri memnuniyeti odaklı hizmet anlayışımızla her zaman yanınızdayız."

## Responsive Behavior
- **Desktop (≥640px, `sm:`):** contact pills in a row, FAQ button padding `px-5 py-4`, question text `text-base`
- **Mobile (<640px):** contact pills stacked, FAQ button padding `px-4 py-3`, question text `text-sm`
- **Breakpoint:** 640px (`sm`)
