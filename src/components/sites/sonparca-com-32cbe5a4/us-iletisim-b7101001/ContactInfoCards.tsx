import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/sonparca34/",
    src: "/sites/sonparca-com-32cbe5a4/shared/sm-instagram.webp",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sonparca34",
    src: "/sites/sonparca-com-32cbe5a4/shared/sm-facebook.webp",
  },
  {
    name: "X",
    href: "https://www.x.com/sonparca34",
    src: "/sites/sonparca-com-32cbe5a4/shared/sm-x.webp",
  },
];

export function ContactInfoCards() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Telefon */}
        <div className="rounded-md border border-gray-100 bg-white p-6 shadow-sm lg:col-span-6">
          <div className="flex items-start">
            <div className="rounded-md bg-blue-50 p-3">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-800">Telefon</h3>
              <p className="mt-1 text-gray-600">Bize hemen ulaşmak için:</p>
              <a
                href="tel:0850 302 25 08"
                className="mt-1 block font-medium text-blue-600 hover:underline"
              >
                0850 302 25 08
              </a>
              <p className="mt-1 text-sm text-gray-500">
                Hafta içi: 09:00 - 18:00
              </p>
            </div>
          </div>
        </div>

        {/* E-posta */}
        <div className="rounded-md border border-gray-100 bg-white p-6 shadow-sm lg:col-span-6">
          <div className="flex items-start">
            <div className="rounded-md bg-blue-50 p-3">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-800">E-posta</h3>
              <p className="mt-1 text-gray-600">
                Sorularınız ve önerileriniz için:
              </p>
              <a
                href="mailto:destek@sonparca.com"
                className="mt-1 block font-medium text-blue-600 hover:underline"
              >
                destek@sonparca.com
              </a>
            </div>
          </div>
        </div>

        {/* Adres */}
        <div className="rounded-md border border-gray-100 bg-white p-6 shadow-sm lg:col-span-6">
          <div className="flex items-start">
            <div className="rounded-md bg-blue-50 p-3">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-800">Adres</h3>
              <p className="mt-1 text-gray-600">Merkez Ofisimiz:</p>
              <p className="mt-1 font-medium text-gray-800">
                Avcılar Sanayi Sitesi No:10 (Oto Yılmaz Yedek Parça Yanı),
                34325 Avcılar/İstanbul
              </p>
            </div>
          </div>
        </div>

        {/* Sosyal Medya */}
        <div className="rounded-md border border-gray-100 bg-white p-6 shadow-sm lg:col-span-6">
          <div className="flex items-start">
            <div className="rounded-md bg-blue-50 p-3">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-800">
                Sosyal Medya
              </h3>
              <p className="mt-1 text-gray-600">Bizi takip edin:</p>
              <div className="mt-3 flex items-center space-x-4">
                {socialLinks.map(({ name, href, src }) => (
                  <Link
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="opacity-90 transition-opacity hover:opacity-100"
                  >
                    <Image src={src} alt={name} width={22} height={22} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
