# Page Topology — Bosch Yağ Filtresi 09864B7063 (Product Detail)

Source: https://www.sonparca.com/urun-detayi/bosch-yag-filtresi-09864b7063-p-PEqo3N7Soc

## Layout shell
- `SiteHeader` (TopBar + Header) — reused from `root-8a5edab2/Header.tsx`, sticky top, unchanged.
- `<main>` — `container mx-auto px-4 py-6 space-y-6` (matches homepage `main` wrapper).
- `Footer` — reused from `root-8a5edab2/Footer.tsx`, unchanged.

## Sections, top to bottom

1. **Breadcrumb** — `Ana Sayfa / Yağ Filtresi / Bosch Yağ Filtresi 09864B7063`. Static, home icon + slash separators + current page bold. Matches existing site breadcrumb convention (small gray text).

2. **Product Hero** (2-column grid on desktop, stacked on mobile)
   - **Left: ProductGallery** — single square product image (500x500 source) on white card, watermark background pattern (wrench/gear SVG + "SonParça" wordmark) baked into the photo, SKU badge pill in bottom-left corner of the card. No thumbnail rail (this product only has one image). Image scales 105% on hover with 300ms transition (`group-hover:scale-105 transition-transform duration-300`, same pattern as `ProductCard.tsx`). A "Yakınlaştır" (zoom) affordance is present as an accessible label on the image area (magnifier cursor / icon on hover) — modeled as a small icon button in the corner that is visually subtle at rest.
   - **Right: ProductBuyBox** —
     - Badge row: category pill ("Yağ Filtresi", orange/soft-orange), brand pill ("BOSCH", neutral gray), stock dot pill ("• Stokta", green).
     - Title: `Bosch Yağ Filtresi 09864B7063` (large bold heading).
     - Code chips row: `OEM 46544820`, `Ürün Kodu 09864B7063`, `SKU BR1000ST114088VH00000` — small monospace-ish gray pill/tag each.
     - Price card (bordered box): left side "SATIŞ FİYATI" label (small caps gray) + big orange price `208,64 TL` + `/ Adet` muted suffix; right side shipping info `🚚 Kargo: 196.89 TL` (bold amount) and stock line `✓ Stokta` (green, check icon).
     - Actions row: green outlined "Bilgi Alın" button (WhatsApp icon), quantity stepper (−, `1`, +), dark "add to cart" icon button (cart icon, dark bg, orange on hover) — same visual language as `ProductCard.tsx`'s cart button.

3. **AlternativeBrandsSection** ("Aynı Parça · Diğer Markalar") — orange left-border accent heading with count badge ("3 alternatif stokta") top-right; helper text referencing the OEM code. Grid of small cards (4 desktop cols / 2 tablet / 1-2 mobile): brand name + stock dot, part code, and either "İncele →" link (orange) for other brands or an em-dash for out-of-stock (MANDO). The current product's own card (BOSCH) is visually highlighted with an accent-colored border/ring to show "you are here".

4. **ProductDescription** — "Ürün Açıklaması" heading (orange accent bar), paragraph of descriptive body copy, then "Teknik Özellikler" sub-heading with a bordered key/value table (Ürün Kodu, OEM Kodu, Marka, Kategori, Paketleme, Stok — stock value in green), then a borderless price/delivery summary list (Fiyat, Kargo, Kargolama), then "Muadil ve Alternatif Parça Kodları" sub-heading with a bulleted list of `Brand — Code` pairs.

5. **FAQSection (static, expanded)** — "Sıkça Sorulan Sorular" heading, list of 5 Q/A pairs each with a small circular "S" avatar bubble to the left of the question (bold) and the answer text below (muted). Always expanded — this is SEO/AI-answer content, not an accordion. Followed by a bulleted list of 4 policy bullet points (support, same-day cutoff, exchange/return, pre-purchase support).

6. **FAQAccordion (collapsed, click-to-expand)** — a second, visually distinct "Sıkça Sorulan Sorular" block directly above the footer: bordered/divided list rows, each with a chevron ("›") that rotates/expands on click to reveal the answer. Contains overlapping but distinct question set (7 items visible in DOM: orijinal mi?, iade edebilir miyim?, ne zaman kargoya verilir?, ürününü iade edebilir miyim? [duplicate wording in source], alternatif marka var mı?, OEM kodu nedir?, fiyatı ne kadar?). INTERACTION MODEL: click-driven accordion, one row expanded at a time is the typical pattern for this component family; implemented with local `useState` for open index.

## Sticky / overlay elements
- Header is `sticky top-0 z-50` (inherited, unchanged).
- No other sticky elements observed on this page (no sticky buy-box on scroll).

## Responsive behavior (observed + inferred from sibling components' conventions)
- **Desktop (1440px):** Hero is a 2-column grid (`lg:grid-cols-2` gap-6), alternates grid 4 cols, tech-spec table full width.
- **Tablet (768px):** Hero stacks to 1 column (image above buy box); alternates grid 2 cols.
- **Mobile (390px):** Everything stacks to 1 column; code-chip row wraps; price card stacks price/shipping vertically; action row wraps quantity+cart below "Bilgi Alın".
- Breakpoint follows existing site convention: `sm` (640px) and `lg` (1024px) — matches `CategoryGrid`/`ProductCard` usage elsewhere in the codebase.

## Known extraction limitation
The shared Chrome MCP browser session in this environment is used concurrently by other parallel builder agents cloning other pages of the same site; the active tab was repeatedly hijacked (navigated away, window resized) mid-session by other processes. This prevented an exhaustive per-property `getComputedStyle()` dump and a clean live mobile-viewport screenshot. Extraction instead relied on: full verbatim page text (captured cleanly before/at each successful load), four full desktop screenshots covering every section end-to-end, one high-fidelity crop of the real product photo, and the exact CSS conventions already established (and already visually verified in production) by this same site's homepage components (`ProductCard.tsx`, `CategoryGrid.tsx`, `Footer.tsx`, `Header.tsx`, `globals.css` tokens). Spacing/typography values below are therefore expressed as the matching Tailwind utilities used consistently elsewhere on this site rather than raw pixel computed-style dumps.
