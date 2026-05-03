"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem } from "@/types";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/shared/price-display";
import { useRemoveCartItem, useUpdateCartItem } from "@/hooks/use-cart";

type CartItemCardProps = {
  item: CartItem;
  compact?: boolean;
};

export function CartItemCard({ item, compact = false }: CartItemCardProps) {
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  const product = item.product;
  const image = product.images?.[0]?.url || "/placeholder-product.png";

  const activePrice = Number(product.discountPrice ?? product.price);
  const itemTotal = activePrice * item.quantity;

  const handleQuantityChange = (quantity: number) => {
    if (quantity < 1) return;

    updateMutation.mutate({
      itemId: item.id,
      quantity,
    });
  };

  return (
    <article className="rounded-[1.75rem] border border-border bg-card/80 p-4 backdrop-blur-xl">
      <div className="flex gap-4">
        <Link
          href={`/products/${product.slug}`}
          className={
            compact
              ? "relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-muted"
              : "relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-muted"
          }
        >
          <Image
            src={image}
            alt={product.images?.[0]?.altText || product.name}
            fill
            unoptimized
            className="object-cover"
            sizes="120px"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            href={`/products/${product.slug}`}
            className="line-clamp-2 font-semibold leading-snug hover:underline"
          >
            {product.name}
          </Link>

          <p className="mt-1 text-sm text-muted-foreground">
            {product.brand}
          </p>

          <div className="mt-3">
            <PriceDisplay
              price={product.price}
              discountPrice={product.discountPrice}
              size="sm"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center rounded-full border border-border bg-background/50 p-1">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full"
                disabled={item.quantity <= 1 || updateMutation.isPending}
                onClick={() => handleQuantityChange(item.quantity - 1)}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>

              <span className="min-w-8 text-center text-sm font-semibold">
                {item.quantity}
              </span>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full"
                disabled={
                  item.quantity >= product.stock || updateMutation.isPending
                }
                onClick={() => handleQuantityChange(item.quantity + 1)}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-9 w-9 rounded-full text-destructive hover:text-destructive"
              disabled={removeMutation.isPending}
              onClick={() => removeMutation.mutate(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {!compact && (
            <p className="mt-3 text-sm font-medium">
              Item total: ${itemTotal.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}