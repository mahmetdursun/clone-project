export const pageTitle = "KaportaBizde Kullanım Koşulları";
export const lastUpdated = "Son Güncelleme Tarihi: 26/10/2023";
export const introText =
  'https://www.sonparca.com web sitesini ("Site") ve sunduğumuz hizmetleri ("Hizmetler") kullanmadan önce lütfen bu Kullanım Koşullarını ("Koşullar") dikkatlice okuyunuz. Siteyi ve Hizmetleri kullanarak, bu Koşullara bağlı kalmayı kabul etmiş olursunuz. Bu Koşulları kabul etmiyorsanız, Siteyi ve Hizmetleri kullanamazsınız.';

export type TermsSection =
  | { number: number; title: string; kind: "list"; items: string[] }
  | { number: number; title: string; kind: "paragraph"; text: string }
  | {
      number: number;
      title: string;
      kind: "contact";
      text: string;
      contact: { email: string; phone: string; address: string };
    };

export const sections: TermsSection[] = [
  {
    number: 1,
    title: "1. Hesap Oluşturma ve Kullanım",
    kind: "list",
    items: [
      "Sitede bir hesap oluşturarak, en az 18 yaşında olduğunuzu ve yasal olarak bağlayıcı sözleşmeler yapma yetkisine sahip olduğunuzu beyan edersiniz.",
      "Hesap bilgilerinizin doğru, güncel ve eksiksiz olmasından siz sorumlusunuz.",
      "Hesap şifrenizin güvenliğinden ve gizliliğinden siz sorumlusunuz.",
      "Hesabınızın yetkisiz kullanımı veya başka herhangi bir güvenlik ihlali durumunda bizi derhal bilgilendirmeyi kabul edersiniz.",
      "Hesabınızı başkasına devredemez veya satamazsınız.",
    ],
  },
  {
    number: 2,
    title: "2. Siparişler ve Ödemeler",
    kind: "list",
    items: [
      "Site üzerinden verilen tüm siparişler, ürünün stok durumu ve bizim tarafımızdan kabul edilmesine bağlıdır.",
      "Siparişleri herhangi bir nedenle reddetme veya iptal etme hakkımız saklıdır.",
      "Ürün fiyatları ve kargo ücretleri Sitede belirtildiği gibidir ve önceden haber verilmeksizin değiştirilebilir.",
      "Ödemeler, Sitede belirtilen güvenli ödeme yöntemleri kullanılarak yapılmalıdır.",
      "Ödeme işlemi tamamlanana kadar ürünün mülkiyeti bize aittir.",
    ],
  },
  {
    number: 3,
    title: "3. Teslimat",
    kind: "list",
    items: [
      "Ürünleri, sipariş sırasında belirttiğiniz teslimat adresine teslim edeceğiz.",
      "Teslimat süreleri tahmini olup, garanti edilmez. Teslimattaki gecikmelerden sorumlu değiliz.",
      "Teslimat sırasında ürünleri incelemek ve herhangi bir hasar veya eksiklik olup olmadığını kontrol etmek sizin sorumluluğunuzdadır.",
    ],
  },
  {
    number: 4,
    title: "4. İade ve Geri Ödemeler",
    kind: "list",
    items: [
      'İade ve geri ödeme politikamız, Sitenin ilgili sayfasında ("İade Politikası") belirtilmiştir. Lütfen iade talebinde bulunmadan önce bu politikayı inceleyiniz.',
      "İade edilecek ürünlerin orijinal ambalajında, kullanılmamış ve hasarsız olması gerekmektedir.",
      "İade kargo masrafları, iade politikamızda belirtilen durumlar dışında, size aittir.",
    ],
  },
  {
    number: 5,
    title: "5. Fikri Mülkiyet",
    kind: "list",
    items: [
      "Site ve içeriği (metinler, görseller, logolar, tasarımlar vb.) bize veya lisans verenlerimize aittir ve telif hakkı, ticari marka ve diğer fikri mülkiyet yasaları ile korunmaktadır.",
      "Site içeriğini bizim önceden yazılı iznimiz olmadan kopyalayamaz, çoğaltamaz, dağıtamaz, değiştiremez veya türev çalışmalar oluşturamazsınız.",
    ],
  },
  {
    number: 6,
    title: "6. Kullanıcı İçeriği",
    kind: "list",
    items: [
      'Siteye gönderdiğiniz veya yüklediğiniz herhangi bir içerikten (yorumlar, incelemeler, vb. "Kullanıcı İçeriği") siz sorumlusunuz.',
      "Kullanıcı İçeriğinin yasalara uygun, doğru ve yanıltıcı olmamasından ve üçüncü tarafların haklarını ihlal etmemesinden siz sorumlusunuz.",
      "Bize, Kullanıcı İçeriğini kullanma, kopyalama, çoğaltma, dağıtma, değiştirme, türev çalışmalar oluşturma ve kamuya açık olarak görüntüleme konusunda münhasır olmayan, dünya çapında, telifsiz, kalıcı ve geri alınamaz bir lisans vermiş olursunuz.",
    ],
  },
  {
    number: 7,
    title: "7. Yasaklanmış Davranışlar",
    kind: "list",
    items: [
      "Siteyi yasadışı, zararlı, tehdit edici, taciz edici, iftira niteliğinde, müstehcen, nefret dolu veya başka bir şekilde sakıncalı amaçlar için kullanamazsınız.",
      "Sitenin veya Hizmetlerin işleyişine müdahale edemez veya kesintiye uğratamazsınız.",
      "Başka bir kullanıcının kimliğine bürünemez veya yanlış bilgi veremezsiniz.",
      "Siteye virüs, solucan veya diğer kötü amaçlı yazılımları bulaştıramaz veya yayamazsınız.",
    ],
  },
  {
    number: 8,
    title: "8. Sorumluluğun Sınırlandırılması",
    kind: "list",
    items: [
      'Site ve Hizmetler "olduğu gibi" ve "mevcut olduğu şekilde" sunulmaktadır. Herhangi bir açık veya zımni garanti vermemekteyiz.',
      "Siteyi veya Hizmetleri kullanımınızdan kaynaklanan herhangi bir doğrudan, dolaylı, arızi, özel veya cezai zarardan sorumlu değiliz.",
    ],
  },
  {
    number: 9,
    title: "9. Tazminat",
    kind: "paragraph",
    text:
      "Bu Koşulları ihlal etmenizden veya Siteyi veya Hizmetleri kullanımınızdan kaynaklanan herhangi bir iddia, zarar, kayıp, yükümlülük ve masraftan bizi ve iştiraklerimizi, yöneticilerimizi, çalışanlarımızı ve temsilcilerimizi tazmin etmeyi ve masun tutmayı kabul edersiniz.",
  },
  {
    number: 10,
    title: "10. Uygulanacak Hukuk ve Yargı Yetkisi",
    kind: "paragraph",
    text:
      "Bu Koşullar, Türkiye Cumhuriyeti kanunlarına göre yönetilecek ve yorumlanacaktır. Bu Koşullardan veya Siteyi veya Hizmetleri kullanımınızdan kaynaklanan herhangi bir anlaşmazlık, İstanbul (Merkez) mahkemelerinin münhasır yargı yetkisine tabi olacaktır.",
  },
  {
    number: 11,
    title: "11. Değişiklikler",
    kind: "paragraph",
    text:
      "Bu Koşulları herhangi bir zamanda değiştirme hakkımız saklıdır. Değişiklikler, güncellenmiş Koşulların Sitede yayınlanmasıyla yürürlüğe girecektir. Değişikliklerden sonra Siteyi veya Hizmetleri kullanmaya devam etmeniz, değiştirilmiş Koşulları kabul ettiğiniz anlamına gelir.",
  },
  {
    number: 12,
    title: "12. Bölünebilirlik",
    kind: "paragraph",
    text:
      "Bu Koşulların herhangi bir hükmünün geçersiz veya uygulanamaz bulunması halinde, bu hüküm Koşullardan ayrılacak ve geri kalan hükümler tam olarak yürürlükte kalacaktır.",
  },
  {
    number: 13,
    title: "13. İletişim",
    kind: "contact",
    text: "Bu Koşullar veya Site veya Hizmetler hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin:",
    contact: {
      email: "destek@sonparca.com",
      phone: "0850 302 25 08",
      address: "Avcılar Sanayi Sitesi No:10 (Oto Yılmaz Yedek Parça Yanı), 34325 Avcılar/İstanbul",
    },
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Üyelik şartları nelerdir?",
    answer:
      "18 yaşından büyük herkes üyelik oluşturabilir. Üyelik için geçerli bir e-posta adresi ve telefon numarası gerekmektedir. Üyelik ücretsizdir.",
  },
  {
    question: "Sipariş iptal koşulları nelerdir?",
    answer:
      "Siparişinizi kargoya verilmeden önce iptal edebilirsiniz. Kargoya verildikten sonra ise ürünün size ulaşmasını bekleyip 14 gün içinde iade işlemi başlatabilirsiniz.",
  },
  {
    question: "Fiyatlar KDV dahil mi?",
    answer:
      "Evet, sitemizdeki tüm fiyatlar KDV dahil fiyatlardır. Ödeme sayfasında gördüğünüz toplam tutar, kargo ücreti ve masrafların dahil nihai tutardır.",
  },
];
