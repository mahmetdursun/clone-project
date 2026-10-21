# Page Topology — /us/hakkimizda (About Us)

Source: https://www.sonparca.com/us/hakkimizda
Tech: Angular 22 SPA (`ng-version="22.1.5"`, custom element `<zx-about-us>`), styled with Tailwind utility classes (matches our own Tailwind v4 setup almost 1:1). Icons rendered via Material Symbols icon font (`<i class="material-symbols-outlined">`) inside a `<zx-icon>` wrapper — not SVGs, not raster images. No unique images/videos on this page (only the shared header/footer logos, already handled by shared components).

## Layout / scroll container
- No smooth-scroll library, no scroll-snap. Standard native document scroll.
- No sticky elements on the page body itself (the shared `Header` is `sticky top-0`, already built).
- Single-column vertical stack of `<section>` elements, each `w-full`, inner `container mx-auto px-4` (max content width ~1152px effectively, i.e. Tailwind `container` class), alternating white / gray-50 background bands.

## Sections, top to bottom

1. **HeroBanner** — static
   - `<section class="w-full bg-gradient-to-r from-blue-50 to-gray-50">`
   - Centered `h1` "Hakkımızda" + subtitle paragraph "Kaliteli Yedek Parça Çözümleri"
   - Interaction model: static

2. **StoryMissionSection** — static
   - `<section class="w-full py-12 md:py-16 bg-white">`
   - 2-column grid (`grid-cols-1 md:grid-cols-2 gap-8 items-center`)
   - Left: "Son Parça Hikayemiz" heading + 2 paragraphs
   - Right: card containing "Misyonumuz" + "Vizyonumuz" (two headed paragraph blocks stacked), card is `flex justify-center` wrapping a `max-w-md` gray-50 rounded card
   - Interaction model: static

3. **ValuesGrid ("Değerlerimiz")** — static, hover-only
   - `<section class="w-full py-12 md:py-16 bg-gray-50">`
   - Centered `h2` "Değerlerimiz"
   - 4-card grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`): Kalite, Güven, Hızlı Teslimat, Uzmanlık
   - Each card: white bg, icon chip (blue-50 bg, blue-600 icon) + title in a row, description paragraph below
   - Interaction model: hover-only (`hover:shadow-md transition-shadow duration-300` on each card)

4. **WhyUsSection ("Neden Biz?")** — static
   - `<section class="w-full py-12 md:py-16 bg-white">`
   - Centered `h2` "Neden Biz?"
   - 3-column grid (`grid-cols-1 md:grid-cols-3 gap-8`), each item centered: large icon chip (16x16, blue-50 bg) above title above description. No card background/border, no hover effect observed.
   - Interaction model: static

5. **ContactFAQSection ("İletişime Geçin")** — click-driven (FAQ accordion)
   - `<section class="w-full py-12 md:py-16 bg-gray-50">`
   - Centered heading + paragraph, max-w-3xl
   - 2 contact info pills side by side (`flex-col sm:flex-row gap-4`): Telefon, E-posta — white bg, rounded, shadow-sm, icon + label/value
   - Below: "Hakkımızda - Sıkça Sorulan Sorular" FAQ accordion, 3 questions, **multi-open** (opening one does not close others — verified by clicking all 3 in sequence and all stayed open)
   - Interaction model: click-driven accordion, independent per-item toggle (not single-open)

6. **Footer** — shared component, reused as-is from `root-8a5edab2/Footer.tsx`. Not rebuilt.

## Dependencies
- `SiteHeader` (TopBar + Header) reused from shared homepage namespace, no changes.
- No floating/fixed overlays specific to this page.

## Assets
- No page-specific images. All icons are Material Symbols glyphs — rendered here using equivalent `lucide-react` icons (closest visual match), since the project's icon convention (see `Header.tsx`) is Lucide, not a Material Symbols font. This is a deliberate icon-library substitution documented per component spec.
