# TermsFaq.spec.md

Client component accordion, 3 items. Matches the pattern already implemented in `us-iade-politikasi-3aff6d63/PolicyFaq.tsx` and `us-gizlilik-politikasi-6264bf87/PolicyFaq.tsx` (reused verbatim structure/classes for site consistency):

- Heading: "Kullanım Koşulları - Sıkça Sorulan Sorular" — `text-lg font-semibold text-gray-900 mb-4`
- Item wrapper: `border border-gray-200 rounded-md overflow-hidden`
- Button: `w-full px-4 sm:px-5 py-3 sm:py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center justify-between gap-3`, `aria-expanded`
- Question: `font-medium text-gray-900 text-sm sm:text-base`
- Icon: lucide `ChevronDown` rotated 180° when open (live site uses `material-symbols-outlined` `expand_more`/`expand_less` ligature glyphs instead — cosmetic difference already established by sibling pages, kept consistent rather than introducing a third icon system)
- Answer panel (only rendered when open): `px-4 sm:px-5 pb-4 bg-gray-50 border-t border-gray-100`, text `text-sm leading-relaxed pt-3 text-gray-500`

Confirmed via live interaction (clicked all 3 accordion buttons, `aria-expanded` flipped true, icon ligature flipped to `expand_less`, answer text became present in accessible text) that this is click-driven, not always-expanded — see BEHAVIORS.md.
