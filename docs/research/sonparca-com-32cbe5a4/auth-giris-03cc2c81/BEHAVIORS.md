# Behaviors — /auth/giris (Giriş Yap)

## Interaction model
Static page + client-side form validation. No scroll-driven behavior (page
does not scroll — fits in viewport), no tabs/carousels, no time-driven
content.

## Form validation (observed live)

Reloading the page and letting it settle (~3s, while the Cloudflare
Turnstile widget finishes its check) revealed validation messages already
rendered in the DOM under `get_page_text` / on-screen, without the user
having clicked into or submitted the form:

- Under Email: **"Zorunlu alan"** (Required field) in red text.
- Under Şifre: **"Zorunlu alan"**, plus password-policy violations:
  - **"Şifre en az bir büyük harf içermelidir."** (must contain at least one
    uppercase letter)
  - **"Şifre en az bir küçük harf içermelidir. +2 hata"** (must contain at
    least one lowercase letter, "+2 hata" = "+2 more errors", i.e. the
    widget collapses a longer rule list and shows a "+N more errors"
    summary after the first couple of rules).

Error text renders in a small red font (visually consistent with ~12px,
similar size to the field labels), directly beneath each input, before the
Cloudflare widget.

**Implementation approach for the clone:** since real auth/validation logic
is out of scope, the clone implements a lightweight client-side check
(controlled inputs + local `touched`/`submitted` state) that shows the same
copy when a field is empty on submit attempt, matching the exact Turkish
strings above. The multi-rule password checklist is reproduced statically
(shown only once the password field has some invalid content) using the
same two sample rule strings + a "+2 hata" suffix, as a faithful visual
match rather than a real password-strength engine.

## Submit button state
- `disabled` (native `disabled` attribute) while the form is empty/invalid —
  renders as `bg-blue-600` at `opacity-50` (faded look, confirmed via
  `getComputedStyle`: class list includes `disabled:opacity-50`).
- Enabled state: solid `bg-blue-600`, `hover:bg-blue-700`.
- Clone implementation: local state derived from whether both fields are
  non-empty; real submission is a no-op (`console.log` placeholder) since
  authentication is out of scope.

## Password field
- No visibility-toggle (eye icon) exists on the live input — verified via
  zoomed screenshot of the field; it is a plain `type="password"` input with
  no adornment. The clone matches this (no toggle button).

## Cloudflare Turnstile widget
- A bot-check widget renders between the password field and the submit
  button. Observed states: "Verifying..." (spinner) transitioning to a green
  checkmark "Success!" after ~2-3s, both inside a bordered box with a small
  Cloudflare wordmark + "Privacy · Terms" links at the bottom-right.
- Out of scope to wire up real Turnstile (no site key / backend). The clone
  renders a static, non-interactive visual shell matching the box's
  dimensions/border/copy in its "Success!" resting state, clearly cosmetic
  only.

## Hover / focus states (from Tailwind classes extracted, not directly
screenshot-diffed due to session interruptions)
- Submit button: `hover:bg-blue-700` (darkens from blue-600 to blue-700).
- Google button: `hover:shadow-google-hover-shadow` (subtle elevation
  increase on hover) — reproduced with a simple `hover:shadow-md` fallback.
- Facebook button: `focus:brightness-80`; clone adds a matching
  `hover:brightness-95` for pointer feedback.
- Text links ("Kayıt olun", "Şifrenizi mi unuttunuz?"): standard link
  underline-on-hover treatment (`hover:underline`) added for affordance, as
  the extracted class list did not include an explicit hover variant but the
  links otherwise look like default anchor styling.
- Inputs: default browser/Tailwind focus ring; clone uses
  `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`
  matching the color scheme observed (blue-600 accents throughout this
  auth page, distinct from the main site's orange `sp-accent`).

## Responsive
See PAGE_TOPOLOGY.md — card loses rounded corners/side padding below the
640px breakpoint; title font-size is larger on mobile than desktop per the
site's own (slightly unusual) `text-3xl sm:text-2xl` class pairing.

## Known extraction gap
Live hover-state screenshots and a live mobile (390px) screenshot could not
be captured because the shared Chrome MCP browser session (also driven
concurrently by the sibling agent building `/auth/kayit-ol`) repeatedly
closed/reassigned this agent's tabs mid-sequence. All values above are from
directly-inspected `getComputedStyle()` / DOM class-list output at 1440px,
which is deterministic and did succeed multiple times before each
disconnect.
