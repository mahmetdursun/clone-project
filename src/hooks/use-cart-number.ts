"use client";

import { useEffect } from "react";

import { useLocalStorageValue } from "./use-local-storage-value";

const STORAGE_KEY = "kaportabizde:cart-number";

function generateCartNumber(): string {
  const raw = 100000 + Math.floor(Math.random() * 900000);
  const text = String(raw);
  return `${text.slice(0, 3)}.${text.slice(3)}`;
}

/**
 * A stable, human-friendly "Sepet Numarası" (e.g. "107.231") for the
 * current cart, matching the reference site. Generated once per browser
 * and kept in localStorage (via useLocalStorageValue) so it survives a
 * reload; support can reference it without needing a real backend order
 * id yet. Cleared by SepetimClient once an order is confirmed, so the
 * next cart gets a fresh number.
 */
export function useCartNumber(): string {
  const [cartNumber, setCartNumber] = useLocalStorageValue<string>(STORAGE_KEY, "");

  useEffect(() => {
    // One-time, client-only generation for a brand-new cart. Guarded by
    // the `cartNumber` check itself, so this can never loop.
    if (!cartNumber) setCartNumber(generateCartNumber());
  }, [cartNumber, setCartNumber]);

  return cartNumber;
}
