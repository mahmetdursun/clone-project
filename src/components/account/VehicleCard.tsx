import Link from "next/link";
import { Car, Star, MoreVertical, Gauge } from "lucide-react";

import type { GarageVehicle } from "@/types/account";

export function VehicleCard({ vehicle }: { vehicle: GarageVehicle }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-sp-accent/40">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-orange-50 text-sp-accent">
            <Car className="size-5" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-light-text-primary">
                {vehicle.nickname || "Aracım"}
              </p>
              {vehicle.isDefault ? (
                <span className="flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-sp-accent">
                  <Star className="size-3 fill-sp-accent" />
                  Varsayılan
                </span>
              ) : null}
            </div>
            <p className="text-sm text-gray-500">
              {vehicle.brand} {vehicle.model}
            </p>
            <p className="text-xs text-gray-400">
              {vehicle.engine} · {vehicle.fuel}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Daha fazla"
          className="rounded p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        >
          <MoreVertical className="size-4" />
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {vehicle.plate ? (
          <span className="rounded bg-dark-bg px-2 py-1 text-xs font-medium text-white">
            {vehicle.plate}
          </span>
        ) : null}
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
          {vehicle.year}
        </span>
        {vehicle.color ? (
          <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
            {vehicle.color}
          </span>
        ) : null}
      </div>

      {typeof vehicle.mileageKm === "number" ? (
        <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
          <Gauge className="size-3.5" />
          {vehicle.mileageKm.toLocaleString("tr-TR")} km
        </p>
      ) : null}

      <div className="mt-3 flex gap-2">
        <Link
          href="/on-tampon"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-sp-accent px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
        >
          Uyumlu Parçalar
        </Link>
        <Link
          href={`/hesabim/garajim/${vehicle.id}`}
          className="flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
        >
          Detay
        </Link>
      </div>
    </div>
  );
}
