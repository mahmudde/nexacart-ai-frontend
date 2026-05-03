"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useCartDrawerStore } from "@/store/cart-drawer-store";
import { CartItemCard } from "./cart-item-card";
import { CartEmptyState } from "./cart-empty-state";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const { isOpen, closeCart } = useCartDrawerStore();
  const cartQuery = useCart();

  const cart = cartQuery.data?.data;
  const items = cart?.items ?? [];
  const summary = cart?.summary;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-lg">
        <SheetHeader className="border-b border-border px-5 py-5">
          <SheetTitle className="flex items-center gap-2 text-left">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cartQuery.isLoading && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-32 rounded-[1.75rem]" />
              ))}
            </div>
          )}

          {!cartQuery.isLoading && items.length === 0 && (
            <CartEmptyState compact />
          )}

          {!cartQuery.isLoading && items.length > 0 && (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} compact />
              ))}
            </div>
          )}
        </div>

        {summary && summary.totalItems > 0 && (
          <div className="border-t border-border bg-background/80 p-5 backdrop-blur-xl">
            <div className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  ${summary.subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${summary.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/cart"
                onClick={closeCart}
                className={buttonVariants({
                  variant: "outline",
                  className: "rounded-full bg-background/50",
                })}
              >
                View Cart
              </Link>

              <Link
                href="/checkout"
                onClick={closeCart}
                className={buttonVariants({
                  className: "rounded-full",
                })}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}