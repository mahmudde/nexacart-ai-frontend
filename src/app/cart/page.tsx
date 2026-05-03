"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { CartEmptyState } from "@/components/cart/cart-empty-state";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { CartSummaryCard } from "@/components/cart/cart-summary-card";
import { useCart } from "@/hooks/use-cart";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartPage() {
  const cartQuery = useCart();

  const cart = cartQuery.data?.data;
  const items = cart?.items ?? [];
  const summary = cart?.summary;

  return (
    <PublicLayout>
      <main className="min-h-screen">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className={buttonVariants({
              variant: "ghost",
              className: "mb-6 rounded-full px-0 hover:bg-transparent",
            })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue shopping
          </Link>

          <div className="mb-8">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
              <ShoppingBag className="h-4 w-4" />
              Shopping Cart
            </p>

            <h1 className="text-gradient text-4xl font-semibold tracking-tight md:text-6xl">
              Review your cart
            </h1>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              Update quantities, remove items, and continue to secure Stripe
              checkout when you are ready.
            </p>
          </div>

          {cartQuery.isLoading && (
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-36 rounded-[1.75rem]" />
                ))}
              </div>
              <Skeleton className="h-96 rounded-[2.5rem]" />
            </div>
          )}

          {!cartQuery.isLoading && items.length === 0 && <CartEmptyState />}

          {!cartQuery.isLoading && items.length > 0 && summary && (
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>

              <CartSummaryCard summary={summary} />
            </div>
          )}
        </section>
      </main>
    </PublicLayout>
  );
}