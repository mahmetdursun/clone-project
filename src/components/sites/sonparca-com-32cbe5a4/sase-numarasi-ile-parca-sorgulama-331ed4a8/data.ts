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
    heading: "Şase Numarası ile Parça Sorgulama",
    level: "h1",
    paragraphs: [
      "Oto yedek parça seçimi aracınızın sürüş güvenliğini belirleyen en temel faktördür. Özellikle kış aylarında yanlış alınan bir donanımın montajında yaşanan zaman kaybını birçok sürücü tecrübe eder. Araç sahipleri kaliteli yedek parça ararken genellikle karmaşık kataloglar arasında tamamen kaybolur. Güncel dijital teknolojimiz sayesinde bu yorucu arama sürecini tamamen rafa kaldırıyoruz. Yenilikçi platformumuz evrensel kimlik kodunuzu kullanarak sadece saniyeler içinde tam uyumlu donanımları karşınıza çıkarır.",
      "2026 yılının getirdiği akıllı sistemler sayesinde sanayide saatlerce ürün arama dönemi kapanıyor. Ankara'daki bir ustanın acil beklediği triger setini doğrudan fabrikasyon verisiyle saniyeler içinde tespit ediyoruz. İnsan hatasını aradan çıkaran algoritmalarımız aracınızın genetiğini anında çözer. Geleneksel yöntemlerin yarattığı stresi bitirerek bütçenizi güvence altına alıyoruz. Akılcı çözümlerimiz yollardaki konforunuzu kesintisiz bir şekilde destekler.",
    ],
  },
  {
    heading: "Oto Yedek Parça Arama Stratejileri",
    level: "h2",
    paragraphs: [
      "Oto yedek parça sektöründe şase numaranız aracınızın fabrikadan çıktığı günkü tüm teknik verilerini barındırır. Bu özel kodu kullandığınızda sistemimiz milyonlarca ürün arasından sadece sizin aracınıza uyanları hemen filtreler. Yanlış yedek parça alma korkusu yaşamadan rahatça sipariş oluşturursunuz. Akıllı algoritmamız hata payını sıfıra indirerek geleneksel deneme yanılma yöntemlerini tamamen bitirir.",
    ],
    subsections: [
      {
        heading: "Garantili Uyum Sağlayan Sistem",
        paragraphs: [
          "Platformumuzdaki gelişmiş sorgulama ekranı doğrudan küresel üretici veri tabanlarıyla anlık iletişim kurar. On yedi haneli numaranızı girdiğiniz an aracınızın motor tipi ve gövde özellikleri anında sistemle eşleşir. Ekranda beliren tüm ürünlerin aracınıza yüzde yüz uyum sağlayacağını kesin olarak bilirsiniz. Bu sayede ustaların yanlış ürün iadesi talepleriyle asla karşılaşmazsınız.",
        ],
      },
      {
        heading: "Zaman Kayıplarını Tamamen Önleme",
        paragraphs: [
          "Uyumsuz bir donanımı kargoyla geri göndermek günlerce süren can sıkıcı bir bekleyiş yaratır. Akıllı arama motorumuz bu gereksiz bekleme sürelerini ortadan kaldırarak aracınızı hemen yola çıkarır. Doğru ürünü ilk seferde bulmak gereksiz kargo masraflarını engeller. Ayrıca tamirhane bekleme maliyetlerini de ciddi oranda düşürür. Süreci hızlandıran şase numarası ile parça sorgulama aracımız aradığınız güveni size sunar.",
        ],
      },
    ],
    table: {
      columns: ["Karşılaştırma Kriteri", "Geleneksel Arama Yöntemi", "Dijital Sorgulama Sistemi"],
      rows: [
        ["Uyum Garantisi Seviyesi", "Düşük İhtimal", "Yüzde Yüz Kesin"],
        ["İşlemin Tamamlanma Hızı", "Saatler Sürebilir", "Saniyeler İçinde"],
        ["İnsan Kaynaklı Hata", "Yüksek Hata Riski", "Hata Riski Yok"],
        ["Bütçeye Olan Etkisi", "Gizli Giderler Yaratır", "Bütçeyi Güvenceye Alır"],
      ],
    },
  },
  {
    heading: "Şase Numarası Evrensel Kimlik Kodudur",
    level: "h2",
    paragraphs: [],
    subsections: [
      {
        heading: "On Yedi Haneli Özel Kimlik",
        paragraphs: [
          "Otomotiv endüstrisi her araca üretim aşamasında özel bir tanımlama dizisi atar. Bu evrensel kodlama sistemi dünya çapındaki tüm araçları birbirinden kesin çizgilerle doğrudan ayırır. Harf ve rakamlardan oluşan dizilim aracın üretim yeri hakkında hayati veriler sunar. Detaylı teknik bilgi edinmek isterseniz bu sayfadan kaynaklarını detaylıca inceleyebilirsiniz. Küresel standartlar hatalı üretimi engeller.",
        ],
      },
      {
        heading: "Araç Üzerindeki Fiziksel Konumları",
        paragraphs: [
          "Aracınızın kimliğini belirleyen bu kodu fiziksel olarak bulmak aslında sanıldığından çok daha basittir. Genellikle sürücü tarafındaki ön camın sol alt köşesinde dışarıdan rahatça okunacak şekilde konumlandırılır. Ayrıca sürücü kapısının iç direğinde bulunan metal etikette de bu numarayı kolayca görebilirsiniz. Resmi ruhsat belgenizin ilgili hanesi de bu eşsiz numarayı her zaman barındırır. Kodu bulduğunuz an sistemimiz aracı tanır.",
        ],
      },
    ],
    table: {
      columns: ["Numaranın Bulunduğu Yer", "Görsel Erişim Kolaylığı", "Etiket Görünürlük Durumu"],
      rows: [
        ["Ön Cam Sol Alt Köşesi", "Son Derece Kolay", "Dışarıdan Net Görünür"],
        ["Sürücü Kapı İç Direği", "Oldukça Kolay", "Kapı Açıldığında Çıkar"],
        ["Motor Kaputu Alt Yüzeyi", "Orta Seviye Zorluk", "Kaput Açıldığında Çıkar"],
        ["Resmi Araç Ruhsat Belgesi", "Son Derece Kolay", "Belge Üzerinde Yazılıdır"],
      ],
    },
  },
  {
    heading: "Yedek Parça Talep Formu İşleyişi",
    level: "h2",
    paragraphs: [],
    subsections: [
      {
        heading: "Bulunamayan Parçalara Özel Çözümler",
        paragraphs: [
          "Piyasada her donanımı standart listeler üzerinden anında bulmak bazen teknik olarak mümkün olmaz. Klasik araçlar veya özel üretim otomobiller için aradığınız o kritik bileşeni özel formumuzla bize hemen iletirsiniz. Uzmanlarımız küresel tedarik ağımızı harekete geçirerek nadir bulunan ürünleri sizin için özel olarak getirtir. Bu sistem sayesinde imkansız görünen parça arayışları başarıyla sonuçlanır.",
        ],
      },
      {
        heading: "Sisteme Üyelik ve Form Doldurma",
        paragraphs: [
          "Güvenli ve takip edilebilir bir hizmet sunmak adına form işlemlerini doğrudan üyelik sistemi üzerinden yürütüyoruz. Nadir ürünler için özel parça talep formumuzu kullanmak isterseniz sisteme giriş yapmanız yeterlidir. Adımları tamamlarken şase kodunuzu ve iletişim bilgilerinizi kutulara eksiksiz şekilde yazmalısınız. Açıklama kısmına aradığınız ürünün tüm teknik detaylarını açıkça belirtmelisiniz. Ekibimiz bu bilgileri işleyerek süreci başlatır.",
        ],
      },
    ],
    table: {
      columns: ["Form Veri Alanı", "Doldurma Temel Amacı", "Sürece Sağladığı Net Fayda"],
      rows: [
        ["Şase Numarası Girişi", "Doğru Araç Tespiti", "Uyumsuzluk Riskini Önler"],
        ["İletişim Numarası Alanı", "Hızlı Geri Bildirim", "Teklif Anında Haber Verir"],
        ["Özel Parça Listesi", "İhtiyacın Netleşmesi", "Doğru Malzemeyi Buldurur"],
        ["Üye Girişi Zorunluluğu", "Güvenli Veri İşleme", "Talepleri Kayıt Altında Tutar"],
      ],
    },
  },
  {
    heading: "Yüzde Yüz Uyumlu Parça Avantajları",
    level: "h2",
    paragraphs: [],
    subsections: [
      {
        heading: "Fabrikasyon Performansı Koruma Garantisi",
        paragraphs: [
          "Doğru seçilmiş bir oto yedek parça aracınızın ilk günkü performans değerlerini her koşulda korur. Fabrika standartlarına birebir uygun üretilmiş bileşenler motorun çekiş gücünü mükemmel seviyede tutar. Yüksek kaliteli malzemeler kullandığınızda aracınızın mekanik ömrünü yıllarca uzatmayı başarırsınız. Endüstriyel kalite yönergelerini incelemek adına yasal Türk Standardları Enstitüsü mevzuatlarına göz atabilirsiniz. Kalite belgeleri uzun ömürlü kullanımı destekler.",
        ],
      },
      {
        heading: "İade İşlemleriyle Uğraşmadan Alışveriş",
        paragraphs: [
          "Platformumuzdaki kusursuz eşleştirme garantisi sizi kargo şubelerinde gereksiz sıra bekleme derdinden tamamen kurtarır. Gelen ürün doğrudan aracınıza uyum sağladığı için ustalarınız montaj işlemlerini hemen tamamlar. Kusursuz işleyen bu düzen sayesinde hem paranızı hem de zamanınızı güçlü şekilde korursunuz. Stresten uzak bir onarım süreci yaşamak yollardaki güvenliğinizi pekiştirir. Sürücüler bu sayede yola odaklanır.",
        ],
      },
    ],
    table: {
      columns: ["Donanım Uyum Durumu", "Sürüş Güvenliği Etkisi", "Uzun Vadeli Bütçe Etkisi"],
      rows: [
        ["Yüzde Yüz Tam Uyumlu", "Maksimum Güvenlik Sağlar", "Ciddi Mali Tasarruf Yaratır"],
        ["Kısmi Olarak Uyumlu", "Ciddi Güvenlik Riski Taşır", "Yeni Motor Arızaları Doğurur"],
        ["Tamamen Uyumsuz Malzeme", "Sürüşü Fiziken İmkansız Kılar", "Parayı Doğrudan Çöpe Attırır"],
      ],
    },
  },
  {
    heading: "Sistem Üzerinden Araç Seçerek Sorgulama",
    level: "h2",
    paragraphs: [],
    subsections: [
      {
        heading: "Marka Model ve Üretim Yılı Kriterleri",
        paragraphs: [
          "Ruhsatınıza o an ulaşamıyorsanız aracınızın temel özelliklerini seçerek de kusursuz ürünlere hemen ulaşırsınız. Kategorize edilmiş araç seçerek parça sorgulama sayfamız kullanıcıyı adım adım yönlendiren pratik bir arayüze sahiptir. Üretim yılı, marka ve motor hacmini sırasıyla işaretlediğinizde uygun donanımlar hızla listelenir. İlgili kategoriye ait tüm ürünler teknik detaylarıyla cihaz ekranınıza yansır. Ürünleri görsel olarak incelersiniz.",
        ],
      },
      {
        heading: "Alternatif Arama Yöntemlerinin Faydaları",
        paragraphs: [
          "Farklı arama seçenekleri sunmamız her kullanıcının kişisel alışkanlığına saygı duyduğumuzun çok net bir göstergesidir. İster on yedi haneli kodu kullanın isterseniz araç menülerinde gezinin sonuç her zaman kusursuzluğa ulaşır. Üstelik bu sistemi kullanarak yakın arkadaşlarınızın araç ihtiyaçlarını da uzaktan tespit edersiniz. Teknik konularda aklınıza takılan soruları uzman ekibimize iletişim kanallarımız aracılığıyla anında sorabilirsiniz.",
        ],
      },
    ],
    table: {
      columns: ["Sistemsel Sorgulama Yöntemi", "İstenen Temel Bilgiler", "Genel Kullanım Kolaylığı"],
      rows: [
        ["Güvenli Şase İle Arama", "17 Haneli Araç Kimlik Kodu", "Saniyeler İçinde Çok Hızlı"],
        ["Sistematik Manuel Seçim", "Yıl Marka Model ve Motor", "Son Derece Pratik ve Görsel"],
        ["Genel Kategori İnceleme", "Sadece Arayış Ürün Grubu", "Genel Fiyat Taraması İçin"],
      ],
    },
  },
  {
    heading: "Uyumsuzluk Durumunda Ortaya Çıkan Zararlar",
    level: "h2",
    paragraphs: [],
    subsections: [
      {
        heading: "Beklenmeyen Ciddi Motor Arızaları",
        paragraphs: [
          "Yanlış ebatlarda alınan bir filtre motor bloğuna toz çekerek çok kısa sürede ağır hasarlar yaratır. Uyumsuz ateşleme bobinleri aracın rölanti dengesini bozarak yakıt tüketimini anormal seviyelere çıkarır. Mekanik aşınmalar zamanla diğer sağlam bileşenleri de kullanılmaz hale getirerek zincirleme arızalar doğurur. Motor revizyonu gibi devasa masraflardan kaçınmak için şase doğrulaması hayat kurtarır. Usta hataları bu kodla önlenir.",
        ],
      },
      {
        heading: "Trafikte Tehlikeli Sürüş Riskleri",
        paragraphs: [
          "Kalitesiz veya yanlış ölçülerdeki fren diskleri ani duruşlarda aracı yoldan çıkararak kazalara davetiye çıkarır. Süspansiyon sistemindeki milimetrik bir uyumsuzluk bile yüksek hızlarda direksiyon hakimiyetini tamamen kaybettirir. Yolcu güvenliğini doğrudan tehlikeye atan bu hatalar telafisi imkansız acı sonuçlar doğurur. Aracınızın yere sağlam basması için mühendislik onaylı ürünler kullanmak mutlak bir zorunluluktur. Güvenliğiniz bizim ana önceliğimizdir.",
        ],
      },
    ],
    table: {
      columns: ["Uyumsuz Ürün Senaryosu", "Olası Fiziksel Sonuç", "Gerekli Acil Müdahale"],
      rows: [
        ["Yanlış Filtre Kullanımı", "Motorda Ağır Çekiş Kaybı", "Yağ ve Filtre Değişimi"],
        ["Uyumsuz Fren Balatası", "Durma Mesafesinde Uzama", "Acil Disk ve Balata Bakımı"],
        ["Hatalı Elektronik Sensör", "Motor Arıza Işığı Yanması", "Beyin Formatı ve Yeni Ürün"],
        ["Yanlış Amortisör Seçimi", "Virajlarda Araç Savrulması", "Süspansiyon Sistem Revizyonu"],
      ],
    },
  },
  {
    heading: "Yenilikçi Çözümlerle Kesintisiz Sürüş Deneyimi",
    level: "h2",
    paragraphs: [
      "Araç onarım süreçleri sürücüler için yorucu görünse de akıllı altyapımız bu zorlukları kökünden değiştiriyor. İster evrensel kimlik kodunuzu kullanarak arama yapın isterseniz nadir donanımlar için özel form doldurun. Her iki yolda da bütçenizi yormayan ve aracınıza kusursuz uyum sağlayan en güvenli ürünlere ulaşırsınız. Uyumsuz bileşenlerin yarattığı stresi geride bırakarak yolculuklarınızı çok daha keyifli hale getirirsiniz. Sorunsuz bir deneyim ve üstün performans için dijital sorgulama araçlarımızı şimdi deneyimleyebilirsiniz.",
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const chassisFaqItems: FaqItem[] = [
  {
    question: "Şasi numarası nedir ve nerede bulunur?",
    answer:
      "Şasi numarası (VIN), aracınızın benzersiz kimlik numarasıdır. 17 karakterden oluşur ve genellikle ön cam altında, motor bölümünde veya sürücü kapısının yanında bulunur. Bu numara aracınızın tüm teknik özelliklerini içerir.",
  },
  {
    question: "Şase numarası ile parça sorgulama ne işe yarar?",
    answer:
      "Bu gelişmiş arama yöntemi aracınızın fabrikasyon donanım bilgilerine doğrudan erişerek yanlış ürün alma riskini ortadan kaldırır. Eşsiz kimlik kodunu sisteme girdiğinizde algoritmamız sadece aracınıza yüzde yüz uyumlu donanımları anında filtreler. İade endişesi taşımadan güvenle alışveriş yaparsınız. Bütçenizi koruyan çok güvenilir bir sistemdir.",
  },
  {
    question: "VIN kodu ile hangi bilgileri öğrenebilirim?",
    answer:
      "VIN kodu ile aracınızın markası, modeli, üretim yılı, motor tipi, şanzıman türü ve diğer tüm teknik özelliklerini öğrenebilirsiniz. Bu sayede aracınıza uygun yedek parçaları kolayca bulabilirsiniz.",
  },
  {
    question: "Şasi numarası ile yedek parça aramak neden avantajlı?",
    answer:
      "Şasi numarası ile arama yaparak %100 uyumlu yedek parçaları bulursunuz. Yanlış parça alma riski ortadan kalkar ve aracınıza özel üretilmiş orijinal parçalara ulaşabilirsiniz.",
  },
  {
    question: "VIN kodu güvenli mi, kimlerle paylaşabilirim?",
    answer:
      "VIN kodu genel olarak güvenlidir ve yedek parça tedarikçileri ile paylaşabilirsiniz. Ancak araç satış ilanlarında veya güvenilir olmayan kaynaklarla paylaşmaktan kaçının.",
  },
  {
    question: "Aracımın şase numarasını nereden bulabilirim?",
    answer:
      "Bu evrensel kimlik kodu genellikle aracınızın ön camının sol alt köşesinde rahatça görünecek şekilde yer alır. Sürücü kapısını açtığınızda direk üzerindeki metal bilgi etiketinde de bu numarayı kolayca okursunuz. Resmi ruhsat belgenizin üzerinde bu kod açıkça yazılıdır. Kod her zaman on yedi hanelidir.",
  },
  {
    question: "Şasi numaramı bulamıyorum, ne yapmalıyım?",
    answer:
      "Şasi numaranızı bulamıyorsanız, araç ruhsatınızdan veya trafik sigortası poliçenizden bulabilirsiniz. Ayrıca marka ve model seçerek de parça arayabilirsiniz.",
  },
];

/**
 * Live-site trust-badge stat counters, captured from the real page's
 * scroll-triggered count-up animation on the /sase-numarasi-ile-parca-sorgulama
 * page (inventory_2 / directions_car / search / verified icons).
 */
export interface StatCounter {
  icon: "inventory_2" | "directions_car" | "search" | "verified";
  value: string;
  label: string;
}

export const statCounters: StatCounter[] = [
  { icon: "inventory_2", value: "1.2M+", label: "Yedek Parça" },
  { icon: "directions_car", value: "3.5B+", label: "Araç Modeli" },
  { icon: "search", value: "100B+", label: "Başarılı Arama" },
  { icon: "verified", value: "99%", label: "Doğruluk Oranı" },
];

/**
 * Real VIN-decode result shape, mirroring sonparca.com's own
 * `GET /s-api/v1/vehicle-selector/find-vehicle-by-vin?vin=...` response.
 * Since this clone has no backend, we keep a small local lookup table of
 * VINs we've verified live against the real API instead of calling it.
 */
export interface VehicleSpec {
  parentId: number;
  name: string;
}

export interface VehicleLookupResult {
  vehicleId: string;
  brandName: string;
  modelName: string;
  listingId: string;
  specs: VehicleSpec[];
  route: string;
}

/**
 * Verified against the live sonparca.com API on 2026-09-18 using the
 * example VIN the user supplied: VXKUPHNKSP4199011 → real Opel Corsa
 * 2019-2023 1.2 Benzin Otomatik 8-Vites 110BG/82KW Hatchback (motor kodu
 * EB2ADTD=1.2 12 VALF).
 */
export const vinLookupDatabase: Record<string, VehicleLookupResult> = {
  VXKUPHNKSP4199011: {
    vehicleId: "e621c01f-02e6-4481-ad9e-fe9a2447aca7",
    brandName: "Opel",
    modelName: "CORSA",
    listingId: "dhtr2TAQLF",
    specs: [
      { parentId: 3, name: "110 BG (82 KW)" },
      { parentId: 7, name: "OTOMATIK" },
      { parentId: 9, name: "HATCHBACK" },
      { parentId: 14, name: "Benzin" },
      { parentId: 15, name: "1.2" },
      { parentId: 16, name: "2019" },
      { parentId: 8, name: "8" },
      { parentId: 16, name: "2020" },
      { parentId: 16, name: "2021" },
      { parentId: 16, name: "2022" },
      { parentId: 16, name: "2023" },
      { parentId: 13, name: "EB2ADTD=1.2 12 VALF" },
    ],
    route:
      "opel-corsa-2019-2023-1.2-benzin-otomatik-8-vites-110-bg-82-kw-hatchback",
  },
};

export const EXAMPLE_VIN = "VXKUPHNKSP4199011";
