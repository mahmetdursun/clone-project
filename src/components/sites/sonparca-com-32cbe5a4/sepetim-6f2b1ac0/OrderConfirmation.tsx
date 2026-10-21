import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function OrderConfirmation({ cartNumber }: { cartNumber: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white px-6 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 className="size-8" />
      </span>
      <h2 className="text-xl font-semibold text-light-text-primary">Siparişiniz Alındı</h2>
      {cartNumber ? (
        <p className="text-sm text-light-text-muted">
          Sipariş numaranız: <span className="font-semibold text-light-text-primary">{cartNumber}</span>
        </p>
      ) : null}
      <p className="max-w-sm text-sm text-light-text-muted">
        Siparişiniz alındı, ekibimiz en kısa sürede hazırlayıp kargoya verecektir. Sipariş
        durumunuzu Hesabım &gt; Siparişlerim sayfasından takip edebilirsiniz.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-sp-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
        >
          Alışverişe Devam Et
        </Link>
        <Link
          href="/hesabim/siparislerim"
          className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
        >
          Siparişlerim
        </Link>
      </div>
    </div>
  );
}
