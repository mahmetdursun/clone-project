"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Car, Fuel, Gauge, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SelectedVehicle } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/data";

interface VehicleResultsHeaderProps {
  vehicle: SelectedVehicle;
  /** Every year this model is offered for, so the header's year chips are real data (bkz. VEHICLE_SPECS), not invented. */
  availableYears: number[];
}

export function VehicleResultsHeader({ vehicle, availableYears }: VehicleResultsHeaderProps) {
  const router = useRouter();

  function hrefForYear(year: number) {
    const params = new URLSearchParams({
      brand: vehicle.brand,
      model: vehicle.model,
      year: String(year),
      fuel: vehicle.fuel,
      engine: vehicle.engine,
    });
    return `/yedek-parca?${params.toString()}`;
  }

  function scrollToProducts() {
    document.getElementById("urunler")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-orange-50 text-sp-accent">
            <Car className="size-7" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-light-text-primary">
              {vehicle.brand} {vehicle.model}
            </h1>
            {availableYears.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {availableYears.map((year) => (
                  <Link
                    key={year}
                    href={hrefForYear(year)}
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                      year === vehicle.year
                        ? "border-sp-accent bg-sp-accent text-white"
                        : "border-gray-200 text-gray-500 hover:border-sp-accent/40 hover:text-sp-accent",
                    )}
                  >
                    {year}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={scrollToProducts}
            className="flex items-center gap-1.5 rounded-md border border-sp-accent px-3 py-2 text-sm font-medium text-sp-accent transition-colors hover:bg-orange-50"
          >
            <Search className="size-4" />
            Ürünlere Göz Atmaya Devam Et
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
          >
            <X className="size-4" />
            Aracı Kaldır
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
          <p className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <Fuel className="size-3.5" />
            Yakıt
          </p>
          <p className="text-sm font-semibold text-light-text-primary">{vehicle.fuel}</p>
        </div>
        <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
          <p className="flex items-center gap-1 text-xs font-medium text-gray-500">
            <Gauge className="size-3.5" />
            Motor Hacmi
          </p>
          <p className="text-sm font-semibold text-light-text-primary">{vehicle.engine}</p>
        </div>
      </div>
    </div>
  );
}
