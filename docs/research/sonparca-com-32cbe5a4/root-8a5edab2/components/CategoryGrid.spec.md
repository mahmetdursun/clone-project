# CategoryGrid Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/CategoryGrid.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/root-8a5edab2/desktop-03-newarrivals-categories.jpg` and `desktop-04-categories-brandlist.jpg`
- **Interaction model:** static tiles with hover zoom (no click-through explored — homepage scope)

## DOM Structure
```
<section>
  <div class="bg-dark-bg rounded-t-lg px-4 py-3 flex items-center gap-2">
    grid icon + <div><p class="font-semibold text-dark-text-primary">Popüler Yedek Parça Kategorileri</p><p class="text-xs text-dark-text-muted">En çok tercih edilen yedek parça kategorileri</p></div>
  <div class="bg-white border border-t-0 border-gray-200 rounded-b-lg p-4">
    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
      36x <a class="group relative flex flex-col h-full bg-white border border-gray-200 rounded overflow-hidden hover:border-accent/40 hover:shadow-sm transition-all">
        <div class="relative block aspect-square bg-gray-50 overflow-hidden">
          <img class="absolute inset-0 w-full h-full object-contain p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-300">
        <span class="text-center text-xs font-medium text-gray-700 px-2 py-2">{label}</span>
```
(Exact classnames above captured live via `getComputedStyle`/`className` on the "Yağ Filtresi" tile.)

## Computed Styles
- Tile outer: `bg-white border border-gray-200 rounded overflow-hidden`, hover → `border-color: rgb(255 114 34 / 0.4)` + `shadow-sm`, `transition: all`.
- Image wrapper: `aspect-square`, `background-color: #f9fafb` (gray-50).
- Image: `object-fit: contain`, `padding: 8px`, `mix-blend-mode: multiply`, hover `transform: scale(1.05)` over `300ms` (identical pattern to ProductCard image treatment — reuse the same hover class).
- Label: centered, `text-xs font-medium text-gray-700`, ~2 lines max, padded `8px`.
- Grid gap: 16px.

## States & Behaviors
- Hover: border tints orange (`accent/40`), `shadow-sm` appears, image zooms 1.05x — all `transition-all`/`transition-transform`, ~200-300ms ease. No click-through behavior captured (treat as a real `<a>` to a category route, but destination is out of scope for this clone — use `href="#"`).

## Assets
All downloaded to `/sites/sonparca-com-32cbe5a4/root-8a5edab2/categories/` — filenames match slugs below.

## Text Content & Assets (verbatim, exact order, 36 categories)
1. Yağ Filtresi — `yag-filtresi.webp`
2. Hava Filtresi — `hava-filtresi.webp`
3. Polen Filtresi — `polen-filtresi.webp`
4. Mazot Filtreleri / Sensörleri — `mazot-filtreleri.webp`
5. Benzin Filtreleri — `benzin-filtreleri.webp`
6. Oto Bakım Ürünleri — `oto-bakim-urunleri.webp`
7. Vites Kolu ve Parçaları — `vites-kolu-ve-parcalari.webp`
8. Ampüller / Aydınlatma Ürünleri — `ampuller-aydinlatma-urunleri.webp`
9. Ön Fren Sistemi — `on-fren-balatasi.webp`
10. Arka Fren Sistemi — `arka-fren-balatasi.webp`
11. Ön Fren Diski — `on-fren-diski.webp`
12. Arka Fren Diski — `on-fren-diski.webp` (reuse; distinct source not separately captured)
13. Arka Fren Kampanası — `arka-fren-balatasi.webp` (reuse; distinct source not separately captured)
14. Buji — `buji.webp`
15. Ateşleme Sistemi — `bobin.webp`
16. Sensörler / Müşürler — `sensorler-musurler.webp`
17. Akü — `aku.webp`
18. Debriyaj Sistemi — `debriyaj-seti.webp`
19. Devridaim — `devirdaim.webp`
20. V Kayışı — `v-kayis.webp`
21. Triger Seti — `triger-seti.webp`
22. Soğutma / Isıtma / Radyatör — `radyator.webp`
23. İnterkol ve Parçaları — `radyator.webp` (reuse; distinct source not separately captured)
24. Süspansiyon Sistemi — `amortisor.webp`
25. Motor Yağı — `motor-yagi.webp`
26. Şanzıman Yağı — `sanziman-yagi.webp`
27. Antifriz — `antifriz.webp`
28. Far ve Parçaları — `far.webp`
29. Stop / Reflektör / Plaka Lambası — `stop.webp`
30. Sis Lambaları — `sis-lambalari.webp`
31. Silecek — `silecek.webp`
32. Ayna — `ayna.webp`
33. Termostat — `termostat.webp`
34. Klima Kompresörü — `klima-kompresoru.webp`
35. Ön Tampon — `on-tampon.webp`
36. Arka Tampon — `arka-tampon.webp`
37. Çamurluk Sinyali — `camurluk-sinyali.webp`
38. Tampon Reflektörleri — `reflektor.webp`
39. Davlumbaz / Paçalıklar — `davlumbaz.webp`
40. Çamurluk ve Parçaları — `camurluk.webp`

Section title: "Popüler Yedek Parça Kategorileri" / subtitle "En çok tercih edilen yedek parça kategorileri".

## Responsive Behavior
- **Desktop (1440px):** 8 columns.
- **Tablet (768px):** 4 columns.
- **Mobile (390px):** 2 columns.
- **Breakpoint:** `sm` (640px) → 4 col, `lg` (1024px) → 8 col.
