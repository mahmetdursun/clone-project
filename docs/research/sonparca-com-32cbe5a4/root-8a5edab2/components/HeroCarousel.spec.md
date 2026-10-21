# HeroCarousel Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/HeroCarousel.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/root-8a5edab2/desktop-02-quicklinks-bestsellers.jpg` (top strip shows tail of carousel)
- **Interaction model:** time-driven autoplay + click-driven arrows/dots

## DOM Structure
```
<div class="relative rounded-lg overflow-hidden"> (full-bleed banner, ~450px tall scaled to container width)
  <a class="absolute inset-0 block"> (slide 1, clickable full-cover link)
    <img class="absolute inset-0 w-full h-full object-cover" src="hero-slide-1.webp">
  <a class="absolute inset-0 block"> (slide 2, same structure, cross-faded/hidden when inactive)
    <img ... src="hero-slide-2.webp">
  <button class="absolute left-4 top-1/2 -translate-y-1/2"> chevron-left, circular semi-transparent
  <button class="absolute right-4 top-1/2 -translate-y-1/2"> chevron-right, circular semi-transparent
  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2"> dot indicators (2)
```

## Computed Styles
- Container: `aspect-[1600/450]` (≈3.56:1) or fixed height matching `450px` at 1600px reference width — use `aspect-ratio` CSS so it scales responsively; `rounded-lg` (8px), `overflow-hidden`.
- Images: `object-fit: cover`, `object-position: center`, fill container absolutely.
- Arrow buttons: 40px circle, `bg-black/30`, white icon, hover → `bg-black/50`, `transition-colors duration-200`.
- Dots: 8px circle, inactive `bg-white/50`, active `bg-sp-accent` (#ff7222), `transition-colors duration-200`.

## States & Behaviors
- **INTERACTION MODEL: time-driven (autoplay) + click-driven (arrows/dots).**
- Autoplay: advance to next slide every ~5s, pause-on-hover is a reasonable default (not verified on live site but standard for this carousel pattern — implement with `setInterval` cleared on unmount and on manual navigation).
- Slide transition: crossfade opacity (`transition-opacity duration-500`) — simplest robust implementation; alternative is a translateX slide, either is acceptable since the exact transition curve wasn't isolated during the sweep.
- Clicking an arrow immediately advances/retreats one slide and resets the autoplay timer.
- Clicking a dot jumps to that slide.
- Each slide's `<img>` is wrapped in a full-cover `<a>` — entire banner area is a clickable link (destination unknown/out of scope; use `href="#"` or omit navigation).

## Assets
- Slide 1: `/sites/sonparca-com-32cbe5a4/root-8a5edab2/images/hero-slide-1.webp` (1600×450)
- Slide 2: `/sites/sonparca-com-32cbe5a4/root-8a5edab2/images/hero-slide-2.webp` (1600×450)

## Text Content
- N/A — all copy is baked into the slide images (confirmed via `elementFromPoint`; no live DOM text over the banner).

## Responsive Behavior
- **Desktop (1440px):** full container width, `rounded-lg` corners visible.
- **Mobile (390px):** same component, full width, `aspect-ratio` keeps it proportional (shorter in px but same ratio); arrows may shrink to 32px and dots stay centered.
- **Breakpoint:** fluid via `aspect-ratio`, no hard breakpoint needed.
