import { ArrowRight, Wrench } from "lucide-react";

import { SelectedVehicleBar } from "./SelectedVehicleBar";
import { MAINTENANCE_PACKAGES, type MaintenancePackage, type SelectedVehicle } from "./data";

interface PackageSelectionStepProps {
  vehicle: SelectedVehicle;
  onChangeVehicle: () => void;
  onSelectPackage: (pkg: MaintenancePackage) => void;
}

export function PackageSelectionStep({
  vehicle,
  onChangeVehicle,
  onSelectPackage,
}: PackageSelectionStepProps) {
  return (
    <div>
      <SelectedVehicleBar vehicle={vehicle} onChangeVehicle={onChangeVehicle} />

      <div className="mt-6 mb-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-light-text-primary">
          <Wrench className="size-5 text-sp-accent" />
          Bir Bakım Paketi Seçin
        </h2>
        <p className="mt-1 text-sm text-light-text-muted">
          Aracınıza uygun parçaları adım adım listelemek için bir bakım
          paketi seçin.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MAINTENANCE_PACKAGES.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <button
              key={pkg.id}
              type="button"
              onClick={() => onSelectPackage(pkg)}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white text-left transition-colors hover:border-sp-accent"
            >
              <div className="flex aspect-video items-center justify-center bg-gray-50">
                <Icon className="size-12 text-gray-300" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-light-text-primary group-hover:text-sp-accent">
                  {pkg.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-light-text-muted">
                  {pkg.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-light-text-muted">
                    {pkg.groupCount} kategori gurubu
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-sp-accent">
                    Başla
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
