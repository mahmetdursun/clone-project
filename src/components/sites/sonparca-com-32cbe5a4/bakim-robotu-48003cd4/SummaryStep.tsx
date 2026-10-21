"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Package,
  Plus,
  Receipt,
  ShoppingCart,
  Sparkles,
  Trash2,
} from "lucide-react";

import { SelectedVehicleBar } from "./SelectedVehicleBar";
import {
  MAINTENANCE_PACKAGES,
  type MaintenancePackage,
  type PackageSelections,
  type SelectedVehicle,
} from "./data";

interface LineItem {
  productId: string;
  categoryName: string;
  name: string;
  brand: string;
  price: string;
  qty: number;
}

interface SummaryStepProps {
  vehicle: SelectedVehicle;
  onChangeVehicle: () => void;
  pkg: MaintenancePackage;
  selections: PackageSelections;
  onQtyChange: (productId: string, qty: number) => void;
  onRemove: (productId: string) => void;
  onBackToParts: () => void;
  onContinueWithPackage: (pkg: MaintenancePackage) => void;
}

export function SummaryStep({
  vehicle,
  onChangeVehicle,
  pkg,
  selections,
  onQtyChange,
  onRemove,
  onBackToParts,
  onContinueWithPackage,
}: SummaryStepProps) {
  const [added, setAdded] = useState(false);

  const lineItems: LineItem[] = [];
  for (const category of pkg.categories) {
    for (const product of category.products) {
      const sel = selections[product.id];
      if (sel) {
        lineItems.push({
          productId: product.id,
          categoryName: category.name,
          name: product.name,
          brand: product.brand,
          price: product.price,
          qty: sel.qty,
        });
      }
    }
  }

  const totalQty = lineItems.reduce((sum, item) => sum + item.qty, 0);
  const remainingPackages = MAINTENANCE_PACKAGES.filter((p) => p.id !== pkg.id);

  return (
    <div>
      <SelectedVehicleBar vehicle={vehicle} onChangeVehicle={onChangeVehicle} />

      <button
        type="button"
        onClick={onBackToParts}
        className="mt-4 flex items-center gap-1 text-sm font-medium text-sp-accent"
      >
        <ArrowLeft className="size-4" />
        Adımlara dön
      </button>

      <div className="mt-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 border-b border-gray-100 p-5">
          <Receipt className="size-5 text-sp-accent" />
          <div>
            <h2 className="font-bold text-light-text-primary">Seçim Özeti</h2>
            <p className="text-sm text-light-text-muted">
              {pkg.title} · {vehicle.brand} {vehicle.model}
            </p>
          </div>
        </div>

        {lineItems.length === 0 ? (
          <p className="p-5 text-sm text-gray-400">
            Henüz bir parça seçmediniz.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {lineItems.map((item) => (
              <div
                key={item.productId}
                className="flex flex-wrap items-center gap-3 p-5 sm:flex-nowrap sm:gap-4"
              >
                <span className="shrink-0 text-xs font-semibold text-sp-accent uppercase">
                  {item.categoryName}
                </span>
                <div className="flex size-12 shrink-0 items-center justify-center rounded bg-gray-50 sm:size-14">
                  <Package className="size-6 text-gray-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-light-text-primary">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">{item.brand}</p>
                </div>
                <div className="flex items-center rounded-md border border-gray-200">
                  <button
                    type="button"
                    aria-label="Azalt"
                    onClick={() =>
                      onQtyChange(item.productId, Math.max(1, item.qty - 1))
                    }
                    className="flex size-8 items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm">{item.qty}</span>
                  <button
                    type="button"
                    aria-label="Artır"
                    onClick={() => onQtyChange(item.productId, item.qty + 1)}
                    className="flex size-8 items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  aria-label="Kaldır"
                  onClick={() => onRemove(item.productId)}
                  className="text-gray-300 hover:text-red-500"
                >
                  <Trash2 className="size-4" />
                </button>
                <span className="w-24 shrink-0 text-right font-bold text-sp-accent">
                  {item.price} TL
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            {lineItems.length} ürün · {totalQty} adet
          </p>
          <button
            type="button"
            disabled={lineItems.length === 0}
            onClick={() => setAdded(true)}
            className="flex items-center gap-2 rounded-md bg-sp-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {added ? (
              <>
                <Check className="size-4" />
                Sepete Eklendi
              </>
            ) : (
              <>
                <ShoppingCart className="size-4" />
                Tümünü Sepete Ekle
              </>
            )}
          </button>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="flex items-center gap-2 font-bold text-light-text-primary">
          <Sparkles className="size-5 text-sp-accent" />
          Bakımınız Bitmedi mi?
        </h2>
        <p className="mt-1 text-sm text-light-text-muted">
          Aracınız için başka bir bakım paketiyle devam edin. Seçtiğiniz
          parçalar otomatik olarak sepetinize eklenir.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {remainingPackages.map((p) => {
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onContinueWithPackage(p)}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-sp-accent"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded bg-gray-50">
                  <Icon className="size-5 text-gray-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-light-text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-xs text-light-text-muted">
                    {p.description}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 text-xs">
                    <span className="text-gray-400">{p.groupCount} adım</span>
                    <span className="flex items-center gap-1 font-medium text-sp-accent">
                      Devam et
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
