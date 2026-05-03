"use client";

import {
  Boxes,
  FolderTree,
  PackageCheck,
  ShoppingCart,
  Star,
  UserCog,
  Users,
  Wallet,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { useAdminDashboardOverview } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import type { AdminDashboardOverview } from "@/services/dashboard.service";

import { LucideIcon } from "lucide-react";

interface OverviewCard {
  key: keyof AdminDashboardOverview["overviewCards"];
  label: string;
  icon: LucideIcon;
  money?: boolean;
}

const cards: OverviewCard[] = [
  {
    key: "totalUsers",
    label: "Users",
    icon: Users,
  },
  {
    key: "totalManagers",
    label: "Managers",
    icon: UserCog,
  },
  {
    key: "totalProducts",
    label: "Products",
    icon: Boxes,
  },
  {
    key: "totalCategories",
    label: "Categories",
    icon: FolderTree,
  },
  {
    key: "totalOrders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    key: "paidOrders",
    label: "Paid Orders",
    icon: PackageCheck,
  },
  {
    key: "pendingOrders",
    label: "Pending Orders",
    icon: Clock,
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
    key: "totalRevenue",
    label: "Revenue",
    icon: Wallet,
    money: true,
  },
];

export function AdminOverviewCards() {
  const { data, isLoading } = useAdminDashboardOverview();

  const overview = data?.data?.overviewCards;

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-36 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const value = overview?.[card.key] ?? 0;

        return (
          <div
            key={card.key}
            className="rounded-lg border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <card.icon className="h-5 w-5" />
            </div>

            <p className="text-sm text-muted-foreground">{card.label}</p>

            <p className="mt-2 text-3xl font-semibold">
              {card.money ? `$${Number(value).toFixed(2)}` : value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
