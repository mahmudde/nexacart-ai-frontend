"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { ManagerDashboardShell } from "@/components/dashboard/manager/manager-dashboard-shell";
import { useDeleteProduct, useProducts } from "@/hooks/use-products";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function ManagerProductsPage() {
  const [search, setSearch] = useState("");

  const productsQuery = useProducts({
    search,
    page: 1,
    limit: 20,
  });

  const deleteProductMutation = useDeleteProduct();

  const products = productsQuery.data?.data ?? [];

  return (
    <ManagerDashboardShell>
      <div className="space-y-6">
        <div className="glass flex flex-col justify-between gap-5 rounded-[2.5rem] p-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-semibold">Products</h1>
            <p className="mt-3 text-muted-foreground">
              Manage marketplace products, stock, status, and pricing.
            </p>
          </div>

          <Link
            href="/dashboard/manager/create-product"
            className={buttonVariants({ className: "rounded-full" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Product
          </Link>
        </div>

        <div className="glass rounded-[2rem] p-5">
          <div className="mb-5">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="h-12 rounded-full bg-background/60 px-5"
            />
          </div>

          {productsQuery.isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-24 rounded-[1.5rem]" />
              ))}
            </div>
          )}

          {!productsQuery.isLoading && products.length === 0 && (
            <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
              <p className="font-medium">No products found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Create your first product to see it here.
              </p>
            </div>
          )}

          {!productsQuery.isLoading && products.length > 0 && (
            <div className="space-y-3">
              {products.map((product) => {
                const image =
                  product.images?.[0]?.url || "/placeholder-product.png";

                return (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 rounded-[1.5rem] border border-border bg-background/50 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-muted">
                        <Image
                          src={image}
                          alt={product.name}
                          fill
                          unoptimized
                          className="object-cover"
                          sizes="100px"
                        />
                      </div>

                      <div className="min-w-0">
                        <Link
                          href={`/products/${product.slug}`}
                          className="line-clamp-1 font-semibold hover:underline"
                        >
                          {product.name}
                        </Link>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {product.brand} · Stock: {product.stock}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-full bg-muted px-3 py-1">
                            {product.status}
                          </span>
                          <span className="rounded-full bg-muted px-3 py-1">
                            Sold: {product.soldCount}
                          </span>
                          <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">
                            ${Number(product.discountPrice ?? product.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 md:justify-end">
                      <Link
                        href={`/products/${product.slug}`}
                        className={buttonVariants({
                          variant: "outline",
                          className: "rounded-full bg-background/50",
                        })}
                      >
                        View
                      </Link>

                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full bg-background/50 text-destructive"
                        disabled={deleteProductMutation.isPending}
                        onClick={() => deleteProductMutation.mutate(product.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </ManagerDashboardShell>
  );
}
