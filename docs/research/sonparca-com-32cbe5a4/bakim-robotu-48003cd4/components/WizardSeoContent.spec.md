# WizardSeoContent Specification

## Overview
- Target file: `src/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/WizardSeoContent.tsx`
- Interaction model: static long-form text (matches homepage `SEOTextBlock.tsx` visual convention — prose styling, `<h2>`/`<h3>`, tables).

## Content (verbatim from live site, captured via get_page_text — see BEHAVIORS.md for the full raw text)
Sections, each `<h2>` (or `<h3>` for sub-headings) + paragraph(s), some followed by a 3-column comparison `<table>`:

1. H2 "Bakım Robotu ile Periyodik Bakım Parçası Seçimi" — 2 paragraphs (Periyodik bakım... / 2026 yılının akıllı altyapısı...)
   - H3 "Bakım Robotu Nasıl Çalışır?" — 1 paragraph
   - H3 "Aracınıza Özel Uyumlu Listeleme" — 1 paragraph
   - H3 "Adım Adım Toplu Sepete Ekleme" — 1 paragraph
   - Table "Karşılaştırma Kriteri | Klasik Bakım Alışverişi | Bakım Robotu ile Seçim" (4 data rows: Parça Uyum Garantisi, Liste Hazırlama Hızı, Eksik Parça Riski, Sepete Ekleme Şekli)
2. H2 "Periyodik Bakım Neden Önemlidir?"
   - H3 "Motor Ömrünü Uzatan Düzenli Bakım" — 1 paragraph
   - H3 "Yakıt Tasarrufu ve Güvenli Sürüş" — 1 paragraph
   - Table "Bakım Kalemi | Genel Değişim Aralığı | İhmal Edilince Sonucu" (4 rows: Motor Yağı ve Yağ Filtresi, Hava ve Polen Filtresi, Fren Balatası ve Diski, Buji ve Triger Seti)
3. H2 "Hazır Bakım Paketleri ile Kolay Seçim"
   - H3 "İhtiyacınıza Uygun Paket Seçimi" — 1 paragraph
   - H3 "Opsiyonel Adımları Atlama Esnekliği" — 1 paragraph
   - Table "Bakım Paketi Türü | İçerdiği Tipik Parçalar | Önerilen Durum" (4 rows)
4. H2 "Aracınızı Tanımlamanın Üç Yolu"
   - H3 "Şasi Numarası ile Hassas Eşleştirme" — 1 paragraph
   - H3 "Marka Model ve Yıl ile Pratik Seçim" — 1 paragraph
   - Table "Tanımlama Yöntemi | İstenen Bilgi | Uyum Hassasiyeti" (3 rows)
5. H2 "Bakım Parçası Bulunamazsa Ne Yapmalı?"
   - H3 "Özel Parça Talep Formu" — 1 paragraph (mentions `/parca-talep-formu`, link it)
   - H3 "Uzman Desteği ve İletişim" — 1 paragraph (mentions `/us/iletisim`, link it)
   - Table "Durum | Önerilen Adım | Sağladığı Fayda" (3 rows)
6. H2 "Kaliteli Bakım Parçasının Önemi"
   - H3 "Standartlara Uygun Üretim" — 1 paragraph
   - H3 "İade Derdi Olmadan Doğru Alışveriş" — 1 paragraph
   - Table "Parça Kalitesi | Performans Etkisi | Uzun Vadeli Maliyet" (3 rows)
7. H2 "Akıllı Bakım ile Aracınız Her Zaman Yolda" — closing paragraph, no table.

Full verbatim paragraph/table cell text is in `BEHAVIORS.md` stage-1 SEO dump (copy directly into `data.ts` as a typed array of `{heading, level, body?, table?}` blocks, do not paraphrase).

## Styling
`<article class="prose prose-sm sm:prose max-w-none mt-10 prose-headings:text-light-text-primary prose-a:text-sp-accent">` (Tailwind Typography-style utility classes matching the existing homepage `SEOTextBlock.tsx`; if `@tailwindcss/typography` isn't installed, hand-roll heading/paragraph/table classes identical to it — check `root-8a5edab2/SEOTextBlock.tsx` first and mirror its exact class approach).

## Assets
None.
