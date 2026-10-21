"use client";

import { useState } from "react";
import { Info, MapPin, Plus, Star } from "lucide-react";

import { AddressFormPanel } from "@/components/account/AddressFormPanel";
import { useLocalCollection } from "@/hooks/use-local-collection";
import { cn } from "@/lib/utils";
import type { SavedAddress } from "@/types/account";

interface AddressCardListProps {
  addresses: SavedAddress[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function AddressCardList({ addresses, selectedId, onSelect }: AddressCardListProps) {
  return (
    <div className="space-y-2">
      {addresses.map((address) => (
        <label
          key={address.id}
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors",
            selectedId === address.id
              ? "border-sp-accent bg-orange-50/50"
              : "border-gray-200 hover:bg-gray-50",
          )}
        >
          <input
            type="radio"
            checked={selectedId === address.id}
            onChange={() => onSelect(address.id)}
            className="mt-1 accent-sp-accent"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-light-text-primary">{address.label}</span>
              {address.isDefault ? (
                <span className="flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-sp-accent">
                  <Star className="size-3 fill-sp-accent" />
                  Varsayılan
                </span>
              ) : null}
              {address.type === "billing" ? (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                  {address.billingType === "company" ? "Kurumsal" : "Bireysel"}
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-sm font-medium text-light-text-primary">
              {address.billingType === "company" && address.companyName
                ? address.companyName
                : `${address.firstName} ${address.lastName}`.trim()}
            </p>
            <p className="mt-1 text-sm text-gray-600">{address.addressDetail}</p>
            <p className="text-sm text-gray-500">
              {address.mahalle} ({address.ilce}) {address.il}
            </p>
            <p className="mt-1 text-sm text-gray-500">{address.phone}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

export function AddressStep({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const { items: addresses, hydrated, add } = useLocalCollection<SavedAddress>(
    "kaportabizde:addresses",
  );

  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(null);
  const [selectedBillingId, setSelectedBillingId] = useState<string | null>(null);
  const [billingSameAsDelivery, setBillingSameAsDelivery] = useState(true);
  const [addingDelivery, setAddingDelivery] = useState(false);
  const [addingBilling, setAddingBilling] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");

  const effectiveDeliveryId =
    selectedDeliveryId ?? addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id ?? null;
  const effectiveBillingId = billingSameAsDelivery
    ? effectiveDeliveryId
    : (selectedBillingId ?? addresses.find((a) => a.isDefault)?.id ?? null);

  const canContinue = Boolean(effectiveDeliveryId) && (billingSameAsDelivery || Boolean(effectiveBillingId));

  function handleSaveDeliveryAddress(address: Omit<SavedAddress, "id" | "isDefault" | "createdAt">) {
    const id = crypto.randomUUID();
    add({
      ...address,
      id,
      isDefault: addresses.length === 0,
      createdAt: new Date().toISOString(),
    });
    setSelectedDeliveryId(id);
    setAddingDelivery(false);
  }

  function handleSaveBillingAddress(address: Omit<SavedAddress, "id" | "isDefault" | "createdAt">) {
    const id = crypto.randomUUID();
    add({
      ...address,
      id,
      isDefault: addresses.length === 0,
      createdAt: new Date().toISOString(),
    });
    setSelectedBillingId(id);
    setAddingBilling(false);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-1.5 text-lg font-semibold text-light-text-primary">
            <MapPin className="size-5 text-sp-accent" />
            Teslimat Adresi
          </h2>
          {!addingDelivery ? (
            <button
              type="button"
              onClick={() => setAddingDelivery(true)}
              className="flex items-center gap-1.5 rounded-md bg-sp-accent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
            >
              <Plus className="size-4" />
              Yeni Teslimat Adresi Ekle
            </button>
          ) : null}
        </div>

        <div className="mt-4">
          {addingDelivery ? (
            <AddressFormPanel
              onCancel={() => setAddingDelivery(false)}
              onSave={handleSaveDeliveryAddress}
            />
          ) : hydrated && addresses.length === 0 ? (
            <p className="rounded-md border border-dashed border-gray-200 py-8 text-center text-sm text-sp-accent">
              Kayıtlı adresiniz bulunmamaktadır. Devam etmek için bir teslimat adresi ekleyin.
            </p>
          ) : (
            <AddressCardList
              addresses={addresses}
              selectedId={effectiveDeliveryId}
              onSelect={setSelectedDeliveryId}
            />
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-light-text-primary">Fatura Adresi</h2>

        <label className="mt-3 flex items-center gap-2 text-sm text-light-text-primary">
          <input
            type="checkbox"
            checked={billingSameAsDelivery}
            onChange={(event) => setBillingSameAsDelivery(event.target.checked)}
            className="accent-sp-accent"
          />
          Teslimat adresim ile aynı
        </label>

        {!billingSameAsDelivery ? (
          <div className="mt-4">
            {addingBilling ? (
              <AddressFormPanel
                onCancel={() => setAddingBilling(false)}
                onSave={handleSaveBillingAddress}
              />
            ) : (
              <>
                <div className="mb-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setAddingBilling(true)}
                    className="flex items-center gap-1.5 rounded-md border border-sp-accent px-3 py-1.5 text-sm font-medium text-sp-accent transition-colors hover:bg-orange-50"
                  >
                    <Plus className="size-4" />
                    Yeni Fatura Adresi Ekle
                  </button>
                </div>
                {addresses.length === 0 ? (
                  <p className="rounded-md border border-dashed border-gray-200 py-8 text-center text-sm text-sp-accent">
                    Kayıtlı adresiniz bulunmamaktadır.
                  </p>
                ) : (
                  <AddressCardList
                    addresses={addresses}
                    selectedId={effectiveBillingId}
                    onSelect={setSelectedBillingId}
                  />
                )}
              </>
            )}
          </div>
        ) : null}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-light-text-primary">Sipariş Notu</h2>
        <textarea
          value={orderNote}
          onChange={(event) => setOrderNote(event.target.value)}
          rows={3}
          placeholder="Siparişinizle ilgili eklemek istediğiniz bir not var mı?"
          className="mt-2 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
        />

        <label className="mt-4 mb-1.5 block text-sm font-medium text-light-text-primary">
          Araç Şasi Numarası (İsteğe Bağlı)
        </label>
        <input
          type="text"
          value={chassisNumber}
          onChange={(event) => setChassisNumber(event.target.value.toUpperCase())}
          placeholder="Örn: WVWZZZ1KZAW123456"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm uppercase outline-none placeholder:text-gray-400 placeholder:normal-case focus-visible:ring-2 focus-visible:ring-sp-accent"
        />
        <p className="mt-2 flex items-start gap-1.5 rounded-md bg-amber-50 p-2.5 text-xs text-amber-800">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          Şasi numaranızı paylaşırsanız, gönderdiğimiz parçaların aracınızla tam uyumlu olduğunu
          teyit edebiliriz. Bu alanı boş bırakırsanız siparişiniz yine de işleme alınır.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="h-11 flex-1 rounded-md border border-gray-300 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
        >
          Sepete Dön
        </button>
        <button
          type="button"
          disabled={!canContinue}
          onClick={onContinue}
          className="h-11 flex-[2] rounded-md bg-sp-accent text-sm font-semibold text-white transition-colors hover:bg-sp-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Ödemeye Geç
        </button>
      </div>
    </div>
  );
}
