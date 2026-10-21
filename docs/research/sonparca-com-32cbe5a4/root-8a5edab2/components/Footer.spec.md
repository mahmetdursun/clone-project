# SEOTextBlock + Footer + BottomBar Specification

## Overview
- **Target files:**
  - `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/SEOTextBlock.tsx`
  - `src/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer.tsx` (includes bottom bar)
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/root-8a5edab2/desktop-05-seo-footer.jpg`
- **Interaction model:** static (Footer/BottomBar); SEOTextBlock is a plain long-copy card, no expand/collapse interaction was confirmed during the sweep — build as a normal (non-truncated) text block.

## SEOTextBlock — DOM Structure
```
<div class="bg-white border border-gray-200 rounded-lg p-6 space-y-4 text-sm text-gray-600 leading-relaxed">
  <h2 class="text-lg font-bold text-gray-900">Oto Yedek Parça</h2>
  <h3 class="font-semibold text-gray-900">Oto Yedek Parça ve Aksesuar</h3>
  <p>...</p>
  <h3>Güvenilir Oto Yedek Parça Platformu</h3>
  <p>...</p>
  <h3>Sürüş Güvenliğinde Kaliteli Malzemenin Önemi</h3>
  <p>...</p>
  <h3>Yenilikçi ve Geniş Yedek Parça Ağı</h3>
  <p>...</p>
```
- Styles: card `bg-white border border-gray-200 rounded-lg p-6`, body text `text-sm text-gray-600 leading-relaxed`, h3 subheads `font-semibold text-gray-900 mb-1`.

## SEOTextBlock — Text Content (verbatim, real copy extracted live)
**Oto Yedek Parça**

**Oto Yedek Parça ve Aksesuar**
"Oto yedek parça arayışınızda kaliteyi, hızı ve uzmanlığı bir araya getiren en kapsamlı e-ticaret platformunda bulunuyorsunuz. Özellikle Türkiye yollarının değişken dinamikleri göz önüne alındığında sürücüler araçlarına tam uyum sağlayan bileşenleri bulurken zaman zaman büyük zorluklar yaşar. Biz aklınızı karıştıran bu meşakkatli süreci sizin için tamamen şeffaf ve güvenilir bir alışveriş deneyimine dönüştürüyoruz."

**Güvenilir Oto Yedek Parça Platformu**
"Oto yedek parça alışverişinizde 2026 yılı itibarıyla sürekli güncellediğimiz geniş ürün ağımızla binek ve ticari araçlara yönelik yenilikçi çözümler sunuyoruz. Sektördeki güçlü tedarik zincirimiz sayesinde aradığınız en nadir yedek parça seçeneklerine bile saniyeler içinde kolayca ulaşıyorsunuz. Uzun yıllara dayanan otomotiv tecrübemiz sanayi sitelerindeki değerli ustaların ve bireysel kullanıcıların beklentilerini eksiksiz analiz etmemizi sağlıyor."

**Sürüş Güvenliğinde Kaliteli Malzemenin Önemi**
"Araç bakım ve onarım süreçlerini hepimiz genellikle stresli ve yüksek maliyetli dönemler olarak yaşarız. Yanlış tercih edilen bir yağ filtresi veya kalitesi düşük bir fren balatası ilerleyen süreçte çok daha büyük mekanik arızalara yol açar. Müşterilerimizin taşıdığı bu haklı tedirginliği çok iyi anlıyoruz. Temel amacımız sadece bir satış sitesi olmak değil sürüş güvenliğinizi doğrudan garanti altına alan uzman bir çözüm ortağı olmaktır."

**Yenilikçi ve Geniş Yedek Parça Ağı**
"Gelişen üst düzey otomotiv teknolojileriyle birlikte elektrikli, hibrit ve yeni nesil motorların donanım ihtiyaçları da her geçen gün değişiyor. Togg ve Tesla gibi yenilikçi araçlardan sokaklarımızın vazgeçilmezi klasik modellere kadar 1.2 milyondan fazla ürün seçeneğiyle her aracın ihtiyacını karşılıyoruz." *(closing sentence truncated in the sweep — builder may write a natural one-sentence continuation consistent with this tone rather than fabricate a specific claim.)*

## Footer — DOM Structure
```
<footer class="bg-dark-bg text-dark-text-muted">
  <div class="container grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
    <div> <!-- col 1: brand -->
      <img logo-small.webp> "SonParça Otomotiv"
      <p>Türkiye'nin en güvenilir otomotiv yedek parça platformu. 1.2 milyondan fazla ürün seçeneği ile araç bakım ve onarım ihtiyaçlarınızı karşılıyoruz.</p>
      <h4>Kurumsal</h4>
      <ul>Hakkımızda / İletişim / Yedek Parça Talep Formu / Şasi Numarası ile Parça Sorgulama / Araç Seçerek ile Parça Sorgulama / Bakım Robotu</ul>
      <h4>Güvenli Alışveriş</h4>
      <ul icon-prefixed>Tüm işlemleriniz güvenli bağlantı ile korunur / Kart bilgileriniz hiçbir zaman saklanmaz / Şifreniz ve ödeme bilgileriniz şifrelenerek korunur</ul>
    <div> <!-- col 2 -->
      <h4>Hesap İşlemleri</h4><p>Hesap özelliklerinden faydalanmak için giriş yapın.</p>
      <button class="bg-white text-dark-bg rounded px-4 py-2 font-medium">Giriş Yap</button>
      <h4>Müşteri Hizmetleri</h4><ul>İade ve Değişim / Yardım Merkezi</ul>
    <div> <!-- col 3 -->
      <h4>İletişim</h4>
      rows: Telefon "0850 302 25 08" / WhatsApp "0850 302 25 08" / E-posta "destek@sonparca.com" / Adres "Avcılar Sanayi Sitesi No:10 (Oto Yılmaz Yedek Parça Yanı), 34325 Avcılar/İstanbul"
      <h4>Çalışma Saatleri</h4>
      rows: "Pazartesi - Cuma" 09:00-18:00 / "Cumartesi" 09:00-17:00 / "Pazar" Kapalı
    <div> <!-- col 4 -->
      <h4>Sosyal Medya</h4> 3 circular icon links (Instagram, Facebook, X)
      <h4>Mağazalarımız</h4> 5 marketplace badge pills (Trendyol, Hepsiburada, N11, PtAVM, Pazarama) each with small logo + name
  <div class="border-t border-dark-bg-light py-4 flex justify-between text-xs">
    "Güvenlik:" + 2 badges "256-bit SSL" / "3D Secure" (green check icon)
  <div class="border-t border-dark-bg-light py-4 flex justify-between text-xs">
    "© 2026 SonParça. Tüm hakları saklıdır." + links "Gizlilik Politikası" / "Kullanım Şartları" / "İade Politikası"
