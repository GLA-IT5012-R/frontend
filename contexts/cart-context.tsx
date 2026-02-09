"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

/* ---------------- Types ---------------- */

export type CartItem = {
  id: string;

  snowboard: {
    id: string;
    name: string;
    typeId: string;
    texture: string;
  };

  size: string;
  flex: string;
  finish: string;

  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
};

/* ---------------- Context ---------------- */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ---------------- Provider ---------------- */

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isLoaded } = useUser();

  const [items, setItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [hasSyncedCart, setHasSyncedCart] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  /* -------- Detect user change -------- */

  useEffect(() => {
    if (!isLoaded) return;

    const newUserId = user?.id || null;

    if (currentUserId !== newUserId) {
      setItems([]);
      setHasSyncedCart(false);

      const isLoggingOut =
        currentUserId !== null && newUserId === null;
      const isSwitchingUsers =
        currentUserId !== null &&
        newUserId !== null &&
        currentUserId !== newUserId;

      if (isLoggingOut || isSwitchingUsers) {
        localStorage.removeItem("suburbia-cart");
      }

      setCurrentUserId(newUserId);
    }
  }, [user?.id, isLoaded, currentUserId]);

  /* -------- Load cart -------- */

  useEffect(() => {
    setIsClient(true);

    const loadFromLocalStorage = () => {
      const saved = localStorage.getItem("suburbia-cart");
      if (!saved) return;

      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local cart", e);
      }
    };

    const loadCart = async () => {
      if (isLoaded && user && !hasSyncedCart) {
        try {
          const res = await fetch("/api/cart");
          if (!res.ok) throw new Error("Failed to fetch cart");

          const data = await res.json();
          const dbItems: CartItem[] = data.cart?.items || [];

          const localCart = localStorage.getItem("suburbia-cart");

          if (localCart) {
            const localItems: CartItem[] = JSON.parse(localCart);
            const merged = [...dbItems];

            localItems.forEach((localItem) => {
              const exist = merged.find(
                (i) => i.id === localItem.id
              );
              if (exist) {
                exist.quantity += localItem.quantity;
              } else {
                merged.push(localItem);
              }
            });

            setItems(merged);

            await fetch("/api/cart", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items: merged }),
            });

            localStorage.removeItem("suburbia-cart");
          } else {
            setItems(dbItems);
          }

          setHasSyncedCart(true);
        } catch (e) {
          console.error("DB cart failed, fallback local", e);
          loadFromLocalStorage();
          setHasSyncedCart(true);
        }
      }

      if (isLoaded && !user && !hasSyncedCart) {
        loadFromLocalStorage();
        setHasSyncedCart(true);
      }
    };

    loadCart();
  }, [isLoaded, user, hasSyncedCart]);

  /* -------- Persist cart -------- */

  useEffect(() => {
    if (!isClient || !hasSyncedCart) return;

    const actualUserId = user?.id || null;
    if (actualUserId !== currentUserId) return;

    if (user) {
      fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      }).catch(console.error);
    } else {
      localStorage.setItem("suburbia-cart", JSON.stringify(items));
    }
  }, [items, isClient, hasSyncedCart, user, currentUserId]);

  /* -------- Actions -------- */

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    const exists = items.find((i) => i.id === newItem.id);

    setItems((prev) =>
      exists
        ? prev.map((i) =>
            i.id === newItem.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prev, { ...newItem, quantity: 1 }]
    );

    toast.success(exists ? "Updated quantity" : "Added to cart");
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Removed from cart");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeItem(id);

    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = async () => {
    setItems([]);

    if (user) {
      await fetch("/api/cart", { method: "DELETE" });
    } else {
      localStorage.removeItem("suburbia-cart");
    }
  };

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce(
    (s, i) => s + i.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ---------------- Hook ---------------- */

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
