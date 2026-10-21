"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  LockKeyholeOpen,
  Receipt,
  ShoppingCart,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SelectedVehicleBar } from "./SelectedVehicleBar";
import { PartProductCard } from "./PartProductCard";
import type {
  CartSelection,
  MaintenancePackage,
  PackageSelections,
  SelectedVehicle,
} from "./data";

interface PartSelectionStepProps {
  vehicle: SelectedVehicle;
  onChangeVehicle: () => void;
  pkg: MaintenancePackage;
  selections: PackageSelections;
  onToggleProduct: (productId: string) => void;
  onQtyChange: (productId: string, qty: number) => void;
  onBackToPackages: () => void;
  onGoToSummary: () => void;
}

export function PartSelectionStep({
  vehicle,
  onChangeVehicle,
  pkg,
  selections,
  onToggleProduct,
  onQtyChange,
  onBackToPackages,
  onGoToSummary,
}: PartSelectionStepProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const category = pkg.categories[activeIndex];
  const isLast = activeIndex === pkg.categories.length - 1;
  const totalSelected = Object.keys(selections).length;

  function goNext() {
    if (isLast) {
      onGoToSummary();
    } else {
      setActiveIndex((i) => i + 1);
    }
  }

  return (
    <div>
      <SelectedVehicleBar vehicle={vehicle} onChangeVehicle={onChangeVehicle} />

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            aria-label="Paket seçimine dön"
            onClick={onBackToPackages}
            className="flex size-8 shrink-0 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft className="size-4" />
          </button>
          <h2 className="truncate text-lg font-semibold text-light-text-primary">
            {pkg.title}
          </h2>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-2 rounded-md bg-orange-50 px-4 py-2 text-sm font-semibold text-sp-accent"
        >
          <ShoppingCart className="size-4" />
          Seçilenler ({totalSelected})
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {pkg.categories.map((cat, i) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              i === activeIndex
                ? "bg-sp-accent text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200",
            )}
          >
            <span
              className={cn(
                "flex size-4 items-center justify-center rounded-full text-[10px]",
                i === activeIndex ? "bg-white/25" : "bg-white text-gray-500",
              )}
            >
              {i + 1}
            </span>
            {cat.name}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-light-text-primary">
              {category.name}
            </h3>
            {category.optional ? (
              <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500 uppercase">
                Opsiyonel
              </span>
            ) : null}
          </div>
          <span className="text-sm text-gray-400">
            {activeIndex + 1} / {pkg.categories.length}
          </span>
        </div>

        {category.products.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center text-gray-400">
            <LockKeyholeOpen className="size-8" />
            <p className="text-sm">
              Bu adım için aracınıza uygun ürün bulunamadı.
            </p>
            <p className="text-sm">
              Bu adım opsiyonel; &quot;Atla&quot; diyerek devam edebilirsiniz.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {category.products.map((product) => {
              const sel: CartSelection | undefined = selections[product.id];
              return (
                <PartProductCard
                  key={product.id}
                  product={product}
                  qty={sel?.qty ?? 1}
                  selected={Boolean(sel)}
                  onToggle={() => onToggleProduct(product.id)}
                  onQtyChange={(qty) => onQtyChange(product.id, qty)}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg border border-gray-200 p-4">
        <button
          type="button"
          disabled={activeIndex === 0}
          onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
          className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-light-text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="size-4" />
          Geri
        </button>
        <button
          type="button"
          onClick={goNext}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Atla
        </button>
        <button
          type="button"
          onClick={goNext}
          className="flex items-center gap-2 rounded-md bg-sp-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-accent-hover"
        >
          {isLast ? (
            <>
              Özete Git
              <Receipt className="size-4" />
            </>
          ) : (
            <>
              İleri
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
