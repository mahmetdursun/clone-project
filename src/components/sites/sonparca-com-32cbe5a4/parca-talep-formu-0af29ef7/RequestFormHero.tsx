import { PartRequestForm } from "./PartRequestForm";

export function RequestFormHero() {
  return (
    <div className="flex w-full items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="flex h-full w-full items-center justify-center py-8">
        <div className="w-full max-w-2xl rounded-md border border-gray-100 bg-white/90 px-4 py-8 sm:px-8 md:px-12 lg:max-w-[80vw] lg:px-16 xl:px-24">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Yedek Parça Talep Formu
            </h1>
            <p className="text-base text-gray-500 md:text-lg">
              Aracınız için ihtiyacınız olan yedek parçayı talep edin.
              Ücretsiz fiyat teklifi alın. Birçok marka ve model için hızlı
              tedarik hizmeti.
            </p>
          </div>

          <PartRequestForm />
        </div>
      </div>
    </div>
  );
}
