import type { ComponentType } from "react"
import Link from "next/link"
import {
  ClipboardList,
  List,
  MessageCircle,
  MessageSquare,
  SearchCheck,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { SonparcaQuickLink } from "@/types/sonparca"

type QuickLinkIcon = ComponentType<{ className?: string }>

const ICON_MAP: Record<string, QuickLinkIcon> = {
  List,
  Wrench,
  ClipboardList,
  MessageCircle,
  Truck,
  ShieldCheck,
  MessageSquare,
  SearchCheck,
}

const ICON_STYLES: Record<string, { bg: string; color: string }> = {
  List: { bg: "bg-blue-100", color: "text-blue-600" },
  Wrench: { bg: "bg-purple-100", color: "text-purple-600" },
  ClipboardList: { bg: "bg-amber-100", color: "text-amber-600" },
  MessageCircle: { bg: "bg-sp-accent/10", color: "text-sp-accent" },
  Truck: { bg: "bg-green-100", color: "text-green-600" },
  ShieldCheck: { bg: "bg-teal-100", color: "text-teal-600" },
  MessageSquare: { bg: "bg-emerald-100", color: "text-emerald-600" },
  SearchCheck: { bg: "bg-indigo-100", color: "text-indigo-600" },
}

const QUICK_LINKS: SonparcaQuickLink[] = [
  {
    title: "Tüm Ürünlerimiz",
    subtitle: "1.2M+ ürün çeşidi",
    icon: "List",
    href: "/on-tampon",
  },
  {
    title: "Bakım Robotu",
    subtitle: "Aracınıza özel bakım paketleri",
    icon: "Wrench",
    href: "/bakim-robotu",
  },
  {
    title: "Parça Talep Et",
    subtitle: "Listelerinizi bizimle paylaşın, fiyat teklifimizi verelim",
    icon: "ClipboardList",
    href: "/parca-talep-formu",
  },
  {
    title: "Canlı Destek",
    subtitle: "WhatsApp ile anında ulaşın",
    icon: "MessageCircle",
    accent: true,
    href: "/us/iletisim",
  },
  {
    title: "Hızlı Kargo",
    subtitle: "Stoklu Ürünlerde Aynı Gün Kargolama",
    icon: "Truck",
  },
  {
    title: "Güvenli Ödeme",
    subtitle: "Şifrelemeli 3D Secure altyapı",
    icon: "ShieldCheck",
  },
  {
    title: "WhatsApp Destek",
    subtitle: "Uzman ekibimiz yanınızda",
    icon: "MessageSquare",
    href: "/us/iletisim",
  },
  {
    title: "Gelişmiş Şasi Araması",
    subtitle: "Doğru parçayı kolayca bulun",
    icon: "SearchCheck",
    href: "/sase-numarasi-ile-parca-sorgulama",
  },
]

interface QuickLinkCardProps {
  icon: QuickLinkIcon
  iconBgClassName: string
  iconColorClassName: string
  title: string
  subtitle: string
  variant?: "default" | "accent"
  href?: string
}

function QuickLinkCard({
  icon: Icon,
  iconBgClassName,
  iconColorClassName,
  title,
  subtitle,
  variant = "default",
  href,
}: QuickLinkCardProps) {
  return (
    <Link
      href={href ?? "#"}
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-white p-4 transition-all duration-200 hover:shadow-sm",
        variant === "accent"
          ? "border-sp-accent/30 hover:border-sp-accent/50"
          : "border-gray-200 hover:border-sp-accent/40"
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg p-2",
          iconBgClassName
        )}
      >
        <Icon className={cn("size-5", iconColorClassName)} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </Link>
  )
}

export function QuickLinksGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {QUICK_LINKS.map((link) => {
        const Icon = ICON_MAP[link.icon] ?? List
        const style = link.accent
          ? { bg: "bg-sp-accent/10", color: "text-sp-accent" }
          : ICON_STYLES[link.icon] ?? { bg: "bg-gray-100", color: "text-gray-600" }

        return (
          <QuickLinkCard
            key={link.title}
            icon={Icon}
            iconBgClassName={style.bg}
            iconColorClassName={style.color}
            title={link.title}
            subtitle={link.subtitle}
            variant={link.accent ? "accent" : "default"}
            href={link.href}
          />
        )
      })}
    </div>
  )
}
