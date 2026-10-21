import Link from "next/link";
import { Home } from "lucide-react";

interface BreadcrumbProps {
  category: { label: string; href: string };
  current: string;
}

export function Breadcrumb({ category, current }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-2 text-sm text-gray-500"
    >
      <Link
        href="/"
        className="flex items-center gap-1 transition-colors hover:text-sp-accent"
      >
        <Home className="size-4" />
        <span>Ana Sayfa</span>
      </Link>
      <span className="text-gray-300">/</span>
      <Link
        href={category.href}
        className="transition-colors hover:text-sp-accent"
      >
        {category.label}
      </Link>
      <span className="text-gray-300">/</span>
      <span className="min-w-0 truncate font-medium text-gray-900">
        {current}
      </span>
    </nav>
  );
}
