# Behaviors — /us/gizlilik-politikasi (Privacy Policy)

## Interaction sweep

### Scroll sweep
- No header shrink/appearance change beyond the shared site header behavior already implemented for other pages.
- No elements animate into view on scroll (no IntersectionObserver-driven reveal classes found in the DOM; no `ng-trigger` scroll-linked animation classes on the numbered sections).
- No scroll-snap containers.
- No smooth-scroll library detected (no `.lenis` / `.locomotive-scroll` classes).

### Click sweep
- The 9 numbered legal sections: **not interactive** — no buttons, no click handlers, always-rendered flowing text.
- FAQ accordion at the bottom (`zx-faq-accordion`): **click-driven**, confirmed by executing `document.querySelectorAll('zx-faq-accordion button').forEach(b=>b.click())` — this expanded all 3 items simultaneously (independent per-item toggle, not a single-open accordion — same behavior as the already-built `ContactFAQ.tsx` on `/us/iletisim`).
  - Trigger icon: custom `<zx-icon>` wrapping `<i class="material-symbols-outlined">` with ligature text `expand_more` (closed) / `expand_less` (open). Rebuilt using `lucide-react`'s `ChevronDown` rotated 180° when open, consistent with the project's existing FAQ components (`ContactFAQ.tsx`, `FAQAccordion.tsx`).
  - Answer panel: revealed via a wrapper `div.px-4 sm:px-5 pb-4 bg-gray-50 border-t border-gray-100` (Angular structural directive `*ngIf` toggling presence). Rebuilt in React with the project's established `grid-rows-[0fr]/[1fr]` opacity/height transition pattern (matches `ContactFAQ.tsx`).
  - Mailto/tel links in Section 9 (İletişim ve Başvuru Kanalları): standard link, hover color `text-blue-700` → `hover:text-blue-900`. No JS behavior beyond default browser link handling.

### Hover sweep
- Contact links (email/phone in Section 9): `text-blue-700 hover:text-blue-900`.
- FAQ question buttons: `bg-white hover:bg-gray-50`, `transition-colors duration-150`.
- No other hover-reactive elements found in the numbered sections (plain text/lists/cards, no hover states on the info-category cards in Section 1).

### Responsive sweep
- Could not run a live 3-viewport visual sweep this session: `resize_window` to 390x844 did not actually resize the shared browser tab (post-call `window.innerWidth` still read 1920px) — this matches the documented known environment quirk (shared Chrome MCP tab with a concurrent sibling agent building `/us/iade-politikasi`). Falling back to literal responsive Tailwind classes read from `className` in the live DOM instead of `getComputedStyle()`/visual resize, per the task's guidance. This is a documented gap, not a guess:
  - Section 1 card grid: `grid-cols-1 md:grid-cols-2` (stacks to 1 column below 768px).
  - All section vertical spacing steps up at `md:` (`mb-8 md:mb-10`, `pb-4 md:pb-6 mb-6 md:mb-8`, etc.).
  - All text sizes step up at `md:` and h1 additionally at `lg:` (`text-xl md:text-2xl lg:text-3xl`).
  - Container padding: `px-4 md:px-6 lg:px-8`, vertical `py-6 md:py-8 lg:py-10`.
  - FAQ button padding: `px-4 sm:px-5 py-3 sm:py-4` (uses `sm:` not `md:` for this sub-component, matching the already-built `ContactFAQ.tsx`).

## Conclusion
Interaction model for the page as a whole: **static long-form legal document** with one **click-driven** sub-component (FAQ accordion) at the very bottom. No scroll-driven, hover-driven-content, or time-driven behaviors present.
