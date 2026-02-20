"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { FaUser, FaBox, FaPencil, FaArrowLeft } from "react-icons/fa6";
import { useAuth } from '@/contexts/auth-context';
import { getUserOrdersApi } from "@/api/auth";
import { ChevronDown } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

type OrderItemData = {
  order_item_id: number;
  product: {
    id: number;
    name: string;
  } | null;
  quantity: number;
  unit_price: string;
  design_id:{
    id:number;
  }
};

type OrderData = {
  order_id: number;
  total_price: string;
  order_status: string;
  created_at: string;
  items: OrderItemData[];
};


export default function AccountPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const userid = JSON.parse(localStorage.getItem('userInfo'))?.id;

          const res = await getUserOrdersApi(userid);
          if (res.code === 200) {
            setOrders(res.data || []);
          } else {
            console.error("Failed:", res.data.message);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-texture bg-brand-gray flex items-center justify-center">
        <Bounded className="text-center">
          <Heading className="mb-6" as="h1">
            Loading...
          </Heading>
        </Bounded>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-texture py-12">
      <Bounded>
        <div className="max-w-5xl mx-auto">
          {/* Order History */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaBox className="text-brand-purple text-xl md:text-2xl" />
              <Heading className="text-xl md:text-2xl" as="h2">
                Order History
              </Heading>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No orders yet</p>
                <Link
                  href="/products"
                  className="button-cutout inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom px-4 text-lg fl-py-2.5/3 from-brand-blue to-brand-lime text-black"
                >
                  Build Your First  Snowboard
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="block border-b last:border-b-0 pb-6 last:pb-0 hover:bg-gray-50 -mx-4 px-4 py-4 rounded transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-base md:text-lg font-mono break-all">{order.order_status} - ${order.order_id}</p>
                        <p className="text-xs md:text-sm text-gray-600 break-words">
                          {new Date(order.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="sm:text-right flex-shrink-0">
                        <p className="font-bold text-base md:text-lg text-green-600">
                          £{(order.total_price)}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600">Paid via PayPal</p>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex gap-2 sm:gap-3 md:gap-4 items-center">
                          {/* <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                            <Image
                              src={item.deck.texture}
                              alt={item.deck.name}
                              fill
                              className="object-contain rounded"
                            />
                          </div> */}
                          <div className="flex-grow min-w-0">
                            <p className="font-semibold text-xs md:text-sm break-words">{item.product?.name||'Custom snowboard'}</p>
                            <p className="text-[10px] sm:text-xs text-gray-600 truncate">
                              {/* {item.deck.name} • {item.wheel.name} */}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0 min-w-[55px] sm:min-w-[60px]">
                            <p className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap">× {item.quantity}</p>
                            <p className="text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">
                              £{((item.unit_price * item.quantity)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs md:text-sm text-brand-purple font-semibold">
                      Click to view invoice →
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Bounded>
    </div>
  );
}
