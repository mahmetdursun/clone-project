"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Package, Plus, Trash2 } from "lucide-react";

import { formatPrice } from "@/lib/price";
import { useCart } from "@/hooks/use-cart";
import type { CartItem } from "@/types/cart";

interface CartLineItemProps {
  item: CartItem;
  /** "compact" is used inside the header drawer, "full" on the /sepetim page itself. */
  variant?: "compact" | "full";
}

export function CartLineItem({ item, variant = "full" }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const imageSize = variant === "compact" ? 56 : 72;

  return (
    <div className="flex gap-3 py-3">
      <div
        className="flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-100 bg-gray-50"
        style={{ width: imageSize, height: imageSize }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            width={imageSize}
            height={imageSize}
            className="size-full object-contain p-1"
          />
        ) : (
          <Package className="size-5 text-gray-300" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {item.href ? (
          <Link
            href={item.href}
            className="truncate text-sm font-medium text-light-text-primary hover:text-sp-accent"
          >
            {item.title}
          </Link>
        ) : (
          <p className="truncate text-sm font-medium text-light-text-primary">{item.title}</p>
        )}
        {item.brand ? <p className="text-xs text-gray-400">{item.brand}</p> : null}

        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center overflow-hidden rounded-md border border-gray-200">
            <button
              type="button"
              aria-label="Azalt"
              disabled={item.quantity <= 1}
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="flex size-7 items-center justify-center text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
            <button
              type="button"
              aria-label="Arttır"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex size-7 items-center justify-center text-gray-600 hover:bg-gray-50"
            >
              <Plus className="size-3" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-sp-accent">
              {formatPrice(item.unitPrice * item.quantity)}
            </span>
            <button
              type="button"
              aria-label="Kaldır"
              onClick={() => removeItem(item.id)}
              className="rounded p-1 text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
