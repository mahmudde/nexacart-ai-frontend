"use client";

import type { Product } from "@/types";
import { ProductCard } from "@/components/shared/product-card";
import { ProductCardSkeleton } from "@/components/shared/product-card-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

type ProductsGridProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  onReset: () => void;
};

export function ProductsGrid({
  products,
  isLoading,
  isError,
  onReset,
}: ProductsGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Failed to load products"
        description="Something went wrong while loading products. Please try again."
        action={
          <Button onClick={onReset} className="rounded-full">
            Reset filters
          </Button>
        }
      />
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        title="No products found"
        description="Try changing your search, category, price, or rating filters."
        action={
          <Button onClick={onReset} className="rounded-full">
            Clear filters
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}