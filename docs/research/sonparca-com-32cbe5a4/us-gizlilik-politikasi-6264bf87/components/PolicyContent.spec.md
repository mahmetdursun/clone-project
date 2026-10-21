# PolicyContent Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-gizlilik-politikasi-6264bf87/PolicyContent.tsx`
- **Data file:** `src/components/sites/sonparca-com-32cbe5a4/us-gizlilik-politikasi-6264bf87/data.ts`
- **Screenshots:** `docs/design-references/sonparca-com-32cbe5a4/us-gizlilik-politikasi-6264bf87/desktop-1440-mid.jpg`, `desktop-1440-bottom-faq-footer.jpg`
- **Interaction model:** static (renders all 9 numbered legal sections + closing note, always expanded, no accordion)

## DOM Structure
Each numbered section shares this shell:
```
<section class="mb-8 md:mb-10">  <!-- last section (9) uses "mb-4 md:mb-6" instead -->
  <div class="flex items-center gap-2 mb-3 md:mb-4">
    <span class="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 text-gray-700 text-xs md:text-sm font-semibold">N</span>
    <h2 class="text-lg md:text-xl font-bold text-gray-900 break-words">Section Title</h2>
  </div>
  <p class="text-sm md:text-base mb-3 md:mb-4 whitespace-normal break-words">Intro paragraph</p>
  <!-- then one of: card grid | bulleted list | plain paragraphs | contact list, per section -->
</section>
```
After section 9, a standalone closing paragraph sits directly in the page container (not inside a `<section>`):
```
<p class="mt-3 text-[11px] md:text-xs text-gray-500 whitespace-normal break-words">Bu politika, yürürlükteki kişisel verilerin korunması mevzuatı ve Site üzerinde yayımlanan diğer sözleşme ve aydınlatma metinleri ile birlikte değerlendirilmelidir. Mevzuat ile bu politika arasında farklılık olması hâlinde, mevzuat hükümleri önceliklidir.</p>
```

Build this as a data-driven component: `data.ts` exports a typed array of section objects; `PolicyContent.tsx` maps over them and switches render logic based on a `variant` field (`"cards" | "list" | "paragraphs" | "contact"`), since the 9 sections use 4 distinct body layouts. Also render the blue callout box for section 2 and the trailing small-gray-text note for section 3 as optional fields on the section 2/3 data entries (`calloutNote`, `trailingNote`), and the "how to exercise rights" trailing note on section 4 the same way.

## Computed Styles (exact literal Tailwind classes)

### Section wrapper
- Sections 1–8: `mb-8 md:mb-10`
- Section 9: `mb-4 md:mb-6`

### Heading row
- Wrapper: `flex items-center gap-2 mb-3 md:mb-4`
- Number badge: `flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 text-gray-700 text-xs md:text-sm font-semibold`
- `h2`: `text-lg md:text-xl font-bold text-gray-900 break-words`

### Intro paragraph (every section)
- `text-sm md:text-base mb-3 md:mb-4 whitespace-normal break-words`

