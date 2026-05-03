"use client";

import { ProductCard } from "@/components/shared/product-card";
import { ProductCardSkeleton } from "@/components/shared/product-card-skeleton";
import { SectionHeader } from "@/components/shared/section-header";
import { useRelatedProducts } from "@/hooks/use-products";

type RelatedProductsSectionProps = {
  productId: string;
};

export function RelatedProductsSection({
  productId,
}: RelatedProductsSectionProps) {
  const { data, isLoading } = useRelatedProducts(productId);

  const products = data?.data ?? [];

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="You might also like"
        title="Related products"
        description="Explore similar products based on category, brand, and tags."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}

        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
