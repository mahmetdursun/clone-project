"use client";

import { useState } from "react";
import { Banknote, ChevronLeft, CreditCard, Truck } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PaymentMethodId, ShippingCarrierId } from "@/types/cart";
import { BankTransferPanel } from "./BankTransferPanel";
import { CreditCardForm } from "./CreditCardForm";
import { ShippingCarrierSelector } from "./ShippingCarrierSelector";

interface PaymentMethodOption {
  id: PaymentMethodId;
  label: string;
  description: string;
  icon: typeof CreditCard;
}

const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: "credit-card",
    label: "Kredi/Banka Kartı",
    description: "Tüm banka kartlarıyla güvenli ödeme",
    icon: CreditCard,
  },
  {
    id: "bank-transfer",
    label: "Havale / EFT",
    description: "Banka hesabımıza havale ile ödeyin",
    icon: Banknote,
  },
];

interface PaymentStepProps {
  subtotal: number;
  carrierId: ShippingCarrierId | null;
  onCarrierChange: (id: ShippingCarrierId) => void;
  onBack: () => void;
  onComplete: (carrierId: ShippingCarrierId, methodId: PaymentMethodId) => void;
}

export function PaymentStep({
  subtotal,
  carrierId,
  onCarrierChange,
  onBack,
  onComplete,
}: PaymentStepProps) {
  const [methodId, setMethodId] = useState<PaymentMethodId | null>(null);

  const canComplete = Boolean(carrierId && methodId);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="flex items-center gap-1.5 text-lg font-semibold text-light-text-primary">
          <Truck className="size-5 text-sp-accent" />
          Kargo Firması
        </h2>
        <div className="mt-3">
          <ShippingCarrierSelector
            subtotal={subtotal}
            selectedId={carrierId}
            onSelect={onCarrierChange}
          />
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-light-text-primary">Ödeme Yöntemi</h2>

        {!methodId ? (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  className="flex flex-col items-center gap-2 rounded-md border border-gray-200 p-5 text-center"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-orange-50 text-sp-accent">
                    <Icon className="size-5" />
                  </span>
                  <p className="font-medium text-light-text-primary">{method.label}</p>
                  <p className="text-xs text-gray-500">{method.description}</p>
                  <button
                    type="button"
                    onClick={() => setMethodId(method.id)}
                    className="mt-1 w-full rounded-md bg-sp-accent px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
                  >
                    Bu yöntemi seç
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setMethodId(null)}
              className="mb-3 flex items-center gap-1 text-sm font-medium text-sp-accent hover:underline"
            >
              <ChevronLeft className="size-4" />
              Ödeme yöntemini değiştir
            </button>
            <div
              className={cn(
                "rounded-md border p-4",
                methodId === "credit-card" ? "border-gray-200" : "border-gray-200",
              )}
            >
              {methodId === "credit-card" ? <CreditCardForm /> : <BankTransferPanel />}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="h-11 flex-1 rounded-md border border-gray-300 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
        >
          Adrese Dön
        </button>
        <button
          type="button"
          disabled={!canComplete}
          onClick={() => carrierId && methodId && onComplete(carrierId, methodId)}
          className="h-11 flex-[2] rounded-md bg-sp-accent text-sm font-semibold text-white transition-colors hover:bg-sp-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          Siparişi Tamamla
        </button>
      </div>
    </div>
  );
}