### Variant "cards" (Section 1 only)
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4`
- Card: `rounded-md border border-gray-200 bg-white p-3 md:p-4 text-xs md:text-sm`
- Card title `h3`: `font-semibold mb-2`
- Card list `ul`: `list-disc list-inside space-y-1 text-gray-700`
- Card list `li`: `whitespace-normal break-words`

### Variant "list" (Sections 2, 3, 4, 5, 6)
- `ul`: `list-disc list-inside mb-3 md:mb-4 text-xs md:text-sm space-y-1`
- `li`: `whitespace-normal break-words` — items may contain a leading `<strong>Label:</strong>` inline before the rest of the text (sections 3 only; render via a `label?: string` field per list item, rest of text as plain string)

### Variant "paragraphs" (Sections 7, 8)
- Each paragraph: `text-sm md:text-base mb-3 md:mb-4 whitespace-normal break-words` (last paragraph in section omits bottom margin visually but reusing the same class is fine/matches source spacing rhythm)

### Variant "contact" (Section 9)
- `ul`: `list-none mb-3 md:mb-4 text-xs md:text-sm space-y-1`
- `li`: `whitespace-normal break-words`
- `strong` label inline, then value. Email → `<a href="mailto:...">`, phone → `<a href="tel:...">`, both `class="text-blue-700 hover:text-blue-900"`. Address has no link, just a leading `<strong>Adres:</strong>` and text.
- Trailing paragraph after the list: `text-sm md:text-base mb-3 md:mb-4 whitespace-normal break-words` (reuse intro-paragraph class)

### Callout box (Section 2, after the `ul`)
- `rounded-md border border-blue-200 bg-blue-50 p-3 md:p-4 text-[11px] md:text-xs text-blue-800 whitespace-normal break-words`

### Trailing small-gray note (Section 3, after the `ul`; also standalone note after Section 9)
- `text-[11px] md:text-xs text-gray-600 whitespace-normal break-words` (Section 3 trailing note)
- `mt-3 text-[11px] md:text-xs text-gray-500 whitespace-normal break-words` (standalone closing note after section 9 — note `text-gray-500` not `600`, and has `mt-3`)

## States & Behaviors
N/A — fully static content, no hover/click/scroll interactivity anywhere in this component.

## Text Content (verbatim — all 9 sections)

### 1. Topladığımız Bilgi Kategorileri
Intro: "Hizmetlerimizi sunarken aşağıdaki kategorilerde kişisel verileri işleyebiliriz:"
Cards:
- **Kimlik ve İletişim Bilgileri**: Ad, soyad, telefon numarası, e-posta adresi / Fatura ve teslimat adresi, vergi numarası (varsa) / Hesap oluşturma ve giriş bilgileriniz (kullanıcı adı vb.)
- **Araç ve Sipariş Bilgileri**: Aracınızın marka, model, yıl, motor tipi ve şase bilgileri / Satın aldığınız ürünler, sipariş geçmişiniz, sepet ve favori listeniz
- **İşlem ve Ödeme Bilgileri**: Ödeme yöntemi bilgileri, fatura detayları ve işlem kayıtları / Kart bilgileriniz, güvenli ödeme alt yapısı sağlayıcılarımız tarafından işlenir; kart numarası gibi hassas veriler sunucularımızda saklanmaz.
- **Kullanım ve Teknik Bilgiler**: Siteyi kullanım şekliniz (ziyaret ettiğiniz sayfalar, incelediğiniz ürünler, arama sorgularınız) / IP adresi, tarayıcı türü, işletim sistemi, cihaz bilgileri ve oturum log kayıtları / Çerezler ve benzeri izleme teknolojileri aracılığıyla toplanan veriler

### 2. Kişisel Verilerin İşlenme Amaçları
Intro: "Kişisel verilerinizi, ilgili mevzuata uygun olarak ve aşağıdaki amaçlarla işleyebiliriz:"
List:
- Siparişlerin alınması, işlenmesi, faturalandırılması ve ürünlerin teslim edilmesi
- Hesap oluşturma, giriş işlemleri ve kullanıcı profilinizin yönetilmesi
- Müşteri talepleri, şikâyet ve önerilerin değerlendirilmesi ve yanıtlanması
- Aracınıza ve kullanımınıza uygun ürünlerin önerilmesi ve satış sonrası destek sağlanması
- Site deneyiminin iyileştirilmesi, performansın izlenmesi ve hataların giderilmesi
- Dolandırıcılık faaliyetlerinin tespiti, güvenlik kontrolleri ve hukuki süreçlerin yürütülmesi
- İlgili mevzuattan doğan saklama, raporlama ve yükümlülüklerimizin yerine getirilmesi
Callout (blue box): "Pazarlama amaçlı elektronik ileti (e-posta, SMS vb.) gönderimleri için, ayrıca açık rızanızın alınması kaydıyla ileti gönderebilir; dilediğiniz zaman bu iletilerde yer alan çıkış bağlantısını kullanarak veya bizimle iletişime geçerek tercihlerinizi güncelleyebilirsiniz."

### 3. Bilgilerin Paylaşımı ve Aktarımı
Intro: "Kişisel verileriniz, yalnızca hizmetin sunulması, pazarlama/analiz faaliyetlerinin yürütülmesi ve yasal yükümlülüklerimizin yerine getirilmesi için gerekli olduğunda ve ölçülü şekilde üçüncü taraflarla paylaşılabilir:"
List (each with bold label):
- **Hizmet Sağlayıcılar:** Kargo/lojistik firmaları, ödeme kuruluşları, çağrı merkezi, SMS/e-posta servis sağlayıcıları, barındırma ve altyapı hizmeti sunan iş ortaklarımız ile, yalnızca ilgili hizmetin ifası için gerekli olan veriler paylaşılabilir.
- **Analiz ve Reklam Teknolojileri Sağlayıcıları:** Site trafiğini ve kullanımını analiz etmek, performansı ölçmek, kullanıcı deneyimini iyileştirmek ve size daha alakalı reklamlar gösterebilmek için, üçüncü taraf analiz ve reklam teknolojisi sağlayıcıları ile çalışabiliriz. Bu kapsamda; çerezler ve benzeri teknolojiler aracılığıyla toplanan kullanıcı davranışı verileri (ziyaret edilen sayfalar, tıklamalar, oturum süresi vb.), teknik veriler (IP adresi, tarayıcı ve cihaz bilgisi) ve takma ad (pseudonim) içeren tanımlayıcılar bu taraflarla paylaşılabilir.
- **Resmi Kurumlar:** Yasal zorunluluk veya yetkili makamların talebi halinde, hukuki yükümlülüklerimizi yerine getirmek amacıyla bilgileriniz ilgili kurumlarla paylaşılabilir.
- **İş Devri ve Yapısal Değişiklikler:** Son Parça'nin veya varlıklarının tamamının ya da bir kısmının devri, birleşmesi veya satın alınması hâlinde, kişisel verileriniz devredilen varlıklar arasında yer alabilir.
Trailing note (small gray): "Kişisel verileriniz, ilgili mevzuatta öngörülen güvenlik tedbirleri sağlanmadan yurt dışına aktarılmaz. Yurt dışına aktarım gereken durumlarda, size ayrıca bilgi verilecek ve gerekli hukuki mekanizmalar işletilecektir."

### 4. Kullanıcı Haklarınız
Intro: "Kişisel verilerinizle ilgili mevzuat kapsamında aşağıdaki haklara sahipsiniz:"
List:
- Hakkınızda işlenen kişisel verilerin varlığı hakkında bilgi talep etme
- İşlenen verilere erişme ve bunların bir örneğini talep etme
- Eksik veya yanlış işlenen verilerinizin düzeltilmesini isteme
- İşleme amacının ortadan kalkması veya hukuka aykırı işlenmesi hâlinde verilerinizin silinmesini veya anonimleştirilmesini talep etme
- Verilerinizin işlenmesine, özel durumunuza ilişkin gerekçelerle itiraz etme
- Otomatik sistemler aracılığıyla yapılan analizler sonucunda aleyhinize bir sonucun ortaya çıkmasına itiraz etme
- Pazarlama iletişimlerini dilediğiniz zaman durdurma / reddetme
Trailing paragraph: "Bu haklarınızı kullanmak için aşağıdaki \"İletişim\" bölümünde yer alan kanallar üzerinden bizimle irtibata geçebilirsiniz. Talebiniz, ilgili mevzuatın öngördüğü süreler içerisinde ve mümkün olduğunca kısa sürede sonuçlandırılacaktır."

### 5. Çerezler ve Benzeri Teknolojiler
Intro: "Site deneyiminizi iyileştirmek, tercihlerinizi hatırlamak, istatistiksel analiz yapmak ve size daha uygun içerik/reklam gösterebilmek için çerezler ve benzeri teknolojiler kullanabiliriz. Bu kapsamda, üçüncü taraf analiz ve reklam teknolojisi sağlayıcıları tarafından yerleştirilen çerezler de kullanılabilir."
List:
- Tarayıcınızın ayarlarından çerez kullanımına ilişkin tercihlerinizi yönetebilir, çerezleri reddedebilir veya silebilirsiniz.
- Zorunlu çerezler, sitenin temel işlevlerinin çalışması için gereklidir ve devre dışı bırakılması durumunda bazı hizmetler düzgün sunulamayabilir.
- Reklam ve pazarlama odaklı çerezler için ise, tercihleriniz doğrultusunda açık rızanız alınarak işlem yapılır.

### 6. Veri Güvenliği ve Saklama Süreleri
Intro: "Kişisel verilerinizin güvenliğini sağlamak için, güncel teknik imkânlar ve maliyet unsurları da dikkate alınarak makul düzeyde idari ve teknik tedbirler almaktayız. Ancak, internet üzerinden yapılan hiçbir iletimin veya elektronik depolama yönteminin yüzde yüz güvenli olmadığını hatırlatmak isteriz."
List:
- Veriler, işleme amaçlarının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen asgari/maksimum süreler dikkate alınarak saklanır.
- Saklama süresinin sona ermesi veya işleme sebebinin ortadan kalkması hâlinde, veriler mevzuata uygun şekilde silinir, anonimleştirilir veya yok edilir.
- Verilerinize sadece yetkili personel ve hizmet sağlayıcılar, görevleriyle sınırlı ve gizlilik yükümlülüğü altında erişebilir.

### 7. Çocukların Gizliliği
Paragraph 1: "Sitemiz ve sunduğumuz hizmetler, 18 yaşın altındaki kişilere yönelik değildir. 18 yaşın altındaki kişilerden bilerek kişisel veri toplamıyor, bu kişilere ticari iletişim göndermiyoruz."
Paragraph 2: "18 yaşından küçük bir kişinin bize yanlışlıkla kişisel veri sağlamış olduğunu fark ederseniz, lütfen aşağıdaki iletişim kanallarından bize ulaşın. Bu durumda ilgili veriler, mevzuata uygun şekilde silinecek veya anonimleştirilecektir."

### 8. Politikada Yapılabilecek Değişiklikler
Paragraph 1: "Bu Gizlilik ve Kişisel Verilerin Korunması Politikasını; yasal düzenlemeler, uygulamalar veya hizmetlerimizdeki değişiklikler nedeniyle zaman zaman güncelleyebiliriz. Güncel metin her zaman Site üzerinde yayımlanır ve \"Son Güncelleme Tarihi\" buna göre revize edilir."
Paragraph 2: "Önemli değişiklikler yapılması hâlinde, Site üzerinden dikkat çekici bir bildirimle veya gerekli durumlarda e-posta yoluyla sizi bilgilendirebiliriz."

### 9. İletişim ve Başvuru Kanalları
Intro: "Bu politika veya kişisel verilerinizle ilgili sorularınız, talepleriniz veya şikâyetleriniz için aşağıdaki iletişim kanallarını kullanabilirsiniz:"
Contact list:
- **E-posta:** destek@sonparca.com (mailto link)
- **Telefon:** 0850 302 25 08 (tel link, `tel:0850 302 25 08`)
- **Adres:** Avcılar Sanayi Sitesi No:10 (Oto Yılmaz Yedek Parça Yanı), 34325 Avcılar/İstanbul
Trailing paragraph: "Başvurularınız, geçerli mevzuat çerçevesinde en kısa sürede ve en geç yasal süreler içinde sonuçlandırılacak olup; gerektiğinde sizden kimliğinizi teyit etmeye yönelik ek bilgiler talep edilebilir."

### Closing note (after section 9, outside any `<section>`)
"Bu politika, yürürlükteki kişisel verilerin korunması mevzuatı ve Site üzerinde yayımlanan diğer sözleşme ve aydınlatma metinleri ile birlikte değerlendirilmelidir. Mevzuat ile bu politika arasında farklılık olması hâlinde, mevzuat hükümleri önceliklidir."

## Assets
None.

## Responsive Behavior
- **Desktop (1440px):** Section 1 card grid renders 2 columns; text at `md:`/`lg:` sizes.
- **Tablet (768px):** Card grid still 2 columns (`md:grid-cols-2` triggers exactly at 768px); spacing/text at `md:` sizes.
- **Mobile (390px):** Card grid stacks to 1 column (`grid-cols-1` base); all text/spacing at base (unprefixed) Tailwind values. (Derived from literal classes; see gap note in `BEHAVIORS.md`.)
- **Breakpoint:** 768px (`md:`) for all layout/spacing/type changes in this component.
