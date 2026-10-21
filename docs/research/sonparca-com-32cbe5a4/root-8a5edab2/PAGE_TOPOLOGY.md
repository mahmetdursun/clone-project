# Page Topology — sonparca.com (/)

Source: https://www.sonparca.com/ | Angular 22 SPA, Tailwind v4 utility classes, custom CSS variable theme.

## Layout
- Page background: `#f9fafb` (Tailwind `bg-gray-50`), body text `text-stone-900`.
- Content container: `container mx-auto px-4` (max-width matches Tailwind's default `container` breakpoints).
- Header is `sticky top-0 z-50`.

## Sections, top to bottom

1. **TopBar** — thin dark bar above header. Phone + email on left, link list on right (Hakkımızda, İletişim, Gizlilik Politikası, Kullanım Koşulları, İade Politikası, Sipariş Takibi). Static.
2. **Header** — `bg-dark-bg (#192831)`, sticky. Logo (SVG, "SonParça"), central search bar (placeholder "Şasi, parça numarası veya ürün kodu ile arayın") with orange search button, right cluster: Giriş Yap / Kayıt Ol, Garajım (icon+label), Sepetim (cart icon + "Boş"). Static except sticky.
3. **VehicleFinder** — dark card (`bg-dark-bg`) directly under header. Header row: "Aracınızı Bulun" + tab switch (Şasi No / Araç Seçin / Garajım — pill buttons, Araç Seçin active by default = orange). Body: step "1 Araç Markası" with a search input and a 4-column x 4-row grid of 28 brand buttons (Audi, Chery, Chevrolet, ... Volvo). Below the grid: illustration image (car parts line art) and a status strip "Aracınızı bulmak için marka seçin". **Interaction model: click-driven** — clicking a brand advances the flow (not verified further, homepage scope only); tab pills switch panel content.
4. **HeroCarousel** — full-bleed banner, 2 slides, prev/next arrow buttons, dot indicators. **Each slide is a single `<img>` (1600x450 .webp) wrapped in an absolutely-positioned full-cover link — the headline text is baked into the image, not live DOM text.** Confirmed via `elementFromPoint`.
5. **QuickLinksGrid** — 8 small cards in a responsive grid, each: icon (colored square, rounded), title, subtitle. Items: Tüm Ürünlerimiz (1.2M+ ürün çeşidi), Bakım Robotu (Aracınıza özel bakım paketleri), Parça Talep Et (Listelerinizi bizimle paylaşın...), Canlı Destek (WhatsApp ile anında ulaşın — orange accent), Hızlı Kargo, Güvenli Ödeme, WhatsApp Destek, Gelişmiş Şasi Araması.
6. **ProductCarousel: "Çok Satanlar"** — dark header bar (icon + title "Çok Satanlar" + subtitle "En popüler ürünlerimiz"), horizontal scroll/carousel of product cards (image, brand, name, part number, price, cart-add button).
7. **ProductCarousel: "Yeni Gelenler"** — same card component, different header ("✨ Yeni Gelenler / En yeni ürünleri inceleyin"), has visible prev/next arrows on hover; cards show brand badge (e.g. "AYD", "BSG", "DENSO") above product name.
8. **CategoryGrid: "Popüler Yedek Parça Kategorileri"** — dark header bar, large icon grid (8 columns x ~5 rows on desktop) of part categories (Yağ Filtresi, Hava Filtresi, ... Çamurluk ve Parçaları), each a greyscale product-style photo + label, no price.
9. **BrandList: "Tüm Araç Markaları ve Modelleri"** — dark header bar, 4-column grid of expandable rows: brand name (e.g. "Fiat Yedek Parça") + count badge + chevron. Click-driven accordion (not expanded during homepage sweep; safe to assume standard disclosure behavior).
10. **SEOTextBlock** — long-form SEO copy in a card, headings + paragraphs about the brand ("Sürüş Güvenliğinde Kaliteli Malzemenin Önemi", "Yenilikçi ve Geniş Yedek Parça Ağı", etc.), likely truncated/expandable ("show more") given the internal scroll affordance observed.
11. **Footer** — dark (`bg-dark-bg` family), 4 columns: brand blurb + Kurumsal links, Hesap İşlemleri (Giriş Yap CTA) + Müşteri Hizmetleri links, İletişim (phone/WhatsApp/email/address) + Çalışma Saatleri, Sosyal Medya icons + Mağazalarımız marketplace badges (Trendyol, Hepsiburada, N11, PtAVM, Pazarama).
12. **BottomBar** — copyright + Gizlilik/Kullanım/İade links, security badges (256-bit SSL, 3D Secure).

## Z-index / overlay notes
- Header: `z-50`, sticky.
- No modals/dropdowns triggered during the homepage sweep beyond the vehicle-finder tabs.

## Responsive
- Tool limitation: `resize_window` did not change the actual viewport in this session (innerWidth stayed 1920 regardless of resize call). Responsive behavior was instead inferred from Tailwind responsive prefixes read directly off `className` (e.g. header row: `flex flex-wrap ... py-2 lg:py-0 lg:h-16 lg:flex-nowrap`; search bar: `order-3 w-full lg:order-2 lg:flex-1 ... lg:mx-4 lg:max-w-xl xl:max-w-2xl`). Builders should implement standard Tailwind `sm/md/lg/xl` stacking (grids collapse to fewer columns, header reflows to two rows) consistent with the classes captured per component.
