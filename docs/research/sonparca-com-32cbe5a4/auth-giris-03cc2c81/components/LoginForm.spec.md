# LoginForm Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/auth-giris-03cc2c81/LoginForm.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/auth-giris-03cc2c81/desktop-01-login-form.jpg`
- **Interaction model:** client-side, local-state only (no real auth). `"use client"`.

## DOM Structure
```
<form class="space-y-6" onSubmit={no-op / console.log}>
  <div>
    <label>Email</label>
    <div class="mt-1">
      <input type="email" />
    </div>
    {emailError && <p>Zorunlu alan</p>}
  </div>
  <div>
    <label>Şifre</label>
    <div class="mt-1">
      <input type="password" />
    </div>
    {passwordErrors.length > 0 && <ul>...</ul>}
  </div>
  <TurnstileShell /> <!-- static visual shell -->
  <button type="submit" disabled={!email || !password}>Giriş Yap</button>
</form>
```

## Computed Styles (exact values from getComputedStyle, live site, 1440px)

### Labels ("Email", "Şifre")
- fontSize: 12.8px (text-sm, ~14px nominal Tailwind value; use `text-sm` class)
- fontWeight: 500 (font-medium)
- color: rgb(55, 65, 81) (gray-700)
- display: block

### Inputs (email + password)
- width: 368px (full width of card content area — use `w-full`)
- height: 48px
- padding: 10px 12px
- border: 2px solid rgb(209, 213, 219) (gray-300) — note: 2px, not Tailwind's default 1px
- borderRadius: 6px (rounded-md)
- backgroundColor: rgb(255, 255, 255)
- fontSize: 16px
- color: rgb(28, 25, 23)
- Focus state (clone behavior, standard Tailwind form pattern since live focus-ring color wasn't directly diffed before session drop): `focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`
- No password-visibility toggle icon — plain `type="password"` input.

### Validation error text
- Turkish copy (verbatim, observed live in DOM after ~3s / Turnstile settle):
  - Email empty: "Zorunlu alan"
  - Password empty: "Zorunlu alan"
  - Password present but invalid (missing uppercase): "Şifre en az bir büyük harf içermelidir."
  - Password present but invalid (missing lowercase): "Şifre en az bir küçük harf içermelidir. +2 hata"
- Styling: small red text (`text-xs text-red-600`), `mt-1`, directly below each input's wrapper div.
- Clone logic: show "Zorunlu alan" under a field once the form has been submitted (or field blurred) while that field is empty. For the password field, once it has *some* non-empty value that fails a simple heuristic (missing an uppercase or lowercase letter), show the two-line checklist ending in "+2 hata" exactly as observed — this is a faithful visual reproduction, not a real password-strength engine.

### Submit button ("Giriş Yap")
- Exact class list captured live: `w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`
- `disabled` (native attribute) when `email` or `password` state is empty — matches live site's default (loads disabled/faded).
- Text: "Giriş Yap"
- onClick: no real submission — `console.log("[demo] login submit", { email })` or local state toggle only. No network call.

## States & Behaviors

### Submit-disabled state
- **Trigger:** either controlled input is empty.
- **State A (disabled):** `bg-blue-600` at `opacity-50` (via `disabled:opacity-50`), `cursor-not-allowed` implied by disabled attribute, matches the faded lavender-blue look seen on first page load.
- **State B (enabled):** solid `bg-blue-600`, hover → `bg-blue-700`.
- **Transition:** standard Tailwind `transition-colors` (site doesn't explicitly show a duration but treat as instant/CSS default is fine).

### Validation display
- **Trigger:** local `submitted` boolean set true on form submit attempt (click "Giriş Yap" — note it will typically be disabled until fields are non-empty, so also trigger validation display on blur of a field left empty after being focused, to mirror the live site showing errors proactively).
- **Before:** no error text.
- **After:** red error paragraph(s) appear directly under the affected field, per copy above.

## Turnstile visual shell (inline within this component or as a tiny inline block — no separate file needed, it's ~10 lines)
- A bordered box, `border border-gray-300 rounded-md`, roughly 300px wide x 74px tall, light background, containing a small green checkmark circle + "Success!" text on the left and a small gray "CLOUDFLARE" wordmark + "Privacy · Terms" micro-links on the right — purely decorative/static (resting "verified" state), no real Turnstile script/keys.

## Assets
None (no icons needed beyond a simple inline checkmark SVG for the Turnstile shell, defined locally in this file).

## Text Content (verbatim)
- "Email", "Şifre", "Giriş Yap"
- "Zorunlu alan"
- "Şifre en az bir büyük harf içermelidir."
- "Şifre en az bir küçük harf içermelidir. +2 hata"
- "Success!" (Turnstile shell)

## Responsive Behavior
- **Desktop (1440px):** inputs 368px effective width (100% of card content area), unchanged.
- **Tablet (768px):** unchanged (card still ≥640px layout).
- **Mobile (390px):** inputs remain `w-full`, just narrower because the card itself is narrower (edge-to-edge minus 16px padding each side).
- **Breakpoint:** 640px.
