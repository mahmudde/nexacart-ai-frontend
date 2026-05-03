"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { PublicLayout } from "@/components/layout/public-layout";
import { ProductGallery } from "@/components/product-details/product-gallery";
import { ProductPurchasePanel } from "@/components/product-details/product-purchase-panel";
import { ProductOverview } from "@/components/product-details/product-overview";
import { ProductReviewsSection } from "@/components/product-details/product-reviews-section";
import { RelatedProductsSection } from "@/components/product-details/related-products-section";
import { ProductCardSkeleton } from "@/components/shared/product-card-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useProductDetails } from "@/hooks/use-products";

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = String(params.slug || "");

  const { data, isLoading, isError } = useProductDetails(slug);

  const product = data?.data;

  return (
    <PublicLayout>
      <main className="min-h-screen">
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "mb-6 rounded-full px-0 hover:bg-transparent"
            )}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>

          {isLoading && (
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div className="glass aspect-square rounded-[2.5rem]" />
              <ProductCardSkeleton />
            </div>
          )}

          {isError && (
            <EmptyState
              title="Product not found"
              description="We could not load this product. It may be unavailable or removed."
              action={
                <Link
                  href="/products"
                  className={cn(buttonVariants(), "rounded-full")}
                >
                  Browse Products
                </Link>
              }
            />
          )}

          {product && (
            <>
              <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                <ProductGallery name={product.name} images={product.images} />
                <ProductPurchasePanel product={product} />
              </div>

              <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
                <ProductOverview product={product} />
                <ProductReviewsSection
                  productId={product.id}
                  initialReviews={product.reviews}
                  ratingAverage={product.ratingAverage}
                  ratingCount={product.ratingCount}
                />
              </div>
            </>
          )}
        </section>

        {product && <RelatedProductsSection productId={product.id} />}
      </main>
    </PublicLayout>
  );
}