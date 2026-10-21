"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2, PackageSearch, RotateCcw, Wrench } from "lucide-react";

import type { SelectedVehicle } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/data";

interface SelectedVehicleSummaryProps {
  vehicle: SelectedVehicle;
  onChange: () => void;
}

/**
 * Shown once the home page's own Marka → Model → Yıl → Yakıt → Motor
 * cascade (VehicleCascadeTab, reused from Bakım Robotu — see VehicleFinder.tsx)
 * completes. The vehicle finder itself stays on the home page — it does NOT
 * redirect away. From here the user picks between two separate, explicit
 * next steps: "Ürünleri Görüntüle" (araca özel ürün listesi — /yedek-parca)
 * or "Bakım Robotu ile Devam Et" (bakım paketi sihirbazı) — neither is the
 * automatic destination of selecting a brand.
 */
export function SelectedVehicleSummary({ vehicle, onChange }: SelectedVehicleSummaryProps) {
  const router = useRouter();

  function vehicleParams() {
    return new URLSearchParams({
      brand: vehicle.brand,
      model: vehicle.model,
      year: String(vehicle.year),
      fuel: vehicle.fuel,
      engine: vehicle.engine,
    });
  }

  function goToYedekParca() {
    router.push(`/yedek-parca?${vehicleParams().toString()}`);
  }

  function goToBakimRobotu() {
    router.push(`/bakim-robotu?${vehicleParams().toString()}`);
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 className="size-6" />
      </span>
      <div>
        <p className="text-sm font-medium text-light-text-muted">Seçilen Aracınız</p>
        <p className="mt-1 text-lg font-bold text-light-text-primary">
          {vehicle.brand} {vehicle.model} ({vehicle.year})
        </p>
        <p className="text-sm text-gray-500">
          {vehicle.fuel} · {vehicle.engine}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onChange}
          className="flex items-center gap-1.5 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
        >
          <RotateCcw className="size-4" />
          Değiştir
        </button>
        <button
          type="button"
          onClick={goToYedekParca}
          className="flex items-center gap-1.5 rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
        >
          <PackageSearch className="size-4" />
          Ürünleri Görüntüle
        </button>
        <button
          type="button"
          onClick={goToBakimRobotu}
          className="flex items-center gap-1.5 rounded-md border border-sp-accent px-4 py-2 text-sm font-medium text-sp-accent transition-colors hover:bg-orange-50"
        >
          <Wrench className="size-4" />
          Bakım Robotu ile Devam Et
        </button>
      </div>
    </div>
  );
}
