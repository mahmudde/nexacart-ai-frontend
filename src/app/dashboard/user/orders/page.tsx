"use client";

import { useState } from "react";
import { UserDashboardShell } from "@/components/dashboard/user/user-dashboard-shell";
import { useMyOrders } from "@/hooks/use-orders";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function UserOrdersPage() {
  const [page, setPage] = useState(1);

  const ordersQuery = useMyOrders({
    page,
    limit: 8,
  });

  const orders = ordersQuery.data?.data ?? [];
  const meta = ordersQuery.data?.meta;

  return (
    <UserDashboardShell>
      <div className="space-y-6">
        <div className="glass rounded-[2.5rem] p-8">
          <h1 className="text-4xl font-semibold">My Orders</h1>
          <p className="mt-3 text-muted-foreground">
            Track your order history, payment status, and fulfillment progress.
          </p>
        </div>

        <div className="glass rounded-[2rem] p-6">
          {ordersQuery.isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-20 rounded-2xl" />
              ))}
            </div>
          )}

          {!ordersQuery.isLoading && orders.length === 0 && (
            <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
              <p className="font-medium">No orders found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Complete checkout to see your orders here.
              </p>
            </div>
          )}

          {!ordersQuery.isLoading && orders.length > 0 && (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-[1.5rem] border border-border bg-background/50 p-4"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <p className="font-semibold">{order.orderNumber}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {order.status}
                      </span>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {order.paymentStatus}
                      </span>
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        ${Number(order.total).toFixed(2)}
                      </span>
                      <Link
                        href={`/dashboard/user/orders/${order.id}`}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "h-7 rounded-full bg-background/50 px-3 text-xs"
                        )}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                    <p>Items: {order.items?.length ?? 0}</p>
                    <p>Ship to: {order.shippingCity}, {order.shippingCountry}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {meta?.totalPages && meta.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {meta.page} of {meta.totalPages}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={page >= (meta.totalPages ?? 1)}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </UserDashboardShell>
  );
}
