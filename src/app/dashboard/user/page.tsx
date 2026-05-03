"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { UserDashboardShell } from "@/components/dashboard/user/user-dashboard-shell";
import { UserOverviewCards } from "@/components/dashboard/user/user-overview-cards";
import { useMyOrders } from "@/hooks/use-orders";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function UserDashboardPage() {
  const ordersQuery = useMyOrders({ page: 1, limit: 5 });

  const orders = ordersQuery.data?.data ?? [];

  return (
    <UserDashboardShell>
      <div className="space-y-8">
        <div className="rounded-xl border border-border bg-background p-8 shadow-sm">
          <p className="mb-3 text-sm text-muted-foreground">
            Welcome back to Velora
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            User Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Track your orders, saved products, reviews, profile information, and
            shopping activity from one place.
          </p>
        </div>

        <UserOverviewCards />

        <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Recent orders</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your latest marketplace activity.
              </p>
            </div>

            <Link
              href="/dashboard/user/orders"
              className={buttonVariants({
                variant: "outline",
                className: "rounded-md",
              })}
            >
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {ordersQuery.isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-16 rounded-lg" />
              ))}
            </div>
          )}

          {!ordersQuery.isLoading && orders.length === 0 && (
            <div className="rounded-lg border border-border bg-background/50 p-8 text-center">
              <p className="font-medium">No orders yet</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your orders will appear here after checkout.
              </p>
            </div>
          )}

          {!ordersQuery.isLoading && orders.length > 0 && (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col justify-between gap-3 rounded-lg border border-border bg-background/50 p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-semibold">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-md bg-muted px-3 py-1">
                      {order.status}
                    </span>
                    <span className="rounded-md bg-muted px-3 py-1">
                      {order.paymentStatus}
                    </span>
                    <span className="font-semibold">
                      ${Number(order.total).toFixed(2)}
                    </span>
                    <Link
                      href={`/dashboard/user/orders/${order.id}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "rounded-md"
                      )}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserDashboardShell>
  );
}
