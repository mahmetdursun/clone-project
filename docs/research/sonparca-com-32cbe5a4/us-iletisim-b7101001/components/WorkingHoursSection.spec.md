# WorkingHoursSection Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-iletisim-b7101001/WorkingHoursSection.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/us-iletisim-b7101001/desktop-map-hours.jpg`
- **Interaction model:** static

## DOM Structure
```
section.container.mx-auto.px-4.py-10
  div.max-w-4xl.mx-auto.bg-white.p-6.rounded-md.shadow-sm.border.border-gray-100
    h2.text-2xl.font-semibold.text-gray-800.mb-6.text-center "Çalışma Saatlerimiz"
    div.grid.grid-cols-1.md:grid-cols-2.gap-8
      div  (Müşteri Hizmetleri column)
        h3.text-lg.font-medium.text-gray-800.mb-4
        ul.space-y-2
          li.flex.justify-between (x3)
            span.text-gray-600            (day label)
            span.font-medium.text-gray-800 (hours value)
      div  (Depo ve Sevkiyat column) — same structure
    div.mt-8.text-center.text-gray-600  (closing note)
```

## Computed Styles (exact Tailwind classes)
- section: `container mx-auto px-4 py-10`
- card: `max-w-4xl mx-auto bg-white p-6 rounded-md shadow-sm border border-gray-100`
- heading: `text-2xl font-semibold text-gray-800 mb-6 text-center`
- columns grid: `grid grid-cols-1 md:grid-cols-2 gap-8`
- column heading: `text-lg font-medium text-gray-800 mb-4`
- list: `space-y-2`
- row: `li.flex.justify-between`
- day label: `text-gray-600`
- hours value: `font-medium text-gray-800`
- note: `mt-8 text-center text-gray-600`

## States & Behaviors
N/A — fully static.

## Data (verbatim)

### Müşteri Hizmetleri (Customer Service)
| Day | Hours |
|---|---|
| Pazartesi - Cuma: | 09:00 - 18:00 |
| Cumartesi: | 09:00 - 14:00 |
| Pazar: | Kapalı |

### Depo ve Sevkiyat (Warehouse & Shipping)
| Day | Hours |
|---|---|
| Pazartesi - Cuma: | 08:30 - 17:30 |
| Cumartesi: | 09:00 - 13:00 |
| Pazar: | Kapalı |

### Closing note (verbatim)
"Resmi tatillerde çalışma saatlerimiz değişiklik gösterebilir. Güncel bilgiler için sosyal medya hesaplarımızı takip edebilirsiniz."

## Text Content (verbatim)
- Heading: "Çalışma Saatlerimiz"
- Column headings: "Müşteri Hizmetleri", "Depo ve Sevkiyat"
- See data tables above.

## Assets
None.

## Responsive Behavior
- **Desktop (≥768px, `md:`):** two columns side by side.
- **Mobile (<768px):** columns stack vertically.
- **Breakpoint:** 768px (`md:`).
