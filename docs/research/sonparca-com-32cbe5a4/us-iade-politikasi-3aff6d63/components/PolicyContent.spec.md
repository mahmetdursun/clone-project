# PolicyContent Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/us-iade-politikasi-3aff6d63/PolicyContent.tsx` (+ sibling `data.ts` for verbatim content). Renders sections + closing paragraph only; the page route owns the outer `container` div and composes `PolicyHero` / `PolicyContent` / `PolicyFaq` as siblings (matching the convention of the already-built `/us/gizlilik-politikasi` sibling page).
- **Screenshots:** `desktop-1440-top.jpg`, `desktop-1440-section3-4.jpg`, `desktop-1440-section5-6-7.jpg`, `desktop-1440-section8-faq.jpg` (all in `docs/design-references/sonparca-com-32cbe5a4/us-iade-politikasi-3aff6d63/`)
- **Interaction model:** static (link hover only, in section 8)

## Outer wrapper (owned by this component, since it's the main content column)
```
<div class="container mx-auto max-w-screen-xl overflow-x-hidden px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 text-gray-700">
  <PolicyHero />
  {sections.map(...)}
  <p class="mt-3 text-[11px] md:text-xs text-gray-500 whitespace-normal break-words">{closingParagraph}</p>
</div>
```

## Shared per-section header pattern
Every numbered section starts with:
```
<div class="flex items-center gap-2 mb-3 md:mb-4">
  <span class="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full {badgeColorClasses} text-xs md:text-sm font-semibold">{n}</span>
  <h2 class="text-lg md:text-xl font-bold text-gray-900 break-words">{title}</h2>
</div>
```
Badge color per section (exact, from `getComputedStyle`/literal class read):
1. `bg-red-100 text-red-600`
2. `bg-gray-100 text-gray-700`
3. `bg-blue-100 text-blue-700`
4. `bg-orange-100 text-orange-700`
5. `bg-gray-100 text-gray-700`
6. `bg-gray-100 text-gray-700`
7. `bg-gray-100 text-gray-700`
8. `bg-gray-100 text-gray-700`

Section wrapper spacing: `<section class="mb-8 md:mb-10">` for sections 1–5, `<section class="mb-8 md:mb-10">` for section 6, and `<section class="mb-6 md:mb-8">` for sections 7 and 8 (slightly tighter — confirmed via literal class read, sections 1–6 use `mb-8 md:mb-10`, section 7 was read as part of the same pattern — treat sections 1–6 as `mb-8 md:mb-10` and 7–8 as `mb-6 md:mb-8`, matching direct DOM reads).

## Section 1 — Kargo Teslimatında Kontrol ve Hasar Tespiti
```
<section class="mb-8 md:mb-10">
  {header, badge=red, n=1, title="Kargo Teslimatında Kontrol ve Hasar Tespiti"}
  <div class="rounded-md border border-red-200 bg-red-50 p-4 md:p-5">
    <p class="text-xs md:text-sm font-semibold text-red-800 mb-2">Teslim almadan önce mutlaka kontrol ediniz.</p>
    <ul class="list-disc list-inside space-y-2 text-xs md:text-sm text-red-800">
      <li class="whitespace-normal break-words">Kutu üzerinde ezilme, yırtılma, ıslanma veya açılma belirtisi varsa, ürünü teslim almayın veya kargo görevlisi yanındayken kutuyu açarak <strong>"Hasar Tespit Tutanağı"</strong> düzenlettirin.</li>
      <li class="whitespace-normal break-words">Tutanak tutulmadan teslim alınan hasarlı ürünlerde, kargo sigortası devre dışı kalacağından, iade veya değişim imkânı büyük ölçüde ortadan kalkabilir.</li>
      <li class="whitespace-normal break-words">Teslim fişinin imzalanması, ürünün dışarıdan bakıldığında sağlam teslim alındığı anlamına gelir, bu aşamadan sonra oluşan hasarlardan Son Parça sorumlu tutulamaz.</li>
    </ul>
  </div>
</section>
```

