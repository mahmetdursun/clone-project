"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, Wrench } from "lucide-react";

import { useLocalCollection } from "@/hooks/use-local-collection";
import type { PartRequestRecord, PartRequestStatus } from "@/types/account";

const STATUS_LABELS: Record<PartRequestStatus, string> = {
  beklemede: "Beklemede",
  teklif_verildi: "Teklif Verildi",
  tamamlandi: "Tamamlandı",
  iptal: "İptal",
};

const STATUS_STYLES: Record<PartRequestStatus, string> = {
  beklemede: "bg-amber-50 text-amber-700",
  teklif_verildi: "bg-sky-50 text-sky-700",
  tamamlandi: "bg-emerald-50 text-emerald-700",
  iptal: "bg-red-50 text-red-700",
};

export function ParcaTaleplerimClient() {
  const { items: requests, hydrated } = useLocalCollection<PartRequestRecord>(
    "kaportabizde:part-requests",
  );
  const [statusFilter, setStatusFilter] = useState<PartRequestStatus | "tumu">("tumu");

  const filtered = useMemo(() => {
    if (statusFilter === "tumu") return requests;
    return requests.filter((r) => r.status === statusFilter);
  }, [requests, statusFilter]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-light-text-primary">
          Parça Taleplerim
        </h2>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 text-sm text-gray-500">
            Durum:
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as PartRequestStatus | "tumu")
              }
              className="rounded-md border border-gray-200 px-2 py-1.5 text-sm text-light-text-primary outline-none focus-visible:ring-2 focus-visible:ring-sp-accent"
            >
              <option value="tumu">Tümü</option>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <Link
            href="/parca-talep-formu"
            className="flex items-center gap-1.5 rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
          >
            <Plus className="size-4" />
            Yeni Talep Oluştur
          </Link>
        </div>
      </div>

      {hydrated && filtered.length === 0 ? (
        <div className="mt-4 flex flex-col items-center gap-3 rounded-md border border-dashed border-gray-200 py-12 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Wrench className="size-6" />
          </span>
          <p className="text-sm text-sp-accent">
            {requests.length === 0
              ? "Henüz herhangi bir parça talebiniz bulunmamaktadır."
              : "Bu durumda bir talep bulunamadı."}
          </p>
          {requests.length === 0 ? (
            <Link
              href="/parca-talep-formu"
              className="mt-1 flex items-center gap-1.5 rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
            >
              <Plus className="size-4" />
              İlk Talebinizi Oluşturun
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {filtered.map((request) => (
            <div
              key={request.id}
              className="rounded-md border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wide text-gray-400 uppercase">
                    Şase: {request.chassisNumber}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-light-text-primary">
                    {request.partList}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(request.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[request.status]}`}
                >
                  {STATUS_LABELS[request.status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
