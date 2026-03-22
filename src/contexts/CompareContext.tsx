import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product } from "@/lib/types";

interface CompareContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearAll: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE = 4;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.length >= MAX_COMPARE) return prev;
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const isInCompare = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items]
  );

  const clearAll = useCallback(() => {
    setItems([]);
    setIsOpen(false);
  }, []);

  return (
    <CompareContext.Provider
      value={{ items, addItem, removeItem, isInCompare, clearAll, isOpen, setIsOpen }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
