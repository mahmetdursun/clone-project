# SEOContentCard Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/SEOContentCard.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/desktop-1440-seo-faq.jpg`
- **Interaction model:** static content in an internally-scrolling box (`overflow-y-auto`); no click/hover behaviors beyond native scroll.

## DOM Structure (literal, from live DOM)
```
div.bg-white.rounded-md.border.border-gray-200.shadow-sm.overflow-hidden
  div.px-4.py-3.bg-dark-bg.border-b.border-dark-bg-light
    h2.text-base.font-semibold.text-dark-text-primary.flex.items-center.gap-2
      svg (24x24 outline phone icon, path: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" -- use lucide-react `Phone` icon, size-5, stroke)
      "Otomobil Yedek Parça Talebi"
  div.max-h-[420px].md:max-h-[480px].overflow-y-auto.p-4.md:p-6.space-y-6.text-light-text-primary.text-sm.leading-relaxed
    <7 section elements, see content below>
```
Heading classes inside the scroll body:
- Section title (h1, first section only): `text-base md:text-lg font-semibold text-light-text-primary mb-2`
- Section h2 headings: same classes as h1 above (`text-base md:text-lg font-semibold text-light-text-primary mb-2`)
- h3 subheadings (bold intro line inside a paragraph, e.g. "Yedek parça", "Şase numarası"): rendered as `<strong>` inline within the `<p>` in a couple of places, but standalone subheadings ("Özel Donanımlara Hızlı Erişim" etc.) use the same h2-level class reused for a slightly smaller sub-section title — build these as `<h3 className="text-sm md:text-base font-semibold text-light-text-primary mb-1 mt-4">` for visual hierarchy under each h2 (not literally captured at the DOM-class level beyond confirming section/heading nesting; sized down one step from h2 per standard heading hierarchy and the visual screenshot).
- Paragraphs: `text-light-text-muted`
- Tables: `table.w-full.text-xs.md:text-sm.border.border-gray-200.rounded`, `thead.bg-dark-bg.text-dark-text-primary`, `th.px-3.py-2.text-left.font-medium`, `td.px-3.py-2`, `tbody tr.hover:bg-light-bg-muted`

## Content (verbatim, 7 sections + 5 tables, in order)

### Section 1 (h1)
**Otomobil Yedek Parça Talebi | Ücretsiz Fiyat Teklifi**

Oto yedek parça arayışınızda spesifik donanımları standart kataloglarda bulamadığınız anlarda özel talep sistemimiz devreye girer. Sektördeki tecrübemizle geliştirdiğimiz bu altyapı aracınızın tam ihtiyacı olan bileşeni doğrudan küresel tedarikçilerden bulmamızı sağlar. 2026 yılının yenilikçi e-ticaret standartlarına uygun olarak tasarladığımız formumuz sayesinde karmaşık arama süreçlerini tamamen ortadan kaldırıyoruz. Hızlı bir şekilde ücretsiz fiyat teklifi alarak bütçenizi yormadan en doğru donanıma ulaşıyorsunuz.

Sistemimiz sadece stoktaki ürünleri listelemekle kalmaz, aynı zamanda Türkiye sınırları içinde bulunmayan nadir parçaları da sizin için özel olarak getirir. Klasik otomobillerden yeni nesil elektrikli araçlara kadar geniş bir yelpazede hizmet üretiyoruz. Zamanınızın ne kadar değerli olduğunu biliyoruz ve parça aramakla geçen saatleri sadece birkaç dakikalık basit bir form doldurma işlemine dönüştürüyoruz.

### Section 2 (h2): Neden Yedek Parça Talep Etmelisiniz
Yedek parça ihtiyaçları her zaman standart periyodik bakım malzemelerinden ibaret olmaz. Bazen ufak bir trim parçası veya özel bir motor sensörü arayışı günlerinizi alabilir. Piyasada bulunmayan veya yetkili servislerde çok yüksek fiyatlarla satılan donanımları tedarik ağımız sayesinde uygun koşullarda buluyoruz. Doğrudan talebinize odaklanarak zaman kaybını önlüyoruz.

