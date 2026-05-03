"use client";

import { Heart } from "lucide-react";
import { UserDashboardShell } from "@/components/dashboard/user/user-dashboard-shell";
import { useWishlist } from "@/hooks/use-wishlist";
import { ProductCard } from "@/components/shared/product-card";
import { ProductCardSkeleton } from "@/components/shared/product-card-skeleton";
import { EmptyState } from "@/components/shared/empty-state";

export default function UserWishlistPage() {
  const wishlistQuery = useWishlist({
    page: 1,
    limit: 20,
  });

  const items = wishlistQuery.data?.data ?? [];

  return (
    <UserDashboardShell>
      <div className="space-y-6">
        <div className="glass rounded-[2.5rem] p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <Heart className="h-4 w-4" />
            Saved products
          </p>
          <h1 className="text-4xl font-semibold">My Wishlist</h1>
          <p className="mt-3 text-muted-foreground">
            Products you saved for later shopping.
          </p>
        </div>

        {wishlistQuery.isLoading && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!wishlistQuery.isLoading && items.length === 0 && (
          <EmptyState
            title="No wishlist items"
            description="Save products you like and they will appear here."
          />
        )}

        {!wishlistQuery.isLoading && items.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <ProductCard key={item.id} product={item.product} />
            ))}
          </div>
        )}
      </div>
    </UserDashboardShell>
  );
}