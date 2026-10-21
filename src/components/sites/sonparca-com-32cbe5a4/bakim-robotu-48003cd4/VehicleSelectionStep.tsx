"use client";

import { useState } from "react";
import { SlidersHorizontal, QrCode, Warehouse, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";
import type { SelectedVehicle } from "./data";
import { VehicleCascadeTab } from "./VehicleCascadeTab";
import { ChassisNumberTab } from "./ChassisNumberTab";
import { GarageTab } from "./GarageTab";
import { HowItWorksSection } from "./HowItWorksSection";
import { WizardFaqSection } from "./WizardFaqSection";
import { WizardSeoContent } from "./WizardSeoContent";

type TabId = "arac" | "sasi" | "garaj";

const TABS: { id: TabId; label: string; icon: typeof SlidersHorizontal }[] = [
  { id: "arac", label: "Araç Seçin", icon: SlidersHorizontal },
  { id: "sasi", label: "Şasi No", icon: QrCode },
  { id: "garaj", label: "Garajım", icon: Warehouse },
];

interface VehicleSelectionStepProps {
  onVehicleComplete: (vehicle: SelectedVehicle) => void;
}

export function VehicleSelectionStep({
  onVehicleComplete,
}: VehicleSelectionStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>("arac");

  return (
    <div>
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="mb-3 flex size-14 items-center justify-center rounded-full bg-orange-50 text-sp-accent">
          <Wrench className="size-6" />
        </span>
        <h1 className="text-2xl font-bold text-light-text-primary sm:text-3xl">
          Bakım Robotu
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-light-text-muted sm:text-base">
          Aracınıza özel periyodik bakım parçalarını adım adım seçin, tek
          seferde sepetinize ekleyin. Başlamak için aracınızı seçin.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="flex border-b border-gray-200">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "-mb-px flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium sm:px-6",
                  isActive
                    ? "border-sp-accent text-sp-accent"
                    : "border-transparent text-gray-500 hover:text-gray-700",
                )}
              >
                <Icon className="size-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="p-4 sm:p-6">
          {activeTab === "arac" ? (
            <VehicleCascadeTab onVehicleComplete={onVehicleComplete} />
          ) : null}
          {activeTab === "sasi" ? (
            <ChassisNumberTab onSwitchToVehicleTab={() => setActiveTab("arac")} />
          ) : null}
          {activeTab === "garaj" ? (
            <GarageTab onSwitchToVehicleTab={() => setActiveTab("arac")} />
          ) : null}
        </div>
      </div>

      <HowItWorksSection />
      <WizardFaqSection />
      <WizardSeoContent />
    </div>
  );
}
