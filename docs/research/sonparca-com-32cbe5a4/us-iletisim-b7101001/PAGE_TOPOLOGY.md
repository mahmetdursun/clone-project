# Page Topology — /us/iletisim (İletişim / Contact)

Source: https://www.sonparca.com/us/iletisim
Note: the live site is actually built with Angular (`zx-contact`, `router-outlet`, `ng-star-inserted` markers found in DOM) styled with Tailwind utility classes directly in the markup — not Next.js. This does not change our approach: we clone the rendered output pixel-for-pixel into our Next.js/React/Tailwind stack.

## Overall layout
- Standard site chrome: `TopBar` + `Header` (shared, reused from `root-8a5edab2/Header.tsx` as `SiteHeader`) at top, `Footer` (shared, reused from `root-8a5edab2/Footer.tsx`) at bottom.
- Page body is 5 stacked `<section>` elements, all static/flow content (no sticky/fixed elements besides the header, no scroll-driven animation, no carousels).
- No contact form (name/email/subject/message) exists on this page — contrary to the generic assumption in the assignment brief. The page is purely informational: contact info cards + embedded map + working hours + FAQ accordion.

## Sections (top to bottom)

1. **Hero / Page Title** — `section.w-full.bg-gradient-to-r.from-blue-50.to-gray-50`
   - Centered `h1` "İletişim" + subtitle paragraph.
   - Interaction model: static.

2. **Contact Info Cards** — `section.container.mx-auto.px-4.py-8.md:py-12`
   - `div.grid.grid-cols-1.lg:grid-cols-12.gap-8` containing 4 cards, each `lg:col-span-6` (2×2 grid at desktop, single column on mobile/tablet since only `lg:` breakpoint applies grid-cols-12).
   - Card 1: Telefon (phone icon, tel: link, hours line)
   - Card 2: E-posta (mail icon, mailto: link)
   - Card 3: Adres (map-pin icon, static address text, no link)
   - Card 4: Sosyal Medya (message-circle/chat icon, 3 social links: Instagram, Facebook, X)
   - Interaction model: hover-only (link underline / icon color darken).

3. **Map Section ("Bize Ulaşın")** — `section.w-full.py-10`
   - Centered `h2` + a `div.w-full.h-96.rounded-md.overflow-hidden.shadow-sm.border` containing a live Google Maps `<iframe>` (lazy-loaded).
   - Per assignment scope: reproduce as a static styled placeholder block with the real address rather than embedding a live third-party map iframe.
   - Interaction model: static (in our clone).

4. **Working Hours ("Çalışma Saatlerimiz")** — `section.container.mx-auto.px-4.py-10`
   - Centered card (`max-w-4xl mx-auto bg-white p-6 rounded-md shadow-sm border`) with `h2` heading, 2-column grid (`Müşteri Hizmetleri` / `Depo ve Sevkiyat`), each a `<ul>` of day/hours rows, plus a closing note paragraph.
   - Interaction model: static.

5. **FAQ Accordion** — `section.py-8.bg-gray-50`
   - `div.max-w-4xl.mx-auto` containing heading "İletişim - Sıkça Sorulan Sorular" and 3 accordion items, each its own bordered rounded box (`space-y-3` gap between boxes, NOT a single divided container).
   - Interaction model: click-driven, one item can be open independently of others (all 3 were independently toggleable — not single-open-only exclusive; verified by opening all three simultaneously in the sweep).
   - Icon flips between chevron-down (closed) and chevron-up (open); background tint stays white with hover:bg-gray-50 on the button.

## Dependencies / shared components
- `SiteHeader` (TopBar + Header) and `Footer` — reused as-is from `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/`. No changes needed; footer content already matches (Kurumsal/İletişim/Hesap İşlemleri/Sosyal Medya columns, same phone/email/address/hours).
- No page-specific global CSS or fonts needed beyond what's already in `globals.css`/`layout.tsx`.
