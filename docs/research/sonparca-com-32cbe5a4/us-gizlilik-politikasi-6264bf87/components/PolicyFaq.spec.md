# PolicyFaq Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-gizlilik-politikasi-6264bf87/PolicyFaq.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-gizlilik-politikasi-6264bf87/desktop-1440-bottom-faq-footer.jpg`
- **Interaction model:** click-driven (independent per-item toggle; confirmed by programmatically clicking all 3 buttons — all opened simultaneously, so this is NOT a single-open accordion)

## DOM Structure
```
<div class="mt-6">
  <section class="w-full">
    <h2 class="text-lg font-semibold text-light-text-primary mb-4">Gizlilik Politikası - Sıkça Sorulan Sorular</h2>
    <div class="space-y-3">
      <div class="border border-gray-200 rounded-md overflow-hidden">  <!-- one per FAQ item -->
        <button class="w-full px-4 sm:px-5 py-3 sm:py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3">
          <h3 class="font-medium text-light-text-primary text-sm sm:text-base">Question</h3>
          <!-- chevron icon, rotates 180deg when open -->
        </button>
        <!-- when open: -->
        <div class="px-4 sm:px-5 pb-4 bg-gray-50 border-t border-gray-100">
          <p class="text-light-text-muted text-sm leading-relaxed pt-3">Answer</p>
        </div>
      </div>
      <!-- x3 -->
    </div>
  </section>
</div>
```
Source uses a custom `<zx-icon>` + `<i class="material-symbols-outlined">expand_more/expand_less</i>` ligature icon. Rebuild with `lucide-react`'s `ChevronDown`, rotating 180° when open — this matches the project's already-built `ContactFAQ.tsx` (`src/components/sites/sonparca-com-32cbe5a4/us-iletisim-b7101001/ContactFAQ.tsx`) exactly; follow that component's implementation pattern (same `useState<Set<number>>` multi-open toggle, same `grid-rows-[0fr]/[1fr]` transition for the answer reveal) for full project consistency. Map `text-light-text-primary` / `text-light-text-muted` (site design-token classes not defined in this project's Tailwind config) to the plain grayscale equivalents already used elsewhere in the project: `text-gray-900`/`text-gray-800` for primary text, `text-gray-600` for muted text.

## Computed Styles (exact literal Tailwind classes)
- Outer margin wrapper: `mt-6`
- `h2`: `text-lg font-semibold text-gray-900 mb-4` (mapped from `text-light-text-primary`)
- List wrapper: `space-y-3`
- Item wrapper: `border border-gray-200 rounded-md overflow-hidden`
- Button: `w-full px-4 sm:px-5 py-3 sm:py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3`
- Question `h3`: `font-medium text-gray-800 text-sm sm:text-base` (mapped from `text-light-text-primary`)
- Chevron icon: `size-5 shrink-0 text-gray-400 transition-transform duration-200`, `rotate-180` class added when open
- Answer wrapper (open state): `px-4 sm:px-5 pb-4 bg-gray-50 border-t border-gray-100`
- Answer `p`: `text-gray-600 text-sm leading-relaxed pt-3` (mapped from `text-light-text-muted`)

## States & Behaviors

### Click-to-toggle accordion item
- **Trigger:** click on `button`
- **State A (closed):** answer wrapper not rendered (or height 0), chevron icon unrotated
- **State B (open):** answer wrapper rendered with `pt-3` answer text, chevron rotated 180°
- **Transition:** `transition-colors duration-150` on button hover; `transition-transform duration-200` on chevron rotation; use the project's established `grid-rows-[0fr]→[1fr]` + `opacity-0→100` `transition-all duration-200 ease-out` pattern for the answer panel reveal (from `ContactFAQ.tsx`)
- **Implementation approach:** client component (`"use client"`), `useState<Set<number>>` holding open indices, independent per-item toggle (not single-open)

### Hover states
- Button: `bg-white` → `hover:bg-gray-50`, `transition-colors duration-150`

## Per-State Content (verbatim, all 3 items — verified by clicking each button and reading the revealed answer text)

1. Q: "Kişisel verilerim nasıl korunuyor?"
   A: "Son Parça, 6698 sayılı KVKK kapsamında kişisel verilerinizi koruma altına almaktadır. SSL şifreleme teknolojisi ile tüm verileriniz güvenli şekilde saklanır ve üçüncü taraflarla paylaşılmaz."
2. Q: "Çerez (cookie) politikanız nedir?"
   A: "Sitemizde kullanıcı deneyimini iyileştirmek ve site performansını analiz etmek için çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz."
3. Q: "Verilerimin silinmesini isteyebilir miyim?"
   A: "Evet, KVKK kapsamında kişisel verilerinizin silinmesini talep edebilirsiniz. Bu talebinizi destek@sonparca.com adresine iletmeniz yeterlidir."

Heading: "Gizlilik Politikası - Sıkça Sorulan Sorular"

## Assets
- `ChevronDown` from `lucide-react` (already a project dependency, used identically in `ContactFAQ.tsx`).

## Responsive Behavior
- **Desktop (1440px) / Tablet (768px):** button padding `sm:px-5 sm:py-4`, question text `sm:text-base`.
- **Mobile (390px):** button padding `px-4 py-3` (base), question text `text-sm` (base). Breakpoint here is `sm:` (640px), not `md:` — matches the live DOM classes exactly (this sub-component's source markup used `sm:` throughout, distinct from the `md:`-based numbered sections).
- **Breakpoint:** 640px (`sm:`).
