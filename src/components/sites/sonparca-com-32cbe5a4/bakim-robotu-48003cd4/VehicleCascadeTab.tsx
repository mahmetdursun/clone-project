"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Car, Disc, Filter, HelpCircle, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  VEHICLE_BRANDS,
  VEHICLE_ENGINES,
  VEHICLE_FUELS,
  VEHICLE_MODELS_BY_BRAND,
  VEHICLE_SPECS,
  VEHICLE_YEARS,
  type SelectedVehicle,
} from "./data";
import { VehicleBrandWheel } from "./VehicleBrandWheel";
import { getBrandLogo, getModelImage } from "./vehicle-media";

type Level = "brand" | "model" | "year" | "fuel" | "engine";
type SelectorMode = "grid" | "wheel";

interface Selection {
  brand?: string;
  model?: string;
  year?: number;
  fuel?: string;
  engine?: string;
}

const LEVEL_ORDER: Level[] = ["brand", "model", "year", "fuel", "engine"];

// Geniş TR araç kataloğundaki modellerin bir kısmında (bkz. data.ts'teki not)
// yakıt ve/veya motor bilgisi yok. Böyle bir modelde o adımı kullanıcıya hiç
// göstermeden otomatik atlıyoruz; seçim tamamlanırken bu değer kullanılır.
const UNSPECIFIED = "Belirtilmemiş";

const LEVEL_META: Record<
  Level,
  { index: number; title: string; hint: string }
> = {
  brand: { index: 1, title: "Araç Markası", hint: "Aracınızı bulmak için marka seçin" },
  model: { index: 2, title: "Araç Modeli", hint: "Şimdi modelinizi seçin" },
  year: { index: 3, title: "Üretim Yılı", hint: "Üretim yılını seçin" },
  fuel: { index: 4, title: "Yakıt", hint: "Yakıt tipini seçin" },
  engine: { index: 5, title: "Motor Hacmi", hint: "Motor hacmini seçerek tamamlayın" },
};

interface VehicleCascadeTabProps {
  onVehicleComplete: (vehicle: SelectedVehicle) => void;
}