## Section 2 — Genel İade Koşulları ve "Yeniden Satılabilirlik"
```
<section class="mb-8 md:mb-10">
  {header, badge=gray, n=2, title='Genel İade Koşulları ve "Yeniden Satılabilirlik"'}
  <p class="text-sm md:text-base mb-3 md:mb-4 whitespace-normal break-words">
    Mesafeli satış mevzuatı kapsamında, ayıplı olmayan ürünler için cayma hakkı süresi, ürünün tesliminden itibaren <strong>14 gündür</strong>. Bu süre içinde yapılacak iadelerde ürünün <strong>yeniden satılabilir</strong> durumda olması zorunludur.
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
    <div class="rounded-md border border-gray-200 bg-white p-3 md:p-4">
      <h3 class="text-sm md:text-base font-semibold text-gray-900 mb-2">İade İçin Gerekli Genel Şartlar</h3>
      <ul class="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-700">
        <li>Ürün orijinal kutusu ve ambalajı ile birlikte, eksiksiz ve hasarsız olmalıdır.</li>
        <li>Fatura veya satış belgesi, ürünle birlikte gönderilmelidir.</li>
        <li>Ürün üzerinde montaj, kullanım, darbe, çizik veya yağ lekesi bulunmamalıdır.</li>
        <li>Kutu üzerine kargo etiketi, bant veya yazı yazılmamalı, kutu ikinci bir koruyucu ambalaja konularak gönderilmelidir.</li>
      </ul>
    </div>
    <div class="rounded-md border border-gray-200 bg-white p-3 md:p-4">
      <h3 class="text-sm md:text-base font-semibold text-gray-900 mb-2">İade Kabul Edilmeyecek Durum Örnekleri</h3>
      <ul class="list-disc list-inside space-y-1 text-xs md:text-sm text-gray-700">
        <li>Orijinal kutunun yırtılması, ezilmesi, yağlanması veya üzerine kargo etiketi yapıştırılması.</li>
        <li>Vida sıkma izi, montaj çizikleri, gres/yağ lekesi, darbe veya kırık izleri olması.</li>
        <li>Eksik aksesuar, eksik parça, eksik doküman veya koparılmış etiket/barkod bulunması.</li>
        <li>Ürünün yeniden satılamayacak düzeyde kozmetik veya fonksiyonel hasar görmesi.</li>
      </ul>
    </div>
  </div>
</section>
```

## Section 3 — Parça Uyumluluğu ve Şase Teyidi
```
<section class="mb-8 md:mb-10">
  {header, badge=blue, n=3, title="Parça Uyumluluğu ve Şase Teyidi"}
  <p class="text-sm md:text-base mb-3 md:mb-4 whitespace-normal break-words">
    Aynı model araçlarda dahi, üretim yılı, motor tipi, donanım ve şase numarasına göre farklı parçalar kullanılabilmektedir. Bu nedenle uyumluluk, çoğu zaman sadece parça fotoğrafı veya açıklamasına bakarak netleştirilemez.
  </p>
  <div class="rounded-md border border-blue-200 bg-blue-50 p-4 mb-3 md:mb-4">
    <p class="text-xs md:text-sm text-blue-800 whitespace-normal break-words">
      <strong>Önemli:</strong> Sipariş öncesinde, aracınıza tam uyumlu parça tespiti için <strong>şase (şasi) numarası</strong> ile tarafımızdan teyit alınması önerilir.
    </p>
  </div>
  <ul class="list-disc list-inside space-y-2 text-xs md:text-sm text-gray-700">
    <li class="whitespace-normal break-words">Şase numarası paylaşılmadan, müşteri tarafından doğrudan seçilerek verilen siparişlerde, parçanın araca uymama riski müşteriye aittir. Bu durumda gidiş–dönüş kargo giderleri müşteriye aittir.</li>
    <li class="whitespace-normal break-words">Şase teyidi alınmadan verilen ve "Aracıma uymadı" gerekçesiyle iade edilmek istenen, montajı yapılmamış ve yeniden satılabilir durumdaki ürünler, yalnızca kargo bedelleri müşteriye ait olacak şekilde iade alınabilir.</li>
    <li class="whitespace-normal break-words">Son Parça tarafından şase numarasına göre "uyumlu" bilgisi verilmiş parçalarda; parça uymadığı takdirde ürün bedeli ve kargo giderleri firma tarafından karşılanır. Ancak işçilik, çekici, zaman kaybı vb. dolaylı zararlar karşılanmaz.</li>
  </ul>
</section>
```

