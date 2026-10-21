"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "kaportabizde:cart";
const UNDO_TIMEOUT_MS = 6000;

interface RemovedEntry {
  item: CartItem;
  /** Re-mounted every removal so the toast timer restarts on a fresh remove. */
  token: number;
}

interface CartContextValue {
  items: CartItem[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  lastRemoved: RemovedEntry | null;
  undoRemove: () => void;
  dismissUndo: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [lastRemoved, setLastRemoved] = useState<RemovedEntry | null>(null);
  const undoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeToken = useRef(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // Malformed/blocked storage — start from an empty cart.
    } finally {
      setHydrated(true);
    }
  }, []);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage full or blocked (private mode) — state still updates for
      // this session, it just won't survive a reload.
    }
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((entry) => entry.id === item.id);
        const next = existing
          ? current.map((entry) =>
              entry.id === item.id
                ? { ...entry, quantity: entry.quantity + quantity }
                : entry,
            )
          : [{ ...item, quantity }, ...current];
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore — see persist() above.
        }
        return next;
      });
    },
    [],
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity < 1) return;
      persist(items.map((entry) => (entry.id === id ? { ...entry, quantity } : entry)));
    },
    [items, persist],
  );

  const removeItem = useCallback(
    (id: string) => {
      const item = items.find((entry) => entry.id === id);
      persist(items.filter((entry) => entry.id !== id));
      if (item) {
        removeToken.current += 1;
        setLastRemoved({ item, token: removeToken.current });
        if (undoTimer.current) clearTimeout(undoTimer.current);
        undoTimer.current = setTimeout(() => setLastRemoved(null), UNDO_TIMEOUT_MS);
      }
    },
    [items, persist],
  );

  const undoRemove = useCallback(() => {
    if (!lastRemoved) return;
    if (undoTimer.current) clearTimeout(undoTimer.current);
    setLastRemoved(null);
    setItems((current) => {
      if (current.some((entry) => entry.id === lastRemoved.item.id)) return current;
      const next = [lastRemoved.item, ...current];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore — see persist() above.
      }
      return next;
    });
  }, [lastRemoved]);

  const dismissUndo = useCallback(() => {
    if (undoTimer.current) clearTimeout(undoTimer.current);
    setLastRemoved(null);
  }, []);

  const clear = useCallback(() => {
    persist([]);
  }, [persist]);

  const itemCount = useMemo(
    () => items.reduce((sum, entry) => sum + entry.quantity, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, entry) => sum + entry.unitPrice * entry.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      hydrated,
      itemCount,
      subtotal,
      isDrawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      clear,
      lastRemoved,
      undoRemove,
      dismissUndo,
    }),
    [
      items,
      hydrated,
      itemCount,
      subtotal,
      isDrawerOpen,
      addItem,
      updateQuantity,
      removeItem,
      clear,
      lastRemoved,
      undoRemove,
      dismissUndo,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
