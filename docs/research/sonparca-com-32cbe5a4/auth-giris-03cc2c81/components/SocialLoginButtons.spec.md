# SocialLoginButtons Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/auth-giris-03cc2c81/SocialLoginButtons.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/auth-giris-03cc2c81/desktop-01-login-form.jpg`
- **Interaction model:** static (buttons are inert / no-op — no real OAuth, out of scope)

## DOM Structure
```
<div class="mt-6">
  <div class="relative">
    <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-300" /></div>
    <div class="relative flex justify-center text-sm"><span class="px-2 bg-white text-gray-500">veya</span></div>
  </div>
  <div class="mt-6 grid grid-cols-1 gap-3">
    <button>...Google...</button>
    <button>...Facebook...</button>
  </div>
</div>
```

## Computed Styles (exact values from getComputedStyle, live site, 1440px)

### Divider wrapper
- class: `relative flex justify-center text-sm`
- "veya" span: class `px-2 bg-white text-gray-500`, sits on top of a `border-t border-gray-300` full-width line, `text-gray-500` = rgb(107,114,128) approx (Tailwind gray-500).

### Google button
- Exact class list captured live: `gsi-material-button flex items-center justify-center h-10 py-0 border border-[#747775] rounded-md bg-white text-[#1f1f1f] font-roboto font-medium text-sm hover:shadow-google-hover-shadow disabled:bg-[#ffffff61] disabled:border-[#1f1f1f1f] disabled:cursor-default w-full`
- height: 40px, width: 368px (full width of card content)
- backgroundColor: rgb(255,255,255); color: rgb(31,31,31); border: 1px solid rgb(116,119,117)
- borderRadius: 6px
- fontSize: 12.8px (text-sm), fontWeight: 500
- Icon: standard 4-color Google "G" mark, ~18x18px, left of text with ~8-12px gap.
- Text: "Google ile Devam Et"
- Clone hover: use `hover:shadow-md transition-shadow` as a faithful stand-in for the site's custom `hover:shadow-google-hover-shadow` utility.

### Facebook button
- Exact class list captured live: `fb-button-main-element flex items-center overflow-hidden rounded-md bg-[#1A77F2] text-white border-0 font-bold text-base h-10 hover:cursor-pointer focus:brightness-80 w-full`
- height: 40px, width: 368px
- backgroundColor: rgb(26,119,242) (#1A77F2); color: white
- borderRadius: 6px
- fontSize: 16px, fontWeight: 700 (bold)
- Icon: white circular Facebook "f" glyph, ~18x18px, left of text.
- Text: "Facebook ile Devam Et"
- Clone hover/focus: `hover:brightness-95 transition` as a stand-in for `focus:brightness-80`.

### Footer links (below the two OAuth buttons)
- "Hesabınız yok mu? Kayıt olun" → href `/auth/kayit-ol`
- "Şifrenizi mi unuttunuz?" → href `/auth/sifremi-unuttum`
- color: rgb(37, 99, 235) (blue-600), fontSize: 12.8px (text-xs), fontWeight: 500
- both centered (`text-center`), stacked with a small gap (`mt-2` between them), whole block `mt-6` below the Facebook button.
- Clone adds `hover:underline` for standard link affordance (not explicitly diffed live, but standard for this blue-600 link treatment sitewide).

## States & Behaviors
- Both OAuth buttons are visually interactive (hover feedback) but functionally inert — `onClick` is a no-op (real OAuth is out of scope). Use `type="button"`.
- Links use Next.js `Link` to their real target routes (`/auth/kayit-ol`, `/auth/sifremi-unuttum`) — these routes may not exist yet in this app; that's fine, they mirror the live site's hrefs. `/auth/kayit-ol` is being built concurrently by a sibling agent.

## Assets
- Google "G" logo: build as an inline SVG (`GoogleIcon`) in this file — standard 4-color multi-path mark, not a raster download.
- Facebook glyph: build as an inline SVG (`FacebookIcon`) in this file — white "f" on transparent (button already supplies the blue background), or the standard white-on-blue circle mark.

## Text Content (verbatim)
- "veya"
- "Google ile Devam Et"
- "Facebook ile Devam Et"
- "Hesabınız yok mu? Kayıt olun"
- "Şifrenizi mi unuttunuz?"

## Responsive Behavior
- **Desktop (1440px):** buttons full width of the 368px content area, stacked vertically with `gap-3` (12px).
- **Tablet/Mobile:** unchanged proportionally — buttons are always `w-full` of whatever the card's content width is.
- **Breakpoint:** none specific to this sub-component (inherits card's 640px breakpoint from LoginCard).