## Section 4 — Elektrik ve Elektronik Parçalar
```
<section class="mb-8 md:mb-10">
  {header, badge=orange, n=4, title="Elektrik ve Elektronik Parçalar"}
  <div class="rounded-md border border-orange-200 bg-orange-50 p-4 md:p-5 mb-3 md:mb-4">
    <p class="text-xs md:text-sm font-semibold text-orange-800 mb-2">Elektrikli parçalar deneme amaçlı alınamaz.</p>
    <p class="text-xs md:text-sm text-orange-800 mb-3 whitespace-normal break-words">Bobin, beyin (ECU), sensör, valf, beyin modülleri, alternatör, marş motoru vb. elektrik/elektronik parçalar, araçtaki olası elektriksel arızalardan saniyeler içinde etkilenebilen hassas ürünlerdir.</p>
    <ul class="list-disc list-inside space-y-1 text-xs md:text-sm text-orange-800">
      <li class="whitespace-normal break-words">Ambalajı açılmış, güvenlik bandı veya mühürü sökülmüş elektrikli parçaların iadesi <strong>kural olarak kabul edilmez</strong>.</li>
      <li class="whitespace-normal break-words">Soketlerinde takma/çıkarma izi, üzerinde yanık, is, çizik, kaynak/lehime müdahale görülen ürünler iade kapsamı dışındadır.</li>
      <li class="whitespace-normal break-words">"Arızanın bu parçadan olup olmadığını denemek için aldım" benzeri gerekçelerle iade talebi oluşturulamaz.</li>
    </ul>
  </div>
  <p class="text-xs md:text-sm text-gray-700 mb-2 whitespace-normal break-words">Araçta kısa devre, yanlış kutup bağlantısı, voltaj dalgalanması, arızalı alternatör/akü, kötü topraklama, LPG/ek ekipman montajı gibi dış etkenlerden kaynaklanan hasarlardan Son Parça ve üretici firma sorumlu tutulamaz.</p>
</section>
```

## Section 5 — Mekanik Parçalar, Debriyaj, Turbo ve İnceleme Süreci
```
<section class="mb-8 md:mb-10">
  {header, badge=gray, n=5, title="Mekanik Parçalar, Debriyaj, Turbo ve İnceleme Süreci"}
  <p class="text-sm md:text-base mb-3 md:mb-4 whitespace-normal break-words">Montajı yapılmış mekanik parçalarda (debriyaj setleri, turbo, amortisör, rot–rotil, baskı balata vb.) "ürün arızalı" iddiası ile iade talebi gelmesi halinde, ürün doğrudan iade alınmaz; öncelikle üretici/ithalatçı teknik servisi tarafından incelenir.</p>
  <ol class="list-decimal list-inside space-y-2 text-xs md:text-sm rounded-md border border-gray-200 bg-gray-50 p-4">
    <li class="whitespace-normal break-words">Ürün, arızanın tespit edildiği şekilde sökülür ve montajın yapıldığı servisin raporu, <strong>araç ruhsat fotokopisi</strong> ve ilgili fatura ile birlikte Son Parça adresine gönderilir.</li>
    <li class="whitespace-normal break-words">Ürün üretici/ithalatçı firmanın laboratuvarına veya yetkili teknik servise test için gönderilir. İnceleme süresi genellikle <strong>15–30 iş günü</strong> arasında değişebilir.</li>
    <li class="whitespace-normal break-words">Teknik inceleme sonucunda bir rapor düzenlenir ve nihai karar bu rapora göre verilir.</li>
    <li class="whitespace-normal break-words">
      <strong>Rapor Sonucu:</strong>
      <ul class="list-disc list-inside ml-4 mt-1 text-gray-700">
        <li><strong>Üretim Hatası Tespiti:</strong> Ürün bedeli iade edilir veya stok durumuna göre değişim yapılır, kargo giderleri firmamıza aittir.</li>
        <li><strong>Montaj/Kullanım Hatası Tespiti:</strong> İade talebi reddedilir. Ürün, teknik raporla birlikte müşteriye geri gönderilir. Gidiş–dönüş kargo giderleri ve varsa üretici/servis test bedeli müşteriye aittir.</li>
      </ul>
    </li>
  </ol>
</section>
```

