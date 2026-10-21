export type BadgeColor = "red" | "gray" | "blue" | "orange";

export interface PolicySection {
  number: number;
  title: string;
  badgeColor: BadgeColor;
  /** Rendered as ordered blocks: paragraphs, callout boxes, lists, grids, etc. */
  intro?: string;
  content: SectionBlock[];
}

export type SectionBlock =
  | { type: "callout"; tone: "red" | "blue" | "orange" | "gray"; lead?: string; body?: string; items?: string[] }
  | { type: "list"; items: string[] }
  | { type: "twoColumnCards"; columns: { title: string; items: string[] }[] }
  | { type: "categoryGrid"; cards: { title: string; description: string }[] }
  | { type: "orderedProcess"; items: (string | { lead: string; subItems: { lead: string; text: string }[] })[] }
  | { type: "twoColumnDivided"; columns: { title: string; items: string[] }[] }
  | { type: "paragraph"; text: string }
  | { type: "contactBox"; lead: string; phone: string; email: string; footnote: string };

export const pageTitle = "KaportaBizde İade ve Değişim Politikası";
export const lastUpdated = "Son Güncelleme Tarihi: 28/05/2025";
export const introText =
  "KaportaBizde olarak, otomotiv yedek parça sektörünün teknik hassasiyetini dikkate alarak; hem sizi hem de satıcı haklarını koruyan bir iade politikası uyguluyoruz. Aşağıdaki maddeler, sipariş, teslimat ve olası iade süreçlerinde geçerli olacak temel kuralları açıklar.";

export const closingParagraph =
  "Bu iade politikası yürürlükteki tüketici mevzuatı, Mesafeli Satış Sözleşmesi ve Ön Bilgilendirme Formu ile birlikte değerlendirilmelidir. İlgili mevzuat ile bu politika arasında farklılık olması hâlinde, mevzuat hükümleri önceliklidir; diğer hükümler geçerliliğini korur.";

