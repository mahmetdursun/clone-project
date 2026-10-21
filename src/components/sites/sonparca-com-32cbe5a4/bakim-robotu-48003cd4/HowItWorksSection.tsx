import { Car, ClipboardCheck, ShoppingCart, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { HOW_IT_WORKS_STEPS } from "./data";

const ICONS: Record<(typeof HOW_IT_WORKS_STEPS)[number]["icon"], LucideIcon> = {
  car: Car,
  wrench: Wrench,
  checklist: ClipboardCheck,
  cart: ShoppingCart,
};

export function HowItWorksSection() {
  return (
    <section className="mt-10">
      <h2 className="mb-6 text-center text-xl font-bold text-light-text-primary">
        Nasıl Çalışır?
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {HOW_IT_WORKS_STEPS.map((step, i) => {
          const Icon = ICONS[step.icon];
          return (
            <div
              key={step.title}
              className="rounded-lg border border-gray-200 p-5 text-center"
            >
              <span className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-orange-50 text-sp-accent">
                <Icon className="size-5" />
              </span>
              <p className="text-sm font-semibold text-sp-accent">
                {i + 1}. Adım
              </p>
              <h3 className="mt-1 font-semibold text-light-text-primary">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-light-text-muted">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
