import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { PageHeader } from "@/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/PageHeader";
import { FilterSidebar } from "@/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/FilterSidebar";
import { ProductToolbar } from "@/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/ProductToolbar";
import { ProductListingCard } from "@/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/ProductListingCard";
import { Pagination } from "@/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/Pagination";
import { onTamponProducts } from "@/components/sites/sonparca-com-32cbe5a4/on-tampon-9ed11181/data";

const TOTAL_RESULTS = 6810;
const PAGE_SIZE = 20;

export default function OnTamponPage() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-6">
        <PageHeader />
        <div className="flex flex-col gap-4 lg:flex-row">
          <FilterSidebar />
          <div className="min-w-0 flex-1">
            <ProductToolbar resultCount={TOTAL_RESULTS} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {onTamponProducts.map((product) => (
                <ProductListingCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={1}
              totalPages={Math.ceil(TOTAL_RESULTS / PAGE_SIZE)}
              totalResults={TOTAL_RESULTS}
              pageSize={PAGE_SIZE}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
