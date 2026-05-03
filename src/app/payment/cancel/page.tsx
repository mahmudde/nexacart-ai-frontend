"use client";

import Link from "next/link";
import { ShoppingCart, XCircle } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PaymentCancelPage() {
  return (
    <PublicLayout>
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="glass max-w-2xl rounded-[2.5rem] p-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/15">
            <XCircle className="h-10 w-10 text-destructive" />
          </div>

          <h1 className="text-4xl font-semibold tracking-tight">
            Payment cancelled
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
            Your payment was not completed. You can go back to your cart and
            try checkout again whenever you are ready.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/cart"
              className={cn(buttonVariants(), "h-12 rounded-full px-6")}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>

            <Link
              href="/products"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-full bg-background/50 px-6"
              )}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
