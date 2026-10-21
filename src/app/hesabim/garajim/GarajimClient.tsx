"use client";

import { useState } from "react";
import { Home, Plus } from "lucide-react";

import { AddVehicleModal } from "@/components/account/AddVehicleModal";
import { VehicleCard } from "@/components/account/VehicleCard";
import { useLocalCollection } from "@/hooks/use-local-collection";
import type { GarageVehicle } from "@/types/account";

export function GarajimClient() {
  const { items: vehicles, hydrated, add } = useLocalCollection<GarageVehicle>(
    "kaportabizde:garage",
  );
  const [modalOpen, setModalOpen] = useState(false);

  function handleSave(vehicle: Omit<GarageVehicle, "id" | "isDefault" | "createdAt">) {
    add({
      ...vehicle,
      id: crypto.randomUUID(),
      isDefault: vehicles.length === 0,
      createdAt: new Date().toISOString(),
    });
  }

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-light-text-primary">
            Garajım
            {hydrated && vehicles.length > 0 ? (
              <span className="flex size-5 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-sp-accent">
                {vehicles.length}
              </span>
            ) : null}
          </h2>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
          >
            <Plus className="size-4" />
            Araç Ekle
          </button>
        </div>

        {hydrated && vehicles.length === 0 ? (
          <div className="mt-4 flex flex-col items-center gap-3 rounded-md border border-dashed border-gray-200 py-12 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <Home className="size-6" />
            </span>
            <p className="font-medium text-light-text-primary">
              Henüz araç eklemediniz
            </p>
            <p className="max-w-sm text-sm text-gray-500">
              Garajınıza araç ekleyerek parça aramalarınızı hızlandırabilirsiniz.
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-1 flex items-center gap-1.5 rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
            >
              <Plus className="size-4" />
              İlk Aracınızı Ekleyin
            </button>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>

      <AddVehicleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
