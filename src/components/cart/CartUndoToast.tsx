"use client";

import { X } from "lucide-react";

import { useCart } from "@/hooks/use-cart";

export function CartUndoToast() {
  const { lastRemoved, undoRemove, dismissUndo } = useCart();

  if (!lastRemoved) return null;

  return (
    <div
      key={lastRemoved.token}
      role="status"
      className="fixed bottom-4 left-1/2 z-[120] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-between gap-3 rounded-md bg-dark-bg px-4 py-3 text-sm text-white shadow-lg sm:left-auto sm:right-4 sm:translate-x-0"
    >
      <span className="min-w-0 truncate">
        <span className="font-medium">{lastRemoved.item.title}</span> kaldırıldı
      </span>
      <span className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={undoRemove}
          className="font-semibold text-sp-accent-light hover:text-sp-accent"
        >
          Geri Al
        </button>
        <button
          type="button"
          onClick={dismissUndo}
          aria-label="Kapat"
          className="text-dark-text-muted hover:text-white"
        >
          <X className="size-3.5" />
        </button>
      </span>
    </div>
  );
}
