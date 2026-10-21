/**
 * Real category tree and part-brand list, captured from sonparca.com's
 * server-rendered state (`#ng-state` → `products-data.categories` /
 * `products-data.brands`) on the generic /yedek-parca listing page.
 *
 * This is the same filter sidebar the real site shows on every product
 * listing page, so we reuse it here on our /on-tampon listing page too.
 */
import categoriesJson from "./part-categories.json";
import brandsJson from "./part-brands.json";

export interface CategoryNode {
  id: string;
  name: string;
  children: CategoryNode[];
}

export const partCategories: CategoryNode[] = categoriesJson as CategoryNode[];

export interface PartBrand {
  id: string;
  name: string;
}

export const partBrands: PartBrand[] = (brandsJson as [string, string][]).map(
  ([id, name]) => ({ id, name }),
);

/** The real "Ön Tampon" node id — the only category we have a real listing page for. */
export const ON_TAMPON_CATEGORY_ID = "f38c7a3b-e22b-4f9a-bf7b-165ca3a7fec0";

export function categoryHref(node: CategoryNode): string {
  return node.id === ON_TAMPON_CATEGORY_ID
    ? "/on-tampon"
    : `/yedek-parca?categoryId=${node.id}`;
}