**h3: Özel Donanımlara Hızlı Erişim**
Nadir bulunan kaporta aksamları veya özel donanım paketlerine ait iç trim parçaları standart listelerde nadiren yer alır. Bu tür spesifik ürünleri doğrudan ana üreticilerden veya global distribütörlerden talep ediyoruz. Aracınızın orijinalliğini bozmadan, fabrikasyon standartlarında ürünlere güvenle ulaşıyorsunuz.

**h3: Fiyat Teklifi Avantajları**
Piyasa araştırması yapmak yerine tek bir form ile farklı üreticilerin fiyat tekliflerini önünüze getiriyoruz. Orijinal ve yüksek kaliteli muadil seçenekleri karşılaştırmalı olarak inceleme fırsatı buluyorsunuz. Bütçenize en uygun kararı verirken sürpriz maliyetlerle karşılaşma riskini sıfıra indiriyoruz.

**Table 1** — columns: Arama Yöntemi | Harcanan Ortalama Zaman | Sonuç Kesinliği | Maliyet Avantajı
| Arama Yöntemi | Harcanan Ortalama Zaman | Sonuç Kesinliği | Maliyet Avantajı |
|---|---|---|---|
| Sanayi Sitelerini Gezmek | 3-5 İş Günü | Düşük-Orta | Düşük |
| Standart E-Ticaret Araması | 2-4 Saat | Orta | Orta |
| Son Parça Talep Formu | Sadece 3 Dakika | Yüksek | Yüksek |

**h3: Formu Eksiksiz Doldurma Adımları**
Aracınıza tam uyumlu bileşeni bulmamız için talep formunu doğru bilgilerle doldurmanız kritik bir öneme sahiptir. Sistem arayüzümüz kullanıcı deneyimini en üst seviyeye çıkaracak sadelikte tasarlanmıştır. Gereksiz detaylara boğulmadan sadece uzmanlarımızın ihtiyaç duyduğu temel bilgileri sisteme girmeniz yeterlidir.

**h3: Üyelik ve Sisteme Giriş**
Taleplerinizi güvenli bir şekilde takip edebilmeniz ve size özel fiyat tekliflerini sunabilmemiz için sisteme giriş yapmanız gerekir. Form sayfasındaki "Giriş Yap" veya "Üye Ol" butonlarını kullanarak saniyeler içinde kendi profilinize erişirsiniz. Bu sayede geçmiş taleplerinizi görüntüleyebilir ve sipariş süreçlerinizi tek bir panelden yönetebilirsiniz. İşlem güvenliğini sağlamak 2026 yılı standartlarımızın temelini oluşturur.

**h3: İletişim Numarası ve Açıklama**
Sisteme girdiğiniz iletişim numarası üzerinden uzman ekibimiz teklif hazırlandığında size anında dönüş yapar. "Parça Listesi" isimli geniş metin kutusuna ise aradığınız ürünün tüm detaylarını yazabilirsiniz. Rengi, yönü, özellikleri veya biliyorsanız referans kodunu bu alana detaylıca eklemeniz sürecin kusursuz işlemesini sağlar. Ekibimize ürünle ilgili doğrudan bilgi vermek isterseniz iletişim kanallarımızı da değerlendirebilirsiniz.

**Table 2** — columns: Form Alanı | Girilmesi Gereken Bilgi | Neden Gerekli
| Form Alanı | Girilmesi Gereken Bilgi | Neden Gerekli |
|---|---|---|
| Üye Girişi | Kullanıcı Hesabı | Güvenli Takip ve Sipariş Oluşturma |
| Şase Numarası | 17 Haneli Araç Kodu | Nokta Atışı Uyum Kontrolü |
| İletişim Numarası | Geçerli Cep Telefonu | Teklif Bildirimi ve Hızlı İletişim |
| Parça Listesi | Aranılan Ürün Detayları | Doğru Malzeme Tespiti |

