import Link from "next/link";
import { Car } from "lucide-react";

export function AlternateSearchCta() {
  return (
    <section className="bg-dark-bg py-10 sm:py-12">
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-dark-text-primary sm:text-xl">
          Şasi Numaranız mı Yok?
        </h2>
        <p className="mt-1 text-sm text-dark-text-muted">
          Endişelenmeyin, marka ve model seçerek de parça arayabilirsiniz
        </p>
        <Link
          href="/bakim-robotu"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-sp-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
        >
          <Car className="size-4" />
          Araç Seçerek Ara
        </Link>
      </div>
    </section>
  );
}