```

## Computed Styles
- Footer background: `#192831` (dark-bg family), body text `dark-text-muted` (#a5a9ab), headings `dark-text-primary` (#f7f7f7) `font-semibold text-sm mb-3`.
- Links: `hover:text-dark-text-primary transition-colors`.
- "Giriş Yap" button: `bg-white text-dark-bg rounded px-4 py-2 font-medium w-full`, hover → slight opacity/`bg-gray-100`.
- Social icons: 32px circle, `bg-dark-bg-light`, hover → `bg-sp-accent`.
- Marketplace badges: `flex items-center gap-2 bg-dark-bg-light rounded px-3 py-2 text-xs`.
- Divider rows: `border-t border-dark-bg-light`.
- Security badges: green checkmark icon (`text-emerald-400` / success token `#22c55e`) + label.

## Assets
- `/sites/sonparca-com-32cbe5a4/shared/sm-instagram.webp`, `sm-facebook.webp`, `sm-x.webp`
- `/sites/sonparca-com-32cbe5a4/shared/mp-trendyol.webp`, `mp-hepsiburada.webp`, `mp-n11.webp`, `mp-ptavm.webp`, `mp-pazarama.webp`

## Responsive Behavior
- **Desktop (1440px):** 4 columns.
- **Mobile (390px):** 1 column, stacked, each section full width.
- **Breakpoint:** `md` (768px) → 4 col.
