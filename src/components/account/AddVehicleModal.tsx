"use client";

import { useState } from "react";
import { Car, CheckCircle2, Hash, Home } from "lucide-react";

import { cn } from "@/lib/utils";
import { Modal } from "@/components/account/Modal";
import { VehicleCascadeTab } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/VehicleCascadeTab";
import type { SelectedVehicle } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/data";
import type { GarageVehicle } from "@/types/account";

type Step = "select" | "details";
type SelectTab = "arac" | "sasi";

interface AddVehicleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (vehicle: Omit<GarageVehicle, "id" | "isDefault" | "createdAt">) => void;
}

export function AddVehicleModal({ open, onClose, onSave }: AddVehicleModalProps) {
  const [step, setStep] = useState<Step>("select");
  const [selectTab, setSelectTab] = useState<SelectTab>("arac");
  const [selected, setSelected] = useState<SelectedVehicle | null>(null);
  const [vinDraft, setVinDraft] = useState("");

  const [nickname, setNickname] = useState("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("");
  const [mileage, setMileage] = useState("");
  const [vin, setVin] = useState("");
  const [notes, setNotes] = useState("");

  function reset() {
    setStep("select");
    setSelectTab("arac");
    setSelected(null);
    setVinDraft("");
    setNickname("");
    setPlate("");
    setColor("");
    setMileage("");
    setVin("");
    setNotes("");
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleVehicleComplete(vehicle: SelectedVehicle) {
    setSelected(vehicle);
    if (vinDraft) setVin(vinDraft);
    setStep("details");
  }

  function handleSubmit() {
    if (!selected) return;
    onSave({
      brand: selected.brand,
      model: selected.model,
      year: selected.year,
      fuel: selected.fuel,
      engine: selected.engine,
      nickname: nickname.trim() || undefined,
      plate: plate.trim() || undefined,
      color: color.trim() || undefined,
      mileageKm: mileage.trim() ? Number(mileage.trim()) : undefined,
      vin: vin.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    handleClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Araç Seçin" icon={Home}>
      {step === "select" ? (
        <div>
          <div className="mb-4 flex items-center gap-2 text-sm">
            <StepBadge index={1} active label="Araç Seçimi" />
            <span className="h-px flex-1 bg-gray-200" />
            <StepBadge index={2} active={false} label="Ek Bilgiler" />
          </div>

          <div className="mb-4 flex border-b border-gray-200">
            <TabButton
              icon={Car}
              label="Araç Seçerek"
              active={selectTab === "arac"}
              onClick={() => setSelectTab("arac")}
            />
            <TabButton
              icon={Hash}
              label="Şasi Numarası ile"
              active={selectTab === "sasi"}
              onClick={() => setSelectTab("sasi")}
            />
          </div>

          {selectTab === "arac" ? (
            <VehicleCascadeTab onVehicleComplete={handleVehicleComplete} />
          ) : (
            <VinCaptureTab
              vin={vinDraft}
              onVinChange={setVinDraft}
              onContinue={() => setSelectTab("arac")}
            />
          )}
        </div>
      ) : (
        <div>
          <div className="mb-4 flex items-center gap-2 text-sm">
            <StepBadge index={1} active={false} done label="Araç Seçimi" />
            <span className="h-px flex-1 bg-emerald-300" />
            <StepBadge index={2} active label="Ek Bilgiler" />
          </div>

          {selected ? (
            <div className="mb-4 flex items-start justify-between gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                <div>
                  <p className="font-medium text-emerald-800">
                    {selected.brand} {selected.model} · {selected.year} ·{" "}
                    {selected.engine} · {selected.fuel}
                  </p>
                  <p className="text-emerald-700">
                    Araç seçildi, ek bilgileri girebilirsiniz.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep("select")}
                className="shrink-0 text-emerald-700 underline"
              >
                Değiştir
              </button>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Takma Ad" value={nickname} onChange={setNickname} placeholder="Örn: Günlük Araba" />
            <TextField label="Plaka" value={plate} onChange={setPlate} placeholder="34 ABC 123" />
            <TextField label="Renk" value={color} onChange={setColor} placeholder="Örn: Beyaz" />
            <TextField label="Kilometre" value={mileage} onChange={setMileage} placeholder="Örn: 50000" inputMode="numeric" />
            <TextField
              label="Şasi Numarası"
              value={vin}
              onChange={(v) => setVin(v.toUpperCase())}
              placeholder="17 haneli şasi numarası"
              className="sm:col-span-2"
              maxLength={17}
            />
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1.5 block font-medium text-light-text-primary">Notlar</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Araç hakkında notlarınız..."
                rows={2}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-light-text-primary outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
              />
            </label>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep("select")}
              className="flex items-center gap-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
            >
              ← Geri
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
              >
                + Garaja Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

function VinCaptureTab({
  vin,
  onVinChange,
  onContinue,
}: {
  vin: string;
  onVinChange: (v: string) => void;
  onContinue: () => void;
}) {
  return (
    <div className="rounded-md border border-orange-100 bg-orange-50 p-4 text-sm">
      <p className="font-semibold text-light-text-primary">
        Şasi Numarası ile Araç Bul
      </p>
      <p className="mt-1 text-light-text-muted">
        Ruhsatınızdaki şasi (VIN) numarasını girerek aracınızı hızlıca bulun.
      </p>
      <div className="relative mt-3">
        <input
          type="text"
          value={vin}
          maxLength={17}
          onChange={(e) => onVinChange(e.target.value.toUpperCase())}
          placeholder="ÖRN: WBAGN61050DW12345"
          className="w-full rounded-md border border-gray-200 bg-white py-2.5 pr-14 pl-3 text-sm text-light-text-primary outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
        />
        <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-gray-400">
          {vin.length}/17
        </span>
      </div>
      <p className="mt-3 rounded-md border border-gray-200 bg-white p-3 text-light-text-muted">
        Şasi numarasından otomatik araç tanıma yakında aktif olacak. Şimdilik
        şasi numaranızı kaydettik — aracınızı marka/model seçerek tamamlayın.
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="mt-3 w-full rounded-md bg-sp-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
      >
        Araç Seçerek Devam Et →
      </button>
    </div>
  );
}

function StepBadge({
  index,
  label,
  active,
  done,
}: {
  index: number;
  label: string;
  active: boolean;
  done?: boolean;
}) {
  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap">
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded-full text-xs font-bold",
          done
            ? "bg-emerald-500 text-white"
            : active
              ? "bg-sp-accent text-white"
              : "bg-gray-200 text-gray-500",
        )}
      >
        {done ? <CheckCircle2 className="size-3.5" /> : index}
      </span>
      <span className={active || done ? "font-medium text-light-text-primary" : "text-gray-400"}>
        {label}
      </span>
    </span>
  );
}

function TabButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: typeof Car;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "-mb-px flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium",
        active
          ? "border-sp-accent text-sp-accent"
          : "border-transparent text-gray-500 hover:text-gray-700",
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  className,
  inputMode,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  inputMode?: "numeric" | "text";
  maxLength?: number;
}) {
  return (
    <label className={cn("block text-sm", className)}>
      <span className="mb-1.5 block font-medium text-light-text-primary">{label}</span>
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-light-text-primary outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
      />
    </label>
  );
}
