"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { WizardStepper } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/WizardStepper";
import { VehicleSelectionStep } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/VehicleSelectionStep";
import { PackageSelectionStep } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/PackageSelectionStep";
import { PartSelectionStep } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/PartSelectionStep";
import { SummaryStep } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/SummaryStep";
import type {
  MaintenancePackage,
  PackageSelections,
  SelectedVehicle,
} from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/data";
import { readVehicleFromParams } from "@/lib/vehicle-params";

type Stage = 1 | 2 | 3 | 4;

// Ana ekrandaki "Aracınızı Bulun" widget'ı (VehicleFinder.tsx) marka/model
// seçimini kendi içinde tamamladıktan sonra, isteğe bağlı olarak buraya
// ?brand=&model=&year=&fuel=&engine= parametreleriyle yönlendirebiliyor —
// bu durumda kullanıcıya seçimi tekrarlatmadan doğrudan 2. adımdan
// (Paket Seçimi) başlıyoruz. Parametreler eksik/geçersizse normal 1.
// adımdan (Araç Seçimi) başlanır. Aynı parametre şeması /yedek-parca
// sonuç sayfası tarafından da kullanılıyor — bkz. src/lib/vehicle-params.ts.

export function BakimRobotuWizard() {
  const searchParams = useSearchParams();
  const initialVehicle = readVehicleFromParams(searchParams);

  const [stage, setStage] = useState<Stage>(initialVehicle ? 2 : 1);
  const [vehicle, setVehicle] = useState<SelectedVehicle | null>(initialVehicle);
  const [activePackage, setActivePackage] = useState<MaintenancePackage | null>(
    null,
  );
  const [selectionsByPackage, setSelectionsByPackage] = useState<
    Record<string, PackageSelections>
  >({});

  const selections = activePackage
    ? (selectionsByPackage[activePackage.id] ?? {})
    : {};

  function updateSelections(
    packageId: string,
    updater: (prev: PackageSelections) => PackageSelections,
  ) {
    setSelectionsByPackage((prev) => ({
      ...prev,
      [packageId]: updater(prev[packageId] ?? {}),
    }));
  }

  function handleVehicleComplete(v: SelectedVehicle) {
    setVehicle(v);
    setStage(2);
  }

  function handleSelectPackage(pkg: MaintenancePackage) {
    setActivePackage(pkg);
    setStage(3);
  }

  function handleToggleProduct(productId: string) {
    if (!activePackage) return;
    updateSelections(activePackage.id, (prev) => {
      const next = { ...prev };
      if (next[productId]) {
        delete next[productId];
      } else {
        next[productId] = { productId, qty: 1 };
      }
      return next;
    });
  }

  function handleQtyChange(productId: string, qty: number) {
    if (!activePackage) return;
    updateSelections(activePackage.id, (prev) => ({
      ...prev,
      [productId]: { productId, qty },
    }));
  }

  function handleRemove(productId: string) {
    if (!activePackage) return;
    updateSelections(activePackage.id, (prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  function handleContinueWithPackage(pkg: MaintenancePackage) {
    setActivePackage(pkg);
    setStage(3);
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <WizardStepper currentStage={stage} />

      {stage === 1 ? (
        <VehicleSelectionStep onVehicleComplete={handleVehicleComplete} />
      ) : null}

      {stage === 2 && vehicle ? (
        <PackageSelectionStep
          vehicle={vehicle}
          onChangeVehicle={() => setStage(1)}
          onSelectPackage={handleSelectPackage}
        />
      ) : null}

      {stage === 3 && vehicle && activePackage ? (
        <PartSelectionStep
          vehicle={vehicle}
          onChangeVehicle={() => setStage(1)}
          pkg={activePackage}
          selections={selections}
          onToggleProduct={handleToggleProduct}
          onQtyChange={handleQtyChange}
          onBackToPackages={() => setStage(2)}
          onGoToSummary={() => setStage(4)}
        />
      ) : null}

      {stage === 4 && vehicle && activePackage ? (
        <SummaryStep
          vehicle={vehicle}
          onChangeVehicle={() => setStage(1)}
          pkg={activePackage}
          selections={selections}
          onQtyChange={handleQtyChange}
          onRemove={handleRemove}
          onBackToParts={() => setStage(3)}
          onContinueWithPackage={handleContinueWithPackage}
        />
      ) : null}
    </main>
  );
}
