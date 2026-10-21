"use client";

import { useState } from "react";
import { Pencil, Plus, Star } from "lucide-react";

import { AddressFormPanel } from "@/components/account/AddressFormPanel";
import { useLocalCollection } from "@/hooks/use-local-collection";
import type { SavedAddress } from "@/types/account";

export function AdreslerimClient() {
  const { items: addresses, hydrated, add, update } = useLocalCollection<SavedAddress>(
    "kaportabizde:addresses",
  );
  const [mode, setMode] = useState<"list" | "new" | string>("list");

  const editing = typeof mode === "string" && mode !== "list" && mode !== "new"
    ? addresses.find((a) => a.id === mode)
    : undefined;

  function handleSave(address: Omit<SavedAddress, "id" | "isDefault" | "createdAt">) {
    if (editing) {
      update(editing.id, address);
    } else {
      add({
        ...address,
        id: crypto.randomUUID(),
        isDefault: addresses.length === 0,
        createdAt: new Date().toISOString(),
      });
    }
    setMode("list");
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      {mode === "list" ? (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-light-text-primary">
              Adreslerim
            </h2>
            <button
              type="button"
              onClick={() => setMode("new")}
              className="flex items-center gap-1.5 rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
            >
              <Plus className="size-4" />
              Yeni Adres Ekle
            </button>
          </div>

          {hydrated && addresses.length === 0 ? (
            <p className="mt-8 py-8 text-center text-sm text-sp-accent">
              Kayıtlı adresiniz bulunmamaktadır.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="rounded-md border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-light-text-primary">
                          {address.label}
                        </span>
                        {address.isDefault ? (
                          <span className="flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-sp-accent">
                            <Star className="size-3 fill-sp-accent" />
                            Varsayılan
                          </span>
                        ) : null}
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                          {address.type === "delivery" ? "Teslimat" : "Fatura"}
                        </span>
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
                      <p className="mt-1 text-sm text-gray-600">
                        {address.addressDetail}
                      </p>
                      <p className="text-sm text-gray-500">
                        {address.mahalle} ({address.ilce}) {address.il}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">{address.phone}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMode(address.id)}
                      className="flex shrink-0 items-center gap-1.5 rounded-md border border-sp-accent px-3 py-1.5 text-sm font-medium text-sp-accent transition-colors hover:bg-orange-50"
                    >
                      <Pencil className="size-3.5" />
                      Düzenle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-500">
            <span className="rounded bg-orange-50 px-2 py-1 text-xs font-semibold text-sp-accent">
              {addresses.length > 0 ? "1" : "—"}
            </span>
            <span>
              Toplam {addresses.length} kayıttan{" "}
              {addresses.length === 0 ? "1-0" : `1-${addresses.length}`} arası
              gösteriliyor
            </span>
          </div>
        </>
      ) : (
        <AddressFormPanel
          initial={editing}
          onCancel={() => setMode("list")}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
