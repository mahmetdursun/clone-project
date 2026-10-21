"use client";

import { useState } from "react";
import { CreditCard as CreditCardIcon } from "lucide-react";

const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
const YEARS = Array.from({ length: 12 }, (_, i) => String(new Date().getFullYear() + i).slice(2));

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <div className="space-y-4">
      <div className="relative mx-auto flex h-44 w-full max-w-sm flex-col justify-between rounded-xl bg-gradient-to-br from-dark-bg to-dark-bg-light p-5 text-white shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium tracking-wide text-dark-text-muted">
            KaportaBizde
          </span>
          <CreditCardIcon className="size-6 text-dark-text-muted" />
        </div>
        <p className="font-mono text-lg tracking-widest">
          {cardNumber || "•••• •••• •••• ••••"}
        </p>
        <div className="flex items-end justify-between text-xs">
          <span className="max-w-[60%] truncate uppercase tracking-wide">
            {cardName || "AD SOYAD"}
          </span>
          <span>
            {month || "AA"}/{year || "YY"}
          </span>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-light-text-primary">
          Kart Numarası
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={cardNumber}
          onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
          placeholder="0000 0000 0000 0000"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-light-text-primary">
          Kart Üzerindeki İsim
        </label>
        <input
          type="text"
          value={cardName}
          onChange={(event) => setCardName(event.target.value)}
          placeholder="AD SOYAD"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm uppercase outline-none placeholder:text-gray-400 placeholder:normal-case focus-visible:ring-2 focus-visible:ring-sp-accent"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-light-text-primary">Ay</label>
          <select
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sp-accent"
          >
            <option value="">AA</option>
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-light-text-primary">Yıl</label>
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-sp-accent"
          >
            <option value="">YY</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-light-text-primary">CVV</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={3}
            value={cvv}
            onChange={(event) => setCvv(event.target.value.replace(/\D/g, "").slice(0, 3))}
            placeholder="000"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-sp-accent"
          />
        </div>
      </div>
    </div>
  );
}
