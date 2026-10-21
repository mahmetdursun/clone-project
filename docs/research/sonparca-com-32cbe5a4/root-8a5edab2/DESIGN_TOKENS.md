# Design Tokens — sonparca.com

Extracted directly from the compiled stylesheet `:root` block (`https://www.sonparca.com/styles-MFJA42G7.css`) — exact source values, not estimated.

## Colors
```
--color-dark-bg: #192831
--color-dark-bg-light: #2a3d4a
--color-dark-bg-lighter: #3b4f5c
--color-dark-text-accent: #ff7222
--color-dark-text-muted: #a5a9ab
--color-dark-text-primary: #f7f7f7

--color-light-bg: #f7f7f7
--color-light-bg-white: #ffffff
--color-light-bg-muted: #eeeeee
--color-light-text-accent: #ff7222
--color-light-text-muted: #5b5b5b
--color-light-text-primary: #192831

--color-accent: #ff7222
--color-accent-hover: #e5651f
--color-accent-light: #ff8844
--color-accent-dark: #cc5b1b

--color-success: #22c55e
--color-error: #ef4444
--color-warning: #f59e0b
--color-info: #3b82f6
```
Page body background is plain Tailwind `bg-gray-50` (#f9fafb); body text `text-stone-900`.

## Radius
```
--radius-sm: 2px
--radius-default: 4px
--radius-md: 6px
--radius-lg: 8px
```

## Shadows
```
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / .03)
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / .08), 0 1px 2px -1px rgb(0 0 0 / .08)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / .08), 0 2px 4px -2px rgb(0 0 0 / .08)
```

## Spacing scale
```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-6: 24px
--space-8: 32px
```

## Typography
- Font family: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` — no `@font-face` found in the stylesheet, so the live site relies on system-installed Inter/fallback stack. Clone should load real Inter via `next/font/google` for guaranteed rendering.
- Icon font: `"Material Symbols Outlined"` is referenced as a fallback family on some elements — actual icons used across cards/nav appear to be a mix of this icon font and inline SVG; map to `lucide-react` equivalents for the clone (same visual language: outline, 24px grid).
- Header logo wordmark: `font-size: 20px; font-weight: 700; color: #f7f7f7`.

## Layout
- Container: `container mx-auto px-4`.
- Header: `bg-dark-bg` sticky, `z-50`, row `flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-2 lg:py-0 lg:h-16 lg:flex-nowrap`.
- Search bar wrapper: `order-3 w-full lg:order-2 lg:flex-1 lg:w-auto lg:min-w-0 lg:mx-4 lg:max-w-xl xl:max-w-2xl`.

## Tech stack notes
- Framework: **Angular 22** (`ng-version="22.1.5"`), NOT React/Next — a clean-room Tailwind reimplementation in Next.js is the correct approach (no code reuse possible or desirable).
- Styling: Tailwind v4 utility classes + the custom CSS variable theme above (project already uses Tailwind v4, so these tokens map directly into `globals.css` `@theme`).
- No SSR: initial HTML has no rendered `<img>` tags — fully client-rendered SPA. Confirmed via `curl` (empty grep for `<img`).
