"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Warehouse } from "lucide-react";

import { GarageAccessModal } from "./GarageAccessModal";

/**
 * Header'daki "Garajım" navigasyon öğesi. Oturum durumu next-auth/react'ın
 * useSession() ile istemci tarafında okunuyor (bkz. AccountStatus.tsx'teki
 * aynı tradeoff — Header her sayfada render olduğu için statik üretimi
 * korumak adına sunucu tarafında auth() çağırmıyoruz).
 *
 * Giriş yapmış kullanıcı doğrudan /hesabim/garajim'e gider. Giriş yapmamışsa
 * sonparca.com'daki orijinal davranışı birebir taklit eden bir modal açılır.
 */
export function GarajimNavLink() {
  const { status } = useSession();
  const [modalOpen, setModalOpen] = useState(false);

  if (status === "authenticated") {
    return (
      <Link
        href="/hesabim/garajim"
        className="flex flex-col items-center gap-0.5 text-dark-text-muted transition-colors hover:text-dark-text-primary"
      >
        <Warehouse className="size-5" />
        <span className="text-xs">Garajım</span>
      </Link>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="flex flex-col items-center gap-0.5 text-dark-text-muted transition-colors hover:text-dark-text-primary"
      >
        <Warehouse className="size-5" />
        <span className="text-xs">Garajım</span>
      </button>
      <GarageAccessModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
