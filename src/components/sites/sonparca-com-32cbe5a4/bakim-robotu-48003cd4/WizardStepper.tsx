import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const STAGES = ["Araç Seçimi", "Paket Seçimi", "Parça Seçimi", "Özet"] as const;

interface WizardStepperProps {
  currentStage: 1 | 2 | 3 | 4;
}

export function WizardStepper({ currentStage }: WizardStepperProps) {
  return (
    <div className="mb-6 flex items-center">
      {STAGES.map((label, i) => {
        const stage = i + 1;
        const isCompleted = stage < currentStage;
        const isActive = stage === currentStage;

        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex shrink-0 items-center gap-2">
              <span
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-sm font-bold",
                  isCompleted || isActive
                    ? "bg-sp-accent text-white"
                    : "border-2 border-gray-300 text-gray-400",
                )}
              >
                {isCompleted ? <Check className="size-4" /> : stage}
              </span>
              <span
                className={cn(
                  "hidden text-sm sm:inline",
                  isCompleted && "font-medium text-sp-accent",
                  isActive && "font-semibold text-sp-accent",
                  !isCompleted && !isActive && "text-gray-400",
                )}
              >
                {label}
              </span>
            </div>
            {stage < STAGES.length ? (
              <span
                className={cn(
                  "mx-2 h-0.5 flex-1 sm:mx-4",
                  isCompleted ? "bg-sp-accent" : "bg-gray-200",
                )}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
