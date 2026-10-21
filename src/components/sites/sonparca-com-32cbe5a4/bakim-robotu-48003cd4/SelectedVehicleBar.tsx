import { ArrowLeftRight, Car } from "lucide-react";

import type { SelectedVehicle } from "./data";

interface SelectedVehicleBarProps {
  vehicle: SelectedVehicle;
  onChangeVehicle: () => void;
}

export function SelectedVehicleBar({
  vehicle,
  onChangeVehicle,
}: SelectedVehicleBarProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-orange-50 text-sp-accent">
          <Car className="size-5" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Seçili Araç
          </p>
          <p className="font-semibold text-light-text-primary">
            {vehicle.brand} {vehicle.model}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onChangeVehicle}
        className="flex items-center gap-1 text-sm font-medium text-sp-accent transition-colors hover:text-sp-accent-hover"
      >
        <ArrowLeftRight className="size-4" />
        Değiştir
      </button>
    </div>
  );
}
