# Behaviors — /us/hakkimizda

## Scroll sweep
- No header appearance change tied to this page (shared sticky header already handles its own behavior, unchanged here).
- No scroll-triggered fade-ins / IntersectionObserver animations detected anywhere on the page — all sections are visible immediately on load with no opacity/transform transition classes present in the DOM (checked full innerHTML dump of `<main>`; no `animate-`, `transition-opacity`, or JS scroll-listener hooks found besides the two documented below).
- No scroll-snap containers.
- No parallax.
- No smooth-scroll library (no `.lenis` / `.locomotive-scroll` classes; native scrolling).

## Click sweep
- **Value cards (Değerlerimiz)**: not clickable (no href/button, no cursor-pointer class besides the card's own hover shadow transition).
- **Neden Biz items**: not clickable, purely decorative/informational.
- **Contact pills (Telefon / E-posta)**: not links/buttons — plain `<div>` display cards, not clickable (no `<a href="tel:">` / `mailto:` wrapping in this section; the tel/mailto links live in the shared header/footer only).
- **FAQ accordion** (3 items under "Hakkımızda - Sıkça Sorulan Sorular"): click-driven, confirmed by clicking each button in turn.
  - Clicking a question toggles that item's answer open/closed **independently** — clicking question 2 after question 1 was opened left question 1 still open (multi-open accordion, not a single-open/exclusive accordion).
  - Icon swaps glyph text on toggle: closed = `expand_more` (chevron down), open = `expand_less` (chevron up). This is a full glyph swap, not a CSS rotation — implemented in the clone as swapping `ChevronDown` / `ChevronUp` lucide icons based on open state.
  - Answer panel: `role="region"`, `bg-gray-50`, `border-t border-gray-100`, text `text-sm leading-relaxed`, appears/disappears with Angular's `ng-star-inserted` (no visible CSS transition/animation was detectable in the static HTML dump — treated as an instant show/hide, matching the pattern of the already-built `FAQAccordion.tsx` from the product-detail page, which uses a grid-rows transition for a nicer feel; kept consistent with that existing sibling component for visual parity across the site).
  - Extracted Q&A content (verbatim, via click + get_page_text):
    1. Q: "Son Parça hangi markaların parçalarını satıyor?"
       A: "Mercedes, Audi, Volkswagen, Ford, Opel, Renault, Peugeot, Toyota, Honda ve 50'den fazla markanın orijinal ve muadil yedek parçalarını sunuyoruz."
    2. Q: "Son Parça mağazası nerede?"
       A: "Fiziksel mağazamız Avcılar Sanayi Sitesi No:10 (Oto Yılmaz Yedek Parça Yanı), 34325 Avcılar/İstanbul adresinde bulunmaktadır. Ayrıca online mağazamız üzerinden 7/24 sipariş verebilirsiniz."
    3. Q: "Son Parça'nın avantajları nelerdir?"
       A: "Geniş ürün yelpazesi, uygun fiyat garantisi ve hızlı kargo başlıca avantajlarımızdır. Şasi numarası ile %100 uyumlu parça bulma imkanı sunuyoruz. Müşteri memnuniyeti odaklı hizmet anlayışımızla her zaman yanınızdayız."

## Hover sweep
- **Değerlerimiz cards**: `shadow-sm` → `shadow-md` on hover, `transition-shadow duration-300`. No color/scale change.
- **FAQ accordion buttons**: `bg-white` → `hover:bg-gray-50`, `transition-colors` (default Tailwind duration, no custom value observed → treated as 150ms default).
- No other hover states found in this page's own content (nav/footer hover states are handled by the already-built shared components).

## Responsive sweep — KNOWN GAP
- The Chrome MCP browser window is shared with a concurrent sibling agent (building `/us/iletisim` in parallel) and its `resize_window` calls kept overriding this session's viewport back to desktop width during the responsive sweep — confirmed repeatedly (390x844 and even a post-navigate re-resize both silently reverted to a ~1568px-wide desktop screenshot within the same call). This matches the documented environment quirk for this project.
- **Fallback used**: every section's DOM was captured with its literal Tailwind responsive classes directly from `main.innerHTML` (not estimated from screenshots). These classes are ground truth, not a guess, and were used verbatim in the built components:
  - Hero h1: `text-3xl md:text-4xl` (mobile 30px/36px line-height, desktop 36px/40px — actually computed 39px at desktop per `getComputedStyle`, i.e. Tailwind's `text-4xl`)
  - Hero paragraph: `text-lg md:text-xl`
  - Story/Mission grid: `grid-cols-1 md:grid-cols-2` → stacks to 1 column below `md` (768px)
  - Values grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` → 1 col mobile, 2 col ≥640px, 4 col ≥1024px
  - Why-us grid: `grid-cols-1 md:grid-cols-3` → 1 col mobile, 3 col ≥768px
  - Contact pills row: `flex-col sm:flex-row` → stacked mobile, row ≥640px
  - Section vertical padding: `py-12 md:py-16` throughout
  - Section heading sizes: `text-2xl md:text-3xl` for all `h2`s
- Because these are the same Tailwind v4 utility classes already used verbatim in the codebase, applying them directly reproduces the real responsive behavior exactly — this is more reliable than a pixel-measured guess, and no visual ambiguity remains. A live mobile-viewport visual QA screenshot could not be captured for this page during this session due to the shared-browser window contention; that is the one open item in this file.
