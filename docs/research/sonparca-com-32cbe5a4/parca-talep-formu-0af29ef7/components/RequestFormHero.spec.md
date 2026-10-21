# RequestFormHero + MembershipRequiredBanner + PartRequestForm Specification

## Overview
- **Target files:**
  - `src/components/sites/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/RequestFormHero.tsx` (wrapper: title + subtitle + banner + form, assembled in the white panel)
  - `src/components/sites/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/MembershipRequiredBanner.tsx`
  - `src/components/sites/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/PartRequestForm.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/desktop-1440-hero.jpg`
- **Interaction model:** static (banner links are click-driven navigation); form fields are disabled (no interaction) in the only reachable state.

## DOM Structure (literal, from live DOM)
```
main.flex-grow.w-full.pb-16.md:pb-0
  div.w-full.bg-gradient-to-br.from-gray-50.to-white.flex.items-center.justify-center
    div.w-full.h-full.flex.justify-center.items-center.py-8
      div.w-full.max-w-2xl.lg:max-w-[80vw].bg-white/90.rounded-md.border.border-gray-100.px-4.py-8.sm:px-8.md:px-12.lg:px-16.xl:px-24
        div.mb-8.text-center
          h1.text-2xl.md:text-4xl.font-extrabold.text-gray-900.mb-2.tracking-tight
          h2.text-gray-500.text-base.md:text-lg  (rendered as a <p> subtitle in our build — it is visually a subtitle, use a <p> tag for correct semantics since h1 already exists)
        MembershipRequiredBanner
        PartRequestForm
```

### MembershipRequiredBanner DOM
```
div.mb-8.flex.flex-col.items-center.bg-yellow-50.border.border-yellow-200.rounded-md.p-5
  span.text-yellow-700.font-semibold.text-lg.mb-1 -- "Üyelik Gerekli"
  span.text-yellow-700.text-sm.mb-3.text-center -- "Talep oluşturmak için giriş yapmalısınız."
  div.flex.gap-2
    a.px-5.py-2.bg-blue-600.text-white.rounded-md.text-sm.font-medium.hover:bg-blue-700.transition -- "Giriş Yap" href=/auth/giris
    a.px-5.py-2.bg-white.border.border-gray-300.text-gray-700.rounded-md.text-sm.font-medium.hover:bg-gray-100.transition -- "Üye Ol" href=/auth/kayit-ol
```

### PartRequestForm DOM
```
form.space-y-7
  div.grid.grid-cols-1.md:grid-cols-2.gap-6
    div.flex.flex-col.gap-1
      label.text-sm.font-semibold.text-gray-700.mb-1 -- "Şase Numarası " + span.text-red-500 "*"
      input#chassisNumber.w-full.px-4.py-2.border.border-gray-300.rounded-md.focus:ring-2.focus:ring-blue-500.focus:border-blue-500.bg-gray-50.text-gray-900.transition
        placeholder="17 haneli şase numarası", disabled
    div.flex.flex-col.gap-1
      label.text-sm.font-semibold.text-gray-700.mb-1 -- "İletişim Numarası " + span.text-red-500 "*"
      input#contactNumber (same classes as above) placeholder="05XX XXX XX XX", disabled
  div.flex.flex-col.gap-1
    label.text-sm.font-semibold.text-gray-700.mb-1 -- "Parça Listesi " + span.text-red-500 "*"
    textarea#description.w-full.px-4.py-2.border.border-gray-300.rounded-md.focus:ring-2.focus:ring-blue-500.focus:border-blue-500.bg-gray-50.text-gray-900.transition.resize-none
      placeholder="Aradığınız parçayı detaylıca açıklayın", rows=10, disabled
```
No submit button exists in the form (confirmed: `form.children.length === 2`).

## Computed/literal styles
- Textarea computed height at rows=10 default 16px font: 258px. Use `rows={10}` — do not hardcode pixel height.
- All 3 fields share identical border/radius/padding/focus-ring classes; only placeholder/type/id/rows differ.
- Field wrapper gap: `gap-1` (4px) between label and input.
- Row gap between the two top fields: `gap-6` (24px), stacks to 1 column below `md` (768px).
- Vertical rhythm between form groups: `space-y-7` (28px).

## States & Behaviors
- **Disabled state (only reachable state):** `disabled` attribute on all 3 fields, `bg-gray-50` background, no focus ring shown when disabled (browser default), cursor not-allowed. This is the permanent state for a logged-out visitor — build the fields as `disabled` by default matching the live DOM. Do not add a functional submit button, since none exists in this state on the source site.
- **Banner links hover:** "Giriş Yap" `bg-blue-600` → `hover:bg-blue-700`; "Üye Ol" `bg-white border-gray-300` → `hover:bg-gray-100`. Both `transition` (default 150ms).
- Real `<Link>` components to `/auth/giris` and `/auth/kayit-ol` (both routes exist already in this project).

## Assets
- No images/icons in this component (banner has no icon; just text + 2 buttons).

## Text Content (verbatim)
- H1: "Yedek Parça Talep Formu"
- Subtitle: "Aracınız için ihtiyacınız olan yedek parçayı talep edin. Ücretsiz fiyat teklifi alın. Birçok marka ve model için hızlı tedarik hizmeti."
- Banner title: "Üyelik Gerekli"
- Banner message: "Talep oluşturmak için giriş yapmalısınız."
- Banner buttons: "Giriş Yap", "Üye Ol"
- Field labels: "Şase Numarası *", "İletişim Numarası *", "Parça Listesi *"
- Placeholders: "17 haneli şase numarası", "05XX XXX XX XX", "Aradığınız parçayı detaylıca açıklayın"

## Responsive Behavior
- **Desktop (1440px):** panel width `max-w-2xl lg:max-w-[80vw]` (i.e. effectively 80vw ≈ 1152px at 1440 viewport, capped visually by the outer flex-center container), `xl:px-24` panel padding, 2-column field grid.
- **Tablet (768px):** `md:` classes active — `md:px-12`, 2-column grid still active (`md:grid-cols-2`), h1 `md:text-4xl`.
- **Mobile (390px):** panel `px-4`, fields stack to 1 column (`grid-cols-1`), h1 `text-2xl`, subtitle `text-base`.
- **Breakpoint:** layout column-shift at 768px (`md`).
