# Page Topology — /us/gizlilik-politikasi (Privacy Policy)

Source: https://www.sonparca.com/us/gizlilik-politikasi
Framework observed: Angular 22 SPA (`zx-privacy-policy` custom element, `zx-faq-accordion` custom element), Tailwind utility classes read directly from DOM `className`.

## Layout shell
- `<main class="flex-grow w-full pb-16 md:pb-0">` — shared site shell (already built: `SiteHeader` / `Footer` from `root-8a5edab2`). No page-specific breadcrumb nav exists on this page (confirmed via `document.querySelectorAll('nav')` — the only 4 `<nav>` elements on the page belong to the shared header/mobile-nav/footer, not to this route).
- Inside `<main>`: a single custom element `<zx-privacy-policy>` wrapping one container div:
  `<div class="container mx-auto max-w-screen-xl overflow-x-hidden px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 text-gray-700">`

## Sections top to bottom (all static flowing content, NOT an accordion)
1. **Header block** (`<header class="border-b border-gray-200 pb-4 md:pb-6 mb-6 md:mb-8">`)
   - `h1` — page title
   - `p` — "Son Güncelleme Tarihi: 28/05/2025" (last-updated date)
   - `p` — intro paragraph
2. **Section 1 — Topladığımız Bilgi Kategorileri** — numbered heading + intro `p` + 2x2 card grid (4 cards, each with `h3` + bulleted `ul`)
3. **Section 2 — Kişisel Verilerin İşlenme Amaçları** — numbered heading + intro `p` + bulleted `ul` (7 items) + blue callout `div` (marketing consent note)
4. **Section 3 — Bilgilerin Paylaşımı ve Aktarımı** — numbered heading + intro `p` + bulleted `ul` (4 items, each with a bold lead-in label) + trailing small gray `p` (cross-border transfer note)
5. **Section 4 — Kullanıcı Haklarınız** — numbered heading + intro `p` + bulleted `ul` (7 rights) + trailing `p` (how to exercise rights)
6. **Section 5 — Çerezler ve Benzeri Teknolojiler** — numbered heading + intro `p` + bulleted `ul` (3 items)
7. **Section 6 — Veri Güvenliği ve Saklama Süreleri** — numbered heading + intro `p` + bulleted `ul` (3 items)
8. **Section 7 — Çocukların Gizliliği** — numbered heading + 2 plain paragraphs
9. **Section 8 — Politikada Yapılabilecek Değişiklikler** — numbered heading + 2 plain paragraphs
10. **Section 9 — İletişim ve Başvuru Kanalları** — numbered heading + intro `p` + `ul.list-none` (email/phone/address, each `<strong>Label:</strong> value`, email/phone as `mailto:`/`tel:` links) + trailing `p`
11. **Closing legal note** — standalone small gray `p` below section 9 ("Bu politika, yürürlükteki...")
12. **FAQ accordion** (`<zx-faq-accordion>`) — "Gizlilik Politikası - Sıkça Sorulan Sorular", 3 click-to-expand Q&A items. THIS is click-driven (confirmed by clicking — icon toggles `expand_less`/`expand_more`, answer panel reveals). The 9 numbered legal sections above are plain always-visible flowing text, NOT collapsible — confirmed by scrolling through with no accordion controls present.

## Interaction model summary
- Numbered sections 1–9: **static**, always-expanded flowing text. No accordion, no click handlers.
- FAQ block at the bottom: **click-driven** accordion, independent toggle per item (multiple can be open at once, same pattern as `ContactFAQ.tsx` built for `/us/iletisim`).
- No scroll-driven behavior, no hover-driven content changes beyond standard link/button hover colors.

## Responsive behavior
- Breakpoint used throughout: Tailwind `md:` (768px). Card grid in Section 1 goes `grid-cols-1` → `md:grid-cols-2`. Font sizes step up at `md:` (e.g. h1 `text-xl` → `md:text-2xl` → `lg:text-3xl`). Paddings/margins step up at `md:` (e.g. `mb-8 md:mb-10`).
- Known extraction gap: mobile (390px) and tablet (768px) viewport screenshots could not be captured directly — `resize_window` was unreliable in this session (shared Chrome MCP browser; `window.innerWidth` still reported 1920 after a resize call to 390x844, matching the documented environment quirk). Responsive behavior above was instead derived from literal Tailwind responsive class prefixes (`md:`, `lg:`) read straight from the live DOM, which is reliable and sufficient for a mobile-first utility-class rebuild.

## Assets
- No images/icons specific to this page beyond the shared site header/footer assets (logo, nav icons) already present in `root-8a5edab2`. No downloads needed into this page's asset root.
