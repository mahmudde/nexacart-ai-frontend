"use client";

import Link from "next/link";
import { CheckCircle2, PackageCheck, ShoppingBag } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PaymentSuccessPage() {
  return (
    <PublicLayout>
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="glass max-w-2xl rounded-[2.5rem] p-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>

          <h1 className="text-gradient text-4xl font-semibold tracking-tight md:text-5xl">
            Payment successful
          </h1>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">
            Thank you for your purchase. Stripe has accepted the payment and
            your order will update automatically after webhook confirmation.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/dashboard/user/orders"
              className={cn(buttonVariants(), "h-12 rounded-full px-6")}
            >
              <PackageCheck className="mr-2 h-4 w-4" />
              View My Orders
            </Link>

            <Link
              href="/products"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 rounded-full bg-background/50 px-6"
              )}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            If the order still shows unpaid for a few seconds, refresh the
            orders page after the Stripe webhook finishes processing.
          </p>
        </div>
      </main>
    </PublicLayout>
  );
}