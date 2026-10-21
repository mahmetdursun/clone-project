"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  Gauge,
  HelpCircle,
  Package,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  EXAMPLE_VIN,
  statCounters,
  vinLookupDatabase,
  type VehicleLookupResult,
} from "./data";

const STAT_ICONS = {
  inventory_2: Package,
  directions_car: Car,
  search: Search,
  verified: ShieldCheck,
} as const;

function WhereToFindModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-md bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-light-text-primary">
            Neden Şasi Numarası İstiyoruz?
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-light-text-primary"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="space-y-3 px-5 py-4 text-sm text-light-text-muted">
          <p className="font-medium text-sp-accent">
            Şasi Numarasını Neden Vermelisiniz?
          </p>
          <ul className="list-disc space-y-1.5 pl-4">
            <li>
              Aldığınız parçaların aldığınız ürünlere uyumlu olup olmadığı
              ekibimiz tarafından kontrol edilir.
            </li>
            <li>
              Yanlış parça gönderimini ve iade süreçlerini ortadan kaldırarak
              zaman tasarrufu sağlarsınız.
            </li>
            <li>
              Siparişinizin onay sürecinin, dolayısıyla kargolama ve teslimat
              süreçlerinin hızlanmasını sağlar.
            </li>
            <li>
              Aldığınız ürünlerin aracınızla uyumsuz olması durumunda sizinle
              iletişime geçip doğru ürün gönderimi sürecini daha hızlı
              başlatabiliriz.
            </li>
          </ul>
          <p className="rounded bg-light-bg-muted px-3 py-2 text-xs text-light-text-primary">
            <span className="font-semibold">Not:</span> Şasi numarası
            genellikle aracın şoför tarafı ön camında veya sürücü kapısı iç
            kısmında bir etiket üzerinde bulunur.
          </p>
        </div>
        <div className="border-t border-gray-100 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
}

