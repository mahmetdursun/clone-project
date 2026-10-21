# Page Topology — /parca-talep-formu (Yedek Parça Talep Formu)

Source: https://www.sonparca.com/parca-talep-formu
Angular SPA, plain Tailwind classes in markup (no computed-style tooling needed; DOM classes read literally).

## Layout wrapper
```
<SiteHeader /> (shared, root-8a5edab2/Header.tsx)
<main class="flex-grow w-full pb-16 md:pb-0">
  <div class="w-full bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
    <div class="w-full h-full flex justify-center items-center py-8">
      <div class="w-full max-w-2xl lg:max-w-[80vw] bg-white/90 rounded-md border border-gray-100 px-4 py-8 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <!-- Hero title + subtitle -->
        <!-- Membership banner -->
        <!-- Form (3 disabled fields, no submit button) -->
      </div>
    </div>
  </div>
  <!-- SEO content card (dark header, scrollable body, 7 sections, 5 tables) -->
  <!-- FAQ accordion (16 Q&A) -->
</main>
<Footer /> (shared)
```
Note: the SEO card and FAQ live outside the `max-w-2xl lg:max-w-[80vw]` white panel, in the page's own container below it (own max-width matching page shell padding, roughly `max-w-3xl`/similar centered container — verified visually via screenshot, not a separate literal class extraction since focus budget was spent on the form itself; built to visually match the screenshot width).

## Sections, top to bottom
1. **Hero title block** — `h1` "Yedek Parça Talep Formu", `h2` (styled as subtitle) with description copy. Static.
2. **Membership Required banner** — yellow/amber alert box with heading, message, and two CTA links (`Giriş Yap` → `/auth/giris`, `Üye Ol` → `/auth/kayit-ol`). Static (always shown in logged-out state; this page is only inspectable logged-out).
3. **Part Request Form** — 3 fields: Şase Numarası (text input), İletişim Numarası (text input), Parça Listesi (textarea). All three fields are `disabled` in the logged-out DOM (see BEHAVIORS.md). No submit button exists in the form at all while logged out.
4. **SEO content card** — dark-header (`bg-dark-bg`) card titled "Otomobil Yedek Parça Talebi" with a phone icon, containing a `max-h-[420px] md:max-h-[480px] overflow-y-auto` scrollable body with 7 `<section>` blocks (headings h1/h2/h3, paragraphs, and 5 data tables comparing search methods, form fields, chassis-number segments, offer types, and supply-chain classes).
5. **FAQ accordion** — "Parça Talebi - Sıkça Sorulan Sorular" heading + 16 click-to-expand Q&A rows, chevron icon flips on open (Material Symbols `expand_more`/`expand_less` on the live site → mapped to lucide `ChevronDown` + `rotate-180` in our build).

## Interaction model
- Banner links: static navigation (click-driven).
- Form fields: **disabled inputs** while logged out — this is the whole "interaction model" for the form on this page in its only reachable state (no session cookie in this browser). Non-functional/local-state shell built per assignment scope (submit is a no-op even when unlocked, since there is no way to reach an unlocked state without real auth).
- SEO card: internal scroll container, click-driven only insofar as user can scroll the inner box independently of the page.
- FAQ: click-to-expand accordion, one row content revealed/hidden per click, icon rotates, smooth height transition on the live site.

## Responsive (from literal Tailwind classes, not resize_window — see BEHAVIORS.md quirks note)
- Hero panel: `px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24`, width `max-w-2xl lg:max-w-[80vw]`.
- H1: `text-2xl md:text-4xl`. Subtitle: `text-base md:text-lg`.
- Form grid: `grid-cols-1 md:grid-cols-2 gap-6` (chassis + phone side by side ≥768px, stacked below).
- SEO card scroll body: `max-h-[420px] md:max-h-[480px]`.
- FAQ rows: `px-4 sm:px-5 py-3 sm:py-4`, question `text-sm sm:text-base`.
- `main` has `pb-16 md:pb-0` (extra bottom padding on mobile, presumably for a mobile bottom nav bar elsewhere in the shared shell).
