export interface SeoTable {
  columns: string[];
  rows: string[][];
}

export interface SeoSubsection {
  heading: string;
  paragraphs: string[];
}

export interface SeoSection {
  heading: string;
  level: "h1" | "h2";
  paragraphs: string[];
  subsections?: SeoSubsection[];
  table?: SeoTable;
}

export const seoSections: SeoSection[] = [
  {
    heading: "Otomobil Yedek Parça Talebi | Ücretsiz Fiyat Teklifi",
    level: "h1",
    paragraphs: [
      "Oto yedek parça arayışınızda spesifik donanımları standart kataloglarda bulamadığınız anlarda özel talep sistemimiz devreye girer. Sektördeki tecrübemizle geliştirdiğimiz bu altyapı aracınızın tam ihtiyacı olan bileşeni doğrudan küresel tedarikçilerden bulmamızı sağlar. 2026 yılının yenilikçi e-ticaret standartlarına uygun olarak tasarladığımız formumuz sayesinde karmaşık arama süreçlerini tamamen ortadan kaldırıyoruz. Hızlı bir şekilde ücretsiz fiyat teklifi alarak bütçenizi yormadan en doğru donanıma ulaşıyorsunuz.",
      "Sistemimiz sadece stoktaki ürünleri listelemekle kalmaz, aynı zamanda Türkiye sınırları içinde bulunmayan nadir parçaları da sizin için özel olarak getirir. Klasik otomobillerden yeni nesil elektrikli araçlara kadar geniş bir yelpazede hizmet üretiyoruz. Zamanınızın ne kadar değerli olduğunu biliyoruz ve parça aramakla geçen saatleri sadece birkaç dakikalık basit bir form doldurma işlemine dönüştürüyoruz.",
    ],
  },
  {
    heading: "Neden Yedek Parça Talep Etmelisiniz",
    level: "h2",
    paragraphs: [
      "Yedek parça ihtiyaçları her zaman standart periyodik bakım malzemelerinden ibaret olmaz. Bazen ufak bir trim parçası veya özel bir motor sensörü arayışı günlerinizi alabilir. Piyasada bulunmayan veya yetkili servislerde çok yüksek fiyatlarla satılan donanımları tedarik ağımız sayesinde uygun koşullarda buluyoruz. Doğrudan talebinize odaklanarak zaman kaybını önlüyoruz.",
    ],
    subsections: [
      {
        heading: "Özel Donanımlara Hızlı Erişim",
        paragraphs: [
          "Nadir bulunan kaporta aksamları veya özel donanım paketlerine ait iç trim parçaları standart listelerde nadiren yer alır. Bu tür spesifik ürünleri doğrudan ana üreticilerden veya global distribütörlerden talep ediyoruz. Aracınızın orijinalliğini bozmadan, fabrikasyon standartlarında ürünlere güvenle ulaşıyorsunuz.",
        ],
      },
      {
        heading: "Fiyat Teklifi Avantajları",
        paragraphs: [
          "Piyasa araştırması yapmak yerine tek bir form ile farklı üreticilerin fiyat tekliflerini önünüze getiriyoruz. Orijinal ve yüksek kaliteli muadil seçenekleri karşılaştırmalı olarak inceleme fırsatı buluyorsunuz. Bütçenize en uygun kararı verirken sürpriz maliyetlerle karşılaşma riskini sıfıra indiriyoruz.",
        ],
      },
    ],
    table: {
      columns: [
        "Arama Yöntemi",
        "Harcanan Ortalama Zaman",
        "Sonuç Kesinliği",
        "Maliyet Avantajı",
      ],
      rows: [
        ["Sanayi Sitelerini Gezmek", "3-5 İş Günü", "Düşük-Orta", "Düşük"],
        ["Standart E-Ticaret Araması", "2-4 Saat", "Orta", "Orta"],
        ["KaportaBizde Talep Formu", "Sadece 3 Dakika", "Yüksek", "Yüksek"],
      ],
    },
  },
  {
    heading: "Formu Eksiksiz Doldurma Adımları",
    level: "h2",
    paragraphs: [
      "Aracınıza tam uyumlu bileşeni bulmamız için talep formunu doğru bilgilerle doldurmanız kritik bir öneme sahiptir. Sistem arayüzümüz kullanıcı deneyimini en üst seviyeye çıkaracak sadelikte tasarlanmıştır. Gereksiz detaylara boğulmadan sadece uzmanlarımızın ihtiyaç duyduğu temel bilgileri sisteme girmeniz yeterlidir.",
    ],
    subsections: [
      {
        heading: "Üyelik ve Sisteme Giriş",
        paragraphs: [
          'Taleplerinizi güvenli bir şekilde takip edebilmeniz ve size özel fiyat tekliflerini sunabilmemiz için sisteme giriş yapmanız gerekir. Form sayfasındaki "Giriş Yap" veya "Üye Ol" butonlarını kullanarak saniyeler içinde kendi profilinize erişirsiniz. Bu sayede geçmiş taleplerinizi görüntüleyebilir ve sipariş süreçlerinizi tek bir panelden yönetebilirsiniz. İşlem güvenliğini sağlamak 2026 yılı standartlarımızın temelini oluşturur.',
        ],
      },
      {
        heading: "İletişim Numarası ve Açıklama",
        paragraphs: [
          'Sisteme girdiğiniz iletişim numarası üzerinden uzman ekibimiz teklif hazırlandığında size anında dönüş yapar. "Parça Listesi" isimli geniş metin kutusuna ise aradığınız ürünün tüm detaylarını yazabilirsiniz. Rengi, yönü, özellikleri veya biliyorsanız referans kodunu bu alana detaylıca eklemeniz sürecin kusursuz işlemesini sağlar. Ekibimize ürünle ilgili doğrudan bilgi vermek isterseniz iletişim kanallarımızı da değerlendirebilirsiniz.',
        ],
      },
    ],
    table: {
      columns: ["Form Alanı", "Girilmesi Gereken Bilgi", "Neden Gerekli"],
      rows: [
        [
          "Üye Girişi",
          "Kullanıcı Hesabı",
          "Güvenli Takip ve Sipariş Oluşturma",
        ],
        ["Şase Numarası", "17 Haneli Araç Kodu", "Nokta Atışı Uyum Kontrolü"],
        [
          "İletişim Numarası",
          "Geçerli Cep Telefonu",
          "Teklif Bildirimi ve Hızlı İletişim",
        ],
        ["Parça Listesi", "Aranılan Ürün Detayları", "Doğru Malzeme Tespiti"],
      ],
    },
  },
  {
    heading: "Şase Numarası İle Kesin Çözümler",
    level: "h2",
    paragraphs: [
      "Oto yedek parça siparişlerinde iade ve değişim süreçlerinin en büyük nedeni yanlış donanım seçimidir. Aynı marka ve modelin farklı üretim yıllarında veya donanım paketlerinde tamamen farklı bileşenler kullanılır. Şase numarası bu karmaşayı bitiren ve aracınızın tam kimliğini ortaya koyan en güvenilir anahtardır.",
    ],
    subsections: [
      {
        heading: "On Yedi Haneli Şase Kodunun Önemi",
        paragraphs: [
          "Araç kimlik numarası olarak bilinen bu kod üretim yeri, motor tipi ve gövde stili gibi hayati bilgileri barındırır. Formdaki ilgili alana bu kodu girdiğinizde ekibimiz aracınızın fabrika çıkış röntgenini çeker. İsterseniz doğrudan şase numarası ile parça sorgulama sayfamızı kullanarak kendiniz de hızlı bir ön araştırma yapabilirsiniz. Bu uluslararası standartlar hakkında daha teknik bilgiler için bu sayfadan daha detaylı bilgi alabilirsiniz.",
        ],
      },
      {
        heading: "Yanlış Sipariş Riskini Sıfırlama",
        paragraphs: [
          "Doğru şase numarası paylaşıldığında uzman teknisyenlerimiz katalog eşleştirmesini sıfır hata payı ile gerçekleştirir. Gelen fiyat teklifindeki ürünün aracınıza uymama ihtimali teknik olarak ortadan kalkar. Güvenli alışverişin temelini oluşturan bu adım sanayi ortamındaki deneme yanılma yöntemlerini tarihe gömer.",
        ],
      },
    ],
    table: {
      columns: [
        "Şase Numarası Bölümü",
        "Karakter Sayısı",
        "Temsil Ettiği Bilgi",
      ],
      rows: [
        [
          "WMI (Dünya Üretici Kodu)",
          "İlk 3 Hane",
          "Üretim Yeri ve Marka",
        ],
        [
          "VDS (Araç Tanım Bölümü)",
          "4. ve 9. Haneler Arası",
          "Kasa Tipi ve Motor Donanımı",
        ],
        [
          "VIS (Araç Tanıtım Bölümü)",
          "Son 8 Hane",
          "Üretim Yılı ve Fabrika Sırası",
        ],
      ],
    },
  },
  {
    heading: "Ücretsiz Yedek Parça Fiyat Teklifi",
    level: "h2",
    paragraphs: [
      "İhtiyaç duyduğunuz bileşenler için piyasadaki en rekabetçi fiyatları size sunmaktan gurur duyuyoruz. Talep formunu doldurmanız hiçbir şekilde satın alma zorunluluğu yaratmaz, tamamen ücretsiz bir danışmanlık hizmetidir. Geniş tedarik ağımızın gücünü kullanarak bütçenize uygun alternatifleri şeffaf bir şekilde listeliyoruz.",
    ],
    subsections: [
      {
        heading: "Bütçe Dostu Tedarik Ağı",
        paragraphs: [
          "Yerel distribütörlerden uluslararası üreticilere kadar uzanan geniş bağlantılarımız aracı maliyetlerini ciddi oranda düşürür. Doğrudan kaynaktan fiyat aldığımız için piyasa ortalamasının altında teklifler sunmayı başarıyoruz. Sektörel maliyet standartlarını ve kalite belgelerini denetleyen kurumların başında gelen Türk Standardları Enstitüsü kriterlerine uygun, faturalı ve garantili ürünler listeliyoruz.",
        ],
      },
      {
        heading: "Orijinal ve Muadil Karşılaştırması",
        paragraphs: [
          "Teklif formunuza yanıt verirken genellikle tek bir marka ile sınırlı kalmıyoruz. Eğer talep ederseniz, aracınızın kendi üreticisine ait logolu orijinal ürünü ve onaylı birinci sınıf muadil seçenekleri yan yana sunuyoruz. Böylece kaliteyi ve fiyatı bizzat değerlendirerek aracınız için en mantıklı yatırımı siz belirliyorsunuz.",
        ],
      },
    ],
    table: {
      columns: ["Teklif İçeriği", "Sağladığı Avantaj", "Kimler Tercih Etmeli"],
      rows: [
        [
          "Orijinal Parça Teklifi",
          "Fabrika Standartlarında Performans",
          "Yeni ve Garantili Araç Sahipleri",
        ],
        [
          "Premium Muadil Teklifi",
          "Uygun Maliyet ve Yüksek Kalite",
          "Orta Yaşlı Araç Sahipleri",
        ],
        [
          "Ekonomik Muadil Teklifi",
          "Maksimum Bütçe Tasarrufu",
          "Ticari veya Eski Model Kullanıcıları",
        ],
      ],
    },
  },
  {
    heading: "Bulunmayan Parçalar İçin Özel Süreçler",
    level: "h2",
    paragraphs: [
      "Yedek parça sektöründe en büyük problem eski model, sınırlı üretim veya ülkeye az sayıda girmiş araçların bakımıdır. Standart mağazalarda bu araçların filtreleri bile büyük bir sorun haline gelirken özel talep altyapımız bu engelleri aşar. Sizin yerinize global pazarları tarayarak aracınızı yola güvenle döndürüyoruz.",
    ],
    subsections: [
      {
        heading: "Klasik ve Yeni Nesil Araçlar",
        paragraphs: [
          "Eskişehir sokaklarında gezen 30 yıllık klasik bir otomobil ile en son teknolojiye sahip elektrikli bir SUV modelinin parça bulma zorluğu genellikle benzerdir. Üretimi durmuş klasik parçaları yurtdışı bağlantılarımızla tespit ediyoruz. Şayet aracınız için standart menüler üzerinden ilerlemek isterseniz pratik araç seçerek parça sorgulama modülümüzü de dilediğiniz zaman kullanabilirsiniz.",
        ],
      },
      {
        heading: "Uzman Teknik Analiz",
        paragraphs: [
          "Talebiniz bize ulaştığı an sıradan bir çağrı merkezi personeli değil doğrudan motor ve mekanik konusunda uzman personellerimiz inceleme yapar. Bazen aradığınız donanımın başka bir markanın modeliyle ortak platform ürünü olduğunu tespit ederiz. Bu tür mühendislik geçişlerini iyi bilen ekibimiz bulunamayan ürünlere çok daha hızlı ve akılcı alternatifler üretir.",
        ],
      },
    ],
    table: {
      columns: [
        "Tedarik Sınıfı",
        "Bulunabilirlik Durumu",
        "Ortalama Temin Süresi",
      ],
      rows: [
        ["Sık Kullanılan Ürünler", "Ana Depo Stoklarında", "Aynı Gün Kargo"],
        [
          "Özel Seri Donanımlar",
          "Yerel Distribütör Ağında",
          "1-3 İş Günü",
        ],
        [
          "Yurtdışı İthal Ürünler",
          "Global Tedarikçilerde",
          "7-14 İş Günü",
        ],
      ],
    },
  },
  {
    heading: "Sürüş Güvenliğiniz İçin Profesyonel Destek",
    level: "h2",
    paragraphs: [
      "Uzman teknisyenlerimiz ve akıllı e-ticaret altyapımızla oto yedek parça arayışınızdaki tüm engelleri kaldırıyoruz. Aracınızın model yılı veya markası ne olursa olsun, ihtiyacınız olan her bileşene sadece dakikalar içinde ulaşıyorsunuz. Yenilikçi platformumuz sayesinde sanayilerde parça arama yorgunluğunu bitiriyor, garantili ürünleri doğrudan kapınıza getiriyoruz.",
      "Satın alma süreçlerini sorunsuz bir deneyime dönüştürmek için tasarladığımız formumuzu hemen doldurarak aracınızın eksiklerini hızla tamamlayabilirsiniz. Güvenilir çözümlerimizle yollarda her zaman güvende kalmanız için çalışıyoruz.",
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const partRequestFaqItems: FaqItem[] = [
  {
    question: "Parça talep formu nedir?",
    answer:
      "Parça talep formu, aradığınız yedek parçayı sitemizde bulamadığınızda uzman ekibimizin sizin için araştırma yapmasını sağlayan ücretsiz bir hizmettir.",
  },
  {
    question: "Yedek parça talep formu doldurmak ücretli midir?",
    answer:
      "Sistemimiz üzerinden oluşturduğunuz tüm yedek parça talepleri ve fiyat teklifi alma süreçleri tamamen ücretsizdir. Amacımız sadece doğru ürünü uygun fiyatla bulmanızı sağlamaktır, herhangi bir danışmanlık veya işlem ücreti kesinlikle talep etmiyoruz. Sadece teklifi onaylayıp satın alma aşamasına geçtiğinizde ürün bedelini ödersiniz.",
  },
  {
    question: "Neden üye olmadan parça talep formunu dolduramıyorum?",
    answer:
      "Üyelik sistemi taleplerinizin başka kişilerle karışmasını önler ve tamamen size özel, güvenli bir panel oluşturur. Geçmiş taleplerinizi, aldığınız teklifleri ve güncel siparişlerinizin kargo durumunu bu panelden rahatça takip edersiniz. Ayrıca kayıtlı şase numaranız sonraki alışverişlerinizde size büyük hız kazandırır.",
  },
  {
    question: "Neden Şasi numarası girmem zorunlu?",
    answer:
      "Şasi numarası, aracınızın tam olarak hangi parçaya ihtiyaç duyduğunu belirlemek için kritik bir bilgidir. Doğru parçayı sunabilmemiz için şasi numaranızı eksiksiz ve doğru bir şekilde girmeniz gerekmektedir.",
  },
  {
    question: "Şase numaramı paylaşmam güvenli midir?",
    answer:
      "Aracınızın şase numarası ile aracınıza özel kataloğuna girmemize aracınızın doğru ürün tespiti yapmak amacıyla kullanılır. Üçüncü şahıslarla paylaşılması yasal olarak mümkün değildir. Kişisel veri güvenliği politikalarımız 2026 yılının en katı dijital güvenlik standartlarına göre güncellenmiştir.",
  },
  {
    question: "Üye olduğum halde neden telefon numarası girmem gerekiyor?",
    answer:
      "Telefon numarası, taleplerinizle ilgili hızlı iletişim kurabilmemiz için gereklidir. Uzman ekibimiz, talebinizle ilgili detayları netleştirmek veya size özel teklifler sunmak için telefonla iletişime geçebilir.",
  },
  {
    question: "Parça talep formunu doldururken nelere dikkat etmeliyim?",
    answer:
      "Parça talep formunu doldururken aracınızın marka, model, üretim yılı ve şase numarası gibi bilgileri eksiksiz ve doğru bir şekilde girmeniz önemlidir. Ayrıca aradığınız parçanın adını veya OEM numarasını belirtmek, uzman ekibimizin size daha hızlı ve doğru bir şekilde yardımcı olmasını sağlar.",
  },
  {
    question: "Taleplerim ne kadar sürede cevaplanır?",
    answer:
      "Talebiniz mesai saatleri içinde oluşturulduysa uzman ekibimiz genellikle 1 ile 3 saat arasında kapsamlı bir teklif hazırlar. Yurtdışı araştırması gerektiren çok spesifik ve nadir donanımlar için bu süre maksimum 24 saate kadar uzayabilir. Teklifiniz hazır olduğunda SMS veya e-posta yoluyla hemen bilgilendirilirsiniz.",
  },
  {
    question: "Talep oluşturmak ücretli mi?",
    answer:
      "Hayır, parça talep formu tamamen ücretsizdir. İstediğiniz kadar talep oluşturabilirsiniz. Fiyat teklifi almanız herhangi bir satın alma yükümlülüğü doğurmaz.",
  },
  {
    question: "Fiyat teklifini onaylamazsam ne olur?",
    answer:
      "Size sunduğumuz fiyatları piyasa koşullarında değerlendirmekte tamamen özgürsünüz. Teklifimizi onaylamadığınız takdirde hiçbir yasal bağlayıcılığınız veya sorumluluğunuz bulunmaz. Sistemimizdeki talebiniz belirli bir süre sonra otomatik olarak pasife alınır ve sizi rahatsız edici pazarlama aramaları yapılmaz.",
  },
  {
    question: "Teklif edilen parçalar garantili midir?",
    answer:
      "Sistemimiz üzerinden size teklif edilen orijinal veya birinci sınıf muadil tüm ürünler resmi ithalatçı ve üretici garantisi altındadır. Faturalı olarak adresinize sevk edilen bu ürünler, yetkili veya özel servislerde takıldığı sürece yasal garanti kapsamını korur. Daha detaylı bilgi için İade Politikası sayfamızı ziyaret edebilir veya müşteri hizmetlerimizle iletişime geçebilirsiniz.",
  },
  {
    question: "Formdaki açıklama kısmına neler yazmalıyım?",
    answer:
      'Parça listesi alanına aradığınız ürünün adını, nerede konumlandığını ve biliyorsanız özelliklerini yazmanız yeterlidir. Örneğin "Sağ ön kapı cam krikosu motorlu" veya "2018 model arka tampon difüzörü mat siyah" gibi net tanımlar işimizi çok hızlandırır. Eski donanımın üzerinde yazan referans numaraları da bu alana eklenebilir.',
  },
  {
    question: "Gelen parçanın aracıma uymama ihtimali var mı?",
    answer:
      "Şase numaranızı eksiksiz ve doğru girdiğiniz takdirde gelen donanımın aracınıza uymama ihtimali neredeyse sıfırdır. Fabrika üretim yazılımları üzerinden birebir doğrulama yaptığımız için teknik bir hata yaşanmaz.",
  },
  {
    question: "Kaporta parçaları boyalı olarak mı gönderiliyor?",
    answer:
      "Fabrika çıkışlı orijinal ve muadil sıfır kaporta parçaları standart olarak siyah veya gri renkli astar boyalı şekilde üretilir. Bu nedenle tarafınıza gönderilen tampon, çamurluk veya kaput gibi ürünler boyasız, araca özel boya işlemi yapılmamış halde ulaşır. Renk uyumu sorunu yaşamamanız için boya işlemi yerel boya ustalarınız tarafından aracın güncel rengine göre yapılmalıdır.",
  },
  {
    question: "Talebimi nasıl takip edebilirim?",
    answer:
      'Hesabınıza giriş yaptıktan sonra "Parça Taleplerim" sayfasından tüm taleplerinizin durumunu takip edebilirsiniz. Ayrıca talep durumu değişikliklerinde e-posta bildirimi alırsınız.',
  },
  {
    question: "Talep cevaplandıktan sonra ürünleri nasıl satın alabilirim?",
    answer:
      "Uzman ekibimiz tarafından size iletilen fiyat teklifinde, ürünleri sepete ekleyebileceğiniz bir bağlantı bulunur. Bu bağlantıya tıklayarak ürünlerin tümünü sepete ekleyebilir yada istediklerinizi seçip hızlıca satın alma işlemini tamamlayabilirsiniz.",
  },
];
