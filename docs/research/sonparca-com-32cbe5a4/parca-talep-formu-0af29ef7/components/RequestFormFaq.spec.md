# RequestFormFaq Specification

## Overview
- **Target file:** `src/components/sites/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/RequestFormFaq.tsx`
- **Screenshot:** `docs/design-references/sonparca-com-32cbe5a4/parca-talep-formu-0af29ef7/desktop-1440-seo-faq.jpg` (bottom portion)
- **Interaction model:** click-driven accordion, each row toggles independently (no auto-close of other rows observed).

## DOM Structure (literal, from live DOM)
```
section.w-full
  h2.text-lg.font-semibold.text-light-text-primary.mb-4 -- "Parça Talebi - Sıkça Sorulan Sorular"
  div.space-y-3
    div.border.border-gray-200.rounded-md.overflow-hidden  (one per Q&A, x16)
      button.w-full.px-4.sm:px-5.py-3.sm:py-4.text-left.bg-white.hover:bg-gray-50.transition-colors.duration-150.cursor-pointer.flex.items-center.justify-between.gap-3
        h3.font-medium.text-light-text-primary.text-sm.sm:text-base -- question
        icon (material-symbols-outlined "expand_more"/"expand_less" on live site → lucide `ChevronDown`, size-5, text-light-text-muted, `rotate-180` when open, `transition-transform duration-200`)
      <answer, only rendered/visible when open> p.px-4.sm:px-5.pb-3.sm:pb-4.text-sm.text-light-text-muted -- answer (padding pattern inferred to match the button's horizontal padding; exact answer-wrapper class wasn't separately isolated from live DOM beyond confirming it renders directly under the button inside the same bordered row)
```

