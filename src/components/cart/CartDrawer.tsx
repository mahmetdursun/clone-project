"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";

import { formatPrice } from "@/lib/price";
import { useCart } from "@/hooks/use-cart";
import { CartLineItem } from "./CartLineItem";
import { FreeShippingProgress } from "./FreeShippingProgress";

export function CartDrawer() {
  const { items, hydrated, subtotal, isDrawerOpen, closeDrawer } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeDrawer();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  const isEmpty = hydrated && items.length === 0;

  return (
    <div className="fixed inset-0 z-[105] flex justify-end bg-black/40" onClick={closeDrawer}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="flex h-full w-full max-w-sm flex-col bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 bg-dark-bg px-4 py-3 text-white">
          <div id="cart-drawer-title" className="flex items-center gap-2 text-sm font-semibold">
            <ShoppingCart className="size-4" />
            Sepetim{items.length > 0 ? ` (${items.length})` : ""}
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Kapat"
            className="text-dark-text-muted transition-colors hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-orange-50 text-sp-accent">
              <ShoppingCart className="size-7" />
            </span>
            <p className="text-sm font-medium text-light-text-primary">Sepetiniz boş</p>
            <p className="text-sm text-light-text-muted">
              Beğendiğiniz ürünleri sepetinize ekleyerek alışverişe başlayın.
            </p>
            <button
              type="button"
              onClick={closeDrawer}
              className="mt-2 rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
            >
              Alışverişe Başla
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <CartLineItem key={item.id} item={item} variant="compact" />
                ))}
              </div>
            </div>

            <div className="shrink-0 space-y-3 border-t border-gray-100 p-4">
              <FreeShippingProgress subtotal={subtotal} />

              <div className="flex items-center justify-between text-sm">
                <span className="text-light-text-muted">Ara Toplam</span>
                <span className="text-base font-semibold text-light-text-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <Link
                href="/sepetim"
                onClick={closeDrawer}
                className="flex h-10 w-full items-center justify-center rounded-md bg-sp-accent text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
              >
                Sepete Git
              </Link>
              <button
                type="button"
                onClick={closeDrawer}
                className="flex h-10 w-full items-center justify-center rounded-md border border-gray-200 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
              >
                Alışverişe Devam Et
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
