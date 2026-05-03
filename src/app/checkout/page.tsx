"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { PublicLayout } from "@/components/layout/public-layout";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";
import { CartEmptyState } from "@/components/cart/cart-empty-state";
import { useCart } from "@/hooks/use-cart";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutPage() {
  const cartQuery = useCart();
  const cart = cartQuery.data?.data;

  return (
    <AuthGuard allowedRoles={["USER"]}>
      <PublicLayout>
        <main className="min-h-screen">
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <Link
              href="/cart"
              className={buttonVariants({
                variant: "ghost",
                className: "mb-6 rounded-full px-0 hover:bg-transparent",
              })}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to cart
            </Link>

            {cartQuery.isLoading && (
              <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                <Skeleton className="h-[520px] rounded-[2.5rem]" />
                <Skeleton className="h-[420px] rounded-[2.5rem]" />
              </div>
            )}

            {!cartQuery.isLoading &&
              (!cart || !cart.items.length || cart.summary.totalItems === 0) && (
                <CartEmptyState />
              )}

            {!cartQuery.isLoading &&
              cart &&
              cart.items.length > 0 &&
              cart.summary.totalItems > 0 && (
                <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                  <CheckoutForm />
                  <CheckoutSummary cart={cart} />
                </div>
              )}
          </section>
        </main>
      </PublicLayout>
    </AuthGuard>
  );
}
