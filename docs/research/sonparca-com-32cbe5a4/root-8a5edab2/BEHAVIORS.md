# Behaviors — sonparca.com (/)

## Global
- Header is `position: sticky; top: 0; z-index: 50;` — stays pinned while scrolling. No shrink/shadow-change-on-scroll observed (single background color throughout).
- No smooth-scroll library detected (no `.lenis`/`.locomotive-scroll` classes; native scrolling).
- No scroll-snap detected on the page container.
- No scroll-triggered fade/slide-in animations observed on section entry during the sweep.

## VehicleFinder (section 3)
- **Interaction model: click-driven.**
- Three pill tabs: "Şasi No", "Araç Seçin" (active by default — orange fill `bg-accent`/`#ff7222`, others neutral dark), "Garajım". Clicking swaps the panel body (not explored beyond homepage scope — Araç Seçin panel is the default/captured state).
- Brand buttons in the grid are plain hover-state buttons (bordered squares); clicking one begins the vehicle drill-down flow (out of homepage scope).
- Search input above the grid filters the 28 brand buttons client-side (placeholder "Ara...").

## HeroCarousel (section 4)
- **Interaction model: time-driven (autoplay) + click-driven (arrows/dots).**
- 2 slides, both full-bleed `<img>` banners (1600x450 webp) — text is part of the image, not live DOM.
- Left/right chevron arrow buttons (semi-transparent circular, at vertical center) advance/retreat slides.
- Dot indicators at bottom-center; active dot is orange, inactive is muted/grey.
- Each slide is a full-cover `<a>` link (whole banner is clickable).

## ProductCarousel (sections 6 & 7 — shared component)
- **Interaction model: click-driven horizontal scroll**, with prev/next arrow affordance appearing on hover (seen on "Yeni Gelenler"; consistent behavior expected on "Çok Satanlar").
- Card hover state: subtle elevation (existing `shadow-sm`/`shadow-md` tokens available in theme; treat as hover → `shadow-md` transition).
- "Yeni Gelenler" cards show a brand badge (uppercase, e.g. "BSG", "DENSO", small muted-orange label for certain badges) above the product title — brand-badge styling should be reused for both carousels' cards (one shared `ProductCard` component).
- Add-to-cart button = small dark square icon button bottom-right of price row.

## CategoryGrid (section 8) & BrandList (section 9)
- Category tiles: static, no click-through explored (homepage scope) — treat as static links with image hover per standard button/link conventions (no unique animation observed).
- Brand rows in "Tüm Araç Markaları ve Modelleri" show a chevron-down icon implying an accordion disclosure on click; count badge (e.g. "34") shown before the chevron. Not expanded during sweep — build as a standard disclosure/accordion using existing shadcn Accordion/Collapsible primitive, collapsed by default.

## Responsive
- Tool limitation noted in PAGE_TOPOLOGY.md — `resize_window` didn't change `window.innerWidth` in this session (stayed 1920 after every resize call), so before/after visual diffing at 768/390 could not be captured directly. Compensated by reading the Tailwind responsive classes embedded in `className` for structural containers (header row, search bar, grids), which fully specify the intended breakpoint behavior since this is a Tailwind-authored site. Builders should honor those class-level breakpoints (`sm:`/`lg:`/`xl:` prefixes) exactly as captured in each component spec rather than guessing new ones.
