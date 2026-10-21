"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X, type LucideIcon } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
  widthClassName?: string;
}

export function Modal({
  open,
  onClose,
  title,
  icon: Icon,
  children,
  widthClassName = "max-w-2xl",
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div
        className={`flex max-h-[90vh] w-full ${widthClassName} flex-col overflow-hidden rounded-lg bg-white shadow-xl`}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 bg-dark-bg px-5 py-4 text-dark-text-primary">
          <div className="flex items-center gap-2 font-semibold">
            {Icon ? <Icon className="size-5 text-sp-accent" /> : null}
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="rounded-full p-1 text-dark-text-muted transition-colors hover:bg-dark-bg-light hover:text-dark-text-primary"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
