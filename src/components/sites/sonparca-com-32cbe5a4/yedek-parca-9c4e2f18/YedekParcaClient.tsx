"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Car, Info } from "lucide-react";

import { readVehicleFromParams } from "@/lib/vehicle-params";
import { VEHICLE_SPECS } from "@/components/sites/sonparca-com-32cbe5a4/bakim-robotu-48003cd4/data";
import { FilterSidebar } from "@/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/FilterSidebar";
import { ProductToolbar } from "@/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/ProductToolbar";
import { Pagination } from "@/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/Pagination";
import { onTamponProducts } from "@/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/data";
import { ProductCarousel } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/ProductCarousel";
import { bestSellerProducts } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/data";
import { VehicleResultsHeader } from "./VehicleResultsHeader";
import { VehicleProductCard } from "./VehicleProductCard";

const PAGE_SIZE = 20;

export function YedekParcaClient() {
  const searchParams = useSearchParams();
  const vehicle = readVehicleFromParams(searchParams);

  if (!vehicle) {
    return (
      <main className="container mx-auto flex flex-col items-center px-4 py-16 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-orange-50 text-sp-accent">
          <Car className="size-8" />
        </span>
        <h1 className="mt-4 text-xl font-bold text-light-text-primary">Araç seçilmedi</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-light-text-muted">
          Bu sayfa, ana ekrandaki &ldquo;Aracınızı Bulun&rdquo; widget&apos;ından bir araç
          seçtiğinizde, o aracın ürünlerini göstermek için açılır.
        </p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-md bg-sp-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
        >
          Ana Sayfaya Dön ve Araç Seçin
        </Link>
      </main>
    );
  }

  const availableYears = [
    ...new Set(VEHICLE_SPECS[vehicle.brand]?.[vehicle.model]?.years ?? [vehicle.year]),
  ].sort((a, b) => a - b);
  const totalResults = onTamponProducts.length;

  return (
    <main className="container mx-auto space-y-4 px-4 py-6">
      <VehicleResultsHeader vehicle={vehicle} availableYears={availableYears} />

      <ProductCarousel
        title="Aracınıza Özel Ürünler"
        subtitle={`${vehicle.brand} ${vehicle.model} için önerilen ürünler`}
        products={bestSellerProducts}
        icon="sparkles"
      />

      <div id="urunler" className="flex flex-col gap-4 lg:flex-row">
        <FilterSidebar />
        <div className="min-w-0 flex-1">
          <ProductToolbar resultCount={totalResults} />
          <p className="mb-3 flex items-start gap-1.5 rounded-md bg-amber-50 p-2.5 text-xs text-amber-800">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            Bu liste genel katalog ürünlerini gösterir — araca özel uyumluluk eşleştirmesi henüz
            eklenmedi.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {onTamponProducts.map((product) => (
              <VehicleProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            currentPage={1}
            totalPages={Math.max(1, Math.ceil(totalResults / PAGE_SIZE))}
            totalResults={totalResults}
            pageSize={PAGE_SIZE}
          />
        </div>
      </div>
    </main>
  );
}
