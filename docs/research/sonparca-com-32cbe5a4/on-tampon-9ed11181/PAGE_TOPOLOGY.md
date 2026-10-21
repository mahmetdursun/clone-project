# Page Topology — /on-tampon (Ön Tampon category listing)

Source: https://www.sonparca.com/on-tampon
Framework observed on source site: Angular (custom elements like `zx-add-to-cart-button`,
`zx-quantity-control`, `zx-stock-delivery-info`, `ng-star-inserted` classes). We rebuild the
visuals/markup in React/Next per the project convention; no Angular runtime is cloned.

## Tooling note (important for future maintainers)

The automation browser in this environment runs with a fixed virtual viewport
(`window.innerWidth` stayed `1920` and `outerWidth/outerHeight` reported `0` regardless of
`resize_window` calls — consistent with a headless/fixed-DPI automation host). True 390px mobile
screenshots could not be captured. Mobile/responsive behavior below was instead derived directly
from the site's own Tailwind utility classes captured via `getComputedStyle`/DOM inspection
(e.g. the product card's dual `flex sm:hidden` / `hidden sm:block` markup), which is a reliable
1:1 source for breakpoint behavior even without a rendered mobile screenshot. This matches the
approach already used for the homepage build (no mobile screenshots exist there either).

Also note: the live site intermittently auto-navigates the tab (or opens a new tab) to
`/auth/giris`, `/auth/kayit-ol`, or a random product-detail page a few seconds after load. This
looks like a stray ad/analytics script on sonparca.com, not a real UX affordance — it is NOT
part of the page's intended behavior and is not reproduced in the clone. All extraction was done
by batching navigate+read actions tightly to finish before the redirect fired.

## Sections (top to bottom)

1. **TopBar + Header** (`SiteHeader`) — identical to homepage. REUSED from
   `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header.tsx` (`SiteHeader` export).
   Sticky header, dark topbar with contact info + legal links, logo, search bar, account/cart.
2. **Breadcrumb** — `Ana Sayfa / Ön Tampon / Ön Tampon` (last segment duplicated on the live
   site — category name appears twice because the leaf category equals the page name; verbatim
   text kept but our clone dedupes visually isn't required, we match source: "Ana Sayfa / Ön
   Tampon"; see PageHeader spec — only 2 unique crumbs are meaningfully shown since qty is small).
   Static, flow content.
3. **PageHeader** — H1 "Ön Tampon", a "Araç seçimini tamamla" (complete vehicle selection)
   outlined button (top-right on desktop), and an expandable description paragraph with a
   "Devamını oku" (read more) toggle. Click-driven (CSS line-clamp toggle + chevron rotate).
4. **FilterSidebar** — left column (desktop) / collapsible "Filtreler" drawer (mobile), containing
   two accordion sections: **Kategori** (top-level category tree, live links with `?categoryId=`
   query param — full navigation, not client-side filter) and **Marka** (brand checkbox list,
   client-side filter, own internal scroll region). Both accordions have a search input.
5. **ProductToolbar** — "Ürünler" heading + "N sonuç bulundu" result count, flow content, sits
   directly above the grid, aligned with sidebar top.
6. **ProductGrid** — grid of `ProductListingCard`s. 4 columns at desktop (≥1024px), each card has
   a colored status accent (green top border on desktop / green left border on mobile — from
   stock status, `border-t-success` / `border-l-success`). Each card is a **dual-layout**
   component: a mobile flex-row layout (`flex sm:hidden`) and a desktop vertical layout
   (`hidden sm:block`) both rendered and toggled purely with CSS, not JS/state.
7. **Pagination** — bottom of the grid: `«  ‹  1 2 3 4 5  ›  »` numbered pager + "Toplam 6810
   kayıttan 1-20 arası gösteriliyor" result range text. Page-level navigation (new query param),
   not infinite scroll.
8. **Footer** (`Footer`) — identical structure to homepage footer. REUSED from
   `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer.tsx`.

## Layout / architecture

- Overall container: `max-w-7xl mx-auto px-4` (matches homepage `container` conventions).
- Below the PageHeader: a 2-column layout — `FilterSidebar` (fixed ~280-300px column, desktop
  only, hidden below `lg`) + main content column (`ProductToolbar` + `ProductGrid` +
  `Pagination`).
- No sticky sidebar; it scrolls with the page (confirmed — sidebar's Marka panel has its own
  internal `overflow-y-auto` scroll region only for the long brand checkbox list, not the whole
  sidebar).
- z-index layers: sticky header (`z-50`, reused from homepage) sits above everything; the vehicle
  selector modal ("Araç seçiminizi tamamlayın") that auto-opens on first load is a global overlay
  — NOT specific to this page (same modal appears / can appear on any category listing page) and
  is treated as an existing site-wide interaction rather than a component to build for this page.

## Interaction model per section

- Header/Footer: static (reused).
- Breadcrumb: static links.
- PageHeader description: **click-driven** expand/collapse (line-clamp toggle + chevron icon
  rotate 180°).
- FilterSidebar accordions: **click-driven** open/close (chevron rotate), Kategori links are full
  page navigations (`?categoryId=...`), Marka checkboxes are client-side selection (no immediate
  navigation observed within the tooling constraints of this session — implemented as
  presentational controlled checkboxes for the clone since no backend exists).
- ProductGrid cards: static content; add-to-cart controls are interactive quantity stepper +
  cart button (presentational — no cart backend in this clone, matches homepage ProductCard
  convention of a non-functional cart button).
- Pagination: static links/buttons; page 1 marked active with a highlighted pill.

## Responsive breakpoints (derived from source Tailwind classes)

- Product card: mobile-first row layout (`flex`, thumbnail `w-24 h-24` fixed square + text/price
  to the right, single-line add-to-cart icon button) switches to a vertical card (`sm:block`,
  aspect-square full-width image, badge+shipping row, price, name, SKU, qty-stepper+cart) at the
  `sm` breakpoint (640px) and up.
- Grid columns: 1 column (stacked rows) below `sm`, likely 2 columns at `sm`, up to 4 columns at
  `lg`/desktop (matches the observed 4-per-row desktop screenshot; mirrors the homepage
  `CategoryGrid`'s `grid-cols-2 sm:grid-cols-4 lg:grid-cols-8` convention of scaling column count
  with breakpoint — for the product grid we use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
- FilterSidebar: visible as a static left column at `lg:` and above; below `lg` it collapses
  behind the "Filtreler" toggle button seen in the DOM (`button` with class
  `w-full flex items-center justify-center gap-2 ... Filtreler`).
