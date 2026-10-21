# SocialAuthButtons Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/auth-kayit-ol-e754a58f/SocialAuthButtons.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/auth-kayit-ol-e754a58f/desktop-01-form-card.jpg` (bottom of card, scrolled view)
- **Interaction model:** static buttons, click is a no-op (real OAuth is out of scope)

## DOM Structure
```
<div class="flex flex-col gap-3">
  <button> Google icon + "Google ile Devam Et"
  <button> Facebook icon + "Facebook ile Devam Et"
```

## Computed Styles (pixel-measured from screenshot, confirmed layout)

### Google button
- height: `40px`, width: 100%
- backgroundColor: `#ffffff`
- border: `1px solid #d1d5db` (gray-300)
- borderRadius: `6px`
- display: flex, alignItems: center, justifyContent: center, gap: `8px`
- fontSize: `14px`, fontWeight 500, color `#374151` (gray-700)
- hover: `backgroundColor: #f9fafb` (gray-50), `transition-colors`

### Facebook button
- height: `40px`, width: 100%
- backgroundColor: `#1877F2` (Facebook brand blue, matches observed solid blue swatch)
- borderRadius: `6px`
- display: flex, alignItems: center, justifyContent: center, gap: `8px`
- fontSize: `14px`, fontWeight 600, color `#ffffff`
- hover: `backgroundColor: #166FE0`, `transition-colors`

### Icons
- Google: multi-color "G" logomark, `16px` square — implemented as inline SVG (the real
  4-color Google "G" glyph is small and brand-standard, safe to reproduce as an SVG
  icon glyph, not a trademark-scale asset).
- Facebook: white "f" glyph in a circle/rounded-square, `16px`, implemented as inline
  SVG or `lucide-react`'s `Facebook` icon (solid white, matches observed).

## States & Behaviors
### Hover
- **Google button:** `backgroundColor` `#ffffff` → `#f9fafb`, `transition-colors duration-150`.
- **Facebook button:** `backgroundColor` `#1877F2` → `#166FE0`, `transition-colors duration-150`.

### Click
- **Trigger:** click on either button.
- **Behavior:** no-op per assignment scope (`console.log('google-auth-clicked')` /
  `console.log('facebook-auth-clicked')`) — real OAuth/account creation is out of scope.

## Assets
- Google "G" mark: inline SVG (brand-standard 4-color glyph).
- Facebook "f" mark: inline SVG (`lucide-react` has no `Facebook` export in the
  installed version, confirmed via `tsc`), white fill, `className="size-4"`.

## Text Content (verbatim)
- "Google ile Devam Et"
- "Facebook ile Devam Et"

## Responsive Behavior
- **Desktop / Tablet / Mobile:** identical — both buttons are always 100% width of
  their parent card, stacked vertically with `gap-3` (`12px`). No breakpoint changes.
