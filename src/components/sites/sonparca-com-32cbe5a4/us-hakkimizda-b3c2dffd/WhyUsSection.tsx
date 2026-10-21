import { Clock, Headphones, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface WhyUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const REASONS: WhyUsItem[] = [
  {
    icon: Star,
    title: "Kaliteli Ürünler",
    description:
      "Sadece güvenilir üreticilerden tedarik ettiğimiz orijinal ve muadil ürünlerle hizmet veriyoruz.",
  },
  {
    icon: Clock,
    title: "Hızlı Teslimat",
    description:
      "Siparişlerinizi hızlı bir şekilde hazırlayıp, güvenilir kargo firmalarımızla adresinize ulaştırıyoruz.",
  },
  {
    icon: Headphones,
    title: "Teknik Destek",
    description:
      "Uzman ekibimiz, parça seçimi ve teknik konularda her türlü desteği size sunmaktadır.",
  },
];

export function WhyUsSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800 md:text-3xl">
          Neden Biz?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-md bg-blue-50">
                <Icon className="size-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {title}
              </h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
