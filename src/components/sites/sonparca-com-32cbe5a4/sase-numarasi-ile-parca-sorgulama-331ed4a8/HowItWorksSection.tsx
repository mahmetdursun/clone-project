import Link from "next/link";
import { Car, Hash, Search, SearchCheck } from "lucide-react";

const STEPS = [
  {
    number: 1,
    title: "VIN Kodunu Girin",
    description: "17 haneli şasi numaranızı yazın",
    icon: Hash,
  },
  {
    number: 2,
    title: "Aracınız Tanınır",
    description: "Sistem aracınızı otomatik bulur",
    icon: Car,
  },
  {
    number: 3,
    title: "Parçaları Görün",
    description: "Uyumlu tüm parçalar listelenir",
    icon: SearchCheck,
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-light-bg py-10 sm:py-12">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-light-text-primary sm:text-2xl">
            Şasi Numarası (VIN) Nedir?
          </h2>
          <p className="mt-1 text-sm text-light-text-muted sm:text-base">
            17 karakterden oluşan benzersiz araç kimlik numaranızı çözümleyin
          </p>
        </div>

        <div className="mb-2 text-center">
          <h3 className="text-lg font-semibold text-light-text-primary">
            Nasıl Çalışır?
          </h3>
          <p className="mt-1 text-sm text-light-text-muted">
            3 basit adımda doğru parçayı bulun
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="rounded-md border border-gray-100 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow"
              >
                <span className="mx-auto mb-2 flex size-9 items-center justify-center rounded-full bg-sp-accent text-base font-bold text-white">
                  {step.number}
                </span>
                <Icon className="mx-auto mb-1 size-5 text-sp-accent" />
                <p className="font-semibold text-light-text-primary">
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-light-text-muted">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="#vin-arama"
            className="inline-flex items-center gap-2 rounded-md bg-sp-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
          >
            <Search className="size-4" />
            Hemen Ara
          </Link>
        </div>
      </div>
    </section>
  );
}
