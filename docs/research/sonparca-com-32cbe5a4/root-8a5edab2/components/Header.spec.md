# Header Specification (TopBar + Header)

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/root-8a5edab2/desktop-01-hero-vehicle-finder.jpg` (top strip)
- **Interaction model:** static (TopBar), sticky-on-scroll (Header, CSS-only)

## DOM Structure
```
<div> TopBar (thin bar, sits above header, dark bg)
  <div container>
    left: phone icon + "0850 302 25 08", mail icon + "destek@sonparca.com"
    right: text links "Hakkımızda" "İletişim" "Gizlilik Politikası" "Kullanım Koşulları" "İade Politikası" "Sipariş Takibi"
<header> sticky
  <div container mx-auto px-4>
    <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-2 lg:py-0 lg:h-16 lg:flex-nowrap">
      <a class="text-xl font-bold text-dark-text-primary shrink-0 order-1"> Logo (img + "SonParça" wordmark)
      <div class="order-3 w-full lg:order-2 lg:flex-1 lg:w-auto lg:min-w-0 lg:mx-4 lg:max-w-xl xl:max-w-2xl"> search bar
        <input placeholder="Şasi, parça numarası veya ürün kodu ile arayın">
        <button orange search icon>
      <div class="button-container flex items-center space-x-4 order-2 lg:order-3">
        "Giriş Yap" / "Kayıt Ol" text links
        "Garajım" (garage icon + label)
        "Sepetim" (cart icon, "Boş" subtext, badge count)
```

## Computed Styles
### TopBar
- backgroundColor: `#192831` (dark-bg), text: `dark-text-muted` (#a5a9ab), fontSize: 14px, padding: 8px 0
- Right link list: `gap: 16px`, hover → color `dark-text-primary` (#f7f7f7), `transition-colors`

### Header
- backgroundColor: `#192831` (bg-dark-bg)
- position: sticky; top: 0; z-index: 50
- boxShadow: shadow-sm token (`0 1px 3px 0 rgb(0 0 0 / .08), 0 1px 2px -1px rgb(0 0 0 / .08)`)
- Row height: `lg:h-16` (64px) desktop; wraps to 2 rows below `lg` (mobile-first stacked: logo+buttons row, then full-width search row)

### Logo
- fontSize: 20px; fontWeight: 700; color: `#f7f7f7`
- Logo asset: `/public/sites/sonparca-com-32cbe5a4/shared/logo.svg` (300x73, render at `h-12` ~48px)

### Search bar
- Input: full width, `rounded-md`, `bg-white`, placeholder text `text-gray-400`, height ~40px
- Submit button: `bg-sp-accent` (#ff7222), white search icon, `rounded-r-md`, hover → `bg-sp-accent-hover` (#e5651f)

### Right cluster
- "Giriş Yap" / "Kayıt Ol": `text-dark-text-primary` links, small chevron/divider between
- "Garajım": icon (home/garage) stacked over label, `text-dark-text-muted`, hover → `text-dark-text-primary`
- "Sepetim": cart icon + "Boş" (empty state text), same muted→primary hover

## States & Behaviors
- **Sticky header:** `position: sticky; top:0` — pure CSS, no JS scroll listener needed, no visual change on scroll (single background throughout).
- **Link hover:** all nav/text links transition `color` over ~150ms ease (Tailwind default `transition-colors`).
- **Search input focus:** ring/border highlight using standard focus-visible ring.

## Assets
- Logo: `/sites/sonparca-com-32cbe5a4/shared/logo.svg`
- Icons: use `lucide-react` — `Phone`, `Mail`, `Search`, `User`, `Warehouse` (Garajım), `ShoppingCart`

## Text Content (verbatim)
- Phone: "0850 302 25 08" | Email: "destek@sonparca.com"
- Top links: "Hakkımızda", "İletişim", "Gizlilik Politikası", "Kullanım Koşulları", "İade Politikası", "Sipariş Takibi"
- Search placeholder: "Şasi, parça numarası veya ürün kodu ile arayın"
- "Giriş Yap", "Kayıt Ol", "Garajım", "Sepetim", "Boş"

## Responsive Behavior
- **Desktop (1440px):** single row, `lg:h-16 lg:flex-nowrap`, search bar `lg:max-w-xl xl:max-w-2xl` centered between logo and right cluster.
- **Mobile (390px):** `flex-wrap`, logo + right cluster on row 1 (`order-1`, `order-2`), search bar wraps to full width row 2 (`order-3 w-full`).
- **Breakpoint:** `lg` (1024px) per captured Tailwind classes.
