"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, PackageCheck, ReceiptText } from "lucide-react";
import { useParams } from "next/navigation";
import { UserDashboardShell } from "@/components/dashboard/user/user-dashboard-shell";
import { useOrderDetails } from "@/hooks/use-orders";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserOrderDetailsPage() {
  const params = useParams();
  const orderId = String(params.id || "");

  const orderQuery = useOrderDetails(orderId);
  const order = orderQuery.data?.data;

  return (
    <UserDashboardShell>
      <div className="space-y-6">
        <Link
          href="/dashboard/user/orders"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-fit rounded-full px-0 hover:bg-transparent"
          )}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to orders
        </Link>

        {orderQuery.isLoading && (
          <div className="space-y-5">
            <Skeleton className="h-48 rounded-[2.5rem]" />
            <Skeleton className="h-96 rounded-[2.5rem]" />
          </div>
        )}

        {!orderQuery.isLoading && !order && (
          <div className="glass rounded-[2.5rem] p-8 text-center">
            <h1 className="text-3xl font-semibold">Order not found</h1>
            <p className="mt-2 text-muted-foreground">
              We could not load this order.
            </p>
          </div>
        )}

        {order && (
          <>
            <div className="glass rounded-[2.5rem] p-8">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
                <ReceiptText className="h-4 w-4" />
                Order details
              </p>

              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                <div>
                  <h1 className="text-4xl font-semibold">
                    {order.orderNumber}
                  </h1>

                  <p className="mt-3 text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium">
                    {order.status}
                  </span>

                  <span className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <div className="glass rounded-[2.5rem] p-6">
                <h2 className="mb-5 flex items-center gap-2 text-2xl font-semibold">
                  <PackageCheck className="h-5 w-5" />
                  Ordered items
                </h2>

                <div className="space-y-4">
                  {order.items.map((item) => {
                    const image =
                      item.imageUrl ||
                      item.product?.images?.[0]?.url ||
                      "/placeholder-product.png";

                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 rounded-[1.5rem] border border-border bg-background/50 p-4"
                      >
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted">
                          <Image
                            src={image}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="120px"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/products/${item.product?.slug || ""}`}
                            className="line-clamp-2 font-semibold hover:underline"
                          >
                            {item.name}
                          </Link>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>

                          <p className="mt-3 font-semibold">
                            ${Number(item.price).toFixed(2)} each
                          </p>
                        </div>

                        <p className="font-semibold">
                          ${(Number(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <aside className="space-y-6">
                <div className="glass rounded-[2.5rem] p-6">
                  <h2 className="text-2xl font-semibold">Order summary</h2>

                  <div className="mt-6 space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${Number(order.subtotal).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${Number(order.shippingFee).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${Number(order.tax).toFixed(2)}</span>
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>${Number(order.total).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-[2.5rem] p-6">
                  <h2 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
                    <MapPin className="h-5 w-5" />
                    Shipping address
                  </h2>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">
                      {order.shippingName}
                    </p>
                    <p>{order.shippingPhone}</p>
                    <p>{order.shippingStreet}</p>
                    <p>
                      {order.shippingCity}, {order.shippingPostalCode}
                    </p>
                    <p>{order.shippingCountry}</p>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </UserDashboardShell>
  );
}