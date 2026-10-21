# LoginCard Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/auth-giris-03cc2c81/LoginCard.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/auth-giris-03cc2c81/desktop-01-login-form.jpg`
- **Interaction model:** static wrapper (children handle their own state)

## DOM Structure
```
<div class="min-h-full flex flex-col justify-start items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <section class="w-full sm:mx-auto sm:max-w-md bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
    <header class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1>Giriş Yapın</h1>
    </header>
    <LoginForm />
    <SocialLoginButtons />
    <footer> <!-- link stack --> </footer>
  </section>
</div>
```
(This page has no side promo panel — a single centered card only.)

## Computed Styles (exact values from getComputedStyle, live site, 1440px)

### Outer page wrapper
- background-color: rgb(249, 250, 251) — matches existing `bg-gray-50` already on `<body>`, do not duplicate on `<html>`/`<body>`.
- padding: py-12 (48px top/bottom) — approximate from observed screenshot gap (~40-48px below header before card starts).

### Card wrapper (`header` — title-only wrapper, sm:mx-auto sm:w-full sm:max-w-md)
- maxWidth: 448px (only applied ≥640px)

### Card (section)
- backgroundColor: rgb(255, 255, 255)
- padding: 32px 40px (py-8 px-10, at ≥640px); 32px 16px at <640px (py-8 px-4)
- borderRadius: 8px (sm:rounded-lg) at ≥640px; 0px (edge-to-edge) at <640px
- boxShadow: `0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)` (Tailwind default `shadow`)
- width: 448px (max-w-md) at ≥640px; 100% at <640px

### H1 "Giriş Yapın"
- fontSize: 24px at ≥640px (`sm:text-2xl`, measured 25.008px at 1440px viewport with browser scaling); 30px at <640px (`text-3xl`, since `sm:` override doesn't apply below 640)
- fontWeight: 400 (normal — NOT bold, verified via computed style)
- color: rgb(17, 24, 39) (gray-900)
- textAlign: center
- marginBottom: 16px (mb-4)
- lineHeight: 36px (leading-9, default for text-3xl, kept at sm too)

## States & Behaviors
N/A — purely structural. All interactivity lives in `LoginForm` and `SocialLoginButtons`.

## Assets
None directly (children own their icons/images).

## Text Content (verbatim)
- "Giriş Yapın"

## Responsive Behavior
- **Desktop (1440px):** card is 448px wide, centered, rounded corners, shadow, 40px horizontal internal padding.
- **Tablet (768px):** same as desktop (≥640px breakpoint already active).
- **Mobile (390px):** card goes edge-to-edge (no rounding, 16px horizontal internal padding), title font grows to 30px/36px line-height.
- **Breakpoint:** 640px (Tailwind `sm:`).
