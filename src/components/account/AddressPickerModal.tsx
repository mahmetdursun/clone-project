"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronRight, MapPin, X } from "lucide-react";

interface TurkeyIlceEntry {
  ilce: string;
  mahalleler: string[];
}

interface TurkeyIlEntry {
  il: string;
  ilceler: TurkeyIlceEntry[];
}

// Real PTT il/ilçe/mahalle data (see scripts/generate-turkey-address-data.mjs)
// fetched lazily so the ~1.7MB dataset never bloats the JS bundle — it's
// only ever needed once someone opens the address picker.
let cachedData: TurkeyIlEntry[] | null = null;

export interface AddressPickResult {
  il: string;
  ilce: string;
  mahalle: string;
}

interface AddressPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (result: AddressPickResult) => void;
}

type Step = "il" | "ilce" | "mahalle";

/**
 * Public wrapper: only mounts the actual picker while `open` is true, so
 * every open starts from fresh internal state (step/query/selection) with
 * no reset-on-open effect needed — a plain remount does that for free.
 */
export function AddressPickerModal(props: AddressPickerModalProps) {
  if (!props.open) return null;
  return <AddressPickerModalInner onClose={props.onClose} onSelect={props.onSelect} />;
}

function AddressPickerModalInner({
  onClose,
  onSelect,
}: Omit<AddressPickerModalProps, "open">) {
  const [data, setData] = useState<TurkeyIlEntry[] | null>(cachedData);
  const [loading, setLoading] = useState(!cachedData);
  const [step, setStep] = useState<Step>("il");
  const [query, setQuery] = useState("");
  const [selectedIl, setSelectedIl] = useState<TurkeyIlEntry | null>(null);
  const [selectedIlce, setSelectedIlce] = useState<TurkeyIlceEntry | null>(null);

  useEffect(() => {
    if (cachedData) return;
    fetch("/data/turkey-address.json")
      .then((res) => res.json())
      .then((json: TurkeyIlEntry[]) => {
        cachedData = json;
        setData(json);
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  const options = useMemo(() => {
    if (!data) return [];
    if (step === "il") return data.map((entry) => entry.il);
    if (step === "ilce") return selectedIl?.ilceler.map((entry) => entry.ilce) ?? [];
    return selectedIlce?.mahalleler ?? [];
  }, [data, step, selectedIl, selectedIlce]);

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    if (!q) return options;
    return options.filter((o) => o.toLocaleLowerCase("tr").includes(q));
  }, [options, query]);

  function handlePick(value: string) {
    setQuery("");
    if (step === "il") {
      const il = data?.find((entry) => entry.il === value) ?? null;
      setSelectedIl(il);
      setStep("ilce");
    } else if (step === "ilce") {
      const ilce = selectedIl?.ilceler.find((entry) => entry.ilce === value) ?? null;
      setSelectedIlce(ilce);
      setStep("mahalle");
    } else if (selectedIl && selectedIlce) {
      onSelect({ il: selectedIl.il, ilce: selectedIlce.ilce, mahalle: value });
    }
  }

  function goBack() {
    if (step === "mahalle") {
      setSelectedIlce(null);
      setStep("ilce");
    } else if (step === "ilce") {
      setSelectedIl(null);
      setStep("il");
    }
    setQuery("");
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center bg-black/40 p-4 pt-24 sm:items-center sm:pt-4">
      <div className="flex max-h-[70vh] w-full max-w-sm flex-col overflow-hidden rounded-lg border border-orange-100 bg-orange-50 shadow-xl">
        <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3">
          <span className="flex items-center gap-1.5 font-semibold text-light-text-primary">
            <MapPin className="size-4 text-sp-accent" />
            Adres Seçin
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="rounded-full p-1 text-gray-400 hover:bg-white hover:text-gray-600"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 px-4 pb-2 text-xs">
          <Crumb label="İl" state={selectedIl ? "done" : step === "il" ? "active" : "pending"} />
          <span className="text-gray-300">—</span>
          <Crumb
            label={selectedIl ? selectedIl.il : "İlçe"}
            state={selectedIlce ? "done" : step === "ilce" ? "active" : "pending"}
          />
          <span className="text-gray-300">—</span>
          <Crumb
            label={selectedIlce ? selectedIlce.ilce : "Mahalle"}
            state={step === "mahalle" ? "active" : "pending"}
          />
        </div>

        <div className="shrink-0 bg-white px-4 pt-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              step === "il"
                ? "İl ara... (örn: İstanbul, Ankara)"
                : step === "ilce"
                  ? "İlçe ara..."
                  : "Mahalle ara..."
            }
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
          />
          <p className="mt-2 text-xs text-gray-400">
            Adım: {step === "il" ? 1 : step === "ilce" ? 2 : 3} | Sonuç:{" "}
            {filteredOptions.length}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto bg-white px-2 pb-2">
          {loading ? (
            <p className="py-8 text-center text-sm text-gray-400">Yükleniyor...</p>
          ) : (
            <ul>
              {filteredOptions.map((option) => (
                <li key={option}>
                  <button
                    type="button"
                    onClick={() => handlePick(option)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-light-text-primary hover:bg-orange-50"
                  >
                    {option}
                    <ChevronRight className="size-4 text-gray-300" />
                  </button>
                </li>
              ))}
              {!loading && filteredOptions.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">Sonuç bulunamadı</p>
              ) : null}
            </ul>
          )}
        </div>

        {step !== "il" ? (
          <div className="shrink-0 bg-white px-4 pb-3">
            <button
              type="button"
              onClick={goBack}
              className="text-sm font-medium text-sp-accent hover:underline"
            >
              ← Geri Dön
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Crumb({ label, state }: { label: string; state: "done" | "active" | "pending" }) {
  return (
    <span
      className={
        state === "done"
          ? "font-medium text-emerald-600"
          : state === "active"
            ? "font-medium text-sp-accent"
            : "text-gray-400"
      }
    >
      {label}
    </span>
  );
}
