"use client";

import { Heart, PackageCheck, ShoppingBag, Star, Wallet } from "lucide-react";
import { useUserDashboardOverview } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

const cardConfig = [
  {
    key: "totalOrders",
    label: "Total Orders",
    icon: PackageCheck,
    money: false,
  },
  {
    key: "totalSpent",
    label: "Total Spent",
    icon: Wallet,
    money: true,
  },
  {
    key: "wishlistItems",
    label: "Wishlist Items",
    icon: Heart,
    money: false,
  },
  {
    key: "cartItems",
    label: "Cart Items",
    icon: ShoppingBag,
    money: false,
  },
  {
    key: "totalReviews",
    label: "Reviews",
    icon: Star,
    money: false,
  },
] as const;

export function UserOverviewCards() {
  const { data, isLoading } = useUserDashboardOverview();

  const overview = data?.data?.overviewCards;

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-36 rounded-[1.75rem]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cardConfig.map((card) => {
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

            <p className="mt-2 text-3xl font-semibold">
              {card.money ? `$${Number(value).toFixed(2)}` : value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
