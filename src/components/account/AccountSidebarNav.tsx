"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Package, Warehouse, MapPin, Wrench, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface AccountNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: AccountNavItem[] = [
  { href: "/hesabim", label: "Hesabım", icon: User },
  { href: "/hesabim/siparislerim", label: "Siparişlerim", icon: Package },
  { href: "/hesabim/garajim", label: "Garajım", icon: Warehouse },
  { href: "/hesabim/adreslerim", label: "Adreslerim", icon: MapPin },
  { href: "/hesabim/parca-taleplerim", label: "Parça Taleplerim", icon: Wrench },
];

export function AccountSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="w-full shrink-0 rounded-lg border border-gray-200 bg-white sm:w-60">
      <ul className="divide-y divide-gray-100">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/hesabim"
              ? pathname === "/hesabim"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-50 text-sp-accent"
                    : "text-light-text-primary hover:bg-gray-50",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
