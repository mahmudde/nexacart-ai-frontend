"use client";

import Image from "next/image";
import type { Cart } from "@/types";
import { Separator } from "@/components/ui/separator";

type CheckoutSummaryProps = {
  cart: Cart;
};

export function CheckoutSummary({ cart }: CheckoutSummaryProps) {
  return (
    <aside className="glass h-fit rounded-[2.5rem] p-6 lg:sticky lg:top-28">
      <h2 className="text-2xl font-semibold">Checkout summary</h2>

      <div className="mt-6 max-h-[360px] space-y-4 overflow-y-auto pr-1 custom-scrollbar">
        {cart.items.map((item) => {
          const image = item.product.images?.[0]?.url || "/placeholder-product.png";
          const activePrice = Number(
            item.product.discountPrice ?? item.product.price
          );

          return (
            <div key={item.id} className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={image}
                  alt={item.product.name}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="80px"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-medium">
                  {item.product.name}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="text-sm font-semibold">
                ${(activePrice * item.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      <Separator className="my-6" />

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">${cart.summary.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">
            ${cart.summary.shippingFee.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span className="font-medium">${cart.summary.tax.toFixed(2)}</span>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${cart.summary.total.toFixed(2)}</span>
        </div>
      </div>

      <p className="mt-5 rounded-[1.5rem] border border-border bg-background/50 p-4 text-xs leading-5 text-muted-foreground">
        After placing your order, you will be redirected to Stripe Checkout for
        secure payment.
      </p>
    </aside>
  );
}