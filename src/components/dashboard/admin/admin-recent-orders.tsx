"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useAdminRecentOrders } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminRecentOrders() {
  const { data, isLoading } = useAdminRecentOrders();

  const orders = data?.data ?? [];

  return (
    <div className="glass rounded-[2rem] p-6">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <ShoppingCart className="h-5 w-5" />
          Recent orders
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Latest marketplace purchases and payment activity.
        </p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 rounded-2xl" />
          ))}
        </div>
      )}

      {!isLoading && orders.length === 0 && (
        <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
          <p className="font-medium">No recent orders</p>
          <p className="mt-1 text-sm text-muted-foreground">
            New orders will appear here.
          </p>
        </div>
      )}

      {!isLoading && orders.length > 0 && (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-[1.5rem] border border-border bg-background/50 p-4"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold">{order.orderNumber}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {order.user?.name || "Customer"} ·{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {order.status}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">
                    {order.paymentStatus}
                  </span>
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    ${Number(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/dashboard/admin/orders"
        className="mt-5 inline-flex text-sm font-medium text-foreground hover:underline"
      >
        View all orders
      </Link>
    </div>
  );
}