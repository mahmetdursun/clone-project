import Link from "next/link";
import { Home } from "lucide-react";

interface GarageTabProps {
  onSwitchToVehicleTab: () => void;
}

export function GarageTab({ onSwitchToVehicleTab }: GarageTabProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-orange-50 text-sp-accent">
        <Home className="size-6" />
      </span>
      <h3 className="font-semibold text-light-text-primary">
        Garajım özelliğini kullanın
      </h3>
      <p className="max-w-sm text-sm text-light-text-muted">
        Araçlarınızı garajınıza ekleyerek uyumlu parçalara tek tıkla ulaşın. Bu
        özellik için giriş yapmanız gerekiyor.
      </p>
      <div className="mt-2 flex gap-3">
        <Link
          href="/auth/giris"
          className="rounded-md bg-sp-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sp-accent-hover"
        >
          Giriş Yap
        </Link>
        <Link
          href="/auth/kayit-ol"
          className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-light-text-primary transition-colors hover:bg-gray-50"
        >
          Kayıt Ol
        </Link>
      </div>
      <button
        type="button"
        onClick={onSwitchToVehicleTab}
        className="mt-1 text-sm text-gray-500 transition-colors hover:text-sp-accent"
      >
        Misafir olarak araç seçimine devam et →
      </button>
    </div>
  );
}
