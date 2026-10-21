import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export type CheckoutStep = "cart" | "address" | "payment";

const STEPS: { id: CheckoutStep; index: number; label: string }[] = [
  { id: "cart", index: 1, label: "Sepet" },
  { id: "address", index: 2, label: "Adres" },
  { id: "payment", index: 3, label: "Ödeme" },
];

export function CheckoutStepper({ current }: { current: CheckoutStep }) {
  const currentIndex = STEPS.find((step) => step.id === current)?.index ?? 1;

  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-4">
      {STEPS.map((step, i) => {
        const state =
          step.index < currentIndex ? "done" : step.index === currentIndex ? "active" : "pending";
        return (
          <li key={step.id} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  state === "done" && "bg-emerald-500 text-white",
                  state === "active" && "bg-sp-accent text-white",
                  state === "pending" && "bg-gray-100 text-gray-400",
                )}
              >
                {state === "done" ? <Check className="size-3.5" /> : step.index}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  state === "pending" ? "text-gray-400" : "text-light-text-primary",
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 ? (
              <span className="h-px w-6 bg-gray-200 sm:w-12" aria-hidden="true" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
