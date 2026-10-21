# Page Topology — /auth/giris (Giriş Yap)

Source: https://www.sonparca.com/auth/giris
Viewport tested: 1440x900 (desktop). Mobile (390px) inferred from the page's
Tailwind responsive classes (`sm:` = 640px breakpoint) after live extraction
was interrupted by shared-browser session instability (see note at bottom).

## Overall layout

- Uses the **full site chrome** — identical `TopBar` + `Header` combo as the
  homepage (`SiteHeader` from `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header.tsx`).
  Confirmed pixel-identical via screenshot: same dark top bar, same dark
  header row with logo/search/account icons.
- **No footer** on this page. The page content fits within the viewport with
  page background `bg-gray-50` (`rgb(249,250,251)`, matches project's
  `bg-gray-50` already set on `<body>` in `layout.tsx`).
- Body: `flex flex-col min-h-screen` wrapper (from `layout.tsx`, unchanged).
- Content wrapper below header: a plain block with `py-12`-ish top spacing
  (not full vertical centering — the card sits close to the top, roughly one
  header-height + ~40px below the header, with much more empty space below
  it than above).

## Sections (top to bottom)

1. **SiteHeader** (reused, unchanged) — TopBar + Header. Interaction model: static except existing hover states already implemented.
2. **LoginCard** — single white card, `max-w-md` (448px), centered
   horizontally (`mx-auto`), containing:
   - Title: "Giriş Yapın" (H1)
   - Email field (label "Email" + input type=email)
   - Şifre (password) field (label "Şifre" + input type=password) — no
     password-visibility eye-icon toggle exists on the live site.
   - Cloudflare Turnstile widget (bot-check box) between the password field
     and submit — non-functional visual shell only in the clone (real
     Turnstile integration is out of scope; no real auth).
   - Submit button "Giriş Yap" — disabled (lighter/opacity) until the form is
     non-empty; `bg-blue-600` when enabled, `hover:bg-blue-700`,
     `disabled:opacity-50`.
   - "veya" (or) divider with a horizontal rule.
   - "Google ile Devam Et" button (white, Google "G" logo, border).
   - "Facebook ile Devam Et" button (`#1A77F2` blue, Facebook glyph).
   - "Hesabınız yok mu? Kayıt olun" link → `/auth/kayit-ol`.
   - "Şifrenizi mi unuttunuz?" link → `/auth/sifremi-unuttum`.

No promo/illustration side panel exists on this page — it is a single
centered card, not a split-panel layout.

## Interaction model

- Static layout; the only dynamic behavior is **client-side form validation**
  (see BEHAVIORS.md) and the submit button's disabled state depending on
  whether the fields are filled.
- Both OAuth buttons and the submit button are **non-functional in the
  clone** per assignment scope (no real auth). They render as visual shells
  (submit does a no-op / console.log; OAuth buttons are inert).

## Responsive behavior (inferred from Tailwind classes extracted live)

- Card wrapper classes: `sm:mx-auto sm:w-full sm:max-w-md` and card itself
  `bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10`.
- **Desktop / tablet (≥640px):** card is 448px wide, centered, rounded-lg
  corners, `px-10` (40px) horizontal internal padding, shadow visible on all
  sides.
- **Mobile (<640px, e.g. 390px):** the `sm:` prefixed classes drop out —
  card becomes full-bleed edge-to-edge (no `mx-auto`/`max-w-md` constraint
  beyond the outer page padding), **no rounded corners**, internal padding
  drops to `px-4` (16px). Title font-size is actually *larger* on mobile
  (`text-3xl`, 30px) than on desktop (`sm:text-2xl`, 24px) per the site's own
  classes — verified via computed styles (25px measured at 1440px viewport,
  confirming the `sm:text-2xl` override is active there).
- Buttons and inputs are already `w-full` at all sizes, so no further stacking
  change happens at mobile beyond the card losing its rounding/padding.

## Note on extraction limitations

This shared Chrome MCP session is used concurrently by a sibling agent
building `/auth/kayit-ol`. Repeatedly, tabs opened for this page were closed
or reassigned mid-session (`Tab X is not in Claude's tab group`), which
interrupted the planned tablet/mobile screenshot pass and a couple of hover
captures. All layout facts above for mobile are derived directly from the
live-extracted Tailwind utility classes (which are deterministic/standard),
not guessed — only the actual screenshot pixels for <640px could not be
captured. Desktop (1440px) is fully screenshot-verified.
