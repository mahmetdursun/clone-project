export interface PolicyCard {
  title: string;
  items: string[];
}

export interface PolicyListItem {
  label?: string;
  text: string;
}

export interface ContactListItem {
  label: string;
  value: string;
  href?: string;
}

export type PolicySectionVariant = "cards" | "list" | "paragraphs" | "contact";

export interface PolicySection {
  number: number;
  title: string;
  intro?: string;
  variant: PolicySectionVariant;
  cards?: PolicyCard[];
  listItems?: PolicyListItem[];
  paragraphs?: string[];
  contactItems?: ContactListItem[];
  calloutNote?: string;
  trailingNote?: string;
  trailingNoteVariant?: "gray-600" | "gray-500";
}

export const lastUpdated = "28/05/2025";

export const heroIntro =
  'KaportaBizde ("biz", "bize", "bizim") olarak; https://www.sonparca.com ("Site") üzerinden sunduğumuz hizmetlerde kişisel verilerinizin güvenliğini ve gizliliğini önemsiyoruz. Bu politika, kişisel verilerinizi hangi amaçlarla işlediğimizi, kimlerle ve hangi şartlarda paylaştığımızı, haklarınızı ve başvuru kanallarınızı özetler.';

export const closingNote =
  "Bu politika, yürürlükteki kişisel verilerin korunması mevzuatı ve Site üzerinde yayımlanan diğer sözleşme ve aydınlatma metinleri ile birlikte değerlendirilmelidir. Mevzuat ile bu politika arasında farklılık olması hâlinde, mevzuat hükümleri önceliklidir.";

