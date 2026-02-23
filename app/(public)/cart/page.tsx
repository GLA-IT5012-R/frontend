'use client';
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Bounded } from "@/components/Bounded";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import { getUserCartApi, updateCartQuantityApi, deleteCartApi, addOrderApi } from "@/api/auth";
import { debounce } from "lodash";

interface Customisation {
  id: number;
  p_size: string;
  p_finish: string;
  p_flex: string;
  p_textures: Record<string, string[]>;
}

interface CartItem {
  cart_item_id: number;
  design: Customisation;
  quantity: number;
  unit_price: string;
  created_at: string;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const userIdRef = useRef<number | null>(null);

  const fetchCart = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userInfo"))?.id;
      userIdRef.current = userId;
      const res = await getUserCartApi(userId);
      if (res.code === 200) {
        setCart(res.data);
        setSelectedItems([]);
      }
    } catch (error) {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const debouncedUpdate = useCallback(
    debounce(async (id: number, quantity: number) => {
      try {
        await updateCartQuantityApi(id, quantity);
      } catch (err) {
        console.error(err);
        toast.error("Failed to update quantity");
        fetchCart();
      }
    }, 500),
    []
  );

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item => (item.cart_item_id === id ? { ...item, quantity } : item))
    );
    debouncedUpdate(id, quantity);
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map(item => item.cart_item_id));
    }
  };

  const removeItems = async (ids: number[]) => {
    if (ids.length === 0) return;
    try {
      await deleteCartApi(ids);
      toast.success("Item(s) removed");
      fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const checkoutSelected = async () => {
    if (selectedItems.length === 0) return;
    try {
      const itemsToOrder = cart.filter(item => selectedItems.includes(item.cart_item_id));
      const orderPayload = itemsToOrder.map(item => ({
        design_id: item.design.id,
        quantity: item.quantity,
        unit_price: parseFloat(item.unit_price),
      }));
      await addOrderApi(orderPayload);
      toast.success("Order created successfully");
      await removeItems(selectedItems);
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    }
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + parseFloat(item.unit_price) * item.quantity, 0).toFixed(2);

  const getSelectedTotal = () =>
    cart
      .filter(item => selectedItems.includes(item.cart_item_id))
      .reduce((sum, item) => sum + parseFloat(item.unit_price) * item.quantity, 0)
      .toFixed(2);

  return (
    <Bounded className="bg-brand-gray p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-3xl py-12">
          <p className="text-gray-600">Your cart is empty..</p>
        </div>
      ) : (
        <>
          {/* 全选 + 批量删除 */}
          <FieldGroup className="mb-4 flex  gap-4">
            <Field orientation="horizontal">
              <Checkbox
                id="select-all"
                checked={selectedItems.length === cart.length}
                onCheckedChange={toggleSelectAll}
              />
              <FieldLabel htmlFor="select-all" >Select All</FieldLabel>

              <Button
                variant="destructive"
                disabled={selectedItems.length === 0}
                onClick={() => removeItems(selectedItems)}
              >
                Delete Selected
              </Button>
            </Field>
          </FieldGroup>

          <div className="space-y-4">
            {cart.map(item => (
              <div
                key={item.cart_item_id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <Field orientation="horizontal">
                    <Checkbox
                      id={`cart-${item.cart_item_id}`}
                      checked={selectedItems.includes(item.cart_item_id)}
                      onCheckedChange={() => toggleSelectItem(item.cart_item_id)}
                    />
                    <FieldLabel htmlFor={`cart-${item.cart_item_id}`}>
                      <span className="font-semibold">Size:</span> {item.design.p_size} |{" "}
                      <span className="font-semibold">Finish:</span> {item.design.p_finish} |{" "}
                      <span className="font-semibold">Flex:</span> {item.design.p_flex}
                    </FieldLabel>
                  </Field>
                </div>

                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <Input
                    type="number"
                    value={item.quantity}
                    min={1}
                    className="w-20"
                    onChange={e =>
                      updateQuantity(item.cart_item_id, Number(e.target.value))
                    }
                  />
                  <p className="font-semibold">
                    £{(parseFloat(item.unit_price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="text-right mt-6 text-xl font-bold">
              Total: £{getTotal()}
            </div>
            <div className="text-right mt-2 text-lg font-semibold">
              Selected Total: £{getSelectedTotal()}
            </div>

            <div className="text-right mt-4 flex justify-end gap-4">
              <Button onClick={() => removeItems(cart.map(i => i.cart_item_id))}>
                Clear Cart
              </Button>
              <Button
                disabled={selectedItems.length === 0}
                onClick={checkoutSelected}
              >
                Checkout Selected
              </Button>
            </div>
          </div>
        </>
      )}
    </Bounded>
  );
};

export default Cart;