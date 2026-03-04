import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Product } from "@/lib/types";

export interface CartItem {
  product: Product;
  quantity: number;
  extendedWarranty: boolean; // +2 yıl garanti
  expressDelivery: boolean;  // bugün kurulum
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWarranty: (productId: string) => void;
  toggleExpressDelivery: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  warrantyTotal: number;
  expressTotal: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "zorlu-cart";
const EXPRESS_FEE = 2000;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1, extendedWarranty: false, expressDelivery: false }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== productId));
      return;
    }
    setItems(prev => prev.map(i =>
      i.product.id === productId ? { ...i, quantity } : i
    ));
  }, []);

  const toggleWarranty = useCallback((productId: string) => {
    setItems(prev => prev.map(i =>
      i.product.id === productId ? { ...i, extendedWarranty: !i.extendedWarranty } : i
    ));
  }, []);

  const toggleExpressDelivery = useCallback((productId: string) => {
    setItems(prev => prev.map(i =>
      i.product.id === productId ? { ...i, expressDelivery: !i.expressDelivery } : i
    ));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const subtotal = items.reduce((sum, i) => {
    const price = i.product.salePrice || i.product.price;
    return sum + price * i.quantity;
  }, 0);

  const warrantyTotal = items.reduce((sum, i) => {
    if (!i.extendedWarranty) return sum;
    const price = i.product.salePrice || i.product.price;
    return sum + (price * 0.5) * i.quantity; // yarı fiyat
  }, 0);

  const expressTotal = items.reduce((sum, i) => {
    if (!i.expressDelivery) return sum;
    return sum + EXPRESS_FEE * i.quantity;
  }, 0);

  const grandTotal = subtotal + warrantyTotal + expressTotal;

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity,
      toggleWarranty, toggleExpressDelivery, clearCart,
      itemCount, subtotal, warrantyTotal, expressTotal, grandTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
