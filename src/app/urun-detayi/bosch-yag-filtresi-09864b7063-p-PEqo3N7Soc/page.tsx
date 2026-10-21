import type { Metadata } from "next";

import { SiteHeader } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Header";
import { Footer } from "@/components/sites/sonparca-com-32cbe5a4/root-8a5edab2/Footer";
import { Breadcrumb } from "@/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/Breadcrumb";
import { ProductGallery } from "@/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/ProductGallery";
import { ProductBuyBox } from "@/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/ProductBuyBox";
import { AlternativeBrandsSection } from "@/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/AlternativeBrandsSection";
import { ProductDescription } from "@/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/ProductDescription";
import { FAQSection } from "@/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/FAQSection";
import { FAQAccordion } from "@/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/FAQAccordion";
import {
  product,
  techSpecs,
  priceDelivery,
  alternateCodes,
  alternativeBrands,
  faqItems,
  faqBullets,
  faqAccordionItems,
} from "@/components/sites/sonparca-com-32cbe5a4/urun-detayi-bosch-yag-filtresi-09864b7063-p-pequo3n7soc-132c6a8d/data";

export const metadata: Metadata = {
  title: "Bosch Yağ Filtresi 09864B7063 | KaportaBizde | Hızlı Kargo",
  description:
    "Bosch Yağ Filtresi 09864B7063, yağ filtresi kategorisindeki yedek parça ürünüdür. 46544820 OEM koduna sahip bu ürün, orijinal parça standartlarında üretilmiştir.",
};

export default function BoschYagFiltresiProductPage() {
  const inStockAlternatives = alternativeBrands.filter(
    (item) => item.inStock && !item.isCurrent,
  ).length;

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto space-y-6 px-4 py-6">
        <Breadcrumb
          category={{ label: product.categoryLabel, href: product.categoryHref }}
          current={product.title}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProductGallery
            image={product.image}
            alt={product.title}
            sku={product.sku}
          />
          <ProductBuyBox
            categoryLabel={product.categoryLabel}
            brand={product.brand}
            title={product.title}
            oemCode={product.oemCode}
            productCode={product.productCode}
            sku={product.sku}
            price={product.price}
            shipping={product.shipping}
            image={product.image}
          />
        </div>

        <AlternativeBrandsSection
          oemCode={product.oemCode}
          inStockCount={inStockAlternatives}
          items={alternativeBrands}
        />

        <ProductDescription
          description={product.description}
          techSpecs={techSpecs}
          priceDelivery={priceDelivery}
          alternateCodes={alternateCodes}
        />

        <FAQSection items={faqItems} bullets={faqBullets} />

        <FAQAccordion items={faqAccordionItems} />
      </main>
      <Footer />
    </>
  );
}
