import { Check, Minus, Package, Plus } from "lucide-react";

import type { PartProduct } from "./data";

interface PartProductCardProps {
  product: PartProduct;
  qty: number;
  selected: boolean;
  onToggle: () => void;
  onQtyChange: (qty: number) => void;
}

export function PartProductCard({
  product,
  qty,
  selected,
  onToggle,
  onQtyChange,
}: PartProductCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div
        className={`h-1 w-full ${product.inStock ? "bg-green-500" : "bg-gray-300"}`}
      />
      <div className="flex aspect-square items-center justify-center bg-gray-50">
        <Package className="size-10 text-gray-300" />
      </div>
      <div className="space-y-1 p-3">
        <div className="flex items-center justify-between gap-1">
          <span className="truncate rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-500 uppercase">
            {product.brand}
          </span>
          {product.inStock ? (
            <span className="flex shrink-0 items-center gap-0.5 text-xs font-medium text-green-600">
              <Check className="size-3" />
              Stokta
            </span>
          ) : null}
        </div>
        <p className="text-base font-bold text-sp-accent">{product.price} TL</p>
        <p className="line-clamp-2 text-sm font-medium text-light-text-primary">
          {product.name}
        </p>
        <p className="truncate text-[10px] text-gray-400">{product.sku}</p>

        {!selected ? (
          <button
            type="button"
            onClick={onToggle}
            className="mt-2 flex w-full items-center justify-center gap-1 rounded-md border border-sp-accent py-2 text-sm font-medium text-sp-accent transition-colors hover:bg-orange-50"
          >
            <Plus className="size-4" />
            Seç
          </button>
        ) : (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center rounded-md border border-gray-200">
              <button
                type="button"
                aria-label="Azalt"
                onClick={() => onQtyChange(Math.max(1, qty - 1))}
                className="flex size-8 items-center justify-center text-gray-400 transition-colors hover:text-gray-600"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-medium text-gray-700">
                {qty}
              </span>
              <button
                type="button"
                aria-label="Artır"
                onClick={() => onQtyChange(qty + 1)}
                className="flex size-8 items-center justify-center text-gray-400 transition-colors hover:text-gray-600"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={onToggle}
              className="flex flex-1 items-center justify-center gap-1 rounded-md bg-sp-accent py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
            >
              <Check className="size-4" />
              Seçildi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
