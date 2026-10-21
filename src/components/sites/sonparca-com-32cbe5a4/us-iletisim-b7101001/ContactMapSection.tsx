import Link from "next/link";
import { MapPin, Star, ExternalLink } from "lucide-react";

export function ContactMapSection() {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Bize Ulaşın
        </h2>
        <div className="relative h-96 w-full overflow-hidden rounded-md border border-gray-100 shadow-sm">
          {/* Static styled placeholder standing in for the live Google Maps
              iframe on the source site — see ContactMapSection.spec.md. */}
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-gray-50 to-gray-100">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative z-10 flex flex-col items-center rounded-md bg-white/90 px-6 py-5 text-center shadow-sm">
              <MapPin className="mb-2 h-8 w-8 text-blue-600" />
              <p className="font-semibold text-gray-800">KaportaBizde</p>
              <div className="mt-0.5 flex items-center gap-1 text-sm text-gray-500">
                <span>4,5</span>
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>(21)</span>
              </div>
              <p className="mt-2 max-w-xs text-sm text-gray-600">
                Firuzköy, Bulvarı Avcılar Belediye Sanayi Sitesi C Blok
                No:12/15, 34325 Avcılar/İstanbul
              </p>
              <Link
                href="https://www.google.com/maps/search/?api=1&query=KaportaBizde+Avcılar+İstanbul"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
              >
                Haritada Görüntüle
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
