"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * A tiny localStorage-backed list, used by the /hesabim pages (Garajım,
 * Adreslerim, Parça Taleplerim) until there is a real account backend.
 *
 * Deliberately simple: reads once on mount (SSR-safe — starts empty, then
 * hydrates from localStorage), and every mutation writes the whole array
 * back. Good enough for a single browser/device; it is not shared across
 * devices or synced to a server, which is the honest state of "logged in"
 * features on a site with no auth backend yet.
 */
export function useLocalCollection<T extends { id: string }>(storageKey: string) {
  const [items, setItems] = useState<T[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setItems(JSON.parse(raw) as T[]);
    } catch {
      // Ignore malformed/blocked storage — start from an empty collection.
    } finally {
      setHydrated(true);
    }
  }, [storageKey]);

  const persist = useCallback(
    (next: T[]) => {
      setItems(next);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Storage may be full or blocked (private mode) — state still
        // updates for this session, it just won't survive a reload.
      }
    },
    [storageKey],
  );

  const add = useCallback(
    (item: T) => {
      persist([item, ...items]);
    },
    [items, persist],
  );

  const update = useCallback(
    (id: string, patch: Partial<T>) => {
      persist(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    },
    [items, persist],
  );

  const remove = useCallback(
    (id: string) => {
      persist(items.filter((item) => item.id !== id));
    },
    [items, persist],
  );

  return { items, hydrated, add, update, remove, setAll: persist };
}
