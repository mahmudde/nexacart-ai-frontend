"use client";

import {
  Eye,
  Package,
  PackageCheck,
  ShoppingCart,
  Star,
  TrendingUp,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { useManagerDashboardOverview } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

const cards = [
  {
    key: "totalProducts",
    label: "Total Products",
    icon: Package,
  },
  {
    key: "activeProducts",
    label: "Active",
    icon: PackageCheck,
  },
  {
    key: "draftProducts",
    label: "Drafts",
    icon: FileText,
  },
  {
    key: "totalOrders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    key: "totalReviews",
    label: "Reviews",
    icon: Star,
  },
  {
    key: "lowStockProducts",
    label: "Low Stock",
    icon: AlertTriangle,
  },
  {
    key: "totalSold",
    label: "Items Sold",
    icon: TrendingUp,
  },
  {
    key: "totalViews",
    label: "Product Views",
    icon: Eye,
  },
] as const;

export function ManagerOverviewCards() {
  const { data, isLoading } = useManagerDashboardOverview();

  const overview = data?.data?.overviewCards;

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-36 rounded-[1.75rem]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const value = overview?.[card.key] ?? 0;

        return (
          <div
            key={card.key}
            className="glass rounded-[1.75rem] p-5 transition-all hover:-translate-y-1"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <card.icon className="h-5 w-5" />
            </div>

            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </div>
        );
      })}
    </div>
  );
}