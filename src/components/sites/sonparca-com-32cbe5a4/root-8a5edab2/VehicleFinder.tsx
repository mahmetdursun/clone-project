"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Hash, HelpCircle, Warehouse, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { VehicleCascadeTab } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/VehicleCascadeTab";
import type { SelectedVehicle } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/data";
import { SelectedVehicleSummary } from "./SelectedVehicleSummary";

type TabId = "sasi" | "arac" | "garaj";

const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "sasi", label: "Şasi No", icon: Hash },
  { id: "arac", label: "Araç Seçin", icon: Car },
  { id: "garaj", label: "Garajım", icon: Warehouse },
];

export function VehicleFinder() {
  const [activeTab, setActiveTab] = useState<TabId>("arac");
  const [selectedVehicle, setSelectedVehicle] = useState<SelectedVehicle | null>(null);

  return (
    <section className="bg-dark-bg py-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Car className="size-6 text-sp-accent" />
            <div>
              <h2 className="text-lg font-bold text-dark-text-primary">
                Aracınızı Bulun
              </h2>
              <p className="text-sm text-dark-text-muted">
                Aracınıza uygun parçaları bulun
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sp-accent text-white"
                      : "bg-dark-bg-light text-dark-text-primary hover:bg-dark-bg-lighter"
                  )}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg shadow-sm">
          <div className="relative bg-white p-4 sm:p-6">
            {activeTab === "arac" &&
              (selectedVehicle ? (
                <SelectedVehicleSummary
                  vehicle={selectedVehicle}
                  onChange={() => setSelectedVehicle(null)}
                />
              ) : (
                // Aracınızı Bulun widget'ı Bakım Robotu ile AYNI marka →
                // model → yıl → yakıt → motor kademesini (VehicleCascadeTab)
                // kullanıyor, ama tıklama sonrası hemen Bakım Robotu'na
                // yönlendirmiyor — seçim ana ekranda tamamlanıyor. Bakım
                // Robotu'na geçiş SelectedVehicleSummary'deki ayrı, isteğe
                // bağlı butonla yapılıyor.
                <VehicleCascadeTab onVehicleComplete={setSelectedVehicle} />
              ))}
            {activeTab === "sasi" && <ChassisStep />}
            {activeTab === "garaj" && <GarageStep />}
          </div>

          {activeTab !== "arac" ? (
            <div className="flex items-center gap-2 bg-dark-bg-light px-4 py-3 text-sm text-dark-text-muted">
              <HelpCircle className="size-4 text-sp-accent" />
              <span>
                {activeTab === "sasi"
                  ? "Şasi numaranızı girerek aracınızı bulun"
                  : "Kayıtlı araçlarınızı görmek için giriş yapın"}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ChassisStep() {
  const router = useRouter();
  const [vin, setVin] = useState("");

  function handleSearch() {
    if (vin.trim().length === 0) return;
    router.push(
      `/sase-numarasi-ile-parca-sorgulama?vin=${encodeURIComponent(vin.trim().toUpperCase())}`,
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <Hash className="size-8 text-sp-accent" />
      <p className="text-sm text-light-text-muted">
        Şasi numaranızı girerek aracınızı bulun
      </p>
      <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={vin}
          maxLength={17}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Şasi numarası"
          className="w-full flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm text-light-text-primary uppercase outline-none placeholder:text-gray-400 placeholder:normal-case focus-visible:ring-2 focus-visible:ring-sp-accent"
        />
        <button
          type="button"
          onClick={handleSearch}
          disabled={vin.trim().length === 0}
          className="rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Ara
        </button>
      </div>
    </div>
  );
}

function GarageStep() {
  return (
    <div className="flex flex-col items-center gap-3 py-10 text-center">
      <Warehouse className="size-8 text-sp-accent" />
      <p className="text-sm text-light-text-muted">Yakında</p>
    </div>
  );
}
