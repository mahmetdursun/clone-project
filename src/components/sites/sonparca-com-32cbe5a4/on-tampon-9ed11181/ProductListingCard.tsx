"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";

import type { OnTamponProduct } from "./data";

interface ProductListingCardProps {
  product: OnTamponProduct;
}

export function ProductListingCard({ product }: ProductListingCardProps) {
  const { badge, name, sku, price, image, shipEstimate } = product;
  const [qty, setQty] = useState(1);

  return (
    <article className="overflow-hidden rounded border border-gray-200 border-l-4 border-l-green-500 bg-white sm:border-l-0 sm:border-t-4 sm:border-t-green-500">
      {/* Mobile row layout (< sm) */}
      <div className="flex gap-2.5 p-2.5 sm:hidden">
        <a href="#" className="relative block shrink-0">
          <div className="size-24 overflow-hidden rounded bg-gray-50">
            <Image
              src={image}
              alt={name}
              width={96}
              height={96}
              className="size-full object-contain"
            />
          </div>
        </a>
        <div className="flex min-w-0 flex-1 flex-col">
          <a href="#" className="mb-1.5 block">
            <h3 className="line-clamp-2 whitespace-break-spaces text-sm font-medium leading-tight text-light-text-primary transition-colors hover:text-sp-accent">
              {name}
            </h3>
          </a>
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-sp-accent">{price} TL</span>
            <button
              type="button"
              aria-label={`${name} - sepete ekle`}
              className="flex size-8 items-center justify-center rounded-md bg-gray-800 text-white shadow-sm transition-all duration-200 hover:bg-gray-700 active:bg-gray-900"
            >
              <ShoppingCart className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop card layout (>= sm) */}
      <div className="hidden p-2.5 sm:block lg:p-3">
        <div className="relative mb-2 aspect-square overflow-hidden rounded bg-white">
          <a href="#" className="block h-full">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-contain"
            />
          </a>
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
            <span className="text-base font-bold text-sp-accent lg:text-lg">
              {price} TL
            </span>
          </div>
          <a href="#" className="block">
            <h3 className="line-clamp-2 whitespace-break-spaces text-xs font-medium leading-snug text-light-text-primary transition-colors hover:text-sp-accent lg:text-sm">
              {name}
            </h3>
          </a>
          <div className="truncate text-[9px] text-light-text-muted/60 lg:text-[10px]">
            {sku}
          </div>
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
                <span className="w-8 text-center text-sm font-medium text-gray-700">
                  {qty}
                </span>
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
                className="flex items-center justify-center gap-2 rounded-r-md bg-gray-800 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
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
