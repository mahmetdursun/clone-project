"use client";

import { useState } from "react";
import { Check, Copy, Info, Landmark } from "lucide-react";

import { BANK_TRANSFER_ACCOUNT } from "@/lib/cart-config";

const FIELDS: { label: string; value: string | null }[] = [
  { label: "Hesap Adı", value: BANK_TRANSFER_ACCOUNT.accountName },
  { label: "Banka", value: BANK_TRANSFER_ACCOUNT.bankName },
  { label: "IBAN", value: BANK_TRANSFER_ACCOUNT.iban },
  { label: "Hesap No", value: BANK_TRANSFER_ACCOUNT.accountNumber },
  { label: "Şube Kodu", value: BANK_TRANSFER_ACCOUNT.branchCode },
  { label: "Şube", value: BANK_TRANSFER_ACCOUNT.branch },
];

export function BankTransferPanel() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const hasAccountInfo = FIELDS.some((field) => field.value);

  async function handleCopy(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField((current) => (current === label ? null : current)), 2000);
    } catch {
      // Clipboard API unavailable/blocked — silently ignore.
    }
  }

  return (
    <div className="space-y-3">
      <div className="rounded-md border border-gray-200 p-4">
        <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-light-text-primary">
          <Landmark className="size-4 text-sp-accent" />
          Banka Hesap Bilgileri
        </p>

        <div className="space-y-2">
          {FIELDS.map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between gap-3 rounded-md bg-gray-50 px-3 py-2"
            >
              <div className="min-w-0">
                <p className="text-xs text-gray-400">{field.label}</p>
                <p className="truncate text-sm font-medium text-light-text-primary">
                  {field.value ?? "—"}
                </p>
              </div>
              {field.value ? (
                <button
                  type="button"
                  onClick={() => handleCopy(field.label, field.value as string)}
                  aria-label={`${field.label} kopyala`}
                  className="shrink-0 rounded-md border border-gray-200 p-1.5 text-gray-400 transition-colors hover:bg-white hover:text-sp-accent"
                >
                  {copiedField === field.label ? (
                    <Check className="size-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {!hasAccountInfo ? (
        <p className="flex items-start gap-1.5 rounded-md bg-amber-50 p-2.5 text-xs text-amber-800">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          Banka hesap bilgileri yakında eklenecektir. Havale/EFT ile ödeme yapmak isterseniz sipariş
          onayından sonra müşteri hizmetlerimiz sizinle iletişime geçerek hesap bilgilerini
          paylaşacaktır.
        </p>
      ) : (
        <p className="flex items-start gap-1.5 rounded-md bg-amber-50 p-2.5 text-xs text-amber-800">
          <Info className="mt-0.5 size-3.5 shrink-0" />
          Ödemenizi yaptıktan sonra dekontu{" "}
          <a href="mailto:destek@sonparca.com" className="font-medium underline">
            destek@sonparca.com
          </a>{" "}
          adresine gönderirseniz siparişiniz daha hızlı onaylanır.
        </p>
      )}
    </div>
  );
}
