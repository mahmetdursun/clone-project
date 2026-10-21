import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { VehicleFinder } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/VehicleFinder";
import { HeroCarousel } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/HeroCarousel";
import { QuickLinksGrid } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/QuickLinksGrid";
import { ProductCarousel } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/ProductCarousel";
import {
  bestSellerProducts,
  newArrivalProducts,
} from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/data";
import { CategoryGrid } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/CategoryGrid";
import { BrandList } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/BrandList";
import { SEOTextBlock } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/SEOTextBlock";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <VehicleFinder />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <HeroCarousel />
        <QuickLinksGrid />
        <ProductCarousel
          title="Çok Satanlar"
          subtitle="En popüler ürünlerimiz"
          products={bestSellerProducts}
          icon="flame"
        />
        <ProductCarousel
          title="✨ Yeni Gelenler"
          subtitle="En yeni ürünleri inceleyin"
          products={newArrivalProducts}
          icon="sparkles"
        />
        <CategoryGrid />
        <BrandList />
        <SEOTextBlock />
      </main>
      <Footer />
    </>
  );
}
