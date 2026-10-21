"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, ShieldCheck, Target, Zap } from "lucide-react";

const features = [
  { icon: Target, title: "%100 Uyum", subtitle: "Doğru parça garantisi" },
  { icon: Zap, title: "Anında Sonuç", subtitle: "Saniyeler içerisinde listeleme" },
  { icon: ShieldCheck, title: "Güvenli Arama", subtitle: "Yanlış parça riskini ortadan kaldırır" },
];

export function HeroBanner() {
  const [slide, setSlide] = useState(0);
  const totalSlides = 2;

  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-navy via-navy-2 to-navy text-white">
      <div className="relative z-10 px-6 py-10 sm:px-10">
        <h2 className="max-w-xl text-2xl font-bold leading-tight sm:text-3xl">
          Şasi Numarası ile{" "}
          <span className="rounded bg-brand px-2 py-0.5">Doğru Parça</span>,
          <br />
          Hızlı ve %100 Uyumlu Sonuç{" "}
          <span className="italic text-brand">KaportaBizde&apos;da</span>
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <f.icon className="h-6 w-6 shrink-0 text-brand" />
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs text-white/70">{f.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 flex items-center gap-2 rounded bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:brightness-95">
          Şasi İle Parça Bul
          <Search className="h-4 w-4" />
        </button>
      </div>

      <button
        aria-label="Önceki"
        onClick={() => setSlide((s) => (s - 1 + totalSlides) % totalSlides)}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Sonraki"
        onClick={() => setSlide((s) => (s + 1) % totalSlides)}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="relative z-10 flex justify-center gap-2 pb-4">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === slide ? "bg-brand" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
