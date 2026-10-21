# Page Topology — /auth/kayit-ol (Hesap Oluştur / Register)

Source: https://www.sonparca.com/auth/kayit-ol
Framework: Angular 22 (ng-version), same SPA as the rest of sonparca.com — clean-room Tailwind/Next.js reimplementation.

## Recon method note
Chrome MCP browser automation on this task ran in a tab group that was concurrently
contended by a sibling agent (cloning `/auth/giris`) and other background browsing —
tabs were repeatedly evicted from the MCP tab group mid-sequence, and `javascript_tool`
calls consistently failed with "not in tab group" even immediately after a successful
screenshot on the same tab. Two full desktop screenshots (top-of-form and
scrolled-to-footer) and a `get_page_text` dump were captured successfully before
contention made further extraction unreliable. Exact `getComputedStyle()` extraction
for this page's unique elements (the form card) was not obtainable; layout/spacing was
derived from careful pixel measurement of the captured screenshots plus the site's
already-extracted global DESIGN_TOKENS.md (colors/radius/shadow/spacing — authoritative,
extracted directly from the site's compiled stylesheet during the homepage clone, and
still valid since it's the same global stylesheet). Any value not confirmed by pixel
measurement or the token doc is called out explicitly in the component specs as an
inference.

## Sections top to bottom

1. **TopBar + Header** (shared site chrome, flow, sticky header)
   - Identical to the homepage's `SiteHeader` (`TopBar` + `Header`) at
     `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header.tsx`.
   - Confirmed via screenshot: same dark bg (#192831), same contact links, same nav
     links, same logo/search bar/account icons row. Reused as-is — no page-specific
     header needed.
   - Note: header's account area still reads "Giriş Yap / Kayıt Ol" links (pointing to
     `/giris` and `/kayit`) even while sitting on the register page — this matches the
     live site's own header (it doesn't swap state per auth page), so left unchanged.

2. **Register form section** (main content, static single-column, NOT split-panel)
   - Unlike a typical split-panel auth layout (image one side / form other side), this
     page is a single centered white card on a plain light-gray page background —
     confirmed by both screenshots (no side image/illustration exists on this page).
   - Card contains, top to bottom:
     a. Title: "Hesap Oluşturun"
     b. Email field (label "Email" + text input)
     c. Şifre field (label "Şifre" + password input) with live validation messages
     d. Şifre Tekrar field (label "Şifre Tekrar" + password input)
     e. Cloudflare Turnstile human-verification widget (decorative/static in the clone)
     f. "Hesap Oluştur" submit button
     g. "veya" divider
     h. "Google ile Devam Et" button (white, Google logo)
     i. "Facebook ile Devam Et" button (Facebook blue, Facebook logo)
     j. "Zaten hesabınız var mı? Giriş yapın" link back to /auth/giris
   - Interaction model: **click/blur-driven** client-side validation (no scroll-driven
     behavior on this page). Angular reactive-forms-style validation messages appear
     under each field once it's touched/invalid.

3. **Footer** (shared site chrome, flow)
   - Identical to homepage `Footer` component — confirmed via the scrolled screenshot
     (Son Parça / Hesap İşlemleri / İletişim / Sosyal Medya columns, marketplace badges).
   - Reused as-is from `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer.tsx`.

## Layout
- Page wrapper: plain light background (`bg-gray-50` equivalent, matches
  `--color-light-bg: #f7f7f7` token), full viewport width.
- Register card: centered horizontally, `max-w-sm` (~384px) white rounded card with a
  subtle shadow, vertically offset from the header by generous top margin
  (~64px based on pixel measurement of the screenshot).
- No sidebar, no split panel, no sticky elements besides the shared sticky header.
- Z-index: only the shared sticky header (z-50) sits above flow content; no
  modals/dropdowns on this page.

## Responsive
- Desktop (1440px): card centered with wide gray margins either side (confirmed).
- Mobile (390px): could not capture a live mobile screenshot due to tab contention
  (see note above); built responsively so the card goes to full width minus page
  gutter (`px-4`) below the `max-w-sm` breakpoint, consistent with how the rest of the
  site (Header/Footer, already built) collapses to single-column stacking under the
  same Tailwind breakpoints. This is a standard, low-risk responsive pattern for a
  single centered form card.
