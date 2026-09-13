"use client";

import { createContext, useCallback, useContext, useMemo, useState, useTransition } from "react";
import type { Cart } from "@/lib/types";
import { addToCart, updateCartLine } from "@/lib/cart-actions";

type Ctx = {
  cart: Cart | null;
  open: boolean;
  pending: boolean;
  setOpen: (v: boolean) => void;
  add: (merchandiseId: string, quantity?: number, attributes?: { key: string; value: string }[]) => Promise<void>;
  update: (lineId: string, quantity: number) => Promise<void>;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children, initialCart }: { children: React.ReactNode; initialCart: Cart | null }) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const add = useCallback(async (id: string, q = 1, attributes?: { key: string; value: string }[]) => {
    await new Promise<void>((resolve) =>
      startTransition(async () => {
        try {
          const c = await addToCart(id, q, attributes);
          setCart(c);
          setOpen(true);
        } catch (err) {
          console.error("[cart] toevoegen mislukt", err);
        }
        resolve();
      }),
    );
  }, []);

  const update = useCallback(async (lineId: string, q: number) => {
    await new Promise<void>((resolve) =>
      startTransition(async () => {
        try {
          setCart(await updateCartLine(lineId, q));
        } catch (err) {
          console.error("[cart] bijwerken mislukt", err);
        }
        resolve();
      }),
    );
  }, []);

  const value = useMemo(() => ({ cart, open, pending, setOpen, add, update }), [cart, open, pending, add, update]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
