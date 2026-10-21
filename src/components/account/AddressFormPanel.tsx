"use client";

import { useState } from "react";
import { MapPin, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { AddressPickerModal, type AddressPickResult } from "@/components/account/AddressPickerModal";
import type { AddressType, BillingType, SavedAddress } from "@/types/account";

interface AddressFormPanelProps {
  initial?: SavedAddress;
  onCancel: () => void;
  onSave: (address: Omit<SavedAddress, "id" | "isDefault" | "createdAt">) => void;
}

export function AddressFormPanel({ initial, onCancel, onSave }: AddressFormPanelProps) {
  const [label, setLabel] = useState(initial?.label ?? "");
  const [type, setType] = useState<AddressType>(initial?.type ?? "delivery");
  const [billingType, setBillingType] = useState<BillingType>(initial?.billingType ?? "individual");
  const [firstName, setFirstName] = useState(initial?.firstName ?? "");
  const [lastName, setLastName] = useState(initial?.lastName ?? "");
  const [companyName, setCompanyName] = useState(initial?.companyName ?? "");
  const [taxOffice, setTaxOffice] = useState(initial?.taxOffice ?? "");
  const [taxNumber, setTaxNumber] = useState(initial?.taxNumber ?? "");
  const [nationalId, setNationalId] = useState(initial?.nationalId ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [location, setLocation] = useState<AddressPickResult | null>(
    initial ? { il: initial.il, ilce: initial.ilce, mahalle: initial.mahalle } : null,
  );
  const [postalCode, setPostalCode] = useState(initial?.postalCode ?? "");
  const [addressDetail, setAddressDetail] = useState(initial?.addressDetail ?? "");
  const [pickerOpen, setPickerOpen] = useState(false);

  const isCompanyBilling = type === "billing" && billingType === "company";

  const canSave =
    (isCompanyBilling ? companyName.trim() : firstName.trim() && lastName.trim()) &&
    phone.trim() &&
    location &&
    addressDetail.trim();

  function handleSubmit() {
    if (!canSave || !location) return;
    onSave({
      label: label.trim() || "Adres",
      type,
      billingType: type === "billing" ? billingType : undefined,
      firstName: isCompanyBilling ? "" : firstName.trim(),
      lastName: isCompanyBilling ? "" : lastName.trim(),
      companyName: isCompanyBilling ? companyName.trim() : undefined,
      taxOffice: type === "billing" ? taxOffice.trim() || undefined : undefined,
      taxNumber: isCompanyBilling ? taxNumber.trim() || undefined : undefined,
      nationalId: type === "billing" && !isCompanyBilling ? nationalId.trim() || undefined : undefined,
      phone: phone.trim(),
      il: location.il,
      ilce: location.ilce,
      mahalle: location.mahalle,
      postalCode: postalCode.trim() || undefined,
      addressDetail: addressDetail.trim(),
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-light-text-primary">
          {initial ? "Adresi Düzenle" : "Yeni Adres Ekle"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Kapat"
          className="rounded p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-light-text-primary">
            Adres Başlığı (İsteğe Bağlı)
          </label>
          <p className="mb-1.5 text-xs text-gray-400">Bu adres için bir isim verebilirsiniz</p>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ev"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-light-text-primary">
            Adres Tipi
          </label>
          <div className="grid grid-cols-2 gap-2">
            <TypeButton active={type === "delivery"} onClick={() => setType("delivery")}>
              Teslimat Adresi
            </TypeButton>
            <TypeButton active={type === "billing"} onClick={() => setType("billing")}>
              Fatura Adresi
            </TypeButton>
          </div>
        </div>

        {type === "billing" ? (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-light-text-primary">
              Fatura Tipi
            </label>
            <div className="grid grid-cols-2 gap-2">
              <TypeButton active={billingType === "individual"} onClick={() => setBillingType("individual")}>
                Bireysel
              </TypeButton>
              <TypeButton active={billingType === "company"} onClick={() => setBillingType("company")}>
                Kurumsal
              </TypeButton>
            </div>
          </div>
        ) : null}

        {isCompanyBilling ? (
          <>
            <TextField label="Şirket Adı" required value={companyName} onChange={setCompanyName} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="Vergi Dairesi" value={taxOffice} onChange={setTaxOffice} />
              <TextField label="Vergi No" value={taxNumber} onChange={setTaxNumber} />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <TextField label="İsim" required value={firstName} onChange={setFirstName} />
              <TextField label="Soyisim" required value={lastName} onChange={setLastName} />
            </div>
            {type === "billing" ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField label="Vergi Dairesi" value={taxOffice} onChange={setTaxOffice} />
                <TextField label="TC Kimlik No" value={nationalId} onChange={setNationalId} />
              </div>
            ) : null}
          </>
        )}

        <TextField
          label="Telefon Numarası"
          required
          value={phone}
          onChange={setPhone}
          type="tel"
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-light-text-primary">
            Adres Bilgileri <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="flex w-full flex-col items-center gap-1 rounded-md border border-dashed border-gray-300 px-4 py-6 text-center transition-colors hover:border-sp-accent/40 hover:bg-orange-50"
          >
            <MapPin className="size-5 text-sp-accent" />
            {location ? (
              <span className="text-sm font-medium text-light-text-primary">
                {location.mahalle} ({location.ilce}) — {location.il}
              </span>
            ) : (
              <>
                <span className="text-sm font-medium text-sp-accent">
                  İl, İlçe ve Mahalle Seç
                </span>
                <span className="text-xs text-gray-400">
                  Adres bilgilerinizi seçmek için tıklayın
                </span>
              </>
            )}
          </button>
        </div>

        <TextField
          label="Posta Kodu (İsteğe Bağlı)"
          value={postalCode}
          onChange={setPostalCode}
          placeholder="34000"
          inputMode="numeric"
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-light-text-primary">
            Adres Detayı <span className="text-red-500">*</span>
          </label>
          <p className="mb-1.5 text-xs text-gray-400">
            Sokak, cadde, apartman adı, daire numarası gibi detayları yazın
          </p>
          <textarea
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
            rows={3}
            placeholder="Örnek: Atatürk Caddesi, No: 15, Güneş Apartmanı, Daire: 3"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1.5 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
        >
          <X className="size-4" />
          İptal
        </button>
        <button
          type="button"
          disabled={!canSave}
          onClick={handleSubmit}
          className="rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Adresi Kaydet
        </button>
      </div>

      <AddressPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(result) => {
          setLocation(result);
          setPickerOpen(false);
        }}
      />
    </div>
  );
}

function TypeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md border px-4 py-2.5 text-sm font-medium transition-colors",
        active
          ? "border-sp-accent text-sp-accent"
          : "border-gray-200 text-gray-500 hover:bg-gray-50",
      )}
    >
      {children}
    </button>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  inputMode?: "numeric" | "text";
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-light-text-primary">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </span>
      <input
        type={type}
        value={value}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
      />
    </label>
  );
}
