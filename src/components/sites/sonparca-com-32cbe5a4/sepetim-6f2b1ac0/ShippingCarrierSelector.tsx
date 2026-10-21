"use client";

import { Truck } from "lucide-react";

import { FREE_SHIPPING_THRESHOLD, SHIPPING_CARRIERS } from "@/lib/cart-config";
import { formatPrice } from "@/lib/price";
import { cn } from "@/lib/utils";
import type { ShippingCarrierId } from "@/types/cart";

interface ShippingCarrierSelectorProps {
  subtotal: number;
  selectedId: ShippingCarrierId | null;
  onSelect: (id: ShippingCarrierId) => void;
}

export function ShippingCarrierSelector({
  subtotal,
  selectedId,
  onSelect,
}: ShippingCarrierSelectorProps) {
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const cheapestId = SHIPPING_CARRIERS.reduce((cheapest, carrier) =>
    carrier.price < cheapest.price ? carrier : cheapest,
  ).id;

  return (
    <div className="space-y-2">
      {freeShipping ? (
        <p className="mb-1 flex items-center gap-1.5 text-sm font-medium text-emerald-600">
          <Truck className="size-4" />
          {formatPrice(FREE_SHIPPING_THRESHOLD)} üzeri alışverişinizde kargo ücretsiz!
        </p>
      ) : null}

      {SHIPPING_CARRIERS.map((carrier) => (
        <label
          key={carrier.id}
          className={cn(
            "flex cursor-pointer items-center justify-between gap-3 rounded-md border p-3 transition-colors",
            selectedId === carrier.id
              ? "border-sp-accent bg-orange-50/50"
              : "border-gray-200 hover:bg-gray-50",
          )}
        >
          <span className="flex items-center gap-3">
            <input
              type="radio"
              checked={selectedId === carrier.id}
              onChange={() => onSelect(carrier.id)}
              className="accent-sp-accent"
            />
            <span>
              <span className="flex items-center gap-2">
                <span className="font-medium text-light-text-primary">{carrier.name}</span>
                {carrier.id === cheapestId ? (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                    En Uygun
                  </span>
                ) : null}
              </span>
              <span className="block text-xs text-gray-500">{carrier.etaLabel}</span>
            </span>
          </span>
          <span
            className={cn(
              "text-sm font-semibold",
              freeShipping ? "text-emerald-600" : "text-light-text-primary",
            )}
          >
            {freeShipping ? "Ücretsiz" : formatPrice(carrier.price)}
          </span>
        </label>
      ))}
    </div>
  );
}
