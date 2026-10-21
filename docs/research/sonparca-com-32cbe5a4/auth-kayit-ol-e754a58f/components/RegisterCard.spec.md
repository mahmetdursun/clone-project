# RegisterCard Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/auth-kayit-ol-e754a58f/RegisterCard.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/auth-kayit-ol-e754a58f/desktop-01-form-card.jpg`
- **Interaction model:** static wrapper (all interaction lives in child `RegisterForm`)

## DOM Structure
```
<section> page wrapper (bg-gray-50, min-h-screen minus header/footer, flex justify-center)
  <div> card (bg-white, rounded-lg, shadow-sm, max-w-sm w-full, p-8)
    <h1> "Hesap Oluşturun"
    <RegisterForm />
    <div> divider row ("veya")
    <SocialAuthButtons />
    <p> "Zaten hesabınız var mı? <Link>Giriş yapın</Link>"
```

## Computed Styles (from pixel measurement of screenshot + site DESIGN_TOKENS.md — exact getComputedStyle() unavailable, see BEHAVIORS.md caveat)

### Page wrapper
- background: `#f7f7f7` (`--color-light-bg`, matches sitewide `bg-gray-50` body treatment)
- padding: `py-16 px-4` (generous top offset below header, ~64px, matches measured gap)
- display: flex, justify-content: center

### Card
- maxWidth: `384px` (`max-w-sm`)
- width: 100%
- backgroundColor: `#ffffff` (`--color-light-bg-white`)
- borderRadius: `8px` (`--radius-lg`)
- boxShadow: `0 1px 3px 0 rgb(0 0 0 / .08), 0 1px 2px -1px rgb(0 0 0 / .08)` (`--shadow-sm`)
- padding: `32px` (`p-8`)

### Title (h1)
- fontSize: `28px` (text-[28px]/text-3xl range — measured proportionally against the
  16px body text baseline visible in the card)
- fontWeight: 700
- color: `#192831` (`--color-light-text-primary`)
- textAlign: center
- marginBottom: `24px`

### Divider row
- display: flex, align-items: center, gap: `12px`
- pseudo-lines: flex-1, height 1px, backgroundColor `#e5e7eb` (gray-200)
- text: "veya", fontSize 14px, color `#9ca3af` (gray-400)
- marginY: `24px`

### Bottom link paragraph
- fontSize: `14px`
- textAlign: center
- marginTop: `16px`
- color: `#5b5b5b` (`--color-light-text-muted`) for the leading text
- link color: `#2563eb` (blue-600), `hover:underline`

## States & Behaviors
### N/A (static wrapper)
All stateful behavior is inside `RegisterForm`. No hover/scroll effects on the card
itself besides the standard link hover in the bottom paragraph:
- **"Giriş yapın" link:** color `#2563eb` → `underline` on hover, `transition-colors`.

## Assets
- None (no images/icons in this wrapper — icons live in `SocialAuthButtons`).

## Text Content (verbatim)
- "Hesap Oluşturun"
- "veya"
- "Zaten hesabınız var mı? Giriş yapın"

## Responsive Behavior
- **Desktop (1440px):** card centered, `max-w-sm`, wide gray margins either side (confirmed by screenshot).
- **Tablet (768px):** unchanged — card remains `max-w-sm` centered with page gutter.
- **Mobile (390px):** card becomes `w-full` inside `px-4` page gutter, `p-8` inside padding reduces to `p-6` to avoid cramped edges (not confirmed live — reasonable, low-risk inference per BEHAVIORS.md).
- **Breakpoint:** card padding step-down at `sm:` (640px); no column/layout changes since this was always single-column.
