"use client";

import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "@/components/shared/price-display";
import { RatingStars } from "@/components/shared/rating-stars";
import { useAddToCart } from "@/hooks/use-cart";
import { useAddToWishlist } from "@/hooks/use-wishlist";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);

  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();

  const isOutOfStock = product.stock <= 0;

  const handleQuantityChange = (type: "increase" | "decrease") => {
    setQuantity((current) => {
      if (type === "decrease") {
        return Math.max(1, current - 1);
      }

      return Math.min(product.stock, current + 1);
    });
  };

  const handleAddToCart = () => {
    addToCartMutation.mutate({
      productId: product.id,
      quantity,
    });
  };

  const handleAddToWishlist = () => {
    addToWishlistMutation.mutate(product.id);
  };

  return (
    <aside className="glass h-fit rounded-[2.5rem] p-6 lg:sticky lg:top-28">
      <div className="mb-4 flex flex-wrap gap-2">
        {product.soldCount > 50 && (
          <Badge className="rounded-full bg-primary text-primary-foreground">
            <Sparkles className="mr-1 h-3 w-3" />
            Top Selling
          </Badge>
        )}

        {product.discountPrice && (
          <Badge className="rounded-full bg-amber-400 text-slate-950">
            Discount
          </Badge>
        )}

        <Badge variant="outline" className="rounded-full bg-background/40">
          {product.category?.name || "Marketplace"}
        </Badge>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
        {product.name}
      </h1>

      <p className="mt-4 leading-7 text-muted-foreground">
        {product.shortDescription}
      </p>

      <div className="mt-5">
        <RatingStars
          rating={product.ratingAverage || 0}
          count={product.ratingCount}
        />
      </div>

      <div className="mt-6">
        <PriceDisplay
          price={product.price}
          discountPrice={product.discountPrice}
          size="lg"
        />
      </div>

      <div className="mt-6 grid gap-3 rounded-[1.75rem] border border-border bg-background/50 p-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Brand</span>
          <span className="font-medium">{product.brand}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Stock</span>
          <span className="font-medium">
            {isOutOfStock ? "Out of stock" : `${product.stock} available`}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Sold</span>
          <span className="font-medium">{product.soldCount}</span>
        </div>
      </div>

      {!isOutOfStock && (
        <div className="mt-6 flex items-center justify-between rounded-full border border-border bg-background/50 p-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => handleQuantityChange("decrease")}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="font-semibold">{quantity}</span>

          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => handleQuantityChange("increase")}
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <Button
          size="lg"
          className="rounded-full"
          disabled={isOutOfStock || addToCartMutation.isPending}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="rounded-full bg-background/50"
          disabled={addToWishlistMutation.isPending}
          onClick={handleAddToWishlist}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Secure checkout powered by Stripe after adding products to cart.
      </p>
    </aside>
  );
}