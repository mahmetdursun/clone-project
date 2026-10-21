# Page Topology — /us/iade-politikasi (İade Politikası / Return Policy)

Source: https://www.sonparca.com/us/iade-politikasi
Rendered by Angular (`zx-return-policy` component, `ng-star-inserted`), plain Tailwind utility classes in markup. No client framework quirks beyond that; page is server-rendered flowing content wrapped by the site's shared `<app-header>` / `<app-footer>` shell (already cloned as `SiteHeader` / `Footer`).

## Overall layout
- `<main class="flex-grow w-full pb-16 md:pb-0">` (shared main wrapper, same as sibling pages)
  - `<div class="container mx-auto max-w-screen-xl overflow-x-hidden px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 text-gray-700">` — single content column, no sidebar, no ToC/anchor nav. Max width matches Tailwind's `max-w-screen-xl` (1280px), centered with standard responsive padding.
  - No hero image/banner — the "hero" is a plain text header block (H1 + last-updated date + intro paragraph) directly at the top of the content column, no background color/graphic.
  - 8 numbered policy sections rendered as sibling `<section>` elements (flowing document, NOT a sidebar/tab layout).
  - One closing legal disclaimer paragraph (not inside a numbered section).
  - One FAQ block (click-to-expand accordion, 4 items) below the closing disclaimer.
  - Shared `Footer` below `</main>`.

## Sections top to bottom
1. **PageHeader (part of PolicyHero)** — H1 "Son Parça İade ve Değişim Politikası", "Son Güncelleme Tarihi: 28/05/2025" byline, intro paragraph. Bottom border separates it from section 1. Static.
2. **Section 1 — Kargo Teslimatında Kontrol ve Hasar Tespiti** — numbered badge (red), heading, one red callout box (bold warning line + 3 bullet list). Static.
3. **Section 2 — Genel İade Koşulları ve "Yeniden Satılabilirlik"** — gray badge, heading, intro paragraph with 2 bold inline phrases ("14 gündür", "yeniden satılabilir"), then a 2-column grid (stacks to 1 col on mobile via `md:grid-cols-2`) of two white bordered cards, each with an `h3` sub-heading + bullet list ("İade İçin Gerekli Genel Şartlar" / "İade Kabul Edilmeyecek Durum Örnekleri"). Static.
4. **Section 3 — Parça Uyumluluğu ve Şase Teyidi** — blue badge, heading, intro paragraph, one blue info callout box (bold lead-in), then a plain (non-boxed) bullet list of 3 items below the box. Static.
5. **Section 4 — Elektrik ve Elektronik Parçalar** — orange badge, heading, one orange callout box (bold warning line + paragraph + 3-item bullet list, one bullet has bold phrase), then a plain paragraph below the box (no box, just gray body text). Static.
6. **Section 5 — Mekanik Parçalar, Debriyaj, Turbo ve İnceleme Süreci** — gray badge, heading, intro paragraph, then a numbered (`<ol>`) 4-item process list inside a gray bordered box; item 4 has a bold "Rapor Sonucu:" lead-in and a nested 2-item bullet sub-list. Static.
7. **Section 6 — İade Kapsamı Dışındaki Ürünler** — gray badge, heading, intro paragraph, then a responsive grid of 5 small cards (1 col mobile / 2 col tablet / 3 col desktop) each with a bold `h3` category title + one-line description. Static.
8. **Section 7 — İade Kargo Ücretleri ve Sorumluluk Sınırı** — gray badge, heading, no intro paragraph, straight into a bordered white box split into 2 columns (divided by a vertical/horizontal divider that flips with breakpoint) titled "Kargo Ücreti Sorumluluğu" / "Sorumluluk Sınırı", each a bullet list with bold lead-in phrases per bullet. Static.
9. **Section 8 — İade Talebi Oluşturma ve İletişim** — gray badge, heading, intro paragraph, then a gray bordered box containing: bold "İade talebi ve destek için:" line, a row of two contact links (phone icon + tel: link, mail icon + mailto: link, both blue, using Material Symbols `call`/`mail` icons), and a small muted asterisk footnote about COD/karşı ödemeli kargo. Static (links only, no accordion here).
10. **Closing legal paragraph** — small muted paragraph directly in the content column (sibling of the sections, not inside section 8): "Bu iade politikası yürürlükteki tüketici mevzuatı, Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Formu ile birlikte değerlendirilmelidir…". Static.
11. **FAQ accordion — "İade Politikası - Sıkça Sorulan Sorular"** — `h2` heading + 4 accordion rows, each a bordered card with a button header (question + `expand_more`/`expand_less` Material icon) and a collapsible answer panel. **Click-driven**, see BEHAVIORS.md. Independent per-item toggle (not single-open).
12. **Shared Footer** (`Footer` component, already built at `root-8a5edab2/Footer.tsx`) — reused as-is, not rebuilt.

## Component decomposition decision
Given this is one long flowing legal document with a repeated "numbered section" pattern plus one distinct FAQ accordion widget, it is split into exactly 3 page-owned components (per skill guidance: don't force artificial subdivision of flowing text, but do separate genuinely distinct sub-components):
- `PolicyHero.tsx` — H1 + last-updated + intro paragraph + bottom border.
- `PolicySections.tsx` — renders all 8 numbered sections + the closing legal paragraph from structured data in `data.ts`. Internally handles the small number of distinct callout-box visual variants (red/blue/orange/gray/plain) via a shared per-section renderer, since they are all instances of the same "numbered section" pattern with a color variant — not 8 separate one-off components.
- `PolicyFaq.tsx` — the click-driven accordion, client component (`"use client"`) since it holds open/closed state per item.
- `data.ts` — typed content data (verbatim text) consumed by `PolicySections` and `PolicyFaq`.

## Interaction model summary
- Sections 1–8 + closing paragraph: **static**, no scroll/hover/click behavior beyond normal text selection and link hover.
- Contact links (`tel:`, `mailto:`) in section 8: standard link hover color change (`text-blue-700` → `hover:text-blue-900`), CSS transition only.
- FAQ accordion: **click-driven**, per-item independent expand/collapse, confirmed by testing (opening items 1 and 2 simultaneously kept both open — this is NOT a single-open accordion).
- No scroll-triggered animations, no IntersectionObserver, no sticky elements, no smooth-scroll library detected on this page.

## Responsive breakpoints observed in literal classes
- Section grids: `sm:grid-cols-2 lg:grid-cols-3` (section 6 cards), `md:grid-cols-2` (section 2 and section 7 two-column boxes).
- Padding/text scales up at `md:` (e.g. `text-xs md:text-sm`, `p-4 md:p-5`, `mb-8 md:mb-10`).
- Divider in section 7 box flips from horizontal (`divide-y`) on mobile to vertical (`md:divide-y-0 md:divide-x`) on desktop — column stack becomes side-by-side at `md:`.
- FAQ button padding: `px-4 sm:px-5 py-3 sm:py-4`.

## Known extraction gap
`resize_window` to 390px did not take effect during this session (`innerWidth` stayed at 1920 after two attempts) — the shared Chrome MCP browser was being driven back to a wide viewport, consistent with the documented sibling-agent contention on `/us/gizlilik-politikasi`. Mobile layout was therefore verified via the **literal Tailwind responsive classes read directly from the DOM** (documented above and in each component spec) rather than an actual 390px screenshot. This is a lower-fidelity substitute but should be accurate since Tailwind classes are deterministic; flagged here per the task's explicit instruction to document the gap rather than guess silently.
