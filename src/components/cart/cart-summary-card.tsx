"use client";

import Link from "next/link";
import { CreditCard, ShieldCheck, Trash2 } from "lucide-react";
import type { CartSummary } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { useClearCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

type CartSummaryCardProps = {
  summary: CartSummary;
  showClear?: boolean;
};

export function CartSummaryCard({
  summary,
  showClear = true,
}: CartSummaryCardProps) {
  const clearCartMutation = useClearCart();

  return (
    <aside className="glass h-fit rounded-[2.5rem] p-6 lg:sticky lg:top-28">
      <h2 className="text-2xl font-semibold">Order summary</h2>

      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Items</span>
          <span className="font-medium">{summary.totalItems}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${summary.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">
            {summary.shippingFee > 0
              ? `$${summary.shippingFee.toFixed(2)}`
              : "Free"}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-medium">${summary.tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between gap-4 text-lg font-semibold">
            <span>Total</span>
            <span>${summary.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Link
        href="/checkout"
        className={buttonVariants({
          size: "lg",
          className: cn(
            "mt-6 h-12 w-full rounded-full",
            summary.totalItems === 0 && "pointer-events-none opacity-50"
          ),
        })}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        Proceed to Checkout
      </Link>

      {showClear && summary.totalItems > 0 && (
        <Button
          type="button"
          variant="outline"
          className="mt-3 h-11 w-full rounded-full bg-background/50"
          disabled={clearCartMutation.isPending}
          onClick={() => clearCartMutation.mutate()}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {clearCartMutation.isPending ? "Clearing..." : "Clear Cart"}
        </Button>
      )}

      <div className="mt-5 rounded-[1.5rem] border border-border bg-background/45 p-4">
        <ShieldCheck className="mb-2 h-5 w-5 text-primary" />
        <p className="text-sm font-medium">Secure checkout</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Your payment will be processed securely through Stripe checkout.
        </p>
      </div>
    </aside>
  );
}