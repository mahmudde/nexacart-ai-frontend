"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PriceDisplay } from "@/components/shared/price-display";
import { RatingStars } from "@/components/shared/rating-stars";

type AiProductSuggestionCardProps = {
  product: Product;
  onNavigate?: () => void;
};

export function AiProductSuggestionCard({
  product,
  onNavigate,
}: AiProductSuggestionCardProps) {
  const image = product.images?.[0]?.url || "/placeholder-product.png";

  return (
    <div className="rounded-[1.5rem] border border-border bg-background/70 p-3">
      <div className="flex gap-3">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-muted">
          <Image
            src={image}
            alt={product.images?.[0]?.altText || product.name}
            fill
            unoptimized
            className="object-cover"
            sizes="100px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold leading-snug">
            {product.name}
          </p>

          <div className="mt-1">
            <RatingStars
              rating={product.ratingAverage || 0}
              count={product.ratingCount}
            />
          </div>

          <div className="mt-2">
            <PriceDisplay
              price={product.price}
              discountPrice={product.discountPrice}
              size="sm"
            />
          </div>

          <Link
            href={`/products/${product.slug}`}
            className={cn(
              buttonVariants({ size: "sm" }),
              "mt-3 h-8 rounded-full px-4"
            )}
            onClick={onNavigate}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}