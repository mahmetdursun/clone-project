interface HourRow {
  label: string;
  value: string;
}

const customerServiceHours: HourRow[] = [
  { label: "Pazartesi - Cuma:", value: "09:00 - 18:00" },
  { label: "Cumartesi:", value: "09:00 - 14:00" },
  { label: "Pazar:", value: "Kapalı" },
];

const warehouseHours: HourRow[] = [
  { label: "Pazartesi - Cuma:", value: "08:30 - 17:30" },
  { label: "Cumartesi:", value: "09:00 - 13:00" },
  { label: "Pazar:", value: "Kapalı" },
];

function HoursList({ rows }: { rows: HourRow[] }) {
  return (
    <ul className="space-y-2">
      {rows.map((row) => (
        <li key={row.label} className="flex justify-between">
          <span className="text-gray-600">{row.label}</span>
          <span className="font-medium text-gray-800">{row.value}</span>
        </li>
      ))}
    </ul>
  );
}

export function WorkingHoursSection() {
  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-md border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Çalışma Saatlerimiz
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              Müşteri Hizmetleri
            </h3>
            <HoursList rows={customerServiceHours} />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-gray-800">
              Depo ve Sevkiyat
            </h3>
            <HoursList rows={warehouseHours} />
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600">
          Resmi tatillerde çalışma saatlerimiz değişiklik gösterebilir. Güncel
          bilgiler için sosyal medya hesaplarımızı takip edebilirsiniz.
        </div>
      </div>
    </section>
  );
}
