# Behaviors — /us/iade-politikasi

## Scroll sweep
- Header (site-wide top bar + main nav) does not change appearance on scroll on this page (confirmed by scrolling to y=750, 1500, 2600, and to `document.body.scrollHeight`).
- No elements animate into view on scroll (no IntersectionObserver / fade-in classes found in the extracted class lists).
- No scroll-snap containers.
- No sidebar/ToC that highlights the active section on scroll — there is no ToC/sidebar at all on this page.
- No smooth-scroll library (`.lenis`, `.locomotive-scroll`) classes present anywhere in `main`.
- Page total scroll height at load: ~4021px at ~1568×751 viewport.

## Click sweep
- **FAQ accordion (bottom of page, "İade Politikası - Sıkça Sorulan Sorular")**: 4 buttons, each `<button class="w-full px-4 sm:px-5 py-3 sm:py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3">` containing an `<h3>` question and a `<zx-icon>` wrapping `<i class="material-symbols-outlined ...">expand_more</i>`.
  - **Trigger:** click on the button (native Angular click handler, not a native `<details>` element).
  - **State A (collapsed):** icon text `expand_more`; no answer panel rendered under the button (sibling panel div absent/not present — Angular `*ngIf`-style conditional rendering, not just hidden via CSS. Confirmed: before clicking, `container.children.length === 1` — only the button; after clicking, a `div.px-4 sm:px-5 pb-4 bg-gray-50 border-t border-gray-100 ng-star-inserted` sibling appears containing `<p class="text-light-text-muted text-sm leading-relaxed pt-3">{answer}</p>`).
  - **State B (expanded):** icon text becomes `expand_less`; the answer panel div is added directly after the button, background `bg-gray-50`, top border `border-t border-gray-100`, answer text `text-sm leading-relaxed pt-3` in a muted color (`rgb(91,91,91)`, i.e. approx Tailwind `text-gray-500`/`text-gray-600`).
  - **Transition:** button background has `transition-colors duration-150` (hover only); no explicit transition/animation class was found on the panel itself — treat the expand/collapse as an instant mount/unmount (a simple client-side `useState` boolean toggle per item is the correct implementation, optionally with a CSS grid-rows or max-height transition for polish, but the source markup itself has no animation class to replicate).
  - **Multiplicity:** confirmed **independent per-item state** — clicking item 2 while item 1 was still open left item 1 open (both icons read `expand_less` simultaneously). This is NOT a single-open/exclusive accordion. Then items 3 and 4 were also opened simultaneously and all 4 stayed open together, confirming no mutual exclusion at all.
- **Contact links (section 8):** `tel:0850 302 25 08` and `mailto:destek@sonparca.com`, both plain anchor navigation, no JS interception observed.
- No other clickable/interactive elements exist in the page's own `<main>` content besides the shared header/footer nav (out of scope — reused from `root-8a5edab2`).

## Hover sweep
- FAQ accordion button: `bg-white` → `hover:bg-gray-50`, `transition-colors duration-150`.
- Contact links: `text-blue-700` → `hover:text-blue-900`, `transition-colors` (default duration, no explicit value in class list so use Tailwind default `150ms`).
- No hover states on the numbered-section badges, callout boxes, or grid cards (no `hover:` classes found on any of them in the extracted unique class list).

## Responsive sweep
Note: live resize to 390px/768px could not be completed in this session — `mcp__claude-in-chrome__resize_window` reported success but `window.innerWidth` remained 1920 across two attempts (5+ minutes apart), consistent with the documented shared-browser contention from a concurrent sibling agent working the `/us/gizlilik-politikasi` page in the same Chrome MCP session. Responsive behavior below is derived from the literal Tailwind responsive prefixes read directly out of the DOM's `className` values (high confidence, since Tailwind's responsive utility behavior is deterministic and does not depend on runtime measurement), not from a rendered mobile screenshot. This gap is also noted in PAGE_TOPOLOGY.md.
- Section 2 two-card grid and section 7 two-column box: `grid-cols-1` → `md:grid-cols-2` (stacks under 768px).
- Section 7's divider: `divide-y` (horizontal, mobile) → `md:divide-y-0 md:divide-x` (vertical, ≥768px).
- Section 6 category-card grid: `grid-cols-1` → `sm:grid-cols-2` (≥640px) → `lg:grid-cols-3` (≥1024px).
- Section 8 contact row: `flex-col` → `sm:flex-row` (stacks vertically under 640px).
- Font sizes step up at `md:` almost everywhere (`text-xs md:text-sm`, `text-lg md:text-xl`, `text-xl md:text-2xl lg:text-3xl` for H1).
- Section vertical spacing steps up at `md:` (`mb-8 md:mb-10`, `mb-3 md:mb-4`, etc.) — tighter on mobile, looser on desktop.
- FAQ button padding: `px-4 sm:px-5 py-3 sm:py-4` (slightly tighter on mobile).
- No layout element disappears or is hidden at any breakpoint (no `hidden md:block` style toggles found) — this page's responsiveness is purely spacing/grid-column/font-size scaling, not content hiding.
