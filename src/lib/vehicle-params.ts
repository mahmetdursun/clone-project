import {
  VEHICLE_BRANDS,
  VEHICLE_MODELS_BY_BRAND,
  type SelectedVehicle,
} from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/data";

/**
 * Parses & validates a `?brand=&model=&year=&fuel=&engine=` selection from
 * a URL's search params against the real brand/model catalog (VEHICLE_BRANDS
 * / VEHICLE_MODELS_BY_BRAND), so a hand-edited or stale link can never
 * produce a vehicle that doesn't actually exist in our data. Returns null
 * on anything missing or invalid — callers fall back to their own empty
 * state rather than guessing.
 *
 * Shared by the home page's vehicle finder → Bakım Robotu handoff
 * (BakimRobotuWizard.tsx) and the "Aracınıza Özel Ürünler" results page
 * (/yedek-parca).
 */
export function readVehicleFromParams(params: URLSearchParams): SelectedVehicle | null {
  const brand = params.get("brand");
  const model = params.get("model");
  const year = Number(params.get("year"));
  const fuel = params.get("fuel");
  const engine = params.get("engine");

  if (!brand || !model || !fuel || !engine || !Number.isFinite(year)) return null;
  if (!VEHICLE_BRANDS.includes(brand)) return null;
  if (!VEHICLE_MODELS_BY_BRAND[brand]?.includes(model)) return null;

  return { brand, model, year, fuel, engine };
}
