"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProducts, useTrendingProducts } from "@/hooks/use-products";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { ProductCard } from "@/components/shared/product-card";
import { ProductCardSkeleton } from "@/components/shared/product-card-skeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export function TopProductsSection() {
  const topProductsQuery = useProducts({
    sort: "top-selling",
    page: 1,
    limit: 4,
  });

  const trendingQuery = useTrendingProducts();

  const products = topProductsQuery.data?.data ?? [];
  const trendingProducts = trendingQuery.data?.data?.slice(0, 4) ?? [];

  return (
    <>
      <SectionWrapper>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Top sellers"
            title="Loved by smart shoppers"
            description="Discover high-performing products with strong ratings, real demand, and excellent value."
            className="mb-0"
          />

          <Link
            href="/products?sort=top-selling"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
          >
            View all
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topProductsQuery.isLoading &&
            Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}

          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="pt-4">
        <div className="glass rounded-[2.5rem] p-6 md:p-8">
          <SectionHeader
            eyebrow="Trending now"
            title="Products gaining attention"
            description="Fresh marketplace picks based on sales, views, and customer interest."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trendingQuery.isLoading &&
              Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}

            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