### Section 3 (h2): Şase Numarası İle Kesin Çözümler
Oto yedek parça siparişlerinde iade ve değişim süreçlerinin en büyük nedeni yanlış donanım seçimidir. Aynı marka ve modelin farklı üretim yıllarında veya donanım paketlerinde tamamen farklı bileşenler kullanılır. Şase numarası bu karmaşayı bitiren ve aracınızın tam kimliğini ortaya koyan en güvenilir anahtardır.

**h3: On Yedi Haneli Şase Kodunun Önemi**
Araç kimlik numarası olarak bilinen bu kod üretim yeri, motor tipi ve gövde stili gibi hayati bilgileri barındırır. Formdaki ilgili alana bu kodu girdiğinizde ekibimiz aracınızın fabrika çıkış röntgenini çeker. İsterseniz doğrudan şase numarası ile parça sorgulama sayfamızı kullanarak kendiniz de hızlı bir ön araştırma yapabilirsiniz. Bu uluslararası standartlar hakkında daha teknik bilgiler için bu sayfadan daha detaylı bilgi alabilirsiniz.

**h3: Yanlış Sipariş Riskini Sıfırlama**
Doğru şase numarası paylaşıldığında uzman teknisyenlerimiz katalog eşleştirmesini sıfır hata payı ile gerçekleştirir. Gelen fiyat teklifindeki ürünün aracınıza uymama ihtimali teknik olarak ortadan kalkar. Güvenli alışverişin temelini oluşturan bu adım sanayi ortamındaki deneme yanılma yöntemlerini tarihe gömer.

**Table 3** — columns: Şase Numarası Bölümü | Karakter Sayısı | Temsil Ettiği Bilgi
| Şase Numarası Bölümü | Karakter Sayısı | Temsil Ettiği Bilgi |
|---|---|---|
| WMI (Dünya Üretici Kodu) | İlk 3 Hane | Üretim Yeri ve Marka |
| VDS (Araç Tanım Bölümü) | 4. ve 9. Haneler Arası | Kasa Tipi ve Motor Donanımı |
| VIS (Araç Tanıtım Bölümü) | Son 8 Hane | Üretim Yılı ve Fabrika Sırası |

### Section 4 (h2): Ücretsiz Yedek Parça Fiyat Teklifi
İhtiyaç duyduğunuz bileşenler için piyasadaki en rekabetçi fiyatları size sunmaktan gurur duyuyoruz. Talep formunu doldurmanız hiçbir şekilde satın alma zorunluluğu yaratmaz, tamamen ücretsiz bir danışmanlık hizmetidir. Geniş tedarik ağımızın gücünü kullanarak bütçenize uygun alternatifleri şeffaf bir şekilde listeliyoruz.

**h3: Bütçe Dostu Tedarik Ağı**
Yerel distribütörlerden uluslararası üreticilere kadar uzanan geniş bağlantılarımız aracı maliyetlerini ciddi oranda düşürür. Doğrudan kaynaktan fiyat aldığımız için piyasa ortalamasının altında teklifler sunmayı başarıyoruz. Sektörel maliyet standartlarını ve kalite belgelerini denetleyen kurumların başında gelen Türk Standardları Enstitüsü kriterlerine uygun, faturalı ve garantili ürünler listeliyoruz.

**h3: Orijinal ve Muadil Karşılaştırması**
Teklif formunuza yanıt verirken genellikle tek bir marka ile sınırlı kalmıyoruz. Eğer talep ederseniz, aracınızın kendi üreticisine ait logolu orijinal ürünü ve onaylı birinci sınıf muadil seçenekleri yan yana sunuyoruz. Böylece kaliteyi ve fiyatı bizzat değerlendirerek aracınız için en mantıklı yatırımı siz belirliyorsunuz.

**Table 4** — columns: Teklif İçeriği | Sağladığı Avantaj | Kimler Tercih Etmeli
| Teklif İçeriği | Sağladığı Avantaj | Kimler Tercih Etmeli |
|---|---|---|
| Orijinal Parça Teklifi | Fabrika Standartlarında Performans | Yeni ve Garantili Araç Sahipleri |
| Premium Muadil Teklifi | Uygun Maliyet ve Yüksek Kalite | Orta Yaşlı Araç Sahipleri |
| Ekonomik Muadil Teklifi | Maksimum Bütçe Tasarrufu | Ticari veya Eski Model Kullanıcıları |

