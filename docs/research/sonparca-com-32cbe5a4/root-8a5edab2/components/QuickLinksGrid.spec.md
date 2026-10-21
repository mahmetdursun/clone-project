# QuickLinksGrid Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/QuickLinksGrid.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/root-8a5edab2/desktop-02-quicklinks-bestsellers.jpg`
- **Interaction model:** static links with hover state

## DOM Structure
```
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  8x <a class="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm hover:border-accent/40 transition-all">
    <div class="icon-box shrink-0 rounded-lg p-2"> colored square with icon
    <div>
      <p class="font-semibold text-sm text-gray-900">{title}</p>
      <p class="text-xs text-gray-500">{subtitle}</p>
```
Row 1 (4 cards): Tüm Ürünlerimiz, Bakım Robotu, Parça Talep Et, Canlı Destek
Row 2 (4 cards): Hızlı Kargo, Güvenli Ödeme, WhatsApp Destek, Gelişmiş Şasi Araması

## Computed Styles
- Card: `bg-white border border-gray-200 rounded-lg p-4`, `shadow: none` default → `shadow-sm` on hover, border → `border-accent/40` (#ff7222 at 40% alpha) on hover, `transition-all duration-200`.
- Icon box: 40×40px, `rounded-lg`, background is a tinted version of the icon's accent color (e.g. blue-100 bg + blue-600 icon for "Tüm Ürünlerimiz"; orange-100 bg + orange-600 icon for "Canlı Destek" — this card is visually distinct/accented per the screenshot, brighter orange border).
- Title: `font-semibold text-sm text-gray-900` (~14px/600).
- Subtitle: `text-xs text-gray-500` (~12px/400).
- Grid gap: 16px (`gap-4`).

## States & Behaviors
- Hover: border color + shadow transition, ~200ms ease, plus subtle icon-box scale is optional (not confirmed, safe to omit).
- "Canlı Destek" card renders with a persistent orange-tinted border/accent (not just hover) per screenshot — treat as a `variant="accent"` prop on the shared card.

## Assets
- Icons: `lucide-react` — `List` (Tüm Ürünlerimiz), `Wrench` (Bakım Robotu), `ClipboardList` (Parça Talep Et), `MessageCircle` (Canlı Destek), `Truck` (Hızlı Kargo), `ShieldCheck` (Güvenli Ödeme), `MessageSquare` (WhatsApp Destek), `SearchCheck` (Gelişmiş Şasi Araması).

## Text Content (verbatim)
1. "Tüm Ürünlerimiz" / "1.2M+ ürün çeşidi"
2. "Bakım Robotu" / "Aracınıza özel bakım paketleri"
3. "Parça Talep Et" / "Listelerinizi bizimle paylaşın, fiyat teklifimizi verelim"
4. "Canlı Destek" / "WhatsApp ile anında ulaşın"
5. "Hızlı Kargo" / "Stoklu Ürünlerde Aynı Gün Kargolama"
6. "Güvenli Ödeme" / "Şifrelemeli 3D Secure altyapı"
7. "WhatsApp Destek" / "Uzman ekibimiz yanınızda"
8. "Gelişmiş Şasi Araması" / "Doğru parçayı kolayca bulun"

## Responsive Behavior
- **Desktop (1440px):** 4 columns × 2 rows.
- **Tablet (768px):** 2 columns × 4 rows (`sm:grid-cols-2`).
- **Mobile (390px):** 1 column, stacked.
- **Breakpoint:** `sm` (640px) → 2 col, `lg` (1024px) → 4 col.
