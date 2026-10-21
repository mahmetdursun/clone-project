# Bakım Robotu — Behaviors & Interaction Model

Source: https://www.sonparca.com/bakim-robotu (Angular 22 SPA, plain Tailwind classes in DOM).

## Overall interaction model: CLICK-DRIVEN, multi-stage wizard

There is no scroll-driven or time-driven behavior in the wizard itself. Everything advances on click. A persistent 4-stage `WizardStepper` (Araç Seçimi / Paket Seçimi / Parça Seçimi / Özet) sits at the top of `<main>` and reflects a `currentStage` (1-4). Completed stages show a checkmark instead of the number and the connecting line to their right turns solid orange.

## Stage 1 — Araç Seçimi (Vehicle Selection)

Has 3 tabs (pill-style underline tabs): **Araç Seçin** (default active), **Şasi No**, **Garajım**. Switching tabs is click-driven, no animation beyond an underline/color change on the active tab label + icon (orange `text-sp-accent` + `border-b-2 border-sp-accent` vs. gray inactive).

### Tab: "Araç Seçin" — a 5-level CASCADING click flow (confirmed by clicking through end-to-end)

This is itself sub-stepped. Each level replaces the content below the tab bar in place (no page navigation) and prepends a removable "breadcrumb chip" (teal/emerald `bg-emerald-50 text-emerald-700` pill with an `×` icon) for every prior selection. A numbered circle badge (emerald filled circle with white number) + title + "N seçenek" counter sits above a search input and a responsive grid of choice buttons. Clicking any single choice button in the grid IMMEDIATELY advances to the next level — there is no explicit "next" button inside this cascade.

Verified order (drilled Toyota → Corolla → 2015 → Benzin → 1.3):
1. **Araç Markası** (28 seçenek) — grid of 28 brand name buttons, 7 cols desktop. Same 28-brand list already used in the homepage `VehicleFinder` (`root-8a5edab2/data.ts` order): Audi, Chery, Chevrolet, Citroen, Cupra, Dacia, Ds, Fiat, Ford, Honda, Hyundai, Kia, Mazda, Mercedes, Mg, Mini, Mitsubishi, Nissan, Opel, Peugeot, Renault, Seat, Skoda, Tesla, Togg, Toyota, Volkswagen, Volvo.
2. **Araç Modeli** (N seçenek, varies by brand — Toyota=13) — grid of model cards, each with a small car thumbnail image (grayscale silhouette placeholder in most cases, real photo for some) + model name caption. 6-7 cols desktop.
3. **Üretim Yılı** (N seçenek — Corolla=37) — grid of year buttons (e.g. 1987-2024), 7 cols desktop.
4. **Yakıt** (2 seçenek) — "Benzin" / "Dizel" buttons, small 2-col row (not full grid width).
5. **Motor Hacmi** (2 seçenek) — e.g. "1.3" / "1.6" buttons, small row.

After the LAST cascade level is clicked, the whole page auto-transitions to Stage 2 (Paket Seçimi) — confirmed: clicking "1.3" jumped straight to the package grid with a "SEÇİLİ ARAÇ: Toyota COROLLA" bar. No intermediate summary of the vehicle sub-steps is shown.

Each grid button style: `border border-gray-200 rounded-md py-3 text-center font-medium text-gray-700`, hover `hover:border-sp-accent/40 hover:bg-orange-50`. A search input (`Ara...` placeholder, magnifier icon) above every grid filters visible options client-side by substring, case-insensitive Turkish locale.

Below the whole "Araç Seçin" panel is a light-gray decorative illustration (grayscale line-art of an air filter + 2 oil filters) and a dark helper bar with a `?` icon + contextual hint text that changes per level (e.g. "Aracınızı bulmak için marka seçin").

### Tab: "Şasi No"
Static (non-cascading) content: an info card ("# 17 Haneli Şasi Numarası" + description + "Nerede Bulurum?" link on the right), a text input (placeholder `ÖRN: WBAGN61050DW12345`) with a live `0/17` character counter and an "Araç Bul" button (magnifier icon), and below: "Şasi numarasını bilmiyor musunuz? Araç özelliklerini seçin →" link back to the brand cascade. No live VIN lookup is implemented in our clone (mock/local-state only, per project scope) — the input just tracks length.

