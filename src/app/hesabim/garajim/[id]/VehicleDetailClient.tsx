"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Car,
  Fuel,
  Gauge,
  Pencil,
  Settings2,
  ShoppingBag,
  Trash2,
  Wrench,
} from "lucide-react";

import { useLocalCollection } from "@/hooks/use-local-collection";
import type { GarageVehicle } from "@/types/account";

type DetailTab = "bakim-kayitlari" | "bakim-uyarilari" | "satin-alma-gecmisi";

const TABS: { id: DetailTab; label: string; icon: typeof Wrench }[] = [
  { id: "bakim-kayitlari", label: "Bakım Kayıtları", icon: Wrench },
  { id: "bakim-uyarilari", label: "Bakım Uyarıları", icon: Settings2 },
  { id: "satin-alma-gecmisi", label: "Satın Alma Geçmişi", icon: ShoppingBag },
];

export function VehicleDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { items: vehicles, hydrated, update, remove } = useLocalCollection<GarageVehicle>(
    "kaportabizde:garage",
  );
  const [tab, setTab] = useState<DetailTab>("bakim-kayitlari");
  const [editingMileage, setEditingMileage] = useState(false);
  const [mileageDraft, setMileageDraft] = useState("");

  const vehicle = vehicles.find((v) => v.id === id);

  if (hydrated && !vehicle) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <p className="font-medium text-light-text-primary">Araç bulunamadı</p>
        <p className="mt-1 text-sm text-gray-500">
          Bu araç garajınızdan silinmiş olabilir.
        </p>
        <button
          type="button"
          onClick={() => router.push("/hesabim/garajim")}
          className="mt-4 rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white hover:bg-sp-accent-hover"
        >
          Garajıma Dön
        </button>
      </div>
    );
  }

  if (!vehicle) return null;

  function handleDelete() {
    if (!vehicle) return;
    remove(vehicle.id);
    router.push("/hesabim/garajim");
  }

  function saveMileage() {
    if (!vehicle) return;
    const parsed = Number(mileageDraft.trim());
    update(vehicle.id, {
      mileageKm: Number.isFinite(parsed) ? parsed : vehicle.mileageKm,
      mileageUpdatedAt: new Date().toISOString(),
    });
    setEditingMileage(false);
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/hesabim/garajim")}
          className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
        >
          <ArrowLeft className="size-4" />
          Geri
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Düzenle"
            className="rounded-md border border-gray-300 p-2 text-light-text-primary transition-colors hover:bg-gray-50"
          >
            <Pencil className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Sil"
            onClick={handleDelete}
            className="rounded-md border border-red-200 p-2 text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h2 className="text-xl font-bold text-light-text-primary">
          {vehicle.nickname || "Aracım"}
        </h2>
        {vehicle.isDefault ? (
          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-sp-accent">
            Varsayılan
          </span>
        ) : null}
      </div>
      <p className="text-sm text-gray-500">
        {vehicle.brand} {vehicle.model} · {vehicle.engine}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <InfoCard icon={Car} title="Araç Bilgileri">
          <InfoRow label="Plaka" value={vehicle.plate || "—"} />
          <InfoRow label="Şasi" value={vehicle.vin || "—"} />
          <InfoRow label="Renk" value={vehicle.color || "—"} />
        </InfoCard>

        <InfoCard icon={Gauge} title="Kilometre" editable onEdit={() => {
          setMileageDraft(String(vehicle.mileageKm ?? ""));
          setEditingMileage(true);
        }}>
          {editingMileage ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={mileageDraft}
                onChange={(e) => setMileageDraft(e.target.value)}
                className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sp-accent"
                autoFocus
              />
              <button
                type="button"
                onClick={saveMileage}
                className="rounded-md bg-sp-accent px-2.5 py-1.5 text-xs font-medium text-white hover:bg-sp-accent-hover"
              >
                Kaydet
              </button>
            </div>
          ) : (
            <>
              <p className="text-2xl font-bold text-light-text-primary">
                {typeof vehicle.mileageKm === "number"
                  ? vehicle.mileageKm.toLocaleString("tr-TR")
                  : "—"}{" "}
                <span className="text-sm font-normal text-gray-400">km</span>
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {vehicle.mileageUpdatedAt
                  ? `Son güncelleme: ${new Date(vehicle.mileageUpdatedAt).toLocaleDateString("tr-TR")}`
                  : "Henüz güncellenmedi"}
              </p>
            </>
          )}
        </InfoCard>

        <InfoCard icon={Settings2} title="Teknik Özellikler">
          <InfoRow label="Yakıt" value={vehicle.fuel} icon={Fuel} />
          <InfoRow label="Motor" value={vehicle.engine} />
          <InfoRow label="Model Yılı" value={String(vehicle.year)} />
        </InfoCard>
      </div>

      {vehicle.notes ? (
        <p className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-600">
          {vehicle.notes}
        </p>
      ) : null}

      <div className="mt-6 border-t border-gray-100 pt-4">
        <div className="flex flex-wrap gap-1 border-b border-gray-200">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`-mb-px flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium ${
                  active
                    ? "border-sp-accent text-sp-accent"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="size-4" />
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="py-8 text-center text-sm text-gray-400">
          {tab === "bakim-kayitlari" && "Henüz bakım kaydı eklenmedi."}
          {tab === "bakim-uyarilari" && "Aktif bakım uyarısı bulunmuyor."}
          {tab === "satin-alma-gecmisi" && "Bu araç için sipariş geçmişi bulunmuyor."}
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
  editable,
  onEdit,
}: {
  icon: typeof Car;
  title: string;
  children: React.ReactNode;
  editable?: boolean;
  onEdit?: () => void;
}) {
  return (
    <div className="rounded-md border border-gray-200 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-light-text-primary">
          <Icon className="size-4 text-sp-accent" />
          {title}
        </span>
        {editable ? (
          <button
            type="button"
            onClick={onEdit}
            aria-label={`${title} düzenle`}
            className="rounded p-1 text-gray-400 hover:bg-gray-50 hover:text-sp-accent"
          >
            <Pencil className="size-3.5" />
          </button>
        ) : null}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: typeof Fuel;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="flex items-center gap-1 font-medium text-light-text-primary">
        {Icon ? <Icon className="size-3.5 text-gray-400" /> : null}
        {value}
      </span>
    </div>
  );
}