## Section 6 — İade Kapsamı Dışındaki Ürünler
```
<section class="mb-8 md:mb-10">
  {header, badge=gray, n=6, title="İade Kapsamı Dışındaki Ürünler"}
  <p class="text-sm md:text-base mb-3 md:mb-4 whitespace-normal break-words">Aşağıda sayılan ürün ve durumlar genel olarak iade kapsamı dışındadır:</p>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
    <div class="rounded-md border border-gray-200 bg-gray-50 p-3 text-xs md:text-sm whitespace-normal break-words">
      <h3 class="font-semibold mb-1">Sıvı ve Kimyasal Ürünler</h3>
      <p>Emniyet bandı açılmış veya kısmen kullanılmış motor yağı, antifriz, fren hidroliği, katkı ve temizlik kimyasalları.</p>
    </div>
    <!-- repeat card shell for: -->
    <!-- Elektrik/Elektronik Parçalar: "Ambalajı açılmış, montajı yapılmış veya üzerinde müdahale/yanık izi görülen elektrikli ve elektronik parçalar." -->
    <!-- Kaporta ve Aydınlatma: "Boyanmış kaporta parçaları, montaj ayağı kırılmış far/stop ve sinyal lambaları." -->
    <!-- Sarf Malzemeleri: "Paketi açılmış silecekler, ampul setleri, filtreler ve tek kullanımlık sarf malzemeleri." -->
    <!-- Özel Sipariş Ürünler: "Şase numarasına özel, yurt dışından veya fabrikadan özellikle getirtildiği belirtilen ve sipariş sonrası üretime/tedariğe alınan ürünler (ayıplı çıkmadıkça iade edilemez)." -->
  </div>
</section>
```
(5 cards total; grid is 1/2/3 columns at base/sm/lg — a 5-item grid on a 3-col row leaves 2 empty cells in the last row on desktop, matching the live site exactly — do not force a different item count per row.)

