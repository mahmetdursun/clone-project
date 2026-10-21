"use client";

import { useState } from "react";
import {
  Check,
  Minus,
  MessageCircle,
  Plus,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { parsePrice } from "@/lib/price";

interface ProductBuyBoxProps {
  categoryLabel: string;
  brand: string;
  title: string;
  oemCode: string;
  productCode: string;
  sku: string;
  price: string;
  shipping: string;
  image?: string;
}

export function ProductBuyBox({
  categoryLabel,
  brand,
  title,
  oemCode,
  productCode,
  sku,
  price,
  shipping,
  image,
}: ProductBuyBoxProps) {
  const { addItem, openDrawer } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(
      {
        id: sku,
        title,
        brand,
        unitPrice: parsePrice(price),
        image,
        href: typeof window !== "undefined" ? window.location.pathname : undefined,
      },
      quantity,
    );
    setAdded(true);
    openDrawer();
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-sp-accent">
          {categoryLabel}
        </span>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
          {brand}
        </span>
        <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Stokta
        </span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
        {title}
      </h1>

      <div className="flex flex-wrap gap-2">
        <span className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-xs text-gray-600">
          OEM {oemCode}
        </span>
        <span className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-xs text-gray-600">
          Ürün Kodu {productCode}
        </span>
        <span className="rounded border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-xs text-gray-600">
          SKU {sku}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-200 p-4">
        <div>
          <p className="text-xs font-semibold tracking-wide text-gray-500">
            SATIŞ FİYATI
          </p>
          <p className="text-3xl font-bold text-sp-accent">
            {price} TL
            <span className="ml-1 text-sm font-normal text-gray-400">
              / Adet
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="flex items-center gap-1 text-sm text-gray-600">
            <Truck className="size-4" />
            Kargo:{" "}
            <span className="font-semibold text-gray-900">
              {shipping} TL
            </span>
          </p>
          <p className="flex items-center justify-end gap-1 text-sm font-medium text-emerald-600">
            <Check className="size-4" />
            Stokta
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md border border-emerald-500 px-4 py-2.5 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50"
        >
          <MessageCircle className="size-4" />
          Bilgi Alın
        </button>

        <div className="flex items-center overflow-hidden rounded-md border border-gray-200">
          <button
            type="button"
            aria-label="Azalt"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-9 items-center justify-center text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Arttır"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex size-9 items-center justify-center text-gray-600 hover:bg-gray-50"
          >
            <Plus className="size-3.5" />
          </button>
        </div>

        <button
          type="button"
          aria-label="Sepete ekle"
          onClick={handleAddToCart}
          className="flex size-10 items-center justify-center rounded-md bg-dark-bg text-white transition-colors hover:bg-sp-accent"
        >
          <ShoppingCart className="size-4" />
        </button>
        {added ? (
          <span className="text-xs font-medium text-emerald-600">
            Sepete eklendi
          </span>
        ) : null}
      </div>
    </div>
  );
}
