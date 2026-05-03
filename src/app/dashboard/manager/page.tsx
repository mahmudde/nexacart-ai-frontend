"use client";

import Link from "next/link";
import { ArrowRight, AlertTriangle, ShoppingCart } from "lucide-react";
import { ManagerDashboardShell } from "@/components/dashboard/manager/manager-dashboard-shell";
import { ManagerOverviewCards } from "@/components/dashboard/manager/manager-overview-cards";
import { useManagerDashboardOverview } from "@/hooks/use-dashboard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManagerDashboardPage() {
  const overviewQuery = useManagerDashboardOverview();

  const lowStockProducts = overviewQuery.data?.data?.lowStockProducts ?? [];
  const recentOrders = overviewQuery.data?.data?.recentOrders ?? [];

  return (
    <ManagerDashboardShell>
      <div className="space-y-8">
        <div className="glass rounded-[2.5rem] p-8">
          <p className="mb-3 text-sm text-muted-foreground">
            Manage products, stock, orders, and AI-assisted product creation.
          </p>
          <h1 className="text-gradient text-4xl font-semibold tracking-tight md:text-5xl">
            Manager Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Track marketplace product performance, review inventory, and create
            better product listings with AI support.
          </p>
        </div>

        <ManagerOverviewCards />

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="glass rounded-[2rem] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-semibold">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Low stock products
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Products that may need restocking soon.
                </p>
              </div>

              <Link
                href="/dashboard/manager/products"
                className={buttonVariants({
                  variant: "outline",
                  className: "rounded-full",
                })}
              >
                Manage
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {overviewQuery.isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-16 rounded-2xl" />
                ))}
              </div>
            )}

            {!overviewQuery.isLoading && lowStockProducts.length === 0 && (
              <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
                <p className="font-medium">No low stock products</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Inventory levels look healthy.
                </p>
              </div>
            )}

            {!overviewQuery.isLoading && lowStockProducts.length > 0 && (
              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-border bg-background/50 p-4"
                  >
                    <div>
                      <p className="line-clamp-1 font-semibold">
                        {product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Sold: {product.soldCount}
                      </p>
                    </div>

                    <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-950">
                      Stock: {product.stock}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass rounded-[2rem] p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-semibold">
                  <ShoppingCart className="h-5 w-5" />
                  Recent orders
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Latest marketplace orders.
                </p>
              </div>

              <Link
                href="/dashboard/manager/orders"
                className={buttonVariants({
                  variant: "outline",
                  className: "rounded-full",
                })}
              >
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {overviewQuery.isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="h-16 rounded-2xl" />
                ))}
              </div>
            )}

            {!overviewQuery.isLoading && recentOrders.length === 0 && (
              <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
                <p className="font-medium">No recent orders</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  New orders will appear here.
                </p>
              </div>
            )}

            {!overviewQuery.isLoading && recentOrders.length > 0 && (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-border bg-background/50 p-4"
                  >
                    <div>
                      <p className="font-semibold">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">
                        ${Number(order.total).toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.status} / {order.paymentStatus}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ManagerDashboardShell>
  );
}
