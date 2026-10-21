# TermsContent.spec.md

Renders 13 numbered sections in document order. Each section: `H2` heading, then either a bullet list, a single paragraph, or (section 13 only) a paragraph + a plain contact list.

Literal classes (from DOM):
- H2: `text-lg md:text-xl font-bold mb-3 mt-6 break-words` (verbatim heading text already includes the leading number, e.g. "1. Hesap Oluşturma ve Kullanım")
- list wrapper: `UL.list-disc.list-inside.mb-4.text-sm.md:text-base`
- list item: `LI.whitespace-normal.break-words.pb-2`
- paragraph sections (9–12): `P.text-sm.md:text-base.mb-4.whitespace-normal.break-words`
- section 13 contact list: `UL.list-none.mb-4.text-sm.md:text-base`, each `LI.whitespace-normal.break-words.pb-2` containing `<b>Label:</b>` then either plain text, a `mailto:` link, or a `tel:` link.

No badges, no colored callouts, no cards, no grids — plain sequential text content only (this page is simpler than `iade-politikasi`/`gizlilik-politikasi`).

Data model: array of section objects `{ number, title, kind: "list" | "paragraph" | "contact", items?, text?, contact? }`. Verbatim content captured in `data.ts` from live `get_page_text` output — no paraphrasing.