### Tab: "Garajım" (logged out state — the only state observed; no session/auth exists in this project)
Empty/auth-gated state: house icon in a circular peach badge, heading "Garajım özelliğini kullanın", description "Araçlarınızı garajınıza ekleyerek uyumlu parçalara tek tıkla ulaşın. Bu özellik için giriş yapmanız gerekiyor.", two buttons "Giriş Yap" (filled orange, links to /auth/giris) and "Kayıt Ol" (outline, links to /auth/kayit-ol), plus a "Misafir olarak araç seçimine devam et →" text link that returns to the "Araç Seçin" tab.

### Static content below the wizard card (Stage 1 ONLY — disappears once a vehicle is chosen and stage advances)
- **"Nasıl Çalışır?"** — 4 static step cards in a row (icon in peach circle, "N. Adım" label in orange, bold title, gray description). Content: 1. Adım/Aracınızı Seçin, 2. Adım/Bakım Paketi Seçin, 3. Adım/Parçaları Seçin, 4. Adım/Toplu Sepete Ekleyin (verbatim text in PAGE_TOPOLOGY.md / component spec).
- **"Sıkça Sorulan Sorular"** — a 4-item FAQ accordion (chevron-down icon rotates on open; same visual pattern as the already-built `FAQAccordion.tsx` components elsewhere on this site).
- **Long-form SEO text block** — multiple `<h2>`/`<h3>` sections with paragraphs and comparison `<table>`s (3 tables). Static, no interaction beyond normal reading; matches the pattern of the existing `SEOTextBlock.tsx` on the homepage.

This entire static block is SEO/content filler that appears ONLY while stage 1 is active (it is part of the Stage-1 route content, not a persistent footer-of-page element) — confirmed it disappears after advancing to stage 2.

## Stage 2 — Paket Seçimi (Package Selection)

Click-driven, static grid, no cascading. Shows a "SEÇİLİ ARAÇ" bar (car icon, "Toyota COROLLA" label, "⇄ Değiştir" link that returns to Stage 1 vehicle cascade) then a heading "Bir Bakım Paketi Seçin" + subtext, then a 3-column grid (desktop) of 8 package cards. Each card: real product-photo image (403×225, `.webp`, lazy), title, 2-line clamped description, footer row with "N kategori gurubu" tag (left) and "Başla →" link (right, orange, arrow icon). Hovering a card gives it an orange border + orange title. Clicking anywhere on the card (or "Başla") advances to Stage 3 scoped to that package.

Verified real package data (8 total):
1. Periyodik Bakım Bileşenleri — 5 kategori gurubu
2. Aydınlatma, Görüş ve Bakım — 5 kategori gurubu
3. Fren Sistemi — 6 kategori gurubu
4. Soğutma Sistemi — 7 kategori gurubu
5. Triger/Zincir ve Tahrik Kayış Sistemleri — 5 kategori gurubu
6. Süspansiyon ve Yürüyen Aksam — 6 kategori gurubu
7. Ateşleme Sistemi — 3 kategori gurubu
8. Debriyaj Sistemi — 6 kategori gurubu

(Full descriptions verbatim in the PackageSelectionStep spec.)

## Stage 3 — Parça Seçimi (Part Selection)

Click-driven, has its OWN inner sub-tab bar (pill buttons, numbered) — one pill per "kategori gurubu" of the chosen package (e.g. for "Periyodik Bakım Bileşenleri": 1 Hava Filtresi, 2 Yağ Filtresi, 3 Polen Filtresi, 4 Yakıt Filtresi, 5 Yağ). Clicking a pill jumps directly to that category (does not require sequential completion) but the default flow is via "İleri" at the bottom.

Header row: back arrow + package name (e.g. "Periyodik Bakım Bileşenleri"), and a persistent "🛒 Seçilenler (N)" pill button top-right that live-counts total selected items across ALL categories in this package (verified: stays "(1)" while browsing other categories after 1 selection).

Per category panel: title + "OPSİYONEL" gray badge + "M / N" position counter (top-right), then a responsive product-card grid (up to 4 cols desktop; some categories have only 1-3 real cards even though grid supports 4).

