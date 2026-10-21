"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Tag } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { FreeShippingProgress } from "@/components/cart/FreeShippingProgress";

export function CartStep({ onContinue }: { onContinue: () => void }) {
  const { items, hydrated, subtotal } = useCart();
  const [coupon, setCoupon] = useState("");

  if (hydrated && items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-white px-6 py-16 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-orange-50 text-sp-accent">
          <ShoppingCart className="size-8" />
        </span>
        <h2 className="text-lg font-semibold text-light-text-primary">Sepetiniz boş</h2>
        <p className="max-w-sm text-sm text-light-text-muted">
          Sepetinizde henüz ürün yok. Aracınıza uygun yedek parçaları inceleyerek alışverişe
          başlayabilirsiniz.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-md bg-sp-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-light-text-primary">
          Sepetim ({items.length} Ürün)
        </h2>
        <div className="mt-2 divide-y divide-gray-100">
          {items.map((item) => (
            <CartLineItem key={item.id} item={item} variant="full" />
          ))}
        </div>
      </div>

      <FreeShippingProgress subtotal={subtotal} />

      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-light-text-primary">
          <Tag className="size-4 text-sp-accent" />
          Kupon Kodu
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={coupon}
            onChange={(event) => setCoupon(event.target.value.toUpperCase())}
            placeholder="Kupon kodunuzu girin"
            className="h-10 w-full rounded-md border border-gray-200 px-3 text-sm uppercase outline-none placeholder:text-gray-400 placeholder:normal-case focus-visible:ring-2 focus-visible:ring-sp-accent"
          />
          <button
            type="button"
            disabled={!coupon.trim()}
            className="shrink-0 rounded-md border border-gray-300 px-4 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Uygula
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="flex h-11 w-full items-center justify-center rounded-md bg-sp-accent text-sm font-semibold text-white transition-colors hover:bg-sp-accent-hover"
      >
        Adrese Geç
      </button>
    </div>
  );
}
