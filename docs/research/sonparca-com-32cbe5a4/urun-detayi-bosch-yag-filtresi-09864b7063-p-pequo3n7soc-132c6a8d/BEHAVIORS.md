# Behaviors — Bosch Yağ Filtresi 09864B7063 (Product Detail)

## Scroll sweep
- Header: no change on scroll observed at this route beyond the existing sticky behavior already implemented site-wide (`sticky top-0 z-50` in `Header.tsx`). No shrink/shadow-change-on-scroll specific to this page.
- No scroll-snap, no parallax, no scroll-driven tab switching, no IntersectionObserver-driven reveal animations observed anywhere on this page.
- No smooth-scroll library (no `.lenis` / `.locomotive-scroll` class in DOM).

## Click sweep
- **Product image**: single image, no thumbnail rail to click (only one photo exists for this product). A "Yakınlaştır" (zoom) label exists in the accessible text of the page for this image region — modeled as a hover-revealed magnifier affordance; clicking is out of scope to wire to a real lightbox network fetch (no backend), implemented as a simple local state (does not open a network-backed viewer) — kept purely presentational per the "out of scope: real backend/real-time features" skill default.
- **Quantity stepper** (− / input / +): increments/decrements a local numeric value, minimum 1. Same pattern as `ProductCard`-adjacent quantity steppers already used across the site (e.g. `/on-tampon` category listing cards).
- **Add to cart (cart icon button)**: no real cart wiring exists anywhere in this codebase yet (header cart badge is static `0`); implemented as local component state only (visual press feedback), consistent with "no real backend" scope default.
- **"Bilgi Alın" (WhatsApp) button**: on the live site this is a `tel:`/`wa.me`-style contact affordance (green, WhatsApp-branded icon). Cloned as a styled anchor/button; no real WhatsApp deep-link required, but a `wa.me` href pattern is safe to include since it is a real, harmless static link style already used in `Header.tsx`'s `tel:`/`mailto:` links.
- **Alternative brand cards** ("İncele →"): navigate to that alternate product's own detail page. Out of scope to build every alternate product's page; links point to `#`/self, consistent with how `CategoryGrid`/`ProductCard` placeholder links are already handled elsewhere in this codebase (`href="#"` or `href="/kategori/..."` placeholders).
- **FAQ Accordion rows** (bottom block, near footer): clicking a row header toggles that row's answer open/closed. INTERACTION MODEL: click-driven, one panel open at a time (accordion), chevron rotates 90°/180° with a CSS transition on click. This was inferred from the collapsed chevron affordance visible in the screenshot (rows show only the question + a `›` chevron, no visible answer text, distinguishing this block from the always-expanded FAQ section above it which shows full Q&A text permanently).

## Hover sweep
- Product image: `scale-105` with `transition-transform duration-300` (matches `group-hover:scale-105 transition-transform duration-300` already used in `ProductCard.tsx` for every product thumbnail on this site).
- Cart icon button: background flips from dark (`bg-dark-bg`) to accent orange (`hover:bg-sp-accent`) — identical to `ProductCard.tsx`'s cart button.
- "İncele →" links: color shift / underline (orange accent, consistent with `hover:text-dark-text-primary` / accent-hover conventions used across `Header.tsx`/`Footer.tsx`).
- Alternative brand cards: subtle border/shadow lift on hover (`hover:shadow-sm`), consistent with `CategoryGrid`'s `hover:border-sp-accent/40 hover:shadow-sm transition-all`.

## Responsive sweep
- **Desktop 1440px:** 2-column hero grid; 4-column alternates grid; tech table full-width two-column key/value rows.
- **Tablet 768px (inferred from consistent site breakpoints):** hero collapses to 1 column; alternates grid becomes 2 columns.
- **Mobile 390px (inferred):** everything single column; code-chip row wraps to multiple lines; price/shipping stack vertically inside the price card; action row (Bilgi Alın / stepper / cart) wraps to two rows if needed.
- Note: a clean isolated 390px live capture could not be obtained in this session because the shared Chrome MCP tab was concurrently controlled/resized by other parallel builder agents in this multi-agent clone run (see PAGE_TOPOLOGY.md "Known extraction limitation"). Mobile behavior instead mirrors the mobile-first Tailwind patterns already shipped and visually verified in this same site's homepage components (`ProductCard.tsx`, `CategoryGrid.tsx`, `QuickLinksGrid.tsx`).

## Interaction model summary
| Section | Model |
|---|---|
| Product image | static + hover-scale; zoom affordance presentational only |
| Quantity stepper | click-driven local state |
| Add to cart | click-driven local state (no backend) |
| Alternative brands grid | static cards, click-through links |
| FAQ (expanded list) | static, always visible |
| FAQ (accordion) | click-driven, single-open accordion with chevron rotation transition |
