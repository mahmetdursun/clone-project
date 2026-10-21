# Behaviors — /parca-talep-formu

## Membership banner links
- "Giriş Yap" → `href="/auth/giris"` (a second instance on the page carries `?returnUrl=%2Fparca-talep-formu`, but the in-banner CTA itself is plain `/auth/giris`).
- "Üye Ol" → `href="/auth/kayit-ol"`.
- Both routes already exist in this project (`src/app/auth/giris/page.tsx`, `src/app/auth/kayit-ol/page.tsx`). Built as real Next.js `<Link>`s.

## Form field states (logged-out — the only state reachable/inspectable without real auth)
Confirmed via `document.querySelectorAll('input, textarea')`:
- `#chassisNumber` (Şase Numarası): `disabled: true`, `bg-gray-50`, placeholder "17 haneli şase numarası".
- `#contactNumber` (İletişim Numarası): `disabled: true`, `bg-gray-50`, placeholder "05XX XXX XX XX".
- `#description` (Parça Listesi textarea): `disabled: true`, `bg-gray-50`, `resize-none`, `rows=10` (computed height 258px at default font-size 16px), placeholder "Aradığınız parçayı detaylıca açıklayın".
- **No submit button exists anywhere in the `<form>` element** while logged out — the `<form>` has exactly 2 children (the chassis/phone grid row, and the description field). There is no counter/live validation UI visible on the chassis field, no phone-number input mask visible, and no client-side format enforcement observable, because the fields are inert (disabled) in this state.
- Conclusion for the clone: fields are read-only/disabled in the default (logged-out) state, matching the live site. The form is built as a plain local-state shell (no real backend), but since the live, publicly-reachable state of this page is "disabled fields, no submit control," the clone renders the identical disabled state with placeholders. No functional onSubmit exists to test in this state — nothing to no-op, so there is nothing hooked to `console.log`/`preventDefault` here (would only apply if the fields were ever enabled, which never happens for a logged-out visitor).

## SEO content card
- Fixed dark header (`bg-dark-bg`, `border-b border-dark-bg-light`) with a lucide `Phone`-shaped icon (live site uses a Heroicons "phone" outline `<path>`, `viewBox="0 0 24 24"`) + h2 "Otomobil Yedek Parça Talebi".
- Body: `max-h-[420px] md:max-h-[480px] overflow-y-auto` — internal scroll, independent of page scroll. Static content, no animation.
- Contains 7 `<section>` blocks (1 intro h1 + 6 h2 sections, several with h3 subheadings) and 5 `<table>` elements (`thead` styled `bg-dark-bg text-dark-text-primary`, rows `hover:bg-light-bg-muted`).

## FAQ accordion
- Interaction model: **click-driven**, one row at a time is independent (no accordion "close others" behavior observed — each row toggles its own open state).
- Trigger: click anywhere on the row's `<button>`.
- Before: icon "expand_more" (chevron down), answer not rendered/hidden.
- After: icon flips to "expand_less" (chevron up), answer paragraph appears below the question inside the same bordered row, `transition-colors duration-150` on hover background; row border/rounding unchanged.
- Mapped to lucide `ChevronDown` + `rotate-180 transition-transform duration-200` in the build (Material Symbols font not present in this project; the shared FAQAccordion elsewhere in this codebase already substitutes lucide icons for equivalent behavior — same approach reused here as a page-local component since this row's exact classes differ from the existing shared FAQAccordion).
- All 16 Q/A pairs extracted verbatim (see PartRequestFaq spec / component data for full text).

## Responsive sweep
- Did **not** use `resize_window`/`getComputedStyle()` for a literal mobile screenshot pass: this Chrome MCP session is shared with sibling agents cloning `/us/kullanim-sartlari` and `/bakim-robotu` in parallel, and the tab group was observed being hijacked/navigated away mid-session (tab left pointing at `/bakim-robotu`, then a new tab appeared already navigated to `localhost:3001/us/kullanim-sartlari` by another agent) and the whole MCP tab group was torn down once. Per the assignment's documented quirk, fell back to literal Tailwind responsive classes read directly from the DOM (`sm:`/`md:`/`lg:`/`xl:` breakpoints listed in PAGE_TOPOLOGY.md) rather than resizing the shared window, to avoid disrupting concurrent agents. Desktop screenshot captured successfully: `docs/design-references/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/desktop-1440-hero.jpg` (and a second scroll-position capture covering the SEO card + FAQ list top).
