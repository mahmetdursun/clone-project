"use client";

import { useState } from "react";

import { useCart } from "@/hooks/use-cart";
import { useCartNumber } from "@/hooks/use-cart-number";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_CARRIERS } from "@/lib/cart-config";
import type { ShippingCarrierId } from "@/types/cart";
import { AddressStep } from "./AddressStep";
import { CartStep } from "./CartStep";
import { CheckoutStepper, type CheckoutStep } from "./CheckoutStepper";
import { OrderConfirmation } from "./OrderConfirmation";
import { OrderSummaryAside } from "./OrderSummaryAside";
import { PaymentStep } from "./PaymentStep";

export function SepetimClient() {
  const { items, subtotal, clear } = useCart();
  const cartNumber = useCartNumber();

  const [step, setStep] = useState<CheckoutStep>("cart");
  const [carrierId, setCarrierId] = useState<ShippingCarrierId | null>(null);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState<string | null>(null);

  const selectedCarrier = SHIPPING_CARRIERS.find((carrier) => carrier.id === carrierId) ?? null;
  const shippingCost =
    step === "payment" && selectedCarrier
      ? subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : selectedCarrier.price
      : null;

  function handleComplete() {
    setConfirmedOrderNumber(cartNumber);
    clear();
    try {
      window.localStorage.removeItem("kaportabizde:cart-number");
    } catch {
      // Ignore — worst case the next cart reuses this number.
    }
    setStep("cart");
  }

  if (confirmedOrderNumber) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <OrderConfirmation cartNumber={confirmedOrderNumber} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <CheckoutStepper current={step} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === "cart" ? (
            <CartStep onContinue={() => setStep("address")} />
          ) : step === "address" ? (
            <AddressStep onBack={() => setStep("cart")} onContinue={() => setStep("payment")} />
          ) : (
            <PaymentStep
              subtotal={subtotal}
              carrierId={carrierId}
              onCarrierChange={setCarrierId}
              onBack={() => setStep("address")}
              onComplete={handleComplete}
            />
          )}
        </div>

        {items.length > 0 ? (
          <OrderSummaryAside
            cartNumber={cartNumber}
            subtotal={subtotal}
            shippingCost={shippingCost}
          />
        ) : null}
      </div>
    </div>
  );
}
