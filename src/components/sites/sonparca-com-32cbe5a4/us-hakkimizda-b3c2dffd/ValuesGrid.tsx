import { BadgeCheck, Handshake, Truck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const VALUES: ValueItem[] = [
  {
    icon: BadgeCheck,
    title: "Kalite",
    description: "Daima en kaliteli yedek parçaları sunmak için çalışıyoruz.",
  },
  {
    icon: Handshake,
    title: "Güven",
    description:
      "Müşteri memnuniyeti ve güven bizim için en önemli değerlerdir.",
  },
  {
    icon: Truck,
    title: "Hızlı Teslimat",
    description:
      "Siparişlerinizi en kısa sürede size ulaştırmak için çalışıyoruz.",
  },
  {
    icon: Wrench,
    title: "Uzmanlık",
    description:
      "Alanında uzman ekibimizle doğru parçayı seçmenize yardımcı oluyoruz.",
  },
];

export function ValuesGrid() {
  return (
    <section className="w-full bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-2xl font-semibold text-gray-800 md:text-3xl">
          Değerlerimiz
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-md bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <div className="mb-4 flex items-center">
                <div className="mr-3 flex size-10 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {title}
                </h3>
              </div>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
