import { Camera, Mail, MapPin, MessageCircle, Phone, Users, X } from "lucide-react";
import { marketplaces } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="mt-8 bg-navy px-4 pb-24 pt-10 text-white sm:pb-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 text-brand" />
            <div>
              <p className="font-semibold">Telefon</p>
              <p className="text-sm text-white/70">0850 302 25 08</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-0.5 h-5 w-5 text-brand" />
            <div>
              <p className="font-semibold">WhatsApp</p>
              <p className="text-sm text-white/70">0850 302 25 08</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-brand" />
            <div>
              <p className="font-semibold">E-posta</p>
              <p className="text-sm text-white/70">destek@sonparca.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 text-brand" />
            <div>
              <p className="font-semibold">Adres</p>
              <p className="text-sm text-white/70">
                Avcılar Sanayi Sitesi No:10, 34325 Avcılar/İstanbul
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Çalışma Saatleri</h3>
          <dl className="space-y-1 text-sm text-white/70">
            <div className="flex justify-between border-b border-white/10 py-1">
              <dt>Pazartesi - Cuma</dt>
              <dd>09:00 - 18:00</dd>
            </div>
            <div className="flex justify-between border-b border-white/10 py-1">
              <dt>Cumartesi</dt>
              <dd>09:00 - 17:00</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt>Pazar</dt>
              <dd>Kapalı</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Sosyal Medya</h3>
          <div className="flex gap-3">
            <a aria-label="Instagram" href="#" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20">
              <Camera className="h-4 w-4" />
            </a>
            <a aria-label="Facebook" href="#" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20">
              <Users className="h-4 w-4" />
            </a>
            <a aria-label="X" href="#" className="rounded-full bg-white/10 p-2.5 hover:bg-white/20">
              <X className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-1 font-semibold">Mağazalarımız</h3>
          <p className="mb-3 text-sm text-white/70">
            Pazaryeri mağazalarımızdan da bizi takip edebilir ve alışveriş
            yapabilirsiniz.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {marketplaces.map((m) => (
              <span
                key={m}
                className="rounded-lg border border-white/10 px-4 py-3 text-center text-sm font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        <p className="border-t border-white/10 pt-6 text-center text-xs text-white/50">
          Bu sayfa, sonparca.com&apos;un ön yüz yapısının öğrenme amaçlı bir
          yeniden inşasıdır ve resmi KaportaBizde sitesiyle ilişkili değildir.
        </p>
      </div>
    </footer>
  );
}