export const sections: PolicySection[] = [
  {
    number: 1,
    title: "Kargo Teslimatında Kontrol ve Hasar Tespiti",
    badgeColor: "red",
    content: [
      {
        type: "callout",
        tone: "red",
        lead: "Teslim almadan önce mutlaka kontrol ediniz.",
        items: [
          'Kutu üzerinde ezilme, yırtılma, ıslanma veya açılma belirtisi varsa, ürünü teslim almayın veya kargo görevlisi yanındayken kutuyu açarak **"Hasar Tespit Tutanağı"** düzenlettirin.',
          "Tutanak tutulmadan teslim alınan hasarlı ürünlerde, kargo sigortası devre dışı kalacağından, iade veya değişim imkânı büyük ölçüde ortadan kalkabilir.",
          "Teslim fişinin imzalanması, ürünün dışarıdan bakıldığında sağlam teslim alındığı anlamına gelir, bu aşamadan sonra oluşan hasarlardan KaportaBizde sorumlu tutulamaz.",
        ],
      },
    ],
  },
  {
    number: 2,
    title: 'Genel İade Koşulları ve "Yeniden Satılabilirlik"',
    badgeColor: "gray",
    intro:
      "Mesafeli satış mevzuatı kapsamında, ayıplı olmayan ürünler için cayma hakkı süresi, ürünün tesliminden itibaren **14 gündür**. Bu süre içinde yapılacak iadelerde ürünün **yeniden satılabilir** durumda olması zorunludur.",
    content: [
      {
        type: "twoColumnCards",
        columns: [
          {
            title: "İade İçin Gerekli Genel Şartlar",
            items: [
              "Ürün orijinal kutusu ve ambalajı ile birlikte, eksiksiz ve hasarsız olmalıdır.",
              "Fatura veya satış belgesi, ürünle birlikte gönderilmelidir.",
              "Ürün üzerinde montaj, kullanım, darbe, çizik veya yağ lekesi bulunmamalıdır.",
              "Kutu üzerine kargo etiketi, bant veya yazı yazılmamalı, kutu ikinci bir koruyucu ambalaja konularak gönderilmelidir.",
            ],
          },
          {
            title: "İade Kabul Edilmeyecek Durum Örnekleri",
            items: [
              "Orijinal kutunun yırtılması, ezilmesi, yağlanması veya üzerine kargo etiketi yapıştırılması.",
              "Vida sıkma izi, montaj çizikleri, gres/yağ lekesi, darbe veya kırık izleri olması.",
              "Eksik aksesuar, eksik parça, eksik doküman veya koparılmış etiket/barkod bulunması.",
              "Ürünün yeniden satılamayacak düzeyde kozmetik veya fonksiyonel hasar görmesi.",
            ],
          },
        ],
      },
    ],
  },
  {
    number: 3,
    title: "Parça Uyumluluğu ve Şase Teyidi",
    badgeColor: "blue",
    intro:
      "Aynı model araçlarda dahi, üretim yılı, motor tipi, donanım ve şase numarasına göre farklı parçalar kullanılabilmektedir. Bu nedenle uyumluluk, çoğu zaman sadece parça fotoğrafı veya açıklamasına bakarak netleştirilemez.",
    content: [
      {
        type: "callout",
        tone: "blue",
        body:
          "**Önemli:** Sipariş öncesinde, aracınıza tam uyumlu parça tespiti için **şase (şasi) numarası** ile tarafımızdan teyit alınması önerilir.",
      },
      {
        type: "list",
        items: [
          "Şase numarası paylaşılmadan, müşteri tarafından doğrudan seçilerek verilen siparişlerde, parçanın araca uymama riski müşteriye aittir. Bu durumda gidiş–dönüş kargo giderleri müşteriye aittir.",
          'Şase teyidi alınmadan verilen ve "Aracıma uymadı" gerekçesiyle iade edilmek istenen, montajı yapılmamış ve yeniden satılabilir durumdaki ürünler, yalnızca kargo bedelleri müşteriye ait olacak şekilde iade alınabilir.',
          'KaportaBizde tarafından şase numarasına göre "uyumlu" bilgisi verilmiş parçalarda; parça uymadığı takdirde ürün bedeli ve kargo giderleri firma tarafından karşılanır. Ancak işçilik, çekici, zaman kaybı vb. dolaylı zararlar karşılanmaz.',
        ],
      },
    ],
  },
  {
    number: 4,
    title: "Elektrik ve Elektronik Parçalar",
    badgeColor: "orange",
    content: [
      {
        type: "callout",
        tone: "orange",
        lead: "Elektrikli parçalar deneme amaçlı alınamaz.",
        body:
          "Bobin, beyin (ECU), sensör, valf, beyin modülleri, alternatör, marş motoru vb. elektrik/elektronik parçalar, araçtaki olası elektriksel arızalardan saniyeler içinde etkilenebilen hassas ürünlerdir.",
        items: [
          "Ambalajı açılmış, güvenlik bandı veya mühürü sökülmüş elektrikli parçaların iadesi **kural olarak kabul edilmez**.",
          "Soketlerinde takma/çıkarma izi, üzerinde yanık, is, çizik, kaynak/lehime müdahale görülen ürünler iade kapsamı dışındadır.",
          '"Arızanın bu parçadan olup olmadığını denemek için aldım" benzeri gerekçelerle iade talebi oluşturulamaz.',
        ],
      },
      {
        type: "paragraph",
        text:
          "Araçta kısa devre, yanlış kutup bağlantısı, voltaj dalgalanması, arızalı alternatör/akü, kötü topraklama, LPG/ek ekipman montajı gibi dış etkenlerden kaynaklanan hasarlardan KaportaBizde ve üretici firma sorumlu tutulamaz.",
      },
    ],
  },
  {
    number: 5,
    title: "Mekanik Parçalar, Debriyaj, Turbo ve İnceleme Süreci",
    badgeColor: "gray",
    intro:
      'Montajı yapılmış mekanik parçalarda (debriyaj setleri, turbo, amortisör, rot–rotil, baskı balata vb.) "ürün arızalı" iddiası ile iade talebi gelmesi halinde, ürün doğrudan iade alınmaz; öncelikle üretici/ithalatçı teknik servisi tarafından incelenir.',
    content: [
      {
        type: "orderedProcess",
        items: [
          "Ürün, arızanın tespit edildiği şekilde sökülür ve montajın yapıldığı servisin raporu, **araç ruhsat fotokopisi** ve ilgili fatura ile birlikte KaportaBizde adresine gönderilir.",
          "Ürün üretici/ithalatçı firmanın laboratuvarına veya yetkili teknik servise test için gönderilir. İnceleme süresi genellikle **15–30 iş günü** arasında değişebilir.",
          "Teknik inceleme sonucunda bir rapor düzenlenir ve nihai karar bu rapora göre verilir.",
          {
            lead: "Rapor Sonucu:",
            subItems: [
              {
                lead: "Üretim Hatası Tespiti:",
                text: "Ürün bedeli iade edilir veya stok durumuna göre değişim yapılır, kargo giderleri firmamıza aittir.",
              },
              {
                lead: "Montaj/Kullanım Hatası Tespiti:",
                text:
                  "İade talebi reddedilir. Ürün, teknik raporla birlikte müşteriye geri gönderilir. Gidiş–dönüş kargo giderleri ve varsa üretici/servis test bedeli müşteriye aittir.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    number: 6,
    title: "İade Kapsamı Dışındaki Ürünler",
    badgeColor: "gray",
    intro: "Aşağıda sayılan ürün ve durumlar genel olarak iade kapsamı dışındadır:",
    content: [
      {
        type: "categoryGrid",
        cards: [
          {
            title: "Sıvı ve Kimyasal Ürünler",
            description:
              "Emniyet bandı açılmış veya kısmen kullanılmış motor yağı, antifriz, fren hidroliği, katkı ve temizlik kimyasalları.",
          },
          {
            title: "Elektrik/Elektronik Parçalar",
            description:
              "Ambalajı açılmış, montajı yapılmış veya üzerinde müdahale/yanık izi görülen elektrikli ve elektronik parçalar.",
          },
          {
            title: "Kaporta ve Aydınlatma",
            description: "Boyanmış kaporta parçaları, montaj ayağı kırılmış far/stop ve sinyal lambaları.",
          },
          {
            title: "Sarf Malzemeleri",
            description: "Paketi açılmış silecekler, ampul setleri, filtreler ve tek kullanımlık sarf malzemeleri.",
          },
          {
            title: "Özel Sipariş Ürünler",
            description:
              "Şase numarasına özel, yurt dışından veya fabrikadan özellikle getirtildiği belirtilen ve sipariş sonrası üretime/tedariğe alınan ürünler (ayıplı çıkmadıkça iade edilemez).",
          },
        ],
      },
    ],
  },
  {
    number: 7,
    title: "İade Kargo Ücretleri ve Sorumluluk Sınırı",
    badgeColor: "gray",
    content: [
      {
        type: "twoColumnDivided",
        columns: [
          {
            title: "Kargo Ücreti Sorumluluğu",
            items: [
              "**Ürün Arızalı / Yanlış Ürün Gönderimi:** İnceleme sonucu üretim hatası veya yanlış ürün tespit edilirse, gidiş–dönüş kargo ücretleri KaportaBizde tarafından karşılanır.",
              "**Cayma Hakkı / Keyfi İade:** Ürün ayıplı olmamasına rağmen vazgeçilmesi durumunda, gidiş–dönüş kargo ücretleri müşteriye aittir.",
              "**Şase Teyidi Almadan Verilen Siparişler:** Uyumsuzluk halinde ürün iade alınsa dahi kargo bedelleri müşteriye aittir.",
            ],
          },
          {
            title: "Sorumluluk Sınırı",
            items: [
              "KaportaBizde'nin sorumluluğu, her hâlükârda ilgili ürünün fatura bedeli ile sınırlıdır.",
              "Montaj, söküm, işçilik, çekici, araç kiralama, iş gücü kaybı, ticari itibar kaybı vb. dolaylı zararlardan KaportaBizde sorumlu tutulamaz.",
              "Ürün inceleme süreçlerinde üretici/servis tarafından talep edilen test bedelleri, arıza tespitinin kullanım/montaj hatası olarak sonuçlanması hâlinde müşteriye aittir.",
            ],
          },
        ],
      },
    ],
  },
  {
    number: 8,
    title: "İade Talebi Oluşturma ve İletişim",
    badgeColor: "gray",
    intro:
      "İade talebinizi, ürün teslim tarihinden itibaren 14 gün içinde, sipariş numaranızı belirterek iletebilirsiniz. Talebiniz kayda alındıktan sonra size süreç hakkında bilgilendirme yapılacaktır.",
    content: [
      {
        type: "contactBox",
        lead: "İade talebi ve destek için:",
        phone: "0850 302 25 08",
        email: "destek@sonparca.com",
        footnote:
          "* Anlaşmalı kargo hesaplarımız dışında, karşı ödemeli gönderilen kargolar önceden onay alınmadığı sürece kabul edilmeyebilir.",
      },
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "İade süresi ne kadar?",
    answer:
      "Ürünü teslim aldığınız tarihten itibaren 14 gün içinde iade işlemi başlatabilirsiniz. Süre, kargonun size teslim edildiği tarihten itibaren başlar.",
  },
  {
    question: "Hangi ürünler iade edilemez?",
    answer:
      "Kullanılmış, hasarlı veya orijinal ambalajı açılmış ürünler iade edilemez. Araç üzerine monte edilmiş parçalar da iade kapsamı dışındadır.",
  },
  {
    question: "İade kargo ücreti kim tarafından karşılanır?",
    answer:
      "İade kargo ücreti KaportaBizde tarafından karşılanır. Size gönderilen ücretsiz kargo etiketini kullanarak kolayca iade gönderimi yapabilirsiniz.",
  },
  {
    question: "İade tutarı ne zaman hesabıma yansır?",
    answer:
      "İade edilen ürün depomuzda kontrol edildikten sonra 3-5 iş günü içinde ödemeniz iade edilir. Kredi kartı ile yapılan ödemelerde banka sürecine bağlı olarak 1-2 ekstre dönemi sürebilir.",
  },
];
