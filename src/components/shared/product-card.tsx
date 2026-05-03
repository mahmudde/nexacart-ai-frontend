"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "./price-display";
import { RatingStars } from "./rating-stars";
import { useAddToCart } from "@/hooks/use-cart";
import { useAddToWishlist } from "@/hooks/use-wishlist";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.[0]?.url || "/placeholder-product.png";
  const hasDiscount = Boolean(product.discountPrice);
  const isTopSelling = product.soldCount > 50;

  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCartMutation.mutate({
      productId: product.id,
      quantity: 1,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlistMutation.mutate(product.id);
  };

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-border hover:shadow-xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={product.images?.[0]?.altText || product.name}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 25vw"
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {isTopSelling && (
            <Badge className="rounded-md bg-primary text-primary-foreground">
              <Sparkles className="mr-1 h-3 w-3" />
              Top Selling
            </Badge>
          )}

          {hasDiscount && (
            <Badge className="rounded-md bg-amber-400 text-slate-950">
              Discount
            </Badge>
          )}
        </div>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4 rounded-md bg-background/80 backdrop-blur-md opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Add to wishlist"
          disabled={addToWishlistMutation.isPending}
          onClick={handleAddToWishlist}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <PriceDisplay
            price={product.price}
            discountPrice={product.discountPrice}
            size="sm"
          />

          <span className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
            {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
          </span>
        </div>

        <h3 className="line-clamp-2 text-lg font-semibold leading-tight">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {product.shortDescription}
        </p>

        <div className="mt-4">
          <RatingStars
            rating={product.ratingAverage || 0}
            count={product.ratingCount}
          />
        </div>

        <div className="mt-auto flex gap-2 pt-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href={`/products/${product.slug}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex-1 rounded-md"
            )}
          >
            View Details
          </Link>

          <Button 
            className="rounded-md px-4" 
            aria-label="Add to cart"
            disabled={product.stock <= 0 || addToCartMutation.isPending}
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
