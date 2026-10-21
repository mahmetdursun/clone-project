"use client";

import { useState, type FormEvent } from "react";

import { useLocalStorageValue } from "@/hooks/use-local-storage-value";
import type { ProfileInfo } from "@/types/account";

const STORAGE_KEY = "kaportabizde:profile";

const EMPTY_PROFILE: ProfileInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export function HesabimClient() {
  const [profile, setProfile] = useLocalStorageValue<ProfileInfo>(STORAGE_KEY, EMPTY_PROFILE);
  const [editing, setEditing] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProfile(profile);
    setEditing(false);
    setSavedAt(new Date().toLocaleTimeString("tr-TR"));
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-light-text-primary">
        Hesap Yönetimi
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-4 rounded-md border border-gray-200 p-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-light-text-primary">
            Profil Bilgileri
          </h3>
          {savedAt ? (
            <span className="text-xs text-emerald-600">
              Kaydedildi ({savedAt})
            </span>
          ) : null}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Ad"
            value={profile.firstName}
            placeholder="Örn: Ahmet"
            disabled={!editing}
            onChange={(v) => setProfile({ ...profile, firstName: v })}
          />
          <Field
            label="Soyad"
            value={profile.lastName}
            placeholder="Örn: Yılmaz"
            disabled={!editing}
            onChange={(v) => setProfile({ ...profile, lastName: v })}
          />
          <Field
            label="E-posta"
            type="email"
            value={profile.email}
            placeholder="ornek@eposta.com"
            disabled={!editing}
            className="sm:col-span-2"
            onChange={(v) => setProfile({ ...profile, email: v })}
          />
          <Field
            label="Telefon"
            type="tel"
            value={profile.phone}
            placeholder="+90"
            disabled={!editing}
            className="sm:col-span-2"
            onChange={(v) => setProfile({ ...profile, phone: v })}
          />
        </div>

        {editing ? (
          <div className="mt-5 flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-md bg-sp-accent px-4 py-2.5 text-center font-medium text-white transition-colors hover:bg-sp-accent-hover"
            >
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-md border border-gray-300 px-4 py-2.5 font-medium text-light-text-primary transition-colors hover:bg-gray-50"
            >
              İptal
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="mt-5 w-full rounded-md border border-sp-accent px-4 py-2.5 text-center font-medium text-sp-accent transition-colors hover:bg-orange-50"
          >
            Düzenle
          </button>
        )}
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  disabled,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block text-sm ${className ?? ""}`}>
      <span className="mb-1.5 block font-medium text-light-text-primary">
        {label}
      </span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 text-light-text-primary outline-none placeholder:text-gray-400 disabled:text-gray-500 enabled:bg-white enabled:focus-visible:ring-2 enabled:focus-visible:ring-sp-accent"
      />
    </label>
  );
}
