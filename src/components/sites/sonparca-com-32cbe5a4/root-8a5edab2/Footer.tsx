import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

const corporateLinks = [
  { label: "Hakkımızda", href: "/us/hakkimizda" },
  { label: "İletişim", href: "/us/iletisim" },
  { label: "Yedek Parça Talep Formu", href: "/parca-talep-formu" },
  {
    label: "Şasi Numarası ile Parça Sorgulama",
    href: "/sase-numarasi-ile-parca-sorgulama",
  },
  { label: "Araç Seçerek ile Parça Sorgulama", href: "/bakim-robotu" },
  { label: "Bakım Robotu", href: "/bakim-robotu" },
];

const secureShoppingItems = [
  { icon: ShieldCheck, label: "Tüm işlemleriniz güvenli bağlantı ile korunur" },
  { icon: CreditCard, label: "Kart bilgileriniz hiçbir zaman saklanmaz" },
  { icon: Lock, label: "Şifreniz ve ödeme bilgileriniz şifrelenerek korunur" },
];

const customerServiceLinks = [
  { label: "İade ve Değişim", href: "/us/iade-politikasi" },
  { label: "Yardım Merkezi", href: "/us/iletisim" },
];

const contactRows = [
  { icon: Phone, label: "Telefon", value: "0850 302 25 08" },
  { icon: MessageCircle, label: "WhatsApp", value: "0850 302 25 08" },
  { icon: Mail, label: "E-posta", value: "destek@sonparca.com" },
  {
    icon: MapPin,
    label: "Adres",
    value:
      "Avcılar Sanayi Sitesi No:10 (Oto Yılmaz Yedek Parça Yanı), 34325 Avcılar/İstanbul",
  },
];

const workingHours = [
  { label: "Pazartesi - Cuma", value: "09:00-18:00" },
  { label: "Cumartesi", value: "09:00-17:00" },
  { label: "Pazar", value: "Kapalı" },
];

const socialLinks = [
  { name: "Instagram", src: "/sites/sonparca-com-32cbe5a4/shared/sm-instagram.webp" },
  { name: "Facebook", src: "/sites/sonparca-com-32cbe5a4/shared/sm-facebook.webp" },
  { name: "X", src: "/sites/sonparca-com-32cbe5a4/shared/sm-x.webp" },
];

const marketplaceBadges = [
  { name: "Trendyol", src: "/sites/sonparca-com-32cbe5a4/shared/mp-trendyol.webp" },
  { name: "Hepsiburada", src: "/sites/sonparca-com-32cbe5a4/shared/mp-hepsiburada.webp" },
  { name: "N11", src: "/sites/sonparca-com-32cbe5a4/shared/mp-n11.webp" },
  { name: "PtAVM", src: "/sites/sonparca-com-32cbe5a4/shared/mp-ptavm.webp" },
  { name: "Pazarama", src: "/sites/sonparca-com-32cbe5a4/shared/mp-pazarama.webp" },
];

const legalLinks = [
  { label: "Gizlilik Politikası", href: "/us/gizlilik-politikasi" },
  { label: "Kullanım Şartları", href: "/us/kullanim-sartlari" },
  { label: "İade Politikası", href: "/us/iade-politikasi" },
];

export function Footer() {
  return (
    <footer className="bg-dark-bg text-dark-text-muted">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
        {/* Column 1: Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/sites/sonparca-com-32cbe5a4/shared/logo-small.png"
              alt="KaportaBizde"
              width={28}
              height={28}
            />
            <span className="text-dark-text-primary font-semibold">
              KaportaBizde
            </span>
          </div>
          <p className="text-sm mb-6">
            Türkiye&apos;nin en güvenilir otomotiv yedek parça platformu. 1.2
            milyondan fazla ürün seçeneği ile araç bakım ve onarım
            ihtiyaçlarınızı karşılıyoruz.
          </p>

          <h4 className="text-dark-text-primary font-semibold text-sm mb-3">
            Kurumsal
          </h4>
          <ul className="space-y-2 mb-6">
            {corporateLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-dark-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="text-dark-text-primary font-semibold text-sm mb-3">
            Güvenli Alışveriş
          </h4>
          <ul className="space-y-2">
            {secureShoppingItems.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2 text-sm">
                <Icon className="text-emerald-400 shrink-0 mt-0.5" size={14} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Account */}
        <div>
          <h4 className="text-dark-text-primary font-semibold text-sm mb-3">
            Hesap İşlemleri
          </h4>
          <p className="text-sm mb-3">
            Hesap özelliklerinden faydalanmak için giriş yapın.
          </p>
          <Link
            href="/auth/giris"
            className="block text-center bg-white text-dark-bg rounded px-4 py-2 font-medium w-full hover:bg-gray-100 transition-colors mb-6"
          >
            Giriş Yap
          </Link>

          <h4 className="text-dark-text-primary font-semibold text-sm mb-3">
            Müşteri Hizmetleri
          </h4>
          <ul className="space-y-2">
            {customerServiceLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-dark-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="text-dark-text-primary font-semibold text-sm mb-3">
            İletişim
          </h4>
          <ul className="space-y-3 mb-6">
            {contactRows.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-2 text-sm">
                <Icon className="shrink-0 mt-0.5" size={14} />
                <span>
                  <span className="block text-xs text-dark-text-muted">
                    {label}
                  </span>
                  <span className="text-dark-text-primary">{value}</span>
                </span>
              </li>
            ))}
          </ul>

          <h4 className="text-dark-text-primary font-semibold text-sm mb-3">
            Çalışma Saatleri
          </h4>
          <ul className="space-y-2">
            {workingHours.map(({ label, value }) => (
              <li key={label} className="flex items-start gap-2 text-sm">
                <Clock className="shrink-0 mt-0.5" size={14} />
                <span>
                  <span className="block text-xs text-dark-text-muted">
                    {label}
                  </span>
                  <span className="text-dark-text-primary">{value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Social & Marketplaces */}
        <div>
          <h4 className="text-dark-text-primary font-semibold text-sm mb-3">
            Sosyal Medya
          </h4>
          <div className="flex items-center gap-2 mb-6">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href="#"
                aria-label={social.name}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-dark-bg-light hover:bg-sp-accent transition-colors"
              >
                <Image
                  src={social.src}
                  alt={social.name}
                  width={16}
                  height={16}
                />
              </Link>
            ))}
          </div>

          <h4 className="text-dark-text-primary font-semibold text-sm mb-3">
            Mağazalarımız
          </h4>
          <div className="flex flex-wrap gap-2">
            {marketplaceBadges.map((badge) => (
              <div
                key={badge.name}
                className="flex items-center gap-2 bg-dark-bg-light rounded px-3 py-2 text-xs"
              >
                <Image
                  src={badge.src}
                  alt={badge.name}
                  width={16}
                  height={16}
                />
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-dark-bg-light py-4">
        <div className="container mx-auto px-4 flex justify-between text-xs">
          <span>Güvenlik:</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="text-emerald-400" size={14} />
              256-bit SSL
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="text-emerald-400" size={14} />
              3D Secure
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-bg-light py-4">
        <div className="container mx-auto px-4 flex justify-between text-xs">
          <span>© 2026 KaportaBizde. Tüm hakları saklıdır.</span>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-dark-text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
