# WizardStepper Specification

## Overview
- Target file: `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/WizardStepper.tsx`
- Interaction model: static (purely reflects `currentStage` prop; no internal interaction — clicking a completed stage does NOT navigate back in the live site's observed behavior, only "Değiştir"/"Geri"/"Adımlara dön" links do)

## DOM structure
Row of 4 items separated by horizontal connector lines: `[circle+label] --- [circle+label] --- [circle+label] --- [circle+label]`.

## Props
`{ currentStage: 1 | 2 | 3 | 4 }`

## Visual states per item (index i, 1-based)
- i < currentStage (completed): circle filled `bg-sp-accent` (orange) with a white checkmark icon (lucide `Check`) instead of a number; label text `text-sp-accent font-medium`; connector line to the right is `bg-sp-accent`.
- i === currentStage (active): circle filled `bg-sp-accent` with white number; label `text-sp-accent font-semibold`; connector line to the right is `bg-gray-200`.
- i > currentStage (upcoming): circle `border-2 border-gray-300 text-gray-400` (outline, not filled) with gray number; label `text-gray-400`; connector line `bg-gray-200`.

Circle: `flex size-7 items-center justify-center rounded-full text-sm font-bold`. Connector: `h-0.5 flex-1 mx-2 sm:mx-4`.

## Labels (verbatim)
1. Araç Seçimi
2. Paket Seçimi
3. Parça Seçimi
4. Özet

## Responsive
- Desktop: labels always visible next to circle.
- Mobile: keep labels (matches existing project convention of not hiding stepper text elsewhere); allow horizontal scroll/wrap if needed via `flex-wrap` fallback — do not overengineer since this is a minor chrome element.

## Assets
None (lucide `Check` icon only).
