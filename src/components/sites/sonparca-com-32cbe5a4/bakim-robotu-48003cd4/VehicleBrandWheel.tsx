"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Car, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { VEHICLE_MODELS_BY_BRAND } from "./data";
import { WHEEL_GROUPS, getBrandLogo, getModelImage } from "./vehicle-media";

interface VehicleBrandWheelProps {
  /** Çarkta marka + model seçimi tamamlandığında çağrılır. */
  onPick: (brand: string, model: string) => void;
}

const WHEEL_SIZE = 260;
const ITEM_SIZE = 56;
const RADIUS = WHEEL_SIZE / 2 - ITEM_SIZE / 2 - 4;
const AUTOPLAY_DEG_PER_MS = 360 / 26000;

interface SpinTarget {
  from: number;
  to: number;
  start: number;
  duration: number;
}

export function VehicleBrandWheel({ onPick }: VehicleBrandWheelProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const spinRef = useRef<SpinTarget | null>(null);

  const [wheelAngle, setWheelAngle] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [snapping, setSnapping] = useState(false);
  const [locked, setLocked] = useState(false);
  const [activeGroupKey, setActiveGroupKey] = useState<string | null>(null);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [modelQuery, setModelQuery] = useState("");

  const N = WHEEL_GROUPS.length;
  const step = 360 / N;

  const reset = useCallback(() => {
    setActiveGroupKey(null);
    setActiveBrand(null);
    setModelQuery("");
    setLocked(false);
  }, []);

  const snapTo = useCallback(
    (index: number) => {
      const theta = index * step;
      const TARGET_DEG = 0; // seçilen logo sağ tarafa gelsin
      let desired = (TARGET_DEG - theta) % 360;
      if (desired < 0) desired += 360;

      const a = ((wheelAngle % 360) + 360) % 360;
      let delta = (desired - a) % 360;
      if (delta < 0) delta += 360;
      if (delta < 120) delta += 360; // her tıklamada hissedilir bir dönüş olsun

      const duration = Math.min(1.8, Math.max(0.9, delta / 240)) * 1000;
      spinRef.current = { from: a, to: a + delta, start: performance.now(), duration };
      setSnapping(true);
    },
    [step, wheelAngle],
  );

  const handleGroupClick = useCallback(
    (index: number, key: string) => {
      const group = WHEEL_GROUPS[index];
      setActiveGroupKey(key);
      setActiveBrand(group.members[0] ?? null);
      setModelQuery("");
      snapTo(index);
    },
    [snapTo],
  );

  // Otomatik yavaş dönüş — hover/snap/kilit sırasında durur.
  useEffect(() => {
    if (hovering || snapping || locked) return;
    const tick = (ts: number) => {
      const last = lastTsRef.current ?? ts;
      const dt = ts - last;
      lastTsRef.current = ts;
      setWheelAngle((a) => (a + AUTOPLAY_DEG_PER_MS * dt) % 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [hovering, snapping, locked]);

  // Snap (tıklanan logoyu hedef açıya getirme) animasyonu.
  useEffect(() => {
    if (!snapping) return;
    let raf: number;
    const drive = () => {
      const s = spinRef.current;
      if (!s) return;
      const now = performance.now();
      const t = Math.min(1, (now - s.start) / s.duration);
      const eased = 1 - (1 - t) ** 3;
      setWheelAngle((s.from + (s.to - s.from) * eased) % 360);
      if (t < 1) {
        raf = requestAnimationFrame(drive);
      } else {
        setSnapping(false);
        setLocked(true);
      }
    };
    raf = requestAnimationFrame(drive);
    return () => cancelAnimationFrame(raf);
  }, [snapping]);

  // Dışarı tıkla / Escape -> panel kapanır, çark tekrar dönmeye başlar.
  useEffect(() => {
    if (!activeGroupKey) return;
    const onClickAway = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) reset();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") reset();
    };
    document.addEventListener("mousedown", onClickAway, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickAway, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [activeGroupKey, reset]);

  const activeGroup = useMemo(
    () => WHEEL_GROUPS.find((g) => g.key === activeGroupKey) ?? null,
    [activeGroupKey],
  );

  const activeModels = useMemo(() => {
    if (!activeBrand) return [];
    const all = VEHICLE_MODELS_BY_BRAND[activeBrand] ?? [];
    const q = modelQuery.trim().toLocaleLowerCase("tr");
    if (!q) return all;
    return all.filter((m) => m.toLocaleLowerCase("tr").includes(q));
  }, [activeBrand, modelQuery]);

  return (
    <div ref={wrapRef} className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
      <div
        className="relative mx-auto shrink-0"
        style={{ width: WHEEL_SIZE, height: WHEEL_SIZE }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {WHEEL_GROUPS.map((g, i) => {
          const angleDeg = i * step + wheelAngle;
          const rad = (angleDeg * Math.PI) / 180;
          const x = RADIUS * Math.cos(rad);
          const y = RADIUS * Math.sin(rad);
          const isActive = activeGroupKey === g.key;
          return (
            <button
              key={g.key}
              type="button"
              onClick={() => handleGroupClick(i, g.key)}
              title={g.label}
              aria-label={g.label}
              className={cn(
                "absolute flex items-center justify-center rounded-full bg-white shadow-[0_1px_0_rgba(0,0,0,.04),0_6px_18px_rgba(0,0,0,.10)] transition-shadow hover:shadow-[0_1px_0_rgba(0,0,0,.05),0_10px_26px_rgba(0,0,0,.16)]",
                isActive && "ring-2 ring-sp-accent",
              )}
              style={{
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                left: `calc(50% + ${x}px - ${ITEM_SIZE / 2}px)`,
                top: `calc(50% + ${y}px - ${ITEM_SIZE / 2}px)`,
              }}
            >
              <span className="relative block size-[70%]">
                <Image src={g.logo} alt={g.label} fill sizes="40px" className="object-contain" />
              </span>
            </button>
          );
        })}

        <div
          className="absolute rounded-full bg-[radial-gradient(circle_at_50%_50%,#fff_40%,#f3f5f7_100%)] shadow-[inset_0_10px_30px_rgba(0,0,0,.06)]"
          style={{ left: "50%", top: "50%", width: "36%", height: "36%", transform: "translate(-50%, -50%)" }}
        />
      </div>

      <div className="min-h-[220px] flex-1">
        {!activeGroup ? (
          <p className="flex h-full items-center justify-center text-center text-sm text-light-text-muted sm:justify-start sm:text-left">
            Markanızı bulmak için çarktan bir grup seçin.
          </p>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-row gap-2 overflow-x-auto pb-1 sm:w-40 sm:flex-col sm:overflow-visible sm:pb-0">
              {activeGroup.members.map((brand) => {
                const logo = getBrandLogo(brand);
                const isSel = activeBrand === brand;
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => {
                      setActiveBrand(brand);
                      setModelQuery("");
                    }}
                    className={cn(
                      "flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-left text-sm font-medium transition-colors",
                      isSel
                        ? "border-sp-accent bg-orange-50 text-sp-accent"
                        : "border-gray-200 text-gray-700 hover:border-sp-accent/40 hover:bg-orange-50",
                    )}
                  >
                    {logo ? (
                      <span className="relative block size-6 shrink-0">
                        <Image src={logo} alt={brand} fill sizes="24px" className="object-contain" />
                      </span>
                    ) : null}
                    {brand}
                  </button>
                );
              })}
            </div>

            <div className="flex-1">
              <div className="relative mb-3">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={modelQuery}
                  onChange={(e) => setModelQuery(e.target.value)}
                  placeholder={activeBrand ? `${activeBrand} modeli ara...` : "Model ara..."}
                  className="w-full rounded-md border border-gray-200 py-2 pr-3 pl-9 text-sm text-light-text-primary outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
                />
              </div>

              <div className="grid max-h-64 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4">
                {activeModels.map((model) => {
                  const img = activeBrand ? getModelImage(activeBrand, model) : undefined;
                  return (
                    <button
                      key={model}
                      type="button"
                      onClick={() => {
                        if (!activeBrand) return;
                        onPick(activeBrand, model);
                        reset();
                      }}
                      className="flex flex-col items-center gap-1 rounded-md border border-gray-200 p-2 text-center transition-colors hover:border-sp-accent/40 hover:bg-orange-50"
                    >
                      <span className="relative block h-10 w-full">
                        {img ? (
                          <Image src={img} alt={model} fill sizes="80px" className="object-contain" />
                        ) : (
                          <Car className="mx-auto size-6 text-gray-300" />
                        )}
                      </span>
                      <span className="line-clamp-2 text-xs font-medium text-gray-700">{model}</span>
                    </button>
                  );
                })}
                {activeModels.length === 0 ? (
                  <p className="col-span-full py-6 text-center text-sm text-gray-400">Model bulunamadı</p>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