### Section 5 (h2): Bulunmayan Parçalar İçin Özel Süreçler
Yedek parça sektöründe en büyük problem eski model, sınırlı üretim veya ülkeye az sayıda girmiş araçların bakımıdır. Standart mağazalarda bu araçların filtreleri bile büyük bir sorun haline gelirken özel talep altyapımız bu engelleri aşar. Sizin yerinize global pazarları tarayarak aracınızı yola güvenle döndürüyoruz.

**h3: Klasik ve Yeni Nesil Araçlar**
Eskişehir sokaklarında gezen 30 yıllık klasik bir otomobil ile en son teknolojiye sahip elektrikli bir SUV modelinin parça bulma zorluğu genellikle benzerdir. Üretimi durmuş klasik parçaları yurtdışı bağlantılarımızla tespit ediyoruz. Şayet aracınız için standart menüler üzerinden ilerlemek isterseniz pratik araç seçerek parça sorgulama modülümüzü de dilediğiniz zaman kullanabilirsiniz.

**h3: Uzman Teknik Analiz**
Talebiniz bize ulaştığı an sıradan bir çağrı merkezi personeli değil doğrudan motor ve mekanik konusunda uzman personellerimiz inceleme yapar. Bazen aradığınız donanımın başka bir markanın modeliyle ortak platform ürünü olduğunu tespit ederiz. Bu tür mühendislik geçişlerini iyi bilen ekibimiz bulunamayan ürünlere çok daha hızlı ve akılcı alternatifler üretir.

**Table 5** — columns: Tedarik Sınıfı | Bulunabilirlik Durumu | Ortalama Temin Süresi
| Tedarik Sınıfı | Bulunabilirlik Durumu | Ortalama Temin Süresi |
|---|---|---|
| Sık Kullanılan Ürünler | Ana Depo Stoklarında | Aynı Gün Kargo |
| Özel Seri Donanımlar | Yerel Distribütör Ağında | 1-3 İş Günü |
| Yurtdışı İthal Ürünler | Global Tedarikçilerde | 7-14 İş Günü |

### Section 6 (h2): Sürüş Güvenliğiniz İçin Profesyonel Destek
Uzman teknisyenlerimiz ve akıllı e-ticaret altyapımızla oto yedek parça arayışınızdaki tüm engelleri kaldırıyoruz. Aracınızın model yılı veya markası ne olursa olsun, ihtiyacınız olan her bileşene sadece dakikalar içinde ulaşıyorsunuz. Yenilikçi platformumuz sayesinde sanayilerde parça arama yorgunluğunu bitiriyor, garantili ürünleri doğrudan kapınıza getiriyoruz.

Satın alma süreçlerini sorunsuz bir deneyime dönüştürmek için tasarladığımız formumuzu hemen doldurarak aracınızın eksiklerini hızla tamamlayabilirsiniz. Güvenilir çözümlerimizle yollarda her zaman güvende kalmanız için çalışıyoruz.

(Section count note: the live DOM reports exactly 7 `<section>` elements; sections 1–6 above map to 6 of them with section 6 combining the final two paragraphs above as one closing section — build as 6 or 7 section wrappers, whichever keeps the JSX cleanest; content and order matter more than exact wrapper count.)

## Assets
- Header icon: lucide-react `Phone` (`size-4` or `size-5`, `text-dark-text-primary`).
- No other images.

## Responsive Behavior
- **Desktop (1440px) / Tablet (768px):** `md:max-h-[480px]`, `md:p-6`, `md:text-lg` headings, `text-sm` table (`md:text-sm` vs `text-xs` below).
- **Mobile (390px):** `max-h-[420px]`, `p-4`, `text-base` headings, `text-xs` tables — tables should scroll horizontally if needed (wrap each `<table>` in `overflow-x-auto` to stay safe at narrow widths since the live tables are dense; this is a reasonable defensive addition, not a literal extracted class, needed because raw `<table>` at `text-xs` with 3-4 columns can overflow a 390px viewport).