function VehicleFoundCard({ result }: { result: VehicleLookupResult }) {
  const specByParent = (parentId: number) =>
    result.specs.find((s) => s.parentId === parentId)?.name;
  const years = result.specs
    .filter((s) => s.parentId === 16)
    .map((s) => s.name);
  const yearRange =
    years.length > 1 ? `${years[0]}-${years[years.length - 1]}` : years[0];

  return (
    <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-emerald-800">
            Aracınız bulundu
          </p>
          <p className="mt-0.5 text-lg font-bold text-light-text-primary">
            {result.brandName} {result.modelName}{" "}
            {yearRange ? `(${yearRange})` : ""}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {specByParent(15) && specByParent(14) ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs text-light-text-primary shadow-sm">
                {specByParent(15)} {specByParent(14)}
              </span>
            ) : null}
            {specByParent(3) ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs text-light-text-primary shadow-sm">
                {specByParent(3)}
              </span>
            ) : null}
            {specByParent(7) && specByParent(8) ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs text-light-text-primary shadow-sm">
                {specByParent(7)} {specByParent(8)} Vites
              </span>
            ) : null}
            {specByParent(9) ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs text-light-text-primary shadow-sm">
                {specByParent(9)}
              </span>
            ) : null}
            {specByParent(13) ? (
              <span className="rounded-full bg-white px-2.5 py-1 text-xs text-light-text-primary shadow-sm">
                Motor Kodu: {specByParent(13)}
              </span>
            ) : null}
          </div>
          <Link
            href="/on-tampon"
            className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-sp-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
          >
            Uyumlu Parçaları İncele
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ChassisLookupHero() {
  const [vin, setVin] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [result, setResult] = useState<VehicleLookupResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  function handleSubmit(vinOverride?: string) {
    const value = vinOverride ?? vin;
    if (value.length !== 17) return;
    const match = vinLookupDatabase[value];
    if (match) {
      setResult(match);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  }

  function tryExample() {
    setVin(EXAMPLE_VIN);
    setResult(vinLookupDatabase[EXAMPLE_VIN]);
    setNotFound(false);
  }

  // Pre-fill and auto-run the lookup when arriving with ?vin=... from the
  // homepage's "Şasi No" quick-search tab or the bakım robotu wizard.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vinParam = params.get("vin")?.toUpperCase().trim();
    if (vinParam && vinParam.length === 17) {
      setVin(vinParam);
      handleSubmit(vinParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="vin-arama"
      className="bg-gradient-to-br from-gray-50 to-white py-10 sm:py-14"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Şasi Numarası ile Parça Bul
          </h1>
          <p className="text-base text-gray-500 md:text-lg">
            Şasi numaranızı girin, aracınıza %100 uyumlu parçaları anında
            bulun
          </p>
        </div>

        <div className="rounded-md border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="vin-input"
              className="text-sm font-medium text-light-text-primary"
            >
              Şasi Numarası (VIN)
            </label>
            <button
              type="button"
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-1 p-1 text-xs text-sp-accent transition-colors hover:text-sp-accent-hover"
            >
              <HelpCircle className="size-3.5" />
              Nerede Bulurum?
            </button>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <input
                id="vin-input"
                type="text"
                value={vin}
                maxLength={17}
                autoComplete="off"
                onChange={(e) => {
                  setVin(e.target.value.toUpperCase());
                  setResult(null);
                  setNotFound(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
                placeholder="Örnek: WVWZZZ3CZWE123456"
                className="w-full rounded-md border border-gray-300 px-4 py-3 pr-16 font-mono text-sm uppercase tracking-wider text-light-text-primary placeholder-gray-400 transition-all focus:border-sp-accent focus:outline-none focus:ring-2 focus:ring-sp-accent/40 sm:pr-24 sm:text-base"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] text-gray-400 sm:text-xs">
                {vin.length}/17<span className="hidden sm:inline"> karakter</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={vin.length !== 17}
              className="flex items-center justify-center gap-2 rounded-md bg-sp-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <Search className="size-4" />
              Araç Bul
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-light-bg-muted px-3 py-1.5 text-xs text-light-text-primary">
              <ShieldCheck className="size-3.5 text-sp-accent" />
              %100 Uyumlu
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-light-bg-muted px-3 py-1.5 text-xs text-light-text-primary">
              <Gauge className="size-3.5 text-sp-accent" />
              Anında Sonuç
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-light-bg-muted px-3 py-1.5 text-xs text-light-text-primary">
              <ShieldCheck className="size-3.5 text-sp-accent" />
              Güvenli Arama
            </span>
          </div>

          {result ? <VehicleFoundCard result={result} /> : null}

          {notFound ? (
            <div className="mt-5 rounded-md border border-orange-200 bg-orange-50 p-4 text-sm">
              <p className="text-light-text-primary">
                Bu şase numarası için sistemimizde bir eşleşme bulunamadı.
                Örnek olarak{" "}
                <button
                  type="button"
                  onClick={tryExample}
                  className="font-mono font-medium text-sp-accent underline underline-offset-2"
                >
                  {EXAMPLE_VIN}
                </button>{" "}
                numarasını deneyebilirsiniz.
              </p>
            </div>
          ) : null}

          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <Link
              href="/bakim-robotu"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-sp-accent transition-colors hover:text-sp-accent-hover"
            >
              <Car className="size-4" />
              Marka / Model / Yıl ile Ara
              <ArrowRight className="size-4" />
            </Link>
            <p className="mt-1 text-xs text-light-text-muted">
              Şasi numaranıza ulaşamıyorsanız alternatif arama kullanın
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statCounters.map((stat) => {
            const Icon = STAT_ICONS[stat.icon];
            return (
              <div
                key={stat.label}
                className={cn(
                  "rounded-md border border-gray-100 bg-white p-3 text-center shadow-sm transition-all hover:border-gray-200 hover:shadow sm:p-4",
                )}
              >
                <Icon className="mx-auto mb-1 size-4 text-sp-accent" />
                <p className="text-xl font-bold text-light-text-primary sm:text-2xl">
                  {stat.value}
                </p>
                <p className="text-xs text-light-text-muted">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {showHelp ? <WhereToFindModal onClose={() => setShowHelp(false)} /> : null}
    </section>
  );
}
