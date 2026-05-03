"use client";

import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell";
import { AdminOverviewCards } from "@/components/dashboard/admin/admin-overview-cards";
import { AdminSalesChart } from "@/components/dashboard/admin/admin-sales-chart";
import { AdminTopProducts } from "@/components/dashboard/admin/admin-top-products";
import { AdminRecentOrders } from "@/components/dashboard/admin/admin-recent-orders";

export default function AdminDashboardPage() {
  return (
    <AdminDashboardShell>
      <div className="space-y-8">
        <div className="rounded-xl border border-border bg-background p-8 shadow-sm">
          <p className="mb-3 text-sm text-muted-foreground">
            Manage users, products, orders, content, support, and marketplace
            performance.
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Admin Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Your complete marketplace control center with real-time insights,
            analytics, and operational tools.
          </p>
        </div>

        <AdminOverviewCards />

        <AdminSalesChart />

        <div className="grid gap-6 xl:grid-cols-2">
          <AdminTopProducts />
          <AdminRecentOrders />
        </div>
      </div>
    </AdminDashboardShell>
  );
}