## Section 7 — İade Kargo Ücretleri ve Sorumluluk Sınırı
```
<section class="mb-6 md:mb-8">
  {header, badge=gray, n=7, title="İade Kargo Ücretleri ve Sorumluluk Sınırı"}
  <div class="rounded-md border border-gray-200 bg-white overflow-hidden">
    <div class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 text-xs md:text-sm">
      <div class="p-4">
        <h3 class="font-semibold mb-2">Kargo Ücreti Sorumluluğu</h3>
        <ul class="list-disc list-inside space-y-1 text-gray-700">
          <li><strong>Ürün Arızalı / Yanlış Ürün Gönderimi:</strong> İnceleme sonucu üretim hatası veya yanlış ürün tespit edilirse, gidiş–dönüş kargo ücretleri Son Parça tarafından karşılanır.</li>
          <li><strong>Cayma Hakkı / Keyfi İade:</strong> Ürün ayıplı olmamasına rağmen vazgeçilmesi durumunda, gidiş–dönüş kargo ücretleri müşteriye aittir.</li>
          <li><strong>Şase Teyidi Almadan Verilen Siparişler:</strong> Uyumsuzluk halinde ürün iade alınsa dahi kargo bedelleri müşteriye aittir.</li>
        </ul>
      </div>
      <div class="p-4">
        <h3 class="font-semibold mb-2">Sorumluluk Sınırı</h3>
        <ul class="list-disc list-inside space-y-1 text-gray-700">
          <li>Son Parça'nin sorumluluğu, her hâlükârda ilgili ürünün fatura bedeli ile sınırlıdır.</li>
          <li>Montaj, söküm, işçilik, çekici, araç kiralama, iş gücü kaybı, ticari itibar kaybı vb. dolaylı zararlardan Son Parça sorumlu tutulamaz.</li>
          <li>Ürün inceleme süreçlerinde üretici/servis tarafından talep edilen test bedelleri, arıza tespitinin kullanım/montaj hatası olarak sonuçlanması hâlinde müşteriye aittir.</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

## Section 8 — İade Talebi Oluşturma ve İletişim
```
<section class="mb-6 md:mb-8">
  {header, badge=gray, n=8, title="İade Talebi Oluşturma ve İletişim"}
  <p class="text-sm md:text-base mb-3 md:mb-4 whitespace-normal break-words">İade talebinizi, ürün teslim tarihinden itibaren 14 gün içinde, sipariş numaranızı belirterek iletebilirsiniz. Talebiniz kayda alındıktan sonra size süreç hakkında bilgilendirme yapılacaktır.</p>
  <div class="rounded-md border border-gray-200 bg-gray-50 p-4 md:p-5">
    <p class="text-xs md:text-sm mb-3"><strong>İade talebi ve destek için:</strong></p>
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-5 text-xs md:text-sm">
      <a href="tel:0850 302 25 08" class="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors">
        <span class="material-symbols-outlined text-base md:text-lg">call</span>
        <span>0850 302 25 08</span>
      </a>
      <a href="mailto:destek@sonparca.com" class="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors">
        <span class="material-symbols-outlined text-base md:text-lg">mail</span>
        <span>destek@sonparca.com</span>
      </a>
    </div>
    <p class="mt-4 text-[11px] md:text-xs text-gray-500 whitespace-normal break-words">* Anlaşmalı kargo hesaplarımız dışında, karşı ödemeli gönderilen kargolar önceden onay alınmadığı sürece kabul edilmeyebilir.</p>
  </div>
</section>
```
Note: this project does not have Material Symbols font loaded. Use `lucide-react` equivalents (`Phone`, `Mail`) sized to match (`h-4 w-4 md:h-[18px] md:w-[18px]`) instead of the `material-symbols-outlined` icon font — visually equivalent glyphs, acceptable substitution since the source is an icon font not an inline SVG asset.

## Closing legal paragraph (direct child of the container, after section 8, before FAQ)
```
<p class="mt-3 text-[11px] md:text-xs text-gray-500 whitespace-normal break-words">Bu iade politikası yürürlükteki tüketici mevzuatı, Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Formu ile birlikte değerlendirilmelidir. İlgili mevzuat ile bu politika arasında farklılık olması hâlinde, mevzuat hükümleri önceliklidir; diğer hükümler geçerliliğini korur.</p>
```

## States & Behaviors
- None in this component except the two contact-link hover states documented in section 8 above (`text-blue-700` → `hover:text-blue-900`, default Tailwind color transition).

## Assets
None (no images in this content; icons substituted with `lucide-react` `Phone`/`Mail` as noted above).

## Responsive Behavior
- **Desktop (1440px):** two-column grids/boxes render side by side (`md:grid-cols-2`), section 6 cards render 3-up (`lg:grid-cols-3`), section 7 divider is vertical.
- **Tablet (768px):** two-column grids/boxes still side by side (`md:` breakpoint = 768px), section 6 cards render 2-up (`sm:grid-cols-2` still active, `lg:grid-cols-3` not yet), contact row is horizontal (`sm:flex-row`).
- **Mobile (390px, class-derived per documented gap):** all grids/boxes stack to 1 column, section 7 divider becomes horizontal (`divide-y`), contact row stacks vertically (`flex-col`), all text drops to its base (non-`md:`) size.
- **Breakpoints:** `sm:` = 640px, `md:` = 768px, `lg:` = 1024px (Tailwind defaults, matches literal classes read from DOM).
