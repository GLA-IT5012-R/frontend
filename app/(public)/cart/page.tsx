'use client';
import React, { useState, useEffect } from "react";
import { Bounded } from "@/components/Bounded";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// 数据类型
interface Customisation {
  id: number;
  product_id: number;
  p_size: string;
  p_finish: string;
  p_flex: string;
  p_textures: Record<string, string[]>;
}

interface CartItem {
  id: number;
  user_id: number;
  design: Customisation;
  quantity: number;
  unit_price: number;
}

// 模拟购物车初始数据
const initialCart: CartItem[] = [
  {
    id: 1,
    user_id: 101,
    design: {
      id: 201,
      product_id: 301,
      p_size: "M",
      p_finish: "Glossy",
      p_flex: "Medium",
      p_textures: { top: ["TX001.png"], bottom: ["TX002.png"] },
    },
    quantity: 1,
    unit_price: 499.99,
  },
  {
    id: 2,
    user_id: 101,
    design: {
      id: 202,
      product_id: 302,
      p_size: "L",
      p_finish: "Matte",
      p_flex: "Soft",
      p_textures: { top: ["TX003.png"], bottom: ["TX004.png"] },
    },
    quantity: 2,
    unit_price: 599.99,
  },
];

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // const stored = localStorage.getItem("cart");
    // if (stored) setCart(JSON.parse(stored));
    // else setCart(initialCart);
    setCart(initialCart)
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.unit_price * item.quantity, 0).toFixed(2);

  return (
    <Bounded className="bg-brand-gray p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded shadow"
            >
              <div className="flex-1 space-y-1">
                <p>
                  <span className="font-semibold">Size:</span> {item.design.p_size} |{" "}
                  <span className="font-semibold">Finish:</span> {item.design.p_finish} |{" "}
                  <span className="font-semibold">Flex:</span> {item.design.p_flex}
                </p>
                <p className="text-sm text-gray-500">
                  Textures: {Object.values(item.design.p_textures).flat().join(", ")}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <Input
                  type="number"
                  value={item.quantity}
                  min={1}
                  className="w-20"
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                />
                <p className="font-semibold">${(item.unit_price * item.quantity).toFixed(2)}</p>
                <Button variant="destructive" onClick={() => removeItem(item.id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6 text-xl font-bold">
            Total: ${getTotal()}
          </div>
          <div className="text-right mt-2">
            <Button>Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </Bounded>
  );
};

export default Cart;