# Behaviors — /us/iletisim (İletişim / Contact)

## Known environment quirk encountered
`mcp__claude-in-chrome__resize_window` did NOT change `window.innerWidth`/`innerHeight` in this session (confirmed via `getComputedStyle`/`window.innerWidth` before and after calling resize to 1440x900 and again to 390x844 — both times `window.innerWidth` stayed at 1920, the shared browser window's actual size, likely because the Chrome window is maximized/managed by the OS and/or shared with a concurrent sibling agent cloning `/us/hakkimizda` in the same window). Per the task's documented fallback: instead of pixel-measuring screenshots at each breakpoint, I read the literal Tailwind utility classes directly from the live DOM (the source site itself renders with Tailwind classes in the markup, e.g. `grid grid-cols-1 lg:grid-cols-12 gap-8`, `text-3xl md:text-4xl`), which is a more reliable source of truth than pixel measurement would have been anyway. Responsive behavior documented in each component spec is derived from these literal classes, not from visually testing 768px/390px viewports. If a real resize becomes available in a future session, spot-check the built page against the live site at 768px and 390px to confirm no regressions.

## Scroll sweep
- No header shrink/change on scroll (header is simple `sticky top-0`, same as homepage — already implemented in shared Header.tsx).
- No elements animate into view on scroll (no IntersectionObserver-driven fade/slide effects detected).
- No scroll-snap containers.
- No parallax.

## Click sweep
- **FAQ accordion items** (3 total, under "İletişim - Sıkça Sorulan Sorular"): each is independently toggleable (clicking one does not close another — verified by opening all 3 at once). Click toggles `expand_more` (chevron down, closed) ↔ `expand_less` (chevron up, open) icon and reveals an answer paragraph below the question. Transition: `transition-colors duration-150` on the button hover state; content reveal itself is instant show/hide in the live site (no visible height animation was observed in the accessibility/DOM snapshots — our clone uses a smooth grid-rows height transition consistent with the sibling FAQAccordion pattern already built for the product-detail page, which is a reasonable, non-regressive enhancement).
- **Phone link** (`tel:0850 302 25 08`) and **Email link** (`mailto:destek@sonparca.com`) in the info cards: standard link click behavior (opens tel/mail handler), no special JS.
- **Social icons** (Instagram/Facebook/X in the "Sosyal Medya" card): real external links — `https://www.instagram.com/sonparca34/`, `https://www.facebook.com/sonparca34`, `https://www.x.com/sonparca34`.
- **Map card controls** (open-in-new-tab icon, directions icon, "SonParça" info popup): these belong to the live third-party Google Maps iframe, which we are not embedding live per assignment scope — reproduced as a static placeholder instead, so these controls do not exist in our clone.
- No modals, no dropdowns on this page.

## Hover sweep
- Info card links: `text-blue-600` → underline on hover (`hover:underline`) for phone/email links.
- Social icons: `text-blue-600` → `hover:text-blue-800` (darker blue) — no scale/shadow change.
- FAQ accordion button: `bg-white` → `hover:bg-gray-50`.
- Cards themselves (`bg-white ... border border-gray-100 shadow-sm`) have no hover state (static elevation).
- No hover state on the map placeholder (static block).

## Focus states
- Phone/email links and social links: rely on default browser focus ring (no custom `focus-visible` styling observed in the extracted classes for these specific elements) — our clone reuses the existing focus-visible ring utilities already established project-wide (e.g., `focus-visible:ring-2 focus-visible:ring-sp-accent` pattern used in Header/RegisterForm) for consistency and accessibility, since no contact form exists to require field-level focus/validation states.
- No form fields exist on this page, so there is no submit/validation/error state sweep to perform (see PAGE_TOPOLOGY.md — this page has no name/email/subject/message form; only static contact info, a map, hours, and an FAQ accordion).

## Responsive sweep (derived from literal Tailwind classes in the live DOM, see quirk note above)
- **Hero:** `text-3xl md:text-4xl` heading, `py-12 md:py-16` container padding — desktop gets larger heading/padding at `md:` (768px+).
- **Info cards grid:** `grid-cols-1 lg:grid-cols-12` with each card `lg:col-span-6` — stacks to a single column below `lg:` (1024px), becomes a 2×2 grid at 1024px+.
- **Map section:** `w-full h-96` fixed height container at all sizes; full-width.
- **Working hours card:** `grid-cols-1 md:grid-cols-2` — the two hour lists stack on mobile/tablet, sit side-by-side at `md:` (768px+).
- **FAQ:** `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8` — full-width bordered boxes stack identically at all sizes (no column layout to break).
- **Breakpoints used throughout this page:** `md:` (768px) and `lg:` (1024px) only; no `sm:`-specific layout shifts besides FAQ container padding.
