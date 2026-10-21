# Behaviors — /on-tampon

## Tooling constraint (read first)

`resize_window` calls to 1440x900 and 390x844 did not change `window.innerWidth`
(stayed 1920 in every check) and `window.outerWidth`/`outerHeight` reported `0` — this
automation host runs a fixed virtual viewport. No real mobile-viewport screenshot could be taken.
Responsive behavior documented below comes from reading the site's actual Tailwind classes
(ground truth, not guesswork), not from visually observing a resized browser.

The live tab also repeatedly auto-navigated away (to `/auth/giris`, `/auth/kayit-ol`, or a
random product detail page such as "Bosch Yağ Filtresi") a few seconds after each load — an
apparent stray ad/redirect script unrelated to the /on-tampon page's real UX. Not cloned.

## Scroll sweep

- Header: sticky (`sticky top-0 z-50`), same as homepage — no additional scroll-triggered style
  change observed specific to this page.
- No scroll-snap, no parallax, no scroll-driven tab switching on this page.
- Product grid and pagination are ordinary flow content (page-based pagination, not infinite
  scroll / not virtualized-on-scroll from a UX perspective, though the Angular app appears to lazy
  render below-the-fold content on initial paint — first `document.querySelectorAll('.product-card')`
  reliably returns all 20 cards for the current page once loaded).

## Click sweep

- **"Araç seçimini tamamla" button** (top right of PageHeader): opens the global vehicle-selector
  modal ("Araç seçiminizi tamamlayın") — a site-wide overlay already outside this page's scope
  (same modal auto-opens on first visit across the site). Not built as a page-specific component.
- **"Devamını oku" (read more) button**: toggles the PageHeader description's line-clamp. Full
  text is present in the DOM at all times (confirmed via `textContent`); the button only changes
  the CSS clamp state and (per icon ligand `expand_more`) rotates a chevron icon. Implemented in
  the clone with local React state toggling a `line-clamp-2`/`line-clamp-none` class.
- **Kategori accordion header**: toggles panel open/closed (chevron rotate). Category links
  navigate to `/on-tampon?categoryId=<uuid>` (full navigation/filter by category — server-driven).
- **Marka accordion header**: toggles panel open/closed. Brand list is a scrollable checkbox
  list (own `overflow-y-auto`), each brand a plain code name (AYD, BSG, CABU, DERELI, DOGANER,
  EURO PUMB, FASE, GVA, İTHAL, JKP, KAYA, MAHER, MARAL, MGA, MOTOEC, ORJINAL, SonParça, …).
- **Product card add-to-cart**: quantity stepper (`-` / `1` / `+`) plus a dark cart button,
  presentational only (no cart backend in this clone, consistent with homepage `ProductCard`).
- **Pagination buttons**: `«` (first), `‹` (prev), page numbers `1..5`, `›` (next), `»` (last).
  Page `1` is visually active (highlighted pill). Clicking would navigate `?page=N` server-side;
  in the clone these are presentational links pointing at `?page=N` for the current category.

## Hover sweep

- Category links: color shift to accent orange (`hover:text-accent`), consistent with the rest
  of the site's link hover convention already used in Header/Footer.
- Product name (`h3` in both mobile and desktop card layouts): `hover:text-accent transition-colors`.
- Add-to-cart / quantity buttons: `hover:bg-gray-700` (cart button, dark bg lightens), `hover:text-gray-600` (stepper buttons, icon lightens from gray-400).
- Pagination buttons: standard `hover:bg-gray-50`-style lightening (inferred from consistent
  site convention; exact hover computed style not capturable due to the tooling's fixed-viewport
  auto-navigate issue cutting the session short during pagination hover testing — treated as a
  reasonable, low-risk gap).

## Responsive sweep (derived from CSS, see tooling note above)

- **Product card**: `flex sm:hidden` (row layout, thumbnail `w-24 h-24`) is the *only* rendered
  variant below the `sm` (640px) breakpoint; `hidden sm:block` (vertical card, `aspect-square`
  image, badge/shipping row, price, name, SKU, qty stepper + cart) takes over at `sm` and above.
  Within the desktop variant, text scales up again at `lg` (`text-xs lg:text-sm` name,
  `text-base lg:text-lg` price, `p-2.5 lg:p-3` padding) — a second, finer breakpoint step.
- **FilterSidebar**: present as a static column at `lg:` and up; a mobile "Filtreler" toggle
  button exists in the DOM (`w-full ... Filtreren` styled button) implying the sidebar collapses
  into a drawer/hidden panel below `lg`.
- **Grid**: mirrors the homepage `CategoryGrid` scaling pattern — 1 column mobile, 2 at `sm`,
  4 at `lg`.
- No dark-mode variant observed anywhere on the site (light theme only, consistent with homepage).
