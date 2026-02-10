"use client";

import { useEffect, useState } from "react";
import { getStatsOverview } from "@/api/auth";

type Stats = {
  user_count: number;
  product_count: number;
  order_count: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    user_count: 0,
    product_count: 0,
    order_count: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStatsOverview();
        const data = res.data || {};
        setStats({
          user_count: data.user_count || 0,
          product_count: data.product_count || 0,
          order_count: 42, // temporary mock data
        });
      } catch (e) {
        console.error("Failed to load stats", e);
      }
    };

    fetchStats();
  }, []);

  const reviewSummary = {
    positive: 70,
    neutral: 20,
    negative: 10,
  };

  const monthlyOrders = [
    { month: "Jan", value: 12 },
    { month: "Feb", value: 18 },
    { month: "Mar", value: 9 },
    { month: "Apr", value: 24 },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">Users</div>
          <div className="mt-2 text-2xl font-bold">{stats.user_count}</div>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">Products</div>
          <div className="mt-2 text-2xl font-bold">{stats.product_count}</div>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="text-sm text-muted-foreground">Orders</div>
          <div className="mt-2 text-2xl font-bold">{stats.order_count}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col rounded-lg border bg-card p-4 shadow-sm">
          <div className="mb-4 text-lg font-semibold">Reviews Overview (mock)</div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative h-40 w-40 rounded-full bg-muted">
              <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center text-sm text-muted-foreground">
                Positive {reviewSummary.positive}%
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-around text-sm text-muted-foreground">
            <span>Positive {reviewSummary.positive}%</span>
            <span>Neutral {reviewSummary.neutral}%</span>
            <span>Negative {reviewSummary.negative}%</span>
          </div>
        </div>

        <div className="flex flex-col rounded-lg border bg-card p-4 shadow-sm">
          <div className="mb-4 text-lg font-semibold">Monthly Orders (mock)</div>
          <div className="flex-1 flex items-end justify-between gap-2">
            {monthlyOrders.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center">
                <div
                  className="w-full max-w-[40px] rounded-t bg-primary"
                  style={{ height: `${item.value * 4}px` }}
                ></div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {item.month}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
