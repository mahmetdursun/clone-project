"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BadgeCheck, Car, LogIn, UserPlus, X } from "lucide-react";

interface GarageAccessModalProps {
  open: boolean;
  onClose: () => void;
  /** Giriş/Kayıt sonrası dönülecek sayfa. */
  callbackUrl?: string;
}

export function GarageAccessModal({
  open,
  onClose,
  callbackUrl = "/hesabim/garajim",
}: GarageAccessModalProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const encodedCallback = encodeURIComponent(callbackUrl);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="garage-access-modal-title"
        className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-dark-bg px-4 py-3 text-white">
          <div
            id="garage-access-modal-title"
            className="flex items-center gap-2 text-sm font-semibold"
          >
            <Car className="size-4" />
            Garajım
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="text-dark-text-muted transition-colors hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-orange-50 text-sp-accent">
            <Car className="size-7" />
          </span>
          <h3 className="text-lg font-semibold text-light-text-primary">
            Araçlarınızı Tanımlayın
          </h3>
          <p className="max-w-xs text-sm text-light-text-muted">
            Araçlarınızı kaydedin, doğru parçayı anında bulun. Bu özellik
            sadece kayıtlı üyelere özeldir.
          </p>
          <div className="mt-2 flex w-full gap-3">
            <Link
              href={`/auth/giris?callbackUrl=${encodedCallback}`}
              className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md bg-sp-accent text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
            >
              <LogIn className="size-4" />
              Giriş Yap
            </Link>
            <Link
              href={`/auth/kayit-ol?callbackUrl=${encodedCallback}`}
              className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-md border border-gray-300 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
            >
              <UserPlus className="size-4" />
              Kayıt Ol
            </Link>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-green-600">
            <BadgeCheck className="size-4" />
            Kayıt tamamen ücretsizdir
          </p>
        </div>
      </div>
    </div>
  );
}
