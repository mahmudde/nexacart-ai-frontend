"use client";

import Link from "next/link";
import { Star, TrendingUp } from "lucide-react";
import { useAdminTopProducts } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminTopProducts() {
  const { data, isLoading } = useAdminTopProducts();

  const products = data?.data ?? [];

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          <TrendingUp className="h-5 w-5" />
          Top products
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Best performing products by sales and rating.
        </p>
      </div>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 rounded-lg" />
          ))}
        </div>
      )}

      {!isLoading && products.length === 0 && (
        <div className="rounded-lg border border-border bg-background/50 p-8 text-center">
          <p className="font-medium">No product data yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Products will appear here after sales activity.
          </p>
        </div>
      )}

      {!isLoading && products.length > 0 && (
        <div className="space-y-3">
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background/50 p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>

                <div className="min-w-0">
                  <p className="line-clamp-1 font-semibold">{product.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {Number(product.ratingAverage || 0).toFixed(1)}
                  </p>
                </div>
              </div>

              <span className="rounded-md bg-muted px-3 py-1 text-xs font-medium">
                Sold: {product.soldCount}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}