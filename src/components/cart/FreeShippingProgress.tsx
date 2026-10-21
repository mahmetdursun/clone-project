import { Truck } from "lucide-react";

import { FREE_SHIPPING_THRESHOLD } from "@/lib/cart-config";
import { formatPrice } from "@/lib/price";

export function FreeShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
  const percent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const qualifies = remaining <= 0;

  return (
    <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
      <p className="flex items-center gap-1.5 text-xs font-medium text-light-text-primary">
        <Truck className="size-3.5 text-sp-accent" />
        {qualifies ? (
          <span className="text-emerald-600">Ücretsiz kargo kazandınız!</span>
        ) : (
          <span>
            <span className="font-semibold text-sp-accent">{formatPrice(remaining)}</span>{" "}
            daha ekleyin, kargo ücretsiz olsun
          </span>
        )}
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-sp-accent transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
