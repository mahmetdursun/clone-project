"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { parsePrice } from "@/lib/price";
import type { OnTamponProduct } from "@/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/data";

interface VehicleProductCardProps {
  product: OnTamponProduct;
}

export function VehicleProductCard({ product }: VehicleProductCardProps) {
  const { badge, name, sku, price, image, shipEstimate } = product;
  const { addItem, openDrawer } = useCart();
  const [qty, setQty] = useState(1);

  function handleAddToCart() {
    addItem({ id: sku, title: name, unitPrice: parsePrice(price), image }, qty);
    openDrawer();
  }

  return (
    <article className="overflow-hidden rounded border border-gray-200 border-t-4 border-t-green-500 bg-white">
      <div className="p-2.5 lg:p-3">
        <div className="relative mb-2 aspect-square overflow-hidden rounded bg-white">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 22vw, 45vw"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="truncate rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-light-text-muted">
              {badge}
            </span>
            <span className="flex items-center gap-0.5 text-xs font-medium text-blue-500">
              <Check className="size-3" />
              {shipEstimate}
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-sp-accent lg:text-lg">{price} TL</span>
          </div>
          <h3 className="line-clamp-2 whitespace-break-spaces text-xs font-medium leading-snug text-light-text-primary lg:text-sm">
            {name}
          </h3>
          <div className="truncate text-[9px] text-light-text-muted/60 lg:text-[10px]">{sku}</div>
          <div className="mt-1 w-full">
            <div className="flex items-center justify-end rounded-md bg-white">
              <div className="flex items-center rounded-l-md border-b border-l border-t border-gray-200 bg-white">
                <button
                  type="button"
                  aria-label="Azalt"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex size-8 items-center justify-center text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-medium text-gray-700">{qty}</span>
                <button
                  type="button"
                  aria-label="Artır"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex size-8 items-center justify-center text-gray-400 transition-colors hover:text-gray-600 disabled:opacity-50"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <button
                type="button"
                aria-label={`${name} - sepete ekle`}
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-r-md bg-gray-800 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-gray-700"
              >
                <ShoppingCart className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
