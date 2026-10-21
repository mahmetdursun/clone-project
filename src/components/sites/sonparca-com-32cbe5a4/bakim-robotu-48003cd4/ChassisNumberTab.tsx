"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CircleHelp, Hash, Search } from "lucide-react";

interface ChassisNumberTabProps {
  onSwitchToVehicleTab: () => void;
}

export function ChassisNumberTab({
  onSwitchToVehicleTab,
}: ChassisNumberTabProps) {
  const router = useRouter();
  const [vin, setVin] = useState("");

  function handleFindVehicle() {
    if (vin.length !== 17) return;
    router.push(
      `/sase-numarasi-ile-parca-sorgulama?vin=${encodeURIComponent(vin)}`,
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 rounded-lg border border-orange-100 bg-orange-50 p-4">
        <div className="flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-sp-accent">
            <Hash className="size-4" />
          </span>
          <div>
            <p className="font-semibold text-light-text-primary">
              17 Haneli Şasi Numarası
            </p>
            <p className="text-sm text-light-text-muted">
              Ruhsatınızdaki şasi numarasını girerek aracınızı hızlıca bulun
            </p>
          </div>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 text-sm font-medium whitespace-nowrap text-sp-accent"
        >
          <CircleHelp className="size-4" />
          Nerede Bulurum?
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <input
            type="text"
            value={vin}
            maxLength={17}
            onChange={(e) => setVin(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleFindVehicle();
            }}
            placeholder="ÖRN: WBAGN61050DW12345"
            className="w-full rounded-md border border-gray-200 py-2.5 pr-14 pl-3 text-sm text-light-text-primary outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
          />
          <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-gray-400">
            {vin.length}/17
          </span>
        </div>
        <button
          type="button"
          onClick={handleFindVehicle}
          disabled={vin.length !== 17}
          className="flex items-center justify-center gap-2 rounded-md bg-sp-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Search className="size-4" />
          Araç Bul
        </button>
      </div>

      <p className="mt-3 text-center text-sm text-gray-500">
        Şasi numarasını bilmiyor musunuz?{" "}
        <button
          type="button"
          onClick={onSwitchToVehicleTab}
          className="font-medium text-sp-accent"
        >
          Araç özelliklerini seçin →
        </button>
      </p>
    </div>
  );
}