**Product card** (verified 2 states):
- Default: top 3px colored accent bar (green `bg-green-500` when in-stock), product image (with SonParça watermark visible on placeholder photography), brand badge (gray pill, e.g. "BOSCH", "SONPARÇA", "ORJINAL"), "✓ Stokta" stock indicator (green), price (bold orange, e.g. "608,94 TL"), product name, SKU code (small gray mono-ish text), and a footer control:
  - Unselected: outlined button "+ Seç" (`border border-sp-accent text-sp-accent`).
  - Selected (click "+ Seç" → state change, verified): footer becomes a quantity stepper (`− 1 +`, outlined) on the left plus a filled orange "✓ Seçildi" button on the right. Clicking image/title navigates to the real product detail route (`/urun-detayi/...`) — out of scope to replicate per-product detail pages here, so in the clone these should NOT navigate (or could deep-link to the existing product-detail page for the one already cloned SKU, but default to non-navigating `<button>`/plain text for authenticity of scope).
- **Empty state** (verified on "Yakıt Filtresi" and "Yağ" categories for this vehicle): centered lock-circle icon, text "Bu adım için aracınıza uygun ürün bulunamadı." + "Bu adım opsiyonel; "Atla" diyerek devam edebilirsiniz." — no cards rendered.

Bottom nav bar (sticky-looking but confirmed NOT position:sticky — it's just the bottom of each panel, scrolls with content): "← Geri" (outline button, disabled/hidden logic not tested on first category), "Atla" (plain text link, skip without selecting), and a primary orange button that reads **"İleri →"** on categories 1-4 and **"Özete Git 🧾"** (different icon) on the LAST category — confirmed via the position counter "5/5". Clicking it on the last category jumps straight to Stage 4.

## Stage 4 — Özet (Summary)

Click-driven, no cascading. "← Adımlara dön" link at top returns to Stage 3. A "🧾 Seçim Özeti" card lists the package name + vehicle, then one line-item row per selected product across ALL categories of that package (category label in orange caps e.g. "HAVA FİLTRESİ", product name, brand, qty stepper, trash/delete icon, price). Footer of the card: "N ürün · M adet" summary (left) + "🛒 Tümünü Sepete Ekle" primary button (right) — this is a MOCK action in our clone (no real cart/backend, per project scope); it should just show a local toast/console log or optimistic UI change, not a real checkout.

Below the summary card: "✨ Bakımınız Bitmedi mi?" cross-sell section — same 7 REMAINING packages (all except the one just completed) rendered as smaller cards (image thumbnail + title + description + "N adım" tag + "Devam et →" link) in a 3-col grid. Note the wording differs slightly from Stage 2: "kategori gurubu" → "adım", "Başla" → "Devam et". Clicking one of these returns to Stage 3 scoped to that package (per the on-page copy: "Seçtiğiniz parçalar otomatik olarak sepetinize eklenir").

## Responsive notes (desktop 1440 confirmed live; tablet/mobile inferred from this project's established mobile-first conventions since live resize was unreliable — see below)

**Known environment quirk hit during this recon:** the shared Chrome MCP window was repeatedly resized/tab-swapped by sibling agents cloning `/us/kullanim-sartlari` and `/parca-talep-formu` in parallel (tab IDs changed, `resize_window` calls to 390px did not visibly take effect before the tab group was reclaimed). Per the task brief, responsive behavior below 1440px is therefore documented by following this codebase's ALREADY-ESTABLISHED mobile-first Tailwind conventions (e.g. `on-tampon-9ed11181/FilterSidebar.tsx`'s `hidden lg:block` / stacked mobile toggle pattern, and the grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` pattern used throughout `on-tampon-9ed11181/ProductListingCard.tsx`) rather than fabricated live measurements:
- Brand/model/year grids: `grid-cols-3 sm:grid-cols-4 lg:grid-cols-7` (matches homepage `VehicleFinder`).
- Package grid (Stage 2) and cross-sell grid (Stage 4): `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
- Part product grid (Stage 3): `grid-cols-2 lg:grid-cols-4`.
- "Nasıl Çalışır?" 4-card row: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.
- Wizard stepper header: labels hide under ~480px, only numbered circles + connecting lines remain (a defensible inference; not pixel-verified at mobile due to the tooling issue above — documented explicitly rather than guessed as exact px).
