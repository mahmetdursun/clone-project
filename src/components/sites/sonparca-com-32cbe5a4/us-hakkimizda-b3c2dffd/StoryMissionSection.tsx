export function StoryMissionSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 md:text-3xl">
              KaportaBizde Hikayemiz
            </h2>
            <p className="mb-4 text-gray-600">
              KaportaBizde olarak, otomotiv yedek parça sektöründe güvenilir
              çözümler sunmak amacıyla yola çıktık. Müşterilerimize en
              kaliteli ürünleri, en uygun fiyatlarla sunarak sektörde fark
              yaratmayı hedefliyoruz.
            </p>
            <p className="text-gray-600">
              Deneyimli ekibimiz ve güçlü tedarikçi ağımız sayesinde,
              ihtiyacınız olan yedek parçalara hızlı ve güvenli bir şekilde
              ulaşmanızı sağlıyoruz. Her zaman müşteri memnuniyetini ön planda
              tutarak, satış öncesi ve sonrası destek hizmetlerimizle
              yanınızdayız.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-md bg-gray-50 p-6 shadow-sm">
              <div className="mb-6">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  Misyonumuz
                </h3>
                <p className="text-gray-600">
                  Müşterilerimize en kaliteli otomotiv yedek parçalarını,
                  rekabetçi fiyatlarla sunarak araç bakım ve onarım
                  süreçlerinde güvenilir bir çözüm ortağı olmak.
                </p>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  Vizyonumuz
                </h3>
                <p className="text-gray-600">
                  Otomotiv yedek parça sektöründe müşteri memnuniyeti ve ürün
                  kalitesiyle öne çıkan, sektörde referans gösterilen bir
                  marka olmak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
