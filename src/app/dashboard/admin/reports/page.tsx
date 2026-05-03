"use client";

import {
  BarChart3,
  Boxes,
  Download,
  FileText,
  ShoppingCart,
  Users,
} from "lucide-react";
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell";
import { Button } from "@/components/ui/button";

const reports = [
  {
    title: "Sales Report",
    description:
      "Revenue, paid orders, unpaid orders, refunds, and checkout trends.",
    icon: BarChart3,
  },
  {
    title: "Product Report",
    description:
      "Product stock, top-selling items, low-stock products, and views.",
    icon: Boxes,
  },
  {
    title: "User Report",
    description:
      "Users, managers, blocked accounts, registrations, and customer activity.",
    icon: Users,
  },
  {
    title: "Order Report",
    description:
      "Order status distribution, fulfillment performance, and payment states.",
    icon: ShoppingCart,
  },
];

export default function AdminReportsPage() {
  return (
    <AdminDashboardShell>
      <div className="space-y-6">
        <div className="glass rounded-[2.5rem] p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            Reports center
          </p>

          <h1 className="text-gradient text-4xl font-semibold tracking-tight md:text-5xl">
            Reports
          </h1>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Generate and review operational reports for sales, orders, products,
            users, and marketplace health.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {reports.map((report) => (
            <div
              key={report.title}
              className="glass rounded-[2rem] p-6 transition-all hover:-translate-y-1"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <report.icon className="h-6 w-6" />
              </div>

              <h2 className="text-2xl font-semibold">{report.title}</h2>

              <p className="mt-3 leading-7 text-muted-foreground">
                {report.description}
              </p>

              <Button
                type="button"
                variant="outline"
                className="mt-6 rounded-full bg-background/50"
                disabled
              >
                <Download className="mr-2 h-4 w-4" />
                Export coming soon
              </Button>
            </div>
          ))}
        </div>

        <div className="glass rounded-[2rem] p-6">
          <h2 className="text-2xl font-semibold">Implementation note</h2>

          <p className="mt-3 leading-7 text-muted-foreground">
            Report export can be added later using backend CSV/PDF endpoints.
            For the final project demo, this page confirms a professional admin
            reporting section and can be expanded after dashboard management
            flows are complete.
          </p>
        </div>
      </div>
    </AdminDashboardShell>
  );
}
