"use client";

import { ShoppingCart } from "lucide-react";

import { useCart } from "@/hooks/use-cart";

export function CartNavButton() {
  const { itemCount, hydrated, openDrawer } = useCart();
  const count = hydrated ? itemCount : 0;

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="flex flex-col items-center gap-0.5 text-dark-text-muted transition-colors hover:text-dark-text-primary"
    >
      <span className="relative">
        <ShoppingCart className="size-5" />
        {count > 0 ? (
          <span className="absolute -top-2 -right-2 flex size-4 items-center justify-center rounded-full bg-sp-accent text-[10px] font-semibold text-white">
            {count > 9 ? "9+" : count}
          </span>
        ) : null}
      </span>
      <span className="text-xs">{count > 0 ? `${count} Ürün` : "Boş"}</span>
    </button>
  );
}
