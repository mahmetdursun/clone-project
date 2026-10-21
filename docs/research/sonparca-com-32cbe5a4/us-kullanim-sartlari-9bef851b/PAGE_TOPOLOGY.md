# Page Topology — /us/kullanim-sartlari (Terms of Use)

Source: https://www.sonparca.com/us/kullanim-sartlari
Angular component tag: `<zx-terms-of-use>` inside `<main>`.

## Structure (top to bottom)

1. Site chrome: TopBar + Header (shared, already built at `root-8a5edab2`) — reused, not rebuilt.
2. Content container: `<div class="container mx-auto p-3 md:p-6 lg:p-8 max-w-screen-xl overflow-x-hidden">`
   - `H1` "Son Parça Kullanım Koşulları" — `text-xl md:text-2xl lg:text-3xl font-bold mb-4 break-words`
   - `P` "Son Güncelleme Tarihi: 26/10/2023" — `text-xs md:text-sm mb-4`
   - `P` intro paragraph — `text-sm md:text-base mb-4 whitespace-normal break-words`
   - 13 numbered sections, each `H2` (`text-lg md:text-xl font-bold mb-3 mt-6 break-words`) followed by either:
     - `UL.list-disc.list-inside.mb-4.text-sm.md:text-base` with `LI.whitespace-normal.break-words.pb-2` items (sections 1–8), or
     - a single `P.text-sm.md:text-base.mb-4.whitespace-normal.break-words` paragraph (sections 9–12), or
     - section 13 (İletişim): intro `P`, then `UL.list-none.mb-4.text-sm.md:text-base` with `<li><b>Label:</b> value</li>` rows (email as `mailto:` link, phone as `tel:` link, address plain text).
   - No colored number badges, no callout/alert boxes, no cards — this page is plain text only, unlike `/us/iade-politikasi` and `/us/gizlilik-politikasi` which use badges/callouts. Simpler than both siblings.
   - `zx-faq-accordion` FAQ block titled "Kullanım Koşulları - Sıkça Sorulan Sorular" with 3 Q&A items (see BEHAVIORS.md / data.ts).
3. Footer (shared, reused).

## Section list (verbatim titles)
1. Hesap Oluşturma ve Kullanım (list)
2. Siparişler ve Ödemeler (list)
3. Teslimat (list)
4. İade ve Geri Ödemeler (list)
5. Fikri Mülkiyet (list)
6. Kullanıcı İçeriği (list)
7. Yasaklanmış Davranışlar (list)
8. Sorumluluğun Sınırlandırılması (list)
9. Tazminat (paragraph)
10. Uygulanacak Hukuk ve Yargı Yetkisi (paragraph)
11. Değişiklikler (paragraph)
12. Bölünebilirlik (paragraph)
13. İletişim (paragraph + contact list: email/phone/address)

No "last updated" badge styling beyond plain text. No hero banner/breadcrumb beyond the H1 block (no `border-b` divider under the title, unlike iade-politikasi's PolicyHero).
