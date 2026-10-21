"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className={
        className ??
        "flex items-center gap-1.5 text-sm font-medium text-light-text-muted transition-colors hover:text-sp-accent"
      }
    >
      <LogOut className="size-4" />
      Çıkış Yap
    </button>
  );
}
