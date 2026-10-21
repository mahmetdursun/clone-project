"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart } from "lucide-react";

export function SiteHeader() {
  const [query, setQuery] = useState("");

  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
            SP
          </span>
          <span className="text-xl font-semibold tracking-tight">KaportaBizde</span>
        </Link>
        <div className="flex items-center gap-4">
          <button aria-label="Sepetim" className="relative">
            <ShoppingCart className="h-6 w-6" />
          </button>
          <button aria-label="Menü">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-6">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex overflow-hidden rounded"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Şasi, parça numarası veya ürün kodu ile arayın"
            className="w-full rounded-l bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Ara"
            className="flex items-center justify-center rounded-r bg-brand px-5 text-brand-foreground transition-colors hover:brightness-95"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>
    </header>
  );
}
