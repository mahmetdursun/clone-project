interface TechSpecRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface PriceDeliveryRow {
  label: string;
  value: string;
}

interface AlternateCode {
  brand: string;
  code: string;
}

interface ProductDescriptionProps {
  description: string;
  techSpecs: TechSpecRow[];
  priceDelivery: PriceDeliveryRow[];
  alternateCodes: AlternateCode[];
}

export function ProductDescription({
  description,
  techSpecs,
  priceDelivery,
  alternateCodes,
}: ProductDescriptionProps) {
  return (
    <section className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
      <div>
        <h2 className="border-l-4 border-sp-accent pl-3 text-lg font-bold text-gray-900">
          Ürün Açıklaması
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          {description}
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-base font-semibold text-gray-900">
          Teknik Özellikler
        </h3>
        <div className="overflow-hidden rounded-md border border-gray-200 text-sm">
          {techSpecs.map((row, idx) => (
            <div
              key={row.label}
              className={
                idx !== techSpecs.length - 1
                  ? "flex border-b border-gray-200"
                  : "flex"
              }
            >
              <div className="w-1/3 bg-gray-50 px-4 py-2.5 font-medium text-gray-500">
                {row.label}
              </div>
              <div
                className={
                  row.highlight
                    ? "px-4 py-2.5 font-semibold text-emerald-600"
                    : "px-4 py-2.5 font-medium text-gray-900"
                }
              >
                {row.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm">
        {priceDelivery.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-1"
          >
            <span className="text-gray-500">{row.label}</span>
            <span className="font-semibold text-gray-900">{row.value}</span>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-2 text-base font-semibold text-gray-900">
          Muadil ve Alternatif Parça Kodları
        </h3>
        <p className="mb-2 text-sm text-gray-600">
          Bu ürünün farklı markalardan muadil alternatifleri mevcuttur:
        </p>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
          {alternateCodes.map((item) => (
            <li key={item.brand}>
              <strong>{item.brand}</strong> — {item.code}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