export function VehicleCascadeTab({
  onVehicleComplete,
}: VehicleCascadeTabProps) {
  const [level, setLevel] = useState<Level>("brand");
  const [selection, setSelection] = useState<Selection>({});
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<SelectorMode>("grid");

  function pickFromWheel(brand: string, model: string) {
    setQuery("");
    setMode("grid");
    setSelection({ brand, model });
    setLevel("year");
  }

  const modelSpecs = useMemo(() => {
    if (!selection.brand || !selection.model) return undefined;
    return VEHICLE_SPECS[selection.brand]?.[selection.model];
  }, [selection.brand, selection.model]);

  const options = useMemo(() => {
    switch (level) {
      case "brand":
        return VEHICLE_BRANDS;
      case "model":
        return selection.brand
          ? (VEHICLE_MODELS_BY_BRAND[selection.brand] ?? [])
          : [];
      case "year":
        return (modelSpecs?.years ?? VEHICLE_YEARS).map(String).reverse();
      case "fuel":
        return modelSpecs?.fuels ?? [...VEHICLE_FUELS];
      case "engine":
        return modelSpecs?.engines ?? [...VEHICLE_ENGINES];
      default:
        return [];
    }
  }, [level, selection.brand, modelSpecs]);

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    if (!q) return options;
    return options.filter((o) => o.toLocaleLowerCase("tr").includes(q));
  }, [options, query]);

  const meta = LEVEL_META[level];
  const showSearch = level === "brand" || level === "model" || level === "year";

  function selectOption(value: string) {
    setQuery("");
    if (level === "brand") {
      setSelection({ brand: value });
      setLevel("model");
    } else if (level === "model") {
      setSelection((prev) => ({ ...prev, model: value }));
      setLevel("year");
    } else if (level === "year") {
      const year = Number(value);
      const fuels = modelSpecs?.fuels ?? [];
      const engines = modelSpecs?.engines ?? [];
      if (fuels.length === 0 && engines.length === 0) {
        // Bu modelde ne yakıt ne de motor bilgisi var — ikisini de atlayıp
        // seçimi doğrudan tamamlıyoruz.
        onVehicleComplete({
          brand: selection.brand!,
          model: selection.model!,
          year,
          fuel: UNSPECIFIED,
          engine: UNSPECIFIED,
        });
      } else if (fuels.length === 0) {
        setSelection((prev) => ({ ...prev, year, fuel: UNSPECIFIED }));
        setLevel("engine");
      } else {
        setSelection((prev) => ({ ...prev, year }));
        setLevel("fuel");
      }
    } else if (level === "fuel") {
      const engines = modelSpecs?.engines ?? [];
      if (engines.length === 0) {
        onVehicleComplete({
          brand: selection.brand!,
          model: selection.model!,
          year: selection.year!,
          fuel: value,
          engine: UNSPECIFIED,
        });
        return;
      }
      setSelection((prev) => ({ ...prev, fuel: value }));
      setLevel("engine");
    } else if (level === "engine") {
      const complete = { ...selection, engine: value } as Required<Selection>;
      onVehicleComplete({
        brand: complete.brand,
        model: complete.model,
        year: complete.year,
        fuel: complete.fuel,
        engine: complete.engine,
      });
    }
  }

  function removeFromChip(clickedLevel: Level) {
    const idx = LEVEL_ORDER.indexOf(clickedLevel);
    setQuery("");
    setMode("grid");
    setLevel(clickedLevel);
    setSelection((prev) => {
      const next: Selection = {};
      for (let i = 0; i < idx; i++) {
        const key = LEVEL_ORDER[i] as keyof Selection;
        if (prev[key] !== undefined) {
          (next as Record<string, unknown>)[key] = prev[key];
        }
      }
      return next;
    });
  }

  const chips: { level: Level; label: string }[] = [];
  if (selection.brand) chips.push({ level: "brand", label: selection.brand });
  if (selection.model) chips.push({ level: "model", label: selection.model });
  if (selection.year) chips.push({ level: "year", label: String(selection.year) });
  if (selection.fuel) chips.push({ level: "fuel", label: selection.fuel });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
            {meta.index}
          </span>
          <h3 className="font-semibold text-light-text-primary">{meta.title}</h3>
        </div>
        {!(level === "brand" && mode === "wheel") ? (
          <span className="text-sm text-gray-400">
            {filteredOptions.length} seçenek
          </span>
        ) : null}
      </div>

      {level === "brand" ? (
        <div className="mt-3 inline-flex rounded-md border border-gray-200 bg-gray-50 p-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => setMode("grid")}
            className={cn(
              "rounded px-3 py-1.5 transition-colors",
              mode === "grid" ? "bg-white text-sp-accent shadow-sm" : "text-gray-500 hover:text-gray-700",
            )}
          >
            Tüm Markalar
          </button>
          <button
            type="button"
            onClick={() => setMode("wheel")}
            className={cn(
              "rounded px-3 py-1.5 transition-colors",
              mode === "wheel" ? "bg-white text-sp-accent shadow-sm" : "text-gray-500 hover:text-gray-700",
            )}
          >
            Çark Görünümü
          </button>
        </div>
      ) : null}

      {chips.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip.level}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700"
            >
              {chip.label}
              <button
                type="button"
                aria-label={`${chip.label} seçimini kaldır`}
                onClick={() => removeFromChip(chip.level)}
                className="rounded-full hover:bg-emerald-100"
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      ) : null}

      {level === "brand" && mode === "wheel" ? (
        <div className="mt-4">
          <VehicleBrandWheel onPick={pickFromWheel} />
        </div>
      ) : (
        <>
          {showSearch ? (
            <div className="relative mt-4">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ara..."
                className="w-full rounded-md border border-gray-200 py-2 pr-3 pl-9 text-sm text-light-text-primary outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
              />
            </div>
          ) : null}

          <div
            className={cn(
              "mt-4 grid gap-3",
              level === "fuel" || level === "engine"
                ? "grid-cols-2 sm:max-w-xs"
                : "grid-cols-3 sm:grid-cols-4 lg:grid-cols-7",
            )}
          >
            {filteredOptions.map((option) => {
              const logo = level === "brand" ? getBrandLogo(option) : undefined;
              const modelImg =
                level === "model" && selection.brand
                  ? getModelImage(selection.brand, option)
                  : undefined;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectOption(option)}
                  className="flex flex-col items-center gap-1 rounded-md border border-gray-200 py-3 text-center font-medium text-gray-700 transition-colors hover:border-sp-accent/40 hover:bg-orange-50"
                >
                  {logo ? (
                    <span className="relative block size-8">
                      <Image src={logo} alt={option} fill sizes="32px" className="object-contain" />
                    </span>
                  ) : null}
                  {level === "model" ? (
                    modelImg ? (
                      <span className="relative block h-8 w-full">
                        <Image src={modelImg} alt={option} fill sizes="64px" className="object-contain" />
                      </span>
                    ) : (
                      <Car className="size-5 text-gray-300" />
                    )
                  ) : null}
                  {option}
                </button>
              );
            })}
            {filteredOptions.length === 0 ? (
              <p className="col-span-full py-6 text-center text-sm text-gray-400">
                {meta.title} bulunamadı
              </p>
            ) : null}
          </div>
        </>
      )}

      <div className="mt-8 flex items-center justify-center gap-6 py-4 text-gray-200">
        <Filter className="size-10" />
        <Disc className="size-10" />
        <Disc className="size-10" />
      </div>

      <div className="-mx-4 -mb-4 mt-2 flex items-center gap-2 rounded-b-lg bg-gray-900 px-4 py-3 text-sm text-gray-300 sm:-mx-6 sm:-mb-6 sm:px-6">
        <HelpCircle className="size-4 text-sp-accent" />
        <span>{meta.hint}</span>
      </div>
    </div>
  );
}
