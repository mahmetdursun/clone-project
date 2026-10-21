# Bakım Robotu — Page Topology

Route: `/bakim-robotu` → `src/app/bakim-robotu/page.tsx`

## Layout skeleton (all 4 stages share this shell)

```
<SiteHeader />                          -- shared, root-8a5edab2
<main class="container mx-auto px-4 py-6">
  <WizardStepper currentStage={1|2|3|4} />
  {stage === 1 && <VehicleSelectionStep />}
  {stage === 2 && <PackageSelectionStep />}
  {stage === 3 && <PartSelectionStep />}
  {stage === 4 && <SummaryStep />}
</main>
<Footer />                              -- shared, root-8a5edab2
```

State lives in the page component: `stage: 1|2|3|4`, `vehicle: {brand, model, year, fuel, engine} | null`, `selectedPackage: Package | null`, `selections: Record<categoryId, {productId, qty}[]>` (per package). All client-side only (`"use client"`), no backend.

## Components

| Component | File | Notes |
|---|---|---|
| `WizardStepper` | `WizardStepper.tsx` | Persistent 4-stage header, always visible. |
| `VehicleSelectionStep` | `VehicleSelectionStep.tsx` | Stage 1 shell: 3 tabs + conditional static content (How-it-works/FAQ/SEO) shown only on this stage. |
| `VehicleCascadeTab` | `VehicleCascadeTab.tsx` | The "Araç Seçin" tab: 5-level cascading brand→model→year→fuel→engine flow with breadcrumb chips. |
| `ChassisNumberTab` | `ChassisNumberTab.tsx` | The "Şasi No" tab: VIN input with char counter, mock "Araç Bul". |
| `GarageTab` | `GarageTab.tsx` | The "Garajım" tab: logged-out empty state with CTA buttons + guest link. |
| `HowItWorksSection` | `HowItWorksSection.tsx` | 4-step static explainer cards, Stage-1-only. |
| `WizardFaqSection` | `WizardFaqSection.tsx` | 4-item accordion, Stage-1-only. |
| `WizardSeoContent` | `WizardSeoContent.tsx` | Long-form SEO text + 3 tables, Stage-1-only. |
| `PackageSelectionStep` | `PackageSelectionStep.tsx` | Stage 2: selected-vehicle bar + 8-card package grid. |
| `PartSelectionStep` | `PartSelectionStep.tsx` | Stage 3: inner category pill-tabs + product grid + bottom nav (Geri/Atla/İleri/Özete Git). |
| `PartProductCard` | `PartProductCard.tsx` | Single product card with Seç/qty-stepper/Seçildi states. |
| `SummaryStep` | `SummaryStep.tsx` | Stage 4: seçim özeti line items + cross-sell package grid. |
| `data.ts` | `data.ts` | Brands (reuse root-8a5edab2 list), models/years/fuel/engine per brand (mock subset), 8 packages, per-category mock products. |

## Visual order per stage

**Stage 1:** Stepper → Icon+H1+subtitle → Tab bar (Araç Seçin/Şasi No/Garajım) → active tab panel → (Araç Seçin only: decorative illustration + dark hint bar) → "Nasıl Çalışır?" (4 cards) → "Sıkça Sorulan Sorular" (accordion) → long SEO text block (headings/paragraphs/tables).

**Stage 2:** Stepper → Selected-vehicle bar (car icon, "Toyota COROLLA", Değiştir) → "🔧 Bir Bakım Paketi Seçin" heading+subtext → 3-col package card grid (8 cards).

**Stage 3:** Stepper → Selected-vehicle bar → Package header (← back arrow, package name, Seçilenler(N) cart pill) → inner pill sub-tabs → category panel (title+OPSİYONEL badge+M/N counter, product grid OR empty state) → bottom nav bar (Geri / Atla / İleri|Özete Git).

**Stage 4:** Stepper → Selected-vehicle bar → "← Adımlara dön" → "🧾 Seçim Özeti" card (line items + totals + Tümünü Sepete Ekle) → "✨ Bakımınız Bitmedi mi?" cross-sell grid (remaining 7 packages).

## Z-index / sticky / scroll

No sticky/fixed elements inside the wizard body (header/footer stickiness, if any, is inherited from the shared `SiteHeader`/`Footer` and out of scope here). No scroll-snap, no scroll-driven animation, no parallax. Pure click state machine.

## Interaction model summary (see BEHAVIORS.md for full detail)

Static / click-driven: **click-driven throughout**. Nothing on this page reacts to scroll position or time. Stage 1's vehicle cascade is itself a 5-level click cascade nested inside stage 1.
