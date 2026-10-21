"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Hydrates a single JSON-serializable value from localStorage after mount
 * (SSR-safe: starts at `initial`, then syncs once the browser is available).
 * Sibling to useLocalCollection (use-local-collection.ts) but for a single
 * object rather than an array of records.
 */
export function useLocalStorageValue<T>(storageKey: string, initial: T) {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      setValue(raw ? (JSON.parse(raw) as T) : initial);
    } catch {
      setValue(initial);
    }
    // Only ever re-hydrate if the storage key itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const persist = useCallback(
    (next: T) => {
      setValue(next);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Storage may be full or blocked — state still updates for this
        // session, it just won't survive a reload.
      }
    },
    [storageKey],
  );

  return [value, persist] as const;
}