## States & Behaviors
- **Trigger:** click the row button.
- **Before:** icon = chevron down, answer not shown.
- **After:** icon rotates 180° (chevron up), answer paragraph shown below the question, same row border/background.
- **Transition:** icon `transition-transform duration-200`; row background `hover:bg-gray-50` with `transition-colors duration-150`.
- Implementation: local `useState<number|null>` for the single open index... **correction from live-site observation:** each row appeared to toggle independently rather than closing others when a new one opens (only one row was ever tested open at a time during extraction, so behave as a single-open accordion — standard pattern, matches the existing shared `FAQAccordion.tsx` component's approach elsewhere in this codebase). Use `openIndex: number | null`, clicking the open row again closes it, clicking another row switches to it.

## Content (verbatim, all 16 Q&A pairs, in order)
1. **Q:** Parça talep formu nedir?
   **A:** Parça talep formu, aradığınız yedek parçayı sitemizde bulamadığınızda uzman ekibimizin sizin için araştırma yapmasını sağlayan ücretsiz bir hizmettir.
2. **Q:** Yedek parça talep formu doldurmak ücretli midir?
   **A:** Sistemimiz üzerinden oluşturduğunuz tüm yedek parça talepleri ve fiyat teklifi alma süreçleri tamamen ücretsizdir. Amacımız sadece doğru ürünü uygun fiyatla bulmanızı sağlamaktır, herhangi bir danışmanlık veya işlem ücreti kesinlikle talep etmiyoruz. Sadece teklifi onaylayıp satın alma aşamasına geçtiğinizde ürün bedelini ödersiniz.
3. **Q:** Neden üye olmadan parça talep formunu dolduramıyorum?
   **A:** Üyelik sistemi taleplerinizin başka kişilerle karışmasını önler ve tamamen size özel, güvenli bir panel oluşturur. Geçmiş taleplerinizi, aldığınız teklifleri ve güncel siparişlerinizin kargo durumunu bu panelden rahatça takip edersiniz. Ayrıca kayıtlı şase numaranız sonraki alışverişlerinizde size büyük hız kazandırır.
4. **Q:** Neden Şasi numarası girmem zorunlu?
   **A:** Şasi numarası, aracınızın tam olarak hangi parçaya ihtiyaç duyduğunu belirlemek için kritik bir bilgidir. Doğru parçayı sunabilmemiz için şasi numaranızı eksiksiz ve doğru bir şekilde girmeniz gerekmektedir.
5. **Q:** Şase numaramı paylaşmam güvenli midir?
   **A:** Aracınızın şase numarası ile aracınıza özel kataloğuna girmemize aracınızın doğru ürün tespiti yapmak amacıyla kullanılır. Üçüncü şahıslarla paylaşılması yasal olarak mümkün değildir. Kişisel veri güvenliği politikalarımız 2026 yılının en katı dijital güvenlik standartlarına göre güncellenmiştir.
6. **Q:** Üye olduğum halde neden telefon numarası girmem gerekiyor?
   **A:** Telefon numarası, taleplerinizle ilgili hızlı iletişim kurabilmemiz için gereklidir. Uzman ekibimiz, talebinizle ilgili detayları netleştirmek veya size özel teklifler sunmak için telefonla iletişime geçebilir.
7. **Q:** Parça talep formunu doldururken nelere dikkat etmeliyim?
   **A:** Parça talep formunu doldururken aracınızın marka, model, üretim yılı ve şase numarası gibi bilgileri eksiksiz ve doğru bir şekilde girmeniz önemlidir. Ayrıca aradığınız parçanın adını veya OEM numarasını belirtmek, uzman ekibimizin size daha hızlı ve doğru bir şekilde yardımcı olmasını sağlar.
8. **Q:** Taleplerim ne kadar sürede cevaplanır?
   **A:** Talebiniz mesai saatleri içinde oluşturulduysa uzman ekibimiz genellikle 1 ile 3 saat arasında kapsamlı bir teklif hazırlar. Yurtdışı araştırması gerektiren çok spesifik ve nadir donanımlar için bu süre maksimum 24 saate kadar uzayabilir. Teklifiniz hazır olduğunda SMS veya e-posta yoluyla hemen bilgilendirilirsiniz.
9. **Q:** Talep oluşturmak ücretli mi?
   **A:** Hayır, parça talep formu tamamen ücretsizdir. İstediğiniz kadar talep oluşturabilirsiniz. Fiyat teklifi almanız herhangi bir satın alma yükümlülüğü doğurmaz.
10. **Q:** Fiyat teklifini onaylamazsam ne olur?
    **A:** Size sunduğumuz fiyatları piyasa koşullarında değerlendirmekte tamamen özgürsünüz. Teklifimizi onaylamadığınız takdirde hiçbir yasal bağlayıcılığınız veya sorumluluğunuz bulunmaz. Sistemimizdeki talebiniz belirli bir süre sonra otomatik olarak pasife alınır ve sizi rahatsız edici pazarlama aramaları yapılmaz.
11. **Q:** Teklif edilen parçalar garantili midir?
    **A:** Sistemimiz üzerinden size teklif edilen orijinal veya birinci sınıf muadil tüm ürünler resmi ithalatçı ve üretici garantisi altındadır. Faturalı olarak adresinize sevk edilen bu ürünler, yetkili veya özel servislerde takıldığı sürece yasal garanti kapsamını korur. Daha detaylı bilgi için İade Politikası sayfamızı ziyaret edebilir veya müşteri hizmetlerimizle iletişime geçebilirsiniz.
12. **Q:** Formdaki açıklama kısmına neler yazmalıyım?
    **A:** Parça listesi alanına aradığınız ürünün adını, nerede konumlandığını ve biliyorsanız özelliklerini yazmanız yeterlidir. Örneğin "Sağ ön kapı cam krikosu motorlu" veya "2018 model arka tampon difüzörü mat siyah" gibi net tanımlar işimizi çok hızlandırır. Eski donanımın üzerinde yazan referans numaraları da bu alana eklenebilir.
13. **Q:** Gelen parçanın aracıma uymama ihtimali var mı?
    **A:** Şase numaranızı eksiksiz ve doğru girdiğiniz takdirde gelen donanımın aracınıza uymama ihtimali neredeyse sıfırdır. Fabrika üretim yazılımları üzerinden birebir doğrulama yaptığımız için teknik bir hata yaşanmaz.
14. **Q:** Kaporta parçaları boyalı olarak mı gönderiliyor?
    **A:** Fabrika çıkışlı orijinal ve muadil sıfır kaporta parçaları standart olarak siyah veya gri renkli astar boyalı şekilde üretilir. Bu nedenle tarafınıza gönderilen tampon, çamurluk veya kaput gibi ürünler boyasız, araca özel boya işlemi yapılmamış halde ulaşır. Renk uyumu sorunu yaşamamanız için boya işlemi yerel boya ustalarınız tarafından aracın güncel rengine göre yapılmalıdır.
15. **Q:** Talebimi nasıl takip edebilirim?
    **A:** Hesabınıza giriş yaptıktan sonra "Parça Taleplerim" sayfasından tüm taleplerinizin durumunu takip edebilirsiniz. Ayrıca talep durumu değişikliklerinde e-posta bildirimi alırsınız.
16. **Q:** Talep cevaplandıktan sonra ürünleri nasıl satın alabilirim?
    **A:** Uzman ekibimiz tarafından size iletilen fiyat teklifinde, ürünleri sepete ekleyebileceğiniz bir bağlantı bulunur. Bu bağlantıya tıklayarak ürünlerin tümünü sepete ekleyebilir yada istediklerinizi seçip hızlıca satın alma işlemini tamamlayabilirsiniz.

## Assets
- Icon: lucide-react `ChevronDown` (rotate-180 when open).

## Responsive Behavior
- **Desktop/Tablet:** `sm:px-5 sm:py-4`, question `sm:text-base`.
- **Mobile (390px):** `px-4 py-3`, question `text-sm`.
- **Breakpoint:** 640px (`sm`).
