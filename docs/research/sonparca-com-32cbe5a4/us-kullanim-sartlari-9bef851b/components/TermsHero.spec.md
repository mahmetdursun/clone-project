# TermsHero.spec.md

Renders the H1 + last-updated line + intro paragraph. No border-bottom divider (differs from sibling `PolicyHero`, which has a `border-b border-gray-200 pb-4 md:pb-6 mb-6 md:mb-8` header wrapper — this page's live DOM has no such wrapper element, just three siblings directly in the container).

Literal classes (from DOM):
- H1: `text-xl md:text-2xl lg:text-3xl font-bold mb-4 break-words`
- lastUpdated P: `text-xs md:text-sm mb-4`
- intro P: `text-sm md:text-base mb-4 whitespace-normal break-words`

Content:
- title: "Son Parça Kullanım Koşulları"
- lastUpdated: "Son Güncelleme Tarihi: 26/10/2023"
- intro: verbatim paragraph starting "https://www.sonparca.com web sitesini (\"Site\")..."
