"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Search, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  categoryHref,
  partBrands,
  partCategories,
  type CategoryNode,
} from "./catalog-filters";

function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-medium text-light-text-primary">{title}</span>
        <ChevronDown
          className={cn(
            "size-4 text-light-text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? <div className="px-4 py-3 pt-0">{children}</div> : null}
    </div>
  );
}

function FilterSearchInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative mb-2">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded bg-gray-100 py-2 pl-8 pr-3 text-sm text-light-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sp-accent/30"
      />
    </div>
  );
}

/** Flattens the category tree into every node whose name matches the query. */
function flattenMatches(nodes: CategoryNode[], query: string): CategoryNode[] {
  const q = query.toLocaleLowerCase("tr");
  const out: CategoryNode[] = [];
  function walk(list: CategoryNode[]) {
    for (const node of list) {
      if (node.name.toLocaleLowerCase("tr").includes(q)) out.push(node);
      walk(node.children);
    }
  }
  walk(nodes);
  return out;
}

function CategoryRow({
  node,
  depth,
  expandedIds,
  onToggle,
}: {
  node: CategoryNode;
  depth: number;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  const hasChildren = node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);

  return (
    <div
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={false}
    >
      <div className="flex items-center gap-1" style={{ paddingLeft: depth * 14 }}>
        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggle(node.id)}
            aria-label="Alt kategorileri göster"
            className="flex size-5 shrink-0 items-center justify-center rounded text-light-text-muted transition-colors hover:bg-light-bg-muted hover:text-light-text-primary"
          >
            <ChevronRight
              className={cn(
                "size-3.5 transition-transform duration-200",
                isExpanded && "rotate-90",
              )}
            />
          </button>
        ) : (
          <span className="size-5 shrink-0" />
        )}
        <Link
          href={categoryHref(node)}
          title={`${node.name} Yedek Parçaları`}
          className="min-w-0 flex-1 truncate rounded px-2 py-1.5 text-xs text-light-text-primary transition-colors hover:bg-light-bg-muted hover:text-sp-accent sm:text-sm"
        >
          {node.name}
        </Link>
      </div>
      {hasChildren && isExpanded ? (
        <div>
          {node.children.map((child) => (
            <CategoryRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CategoryFilter() {
  const [query, setQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const matches = useMemo(
    () => (query.trim() ? flattenMatches(partCategories, query) : null),
    [query],
  );

  return (
    <div>
      <FilterSearchInput
        placeholder="Kategori ara..."
        value={query}
        onChange={setQuery}
      />
      <div
        role="tree"
        aria-label="Kategori listesi"
        className="max-h-72 space-y-0.5 overflow-y-auto pr-1"
      >
        {matches ? (
          matches.length > 0 ? (
            matches.map((node) => (
              <Link
                key={node.id}
                href={categoryHref(node)}
                title={`${node.name} Yedek Parçaları`}
                className="block truncate rounded px-2 py-1.5 text-xs text-light-text-primary transition-colors hover:bg-light-bg-muted hover:text-sp-accent sm:text-sm"
              >
                {node.name}
              </Link>
            ))
          ) : (
            <p className="py-3 text-center text-xs text-gray-400">
              Kategori bulunamadı
            </p>
          )
        ) : (
          partCategories.map((node) => (
            <CategoryRow
              key={node.id}
              node={node}
              depth={0}
              expandedIds={expandedIds}
              onToggle={toggle}
            />
          ))
        )}
      </div>
    </div>
  );
}

function BrandFilter() {
  const [query, setQuery] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<Set<string>>(new Set());

  const filteredBrands = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    if (!q) return partBrands;
    return partBrands.filter((b) => b.name.toLocaleLowerCase("tr").includes(q));
  }, [query]);

  function toggleBrand(id: string) {
    setSelectedBrandIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div>
      <FilterSearchInput
        placeholder="Marka ara..."
        value={query}
        onChange={setQuery}
      />
      <div
        role="group"
        aria-label="Marka filtresi"
        className="max-h-72 space-y-0.5 overflow-y-auto pr-1"
      >
        {filteredBrands.map((brand) => {
          const checked = selectedBrandIds.has(brand.id);
          return (
            <div
              key={brand.id}
              className="flex items-center gap-2 rounded px-1 py-1 transition-colors hover:bg-light-bg-muted"
            >
              <label className="flex w-full cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleBrand(brand.id)}
                  className="size-4 shrink-0 rounded border-gray-300 text-sp-accent focus:ring-sp-accent/40"
                />
                <Link
                  href={`/yedek-parca?brandId=${brand.id}`}
                  title={`${brand.name} Yedek Parçaları`}
                  onClick={(e) => e.preventDefault()}
                  className="min-w-0 flex-1 truncate text-sm text-light-text-primary"
                >
                  {brand.name}
                </Link>
              </label>
            </div>
          );
        })}
        {filteredBrands.length === 0 ? (
          <p className="py-3 text-center text-xs text-gray-400">
            Marka bulunamadı
          </p>
        ) : null}
      </div>
      {selectedBrandIds.size > 0 ? (
        <p className="mt-2 text-xs text-light-text-muted">
          {selectedBrandIds.size} marka seçildi
        </p>
      ) : null}
    </div>
  );
}

function FilterSidebarContent() {
  return (
    <div>
      <AccordionSection title="Kategori">
        <CategoryFilter />
      </AccordionSection>

      <AccordionSection title="Marka">
        <BrandFilter />
      </AccordionSection>
    </div>
  );
}

export function FilterSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop static column */}
      <aside className="hidden w-full shrink-0 rounded-md border border-gray-100 bg-white shadow-sm lg:block lg:w-72">
        <FilterSidebarContent />
      </aside>

      {/* Mobile toggle + collapsible panel */}
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex w-full items-center justify-center gap-2 rounded border border-gray-200 bg-white px-4 py-3 text-light-text-primary shadow-sm transition-colors hover:bg-light-bg-muted"
        >
          <SlidersHorizontal className="size-4" />
          <span className="font-medium">Filtreler</span>
        </button>
        {mobileOpen ? (
          <div className="mt-3 rounded-md border border-gray-100 bg-white shadow-sm">
            <FilterSidebarContent />
          </div>
        ) : null}
      </div>
    </>
  );
}