export const policySections: PolicySection[] = [
  {
    number: 1,
    title: "Topladığımız Bilgi Kategorileri",
    intro:
      "Hizmetlerimizi sunarken aşağıdaki kategorilerde kişisel verileri işleyebiliriz:",
    variant: "cards",
    cards: [
      {
        title: "Kimlik ve İletişim Bilgileri",
        items: [
          "Ad, soyad, telefon numarası, e-posta adresi",
          "Fatura ve teslimat adresi, vergi numarası (varsa)",
          "Hesap oluşturma ve giriş bilgileriniz (kullanıcı adı vb.)",
        ],
      },
      {
        title: "Araç ve Sipariş Bilgileri",
        items: [
          "Aracınızın marka, model, yıl, motor tipi ve şase bilgileri",
          "Satın aldığınız ürünler, sipariş geçmişiniz, sepet ve favori listeniz",
        ],
      },
      {
        title: "İşlem ve Ödeme Bilgileri",
        items: [
          "Ödeme yöntemi bilgileri, fatura detayları ve işlem kayıtları",
          "Kart bilgileriniz, güvenli ödeme alt yapısı sağlayıcılarımız tarafından işlenir; kart numarası gibi hassas veriler sunucularımızda saklanmaz.",
        ],
      },
      {
        title: "Kullanım ve Teknik Bilgiler",
        items: [
          "Siteyi kullanım şekliniz (ziyaret ettiğiniz sayfalar, incelediğiniz ürünler, arama sorgularınız)",
          "IP adresi, tarayıcı türü, işletim sistemi, cihaz bilgileri ve oturum log kayıtları",
          "Çerezler ve benzeri izleme teknolojileri aracılığıyla toplanan veriler",
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Kişisel Verilerin İşlenme Amaçları",
    intro:
      "Kişisel verilerinizi, ilgili mevzuata uygun olarak ve aşağıdaki amaçlarla işleyebiliriz:",
    variant: "list",
    listItems: [
      { text: "Siparişlerin alınması, işlenmesi, faturalandırılması ve ürünlerin teslim edilmesi" },
      { text: "Hesap oluşturma, giriş işlemleri ve kullanıcı profilinizin yönetilmesi" },
      { text: "Müşteri talepleri, şikâyet ve önerilerin değerlendirilmesi ve yanıtlanması" },
      { text: "Aracınıza ve kullanımınıza uygun ürünlerin önerilmesi ve satış sonrası destek sağlanması" },
      { text: "Site deneyiminin iyileştirilmesi, performansın izlenmesi ve hataların giderilmesi" },
      { text: "Dolandırıcılık faaliyetlerinin tespiti, güvenlik kontrolleri ve hukuki süreçlerin yürütülmesi" },
      { text: "İlgili mevzuattan doğan saklama, raporlama ve yükümlülüklerimizin yerine getirilmesi" },
    ],
    calloutNote:
      "Pazarlama amaçlı elektronik ileti (e-posta, SMS vb.) gönderimleri için, ayrıca açık rızanızın alınması kaydıyla ileti gönderebilir; dilediğiniz zaman bu iletilerde yer alan çıkış bağlantısını kullanarak veya bizimle iletişime geçerek tercihlerinizi güncelleyebilirsiniz.",
  },
  {
    number: 3,
    title: "Bilgilerin Paylaşımı ve Aktarımı",
    intro:
      "Kişisel verileriniz, yalnızca hizmetin sunulması, pazarlama/analiz faaliyetlerinin yürütülmesi ve yasal yükümlülüklerimizin yerine getirilmesi için gerekli olduğunda ve ölçülü şekilde üçüncü taraflarla paylaşılabilir:",
    variant: "list",
    listItems: [
      {
        label: "Hizmet Sağlayıcılar:",
        text: "Kargo/lojistik firmaları, ödeme kuruluşları, çağrı merkezi, SMS/e-posta servis sağlayıcıları, barındırma ve altyapı hizmeti sunan iş ortaklarımız ile, yalnızca ilgili hizmetin ifası için gerekli olan veriler paylaşılabilir.",
      },
      {
        label: "Analiz ve Reklam Teknolojileri Sağlayıcıları:",
        text: "Site trafiğini ve kullanımını analiz etmek, performansı ölçmek, kullanıcı deneyimini iyileştirmek ve size daha alakalı reklamlar gösterebilmek için, üçüncü taraf analiz ve reklam teknolojisi sağlayıcıları ile çalışabiliriz. Bu kapsamda; çerezler ve benzeri teknolojiler aracılığıyla toplanan kullanıcı davranışı verileri (ziyaret edilen sayfalar, tıklamalar, oturum süresi vb.), teknik veriler (IP adresi, tarayıcı ve cihaz bilgisi) ve takma ad (pseudonim) içeren tanımlayıcılar bu taraflarla paylaşılabilir.",
      },
      {
        label: "Resmi Kurumlar:",
        text: "Yasal zorunluluk veya yetkili makamların talebi halinde, hukuki yükümlülüklerimizi yerine getirmek amacıyla bilgileriniz ilgili kurumlarla paylaşılabilir.",
      },
      {
        label: "İş Devri ve Yapısal Değişiklikler:",
        text: "KaportaBizde'nin veya varlıklarının tamamının ya da bir kısmının devri, birleşmesi veya satın alınması hâlinde, kişisel verileriniz devredilen varlıklar arasında yer alabilir.",
      },
    ],
    trailingNote:
      "Kişisel verileriniz, ilgili mevzuatta öngörülen güvenlik tedbirleri sağlanmadan yurt dışına aktarılmaz. Yurt dışına aktarım gereken durumlarda, size ayrıca bilgi verilecek ve gerekli hukuki mekanizmalar işletilecektir.",
    trailingNoteVariant: "gray-600",
  },
  {
    number: 4,
    title: "Kullanıcı Haklarınız",
    intro:
      "Kişisel verilerinizle ilgili mevzuat kapsamında aşağıdaki haklara sahipsiniz:",
    variant: "list",
    listItems: [
      { text: "Hakkınızda işlenen kişisel verilerin varlığı hakkında bilgi talep etme" },
      { text: "İşlenen verilere erişme ve bunların bir örneğini talep etme" },
      { text: "Eksik veya yanlış işlenen verilerinizin düzeltilmesini isteme" },
      {
        text: "İşleme amacının ortadan kalkması veya hukuka aykırı işlenmesi hâlinde verilerinizin silinmesini veya anonimleştirilmesini talep etme",
      },
      { text: "Verilerinizin işlenmesine, özel durumunuza ilişkin gerekçelerle itiraz etme" },
      {
        text: "Otomatik sistemler aracılığıyla yapılan analizler sonucunda aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
      },
      { text: "Pazarlama iletişimlerini dilediğiniz zaman durdurma / reddetme" },
    ],
    trailingNote:
      'Bu haklarınızı kullanmak için aşağıdaki "İletişim" bölümünde yer alan kanallar üzerinden bizimle irtibata geçebilirsiniz. Talebiniz, ilgili mevzuatın öngördüğü süreler içerisinde ve mümkün olduğunca kısa sürede sonuçlandırılacaktır.',
  },
  {
    number: 5,
    title: "Çerezler ve Benzeri Teknolojiler",
    intro:
      "Site deneyiminizi iyileştirmek, tercihlerinizi hatırlamak, istatistiksel analiz yapmak ve size daha uygun içerik/reklam gösterebilmek için çerezler ve benzeri teknolojiler kullanabiliriz. Bu kapsamda, üçüncü taraf analiz ve reklam teknolojisi sağlayıcıları tarafından yerleştirilen çerezler de kullanılabilir.",
    variant: "list",
    listItems: [
      {
        text: "Tarayıcınızın ayarlarından çerez kullanımına ilişkin tercihlerinizi yönetebilir, çerezleri reddedebilir veya silebilirsiniz.",
      },
      {
        text: "Zorunlu çerezler, sitenin temel işlevlerinin çalışması için gereklidir ve devre dışı bırakılması durumunda bazı hizmetler düzgün sunulamayabilir.",
      },
      {
        text: "Reklam ve pazarlama odaklı çerezler için ise, tercihleriniz doğrultusunda açık rızanız alınarak işlem yapılır.",
      },
    ],
  },
  {
    number: 6,
    title: "Veri Güvenliği ve Saklama Süreleri",
    intro:
      "Kişisel verilerinizin güvenliğini sağlamak için, güncel teknik imkânlar ve maliyet unsurları da dikkate alınarak makul düzeyde idari ve teknik tedbirler almaktayız. Ancak, internet üzerinden yapılan hiçbir iletimin veya elektronik depolama yönteminin yüzde yüz güvenli olmadığını hatırlatmak isteriz.",
    variant: "list",
    listItems: [
      {
        text: "Veriler, işleme amaçlarının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen asgari/maksimum süreler dikkate alınarak saklanır.",
      },
      {
        text: "Saklama süresinin sona ermesi veya işleme sebebinin ortadan kalkması hâlinde, veriler mevzuata uygun şekilde silinir, anonimleştirilir veya yok edilir.",
      },
      {
        text: "Verilerinize sadece yetkili personel ve hizmet sağlayıcılar, görevleriyle sınırlı ve gizlilik yükümlülüğü altında erişebilir.",
      },
    ],
  },
  {
    number: 7,
    title: "Çocukların Gizliliği",
    variant: "paragraphs",
    paragraphs: [
      "Sitemiz ve sunduğumuz hizmetler, 18 yaşın altındaki kişilere yönelik değildir. 18 yaşın altındaki kişilerden bilerek kişisel veri toplamıyor, bu kişilere ticari iletişim göndermiyoruz.",
      "18 yaşından küçük bir kişinin bize yanlışlıkla kişisel veri sağlamış olduğunu fark ederseniz, lütfen aşağıdaki iletişim kanallarından bize ulaşın. Bu durumda ilgili veriler, mevzuata uygun şekilde silinecek veya anonimleştirilecektir.",
    ],
  },
  {
    number: 8,
    title: "Politikada Yapılabilecek Değişiklikler",
    variant: "paragraphs",
    paragraphs: [
      'Bu Gizlilik ve Kişisel Verilerin Korunması Politikasını; yasal düzenlemeler, uygulamalar veya hizmetlerimizdeki değişiklikler nedeniyle zaman zaman güncelleyebiliriz. Güncel metin her zaman Site üzerinde yayımlanır ve "Son Güncelleme Tarihi" buna göre revize edilir.',
      "Önemli değişiklikler yapılması hâlinde, Site üzerinden dikkat çekici bir bildirimle veya gerekli durumlarda e-posta yoluyla sizi bilgilendirebiliriz.",
    ],
  },
  {
    number: 9,
    title: "İletişim ve Başvuru Kanalları",
    intro:
      "Bu politika veya kişisel verilerinizle ilgili sorularınız, talepleriniz veya şikâyetleriniz için aşağıdaki iletişim kanallarını kullanabilirsiniz:",
    variant: "contact",
    contactItems: [
      { label: "E-posta:", value: "destek@sonparca.com", href: "mailto:destek@sonparca.com" },
      { label: "Telefon:", value: "0850 302 25 08", href: "tel:0850 302 25 08" },
      {
        label: "Adres:",
        value: "Avcılar Sanayi Sitesi No:10 (Oto Yılmaz Yedek Parça Yanı), 34325 Avcılar/İstanbul",
      },
    ],
    trailingNote:
      "Başvurularınız, geçerli mevzuat çerçevesinde en kısa sürede ve en geç yasal süreler içinde sonuçlandırılacak olup; gerektiğinde sizden kimliğinizi teyit etmeye yönelik ek bilgiler talep edilebilir.",
  },
];

export interface PolicyFaqItem {
  question: string;
  answer: string;
}

export const policyFaqItems: PolicyFaqItem[] = [
  {
    question: "Kişisel verilerim nasıl korunuyor?",
    answer:
      "KaportaBizde, 6698 sayılı KVKK kapsamında kişisel verilerinizi koruma altına almaktadır. SSL şifreleme teknolojisi ile tüm verileriniz güvenli şekilde saklanır ve üçüncü taraflarla paylaşılmaz.",
  },
  {
    question: "Çerez (cookie) politikanız nedir?",
    answer:
      "Sitemizde kullanıcı deneyimini iyileştirmek ve site performansını analiz etmek için çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan çerez tercihlerinizi yönetebilirsiniz.",
  },
  {
    question: "Verilerimin silinmesini isteyebilir miyim?",
    answer:
      "Evet, KVKK kapsamında kişisel verilerinizin silinmesini talep edebilirsiniz. Bu talebinizi destek@sonparca.com adresine iletmeniz yeterlidir.",
  },
];
