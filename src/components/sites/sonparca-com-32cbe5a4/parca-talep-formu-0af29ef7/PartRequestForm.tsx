"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, CheckCircle2 } from "lucide-react";

import { useLocalCollection } from "@/hooks/use-local-collection";
import type { PartRequestRecord } from "@/types/account";

const fieldClasses =
  "w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 transition outline-none focus:border-sp-accent focus:ring-2 focus:ring-sp-accent";

/**
 * Talep formu artık gerçek bir hedefe yazıyor: src/app/hesabim/parca-taleplerim
 * sayfasının okuduğu aynı localStorage koleksiyonuna ("kaportabizde:part-requests").
 * Henüz bir sipariş/kimlik doğrulama backend'i olmadığı için resim dosyalarının
 * kendisini değil, sadece seçilen dosya adlarını saklıyoruz — bu, "üye
 * olmadan da (yerel olarak) gerçekten çalışan bir form" ile "olmayan bir
 * dosya yükleme servisini taklit etmek" arasındaki dürüst orta yol.
 */
export function PartRequestForm() {
  const router = useRouter();
  const { add } = useLocalCollection<PartRequestRecord>("kaportabizde:part-requests");

  const [chassisNumber, setChassisNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    const names = Array.from(fileList)
      .slice(0, 5)
      .map((file) => file.name);
    setImages(names);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (chassisNumber.trim().length !== 17) {
      setError("Şase numarası 17 karakter olmalıdır.");
      return;
    }
    if (!contactNumber.trim() || !description.trim()) {
      setError("Lütfen zorunlu alanları doldurun.");
      return;
    }
    setError(null);

    add({
      id: crypto.randomUUID(),
      chassisNumber: chassisNumber.trim().toUpperCase(),
      contactPhone: contactNumber.trim(),
      partList: description.trim(),
      status: "beklemede",
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
    setTimeout(() => router.push("/hesabim/parca-taleplerim"), 1200);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="size-10 text-emerald-600" />
        <p className="font-semibold text-emerald-800">Talebiniz alındı</p>
        <p className="text-sm text-emerald-700">
          Parça Taleplerim sayfasına yönlendiriliyorsunuz...
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-7" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="chassisNumber"
            className="mb-1 text-sm font-semibold text-gray-700"
          >
            Şase Numarası <span className="text-red-500">*</span>
          </label>
          <input
            id="chassisNumber"
            type="text"
            maxLength={17}
            placeholder="17 haneli şase numarası"
            value={chassisNumber}
            onChange={(event) => setChassisNumber(event.target.value.toUpperCase())}
            className={fieldClasses}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="contactNumber"
            className="mb-1 text-sm font-semibold text-gray-700"
          >
            İletişim Numarası <span className="text-red-500">*</span>
          </label>
          <input
            id="contactNumber"
            type="text"
            placeholder="05XX XXX XX XX"
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="description"
          className="mb-1 text-sm font-semibold text-gray-700"
        >
          Parça Listesi <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          rows={8}
          placeholder="Aradığınız parçayı detaylıca açıklayın"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={`${fieldClasses} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="mb-1 text-sm font-semibold text-gray-700">
          Resim Ekle <span className="font-normal text-gray-400">(İsteğe bağlı, maksimum 5 resim)</span>
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 py-8 text-center transition-colors hover:border-sp-accent/40 hover:bg-orange-50"
        >
          <ImagePlus className="size-6 text-gray-400" />
          <span className="text-sm font-medium text-light-text-primary">
            Resim yüklemek için tıklayın
          </span>
          <span className="text-xs text-gray-400">JPG, PNG veya WEBP (maksimum 5MB)</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
        />
        {images.length > 0 ? (
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {images.map((name) => (
              <li
                key={name}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
              >
                {name}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-sp-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sp-accent-hover"
        >
          Talep Gönder
        </button>
      </div>
    </form>
  );
}
