# RegisterForm Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/auth-kayit-ol-e754a58f/RegisterForm.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/auth-kayit-ol-e754a58f/desktop-01-form-card.jpg`
- **Interaction model:** click/blur + live-typing-driven client-side validation ("use client" component). See BEHAVIORS.md.

## DOM Structure
```
<form> (client-side, local React state only — no network call)
  <div> field group (Email)
    <label> "Email"
    <input type="email">
    <p> error(s) — "Zorunlu alan" when empty+touched
  <div> field group (Şifre)
    <label> "Şifre"
    <input type="password">
    <ul>/<p> error(s) — up to 4 password-rule messages, showing first 2 then "+N hata"
  <div> field group (Şifre Tekrar)
    <label> "Şifre Tekrar"
    <input type="password">
    <p> error(s) — "Zorunlu alan" / "Şifreler eşleşmiyor."
  <div> Cloudflare Turnstile placeholder box (static, decorative)
  <button type="submit"> "Hesap Oluştur"
```

## Computed Styles (pixel-measured + DESIGN_TOKENS.md; exact getComputedStyle() unavailable — see BEHAVIORS.md caveat)

### Field group
- marginBottom: `20px` (measured ~76-77px between successive input tops, minus ~40px label+input height leaves ~20-24px true gap when no error is showing; error text adds ~18px when present, matching observed screenshot where card grew from ~410px to ~460px tall with 3 error blocks visible)

### Label
- fontSize: `14px`
- fontWeight: 500
- color: `#192831` (`--color-light-text-primary`)
- marginBottom: `6px`
- display: block

### Input
- height: `40px` (h-10)
- width: 100%
- padding: `0 12px` (px-3)
- border: `1px solid #d1d5db` (gray-300)
- borderRadius: `6px` (`--radius-md`)
- fontSize: `14px`
- backgroundColor: `#ffffff`
- color: `#192831`
- focus: `border-color: var(--color-sp-accent) #ff7222; ring: 2px rgba(255,114,34,0.2)` (matches the search-bar focus-visible ring already established in Header.tsx: `focus-visible:ring-sp-accent`)
- invalid/touched-with-error state: `border-color: #ef4444` (`--color-error`)

### Error text
- fontSize: `12px`
- color: `#ef4444` (`--color-error`)
- marginTop: `4px`
- lineHeight: `1.4`
- the collapsed "+N hata" suffix appended in the same red, slightly bolder (`font-medium`), reproducing the exact observed pattern: "Şifre en az bir küçük harf içermelidir. +2 hata"

### Cloudflare Turnstile placeholder
- width: `300px` max, `100%`
- height: `65px`
- border: `1px solid #e5e7eb`
- borderRadius: `4px` (`--radius-default`)
- backgroundColor: `#fafafa`
- centered spinner icon (small, gray, `animate-spin` lucide `Loader2`) + "Cloudflare" wordmark text bottom-left (`text-[10px] text-gray-400`) + "Privacy · Help" bottom-right (`text-[10px] text-gray-400`) — purely decorative, matches the observed widget chrome, no real verification logic.
- marginY: `16px`

### Submit button
- height: `40px`
- width: 100%
- borderRadius: `6px`
- fontSize: `14px`, fontWeight 600
- **disabled state (form invalid):** backgroundColor `#a5b4fc` (indigo-300, closest match to the muted indigo-blue observed in every capture), color `#ffffff`, `cursor-not-allowed`, no hover effect
- **enabled state (form valid) [inferred — see BEHAVIORS.md]:** backgroundColor `#6366f1` (indigo-500), `hover:bg-[#4f46e5]` (indigo-600), transition-colors

## States & Behaviors

### Field-level validation (live, on change + on blur)
- **Trigger:** input `onChange` (re-validate) and `onBlur` (mark field "touched" so errors render)
- **Email:** required only. Error: "Zorunlu alan" when touched and empty.
- **Şifre:** required + 4 composition rules (see BEHAVIORS.md inferred list: min 8 chars,
  uppercase, lowercase, digit). Renders "Zorunlu alan" if empty; otherwise renders the
  failing rules, showing the first 2 inline and collapsing any remainder into
  `+N hata` appended to the 2nd line — reproducing the exact observed UI.
- **Şifre Tekrar:** required; if non-empty and differs from Şifre, shows
  "Şifreler eşleşmiyor."
- **Transition:** border-color / ring transition `transition-colors duration-150`, no
  layout-shift animation — error text simply appears/disappears (matches a plain
  reactive-forms conditional render, no exit animation was observed).

### Submit button enable/disable
- **Trigger:** derived from whether all three fields currently pass validation.
- **State A (invalid):** disabled, indigo-300 bg, not-allowed cursor.
- **State B (valid):** enabled, indigo-500 bg, clickable, hover darkens to indigo-600.
- **Implementation:** plain derived boolean from React state, no debounce needed.

### Submit
- **Trigger:** click on enabled submit button (or Enter key in a field).
- **Behavior:** `event.preventDefault()`, `console.log(formValues)` — explicitly a
  no-op per assignment scope (real registration is out of scope). No redirect, no
  loading spinner needed since nothing is actually submitted.

## Per-State Content
N/A — not a tabbed/multi-view component. All content is described above.

## Assets
- Icon: `Loader2` from `lucide-react` for the Turnstile placeholder spinner (spinning,
  decorative only).

## Text Content (verbatim / see BEHAVIORS.md for inferred items)
- Labels: "Email", "Şifre", "Şifre Tekrar"
- "Zorunlu alan" (confirmed verbatim)
- "Şifre en az bir büyük harf içermelidir." (confirmed verbatim)
- "Şifre en az bir küçük harf içermelidir." (confirmed verbatim)
- "Şifre en az bir rakam içermelidir." (inferred, same voice/pattern)
- "Şifre en az 8 karakter içermelidir." (inferred, same voice/pattern)
- "Şifreler eşleşmiyor." (inferred)
- "+N hata" collapsed-count suffix (confirmed pattern, e.g. "+2 hata")
- Button: "Hesap Oluştur"
- Cloudflare placeholder: "Cloudflare", "Privacy", "Help" (decorative labels only, no real links)

## Responsive Behavior
- **Desktop (1440px):** fields full-width within the `max-w-sm` card (confirmed).
- **Tablet (768px):** unchanged.
- **Mobile (390px):** unchanged proportionally — fields are already 100% width of
  their container at all sizes, so no responsive change needed beyond the card's own
  gutter (handled in `RegisterCard`).
- **Breakpoint:** none internal to this component.
