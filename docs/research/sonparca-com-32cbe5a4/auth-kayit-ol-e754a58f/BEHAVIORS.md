# Behaviors — /auth/kayit-ol (Hesap Oluştur / Register)

## Environment caveat
See PAGE_TOPOLOGY.md's recon-method note: the browser MCP tab group was contended by a
concurrent sibling agent/session for most of this task, so the full click/hover/scroll
sweep prescribed by the skill could only be partially completed live. What follows
combines what was directly observed in screenshots with well-established, low-risk
patterns for this exact kind of Angular reactive-form validation UI. Inferred items are
marked **[inferred]**.

## Confirmed observations

- **Fresh page load**: all three inputs empty, no error messages, no field borders
  highlighted, "Hesap Oluştur" button rendered in a muted/lighter indigo-blue tone
  (visually distinct from the site's orange `--color-sp-accent`), Cloudflare Turnstile
  widget shows a loading spinner placeholder.
- **After some field interaction** (captured in an earlier screenshot before contention
  made further live testing impossible): validation messages appeared under Email
  ("Zorunlu alan"), and under Şifre ("Zorunlu alan", "Şifre en az bir büyük harf
  içermelidir.", "Şifre en az bir küçük harf içermelidir. +2 hata"), and under Şifre
  Tekrar ("Zorunlu alan"). This confirms:
  - Required-field validation message is exactly **"Zorunlu alan"**.
  - Password has multiple composition rules, at least 4 total (2 shown + "+2 hata"
    collapsed indicator), evaluated live as you type.
  - The "+N hata" collapsed-count UI pattern is real and should be reproduced.
- The "Hesap Oluştur" submit button renders in a lighter/muted indigo-blue color in
  every screenshot captured (both totally empty and mid-interaction) — this looks like
  a disabled-state treatment, but its enabled-state color was never observed (typing
  did not reliably register during the contended session, so a fully-valid-form
  screenshot was not obtained).

## Interaction model
**Click/blur + live-typing driven, client-side, single page — no scroll-driven or
time-driven behavior.** Nothing changes on scroll besides the shared sticky header
(already implemented site-wide). No tabs/pills/accordions on this page.

## Inferred behaviors (clone implementation choices)

- **[inferred]** Full password rule set implemented as 4 checks, matching the visible
  two plus two more of the same style/voice:
  1. "Şifre en az 8 karakter içermelidir." (min length 8)
  2. "Şifre en az bir büyük harf içermelidir." (uppercase) — confirmed text
  3. "Şifre en az bir küçük harf içermelidir." (lowercase) — confirmed text
  4. "Şifre en az bir rakam içermelidir." (digit)
  - UI reproduces the "show first 2, then '+N hata'" collapsed pattern exactly as
    observed.
- **[inferred]** Şifre Tekrar (confirm password) mismatch message:
  "Şifreler eşleşmiyor." — shown only once both fields are non-empty and differ.
- **[inferred]** Submit button: disabled (muted indigo, `cursor-not-allowed`) while the
  form is invalid; enabled state uses a saturated indigo (closest reasonable inference
  from the only-ever-observed muted/disabled tone) rather than the site's orange accent,
  since the live button was never orange in any capture — reproducing what was actually
  seen takes priority over assuming brand-accent reuse.
- **[inferred]** Hover states: Google/Facebook buttons get a subtle background darken on
  hover (`hover:bg-gray-50` / `hover:bg-[#166fe0]` respectively) and the bottom
  "Giriş yapın" link underlines on hover — both standard, low-risk patterns consistent
  with the rest of the site's link/button hover treatment (see Header.tsx which
  universally uses `transition-colors hover:text-*` / `hover:bg-*`).
- **Cloudflare Turnstile widget**: real bot-verification is explicitly out of scope.
  Rendered as a static, non-functional visual placeholder box matching the observed
  size/border/spinner/"Cloudflare" wordmark layout — no external Turnstile script is
  loaded, and it never blocks the (also non-functional, no-op) submit handler.
- **Submit action**: no-op per assignment scope — `console.log` of the form values and
  `event.preventDefault()`, no real account creation, no network call.

## Responsive
- Could not run the live 768px/390px sweep due to tab contention. Card built to shrink
  to `w-full` with page-level `px-4` gutter below `max-w-sm`, matching the responsive
  gutter pattern already used sitewide (`mx-auto max-w-7xl px-4` in Header/Footer).
