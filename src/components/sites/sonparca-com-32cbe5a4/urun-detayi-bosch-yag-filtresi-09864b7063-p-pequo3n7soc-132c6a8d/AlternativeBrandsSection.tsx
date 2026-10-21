import { cn } from "@/lib/utils";

export interface AlternativeBrandItem {
  brand: string;
  code: string;
  inStock: boolean;
  isCurrent?: boolean;
  href?: string;
}

interface AlternativeBrandsSectionProps {
  oemCode: string;
  inStockCount: number;
  items: AlternativeBrandItem[];
}

export function AlternativeBrandsSection({
  oemCode,
  inStockCount,
  items,
}: AlternativeBrandsSectionProps) {
  return (
    <section>
      <div className="flex items-center justify-between gap-2">
        <h2 className="border-l-4 border-sp-accent pl-3 text-lg font-bold text-gray-900">
          Aynı Parça · Diğer Markalar
        </h2>
        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-sp-accent">
          {inStockCount} alternatif stokta
        </span>
      </div>
      <p className="mt-1 mb-4 text-sm text-gray-500">
        OEM <span className="font-semibold text-gray-700">{oemCode}</span>{" "}
        referansıyla uyumlu, alternatif markalar.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.brand}
            className={cn(
              "rounded-lg border bg-white p-3 transition-all",
              item.isCurrent
                ? "border-sp-accent ring-1 ring-sp-accent/30"
                : item.inStock
                  ? "border-gray-200 hover:border-sp-accent/40 hover:shadow-sm"
                  : "border-gray-200 opacity-80",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-900 uppercase">
                {item.brand}
              </span>
              <span
                className={cn(
                  "text-xs font-medium",
                  item.inStock ? "text-emerald-600" : "text-gray-400",
                )}
              >
                • {item.inStock ? "Stokta" : "Stokta yok"}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">{item.code}</p>
            <div className="mt-2">
              {item.isCurrent ? (
                <span className="text-sm text-gray-300">—</span>
              ) : item.inStock ? (
                <a
                  href={item.href ?? "#"}
                  className="text-sm font-medium text-sp-accent hover:underline"
                >
                  İncele →
                </a>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
