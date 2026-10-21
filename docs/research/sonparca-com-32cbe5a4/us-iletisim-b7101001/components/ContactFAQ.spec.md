# ContactFAQ Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-iletisim-b7101001/ContactFAQ.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-iletisim-b7101001/desktop-faq-footer-top.jpg`
- **Interaction model:** click-driven (each item independently toggleable, NOT single-open accordion)

## DOM Structure
```
section.py-8.bg-gray-50
  div.max-w-4xl.mx-auto.px-4.sm:px-6.lg:px-8
    section.w-full  (zx-faq-accordion internal wrapper)
      h2.text-lg.font-semibold.mb-4 "İletişim - Sıkça Sorulan Sorular"
      div.space-y-3
        div.border.border-gray-200.rounded-md.overflow-hidden  (x3, one per FAQ item)
          button.w-full.px-4.sm:px-5.py-3.sm:py-4.text-left.bg-white.hover:bg-gray-50.transition-colors.duration-150.cursor-pointer.flex.items-center.justify-between.gap-3
            h3.font-medium.text-sm.sm:text-base  (question)
            [chevron icon — expand_more(closed)/expand_less(open)]
          [answer paragraph, shown only when open]
```

Note: this is a DIFFERENT visual pattern from the existing `FAQAccordion.tsx` built for the product-detail page (that one is a single bordered container with `divide-y` rows and a `ChevronRight` that rotates 90°, single accordion look). This contact-page FAQ uses separate bordered/rounded boxes per item with `space-y-3` gaps between them, and each item toggles independently (verified: opening all 3 simultaneously is possible). Build a new local component rather than reusing/mutating the shared one, to avoid regressing the product page.

## Computed Styles (exact Tailwind classes)
- section: `py-8 bg-gray-50`
- container: `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`
- heading: `text-lg font-semibold text-gray-900 mb-4` (map source's `text-light-text-primary` custom token to our project's `text-gray-900`/`text-light-text-primary` equivalent — check `globals.css`; if `text-light-text-primary` token already exists in this project use it, else `text-gray-900`)
- items wrapper: `space-y-3`
- each item box: `border border-gray-200 rounded-md overflow-hidden`
- button: `w-full px-4 sm:px-5 py-3 sm:py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3`
- question: `font-medium text-sm sm:text-base` (dark text color)
- icon wrapper: centered, `text-gray-400`-ish muted color (source used `text-light-text-muted`)
- answer paragraph (when open): padded below the button, muted gray text, e.g. `px-4 sm:px-5 pb-4 text-sm text-gray-600`

## States & Behaviors

### Click — toggle open/closed (per item, independent)
- **Trigger:** click on the item's `<button>`.
- **State A (closed):** icon = chevron-down (source `expand_more`), answer hidden.
- **State B (open):** icon = chevron-up (source `expand_less`), answer visible below the question.
- **Transition:** use a smooth height/opacity transition (`grid-rows-[0fr]→[1fr]` + opacity, matching the pattern already established in the sibling `FAQAccordion.tsx` at `src/components/sites/sonparca-com-32cbe5a4/urun-detayi-.../FAQAccordion.tsx`) for consistency of feel across the site — source didn't reveal exact transition timing beyond the button's `duration-150` hover, so this is a safe, non-regressive default. Icon rotation: `rotate-180` transition `duration-200`.
- Each item's open state is independent local state (array/set of open indices, or per-item `useState`), NOT a single "openIndex" — multiple items can be open at once (differs from the existing product-page FAQAccordion which is exclusive-open).

### Hover
- Button: `bg-white` → `hover:bg-gray-50`, `transition-colors duration-150`.

## Per-State Content (verbatim, all 3 items + their answers, extracted by clicking each one)

1. **Q:** "Müşteri hizmetlerine nasıl ulaşabilirim?"
   **A:** "Bize 0850 302 25 08 numaralı telefondan veya destek@sonparca.com e-posta adresi üzerinden ulaşabilirsiniz. WhatsApp destek hattımız da mevcuttur."

2. **Q:** "Çalışma saatleriniz nedir?"
   **A:** "Müşteri hizmetlerimiz hafta içi 09:00-18:00 saatleri arasında hizmet vermektedir. Online mağazamız üzerinden 7/24 sipariş verebilirsiniz."

3. **Q:** "Siparişimle ilgili kime başvurmalıyım?"
   **A:** "Siparişinizle ilgili tüm sorularınız için 0850 302 25 08 numaralı müşteri hizmetleri hattımızı arayabilir veya hesabınızdaki sipariş detayları üzerinden bize ulaşabilirsiniz."

## Assets
None (lucide-react `ChevronDown`/`ChevronUp` or a single `ChevronDown` with `rotate-180` class toggle).

## Responsive Behavior
- **Desktop (≥640px, `sm:`):** more horizontal/vertical button padding (`px-5 py-4`), slightly larger question text (`text-base`).
- **Mobile (<640px):** tighter padding (`px-4 py-3`), `text-sm` question text.
- **Breakpoint:** 640px (`sm:`).
