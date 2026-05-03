"use client";

import Image from "next/image";
import Link from "next/link";
import { Boxes, Trash2 } from "lucide-react";
import { useState } from "react";
import { AdminDashboardShell } from "@/components/dashboard/admin/admin-dashboard-shell";
import { useDeleteProduct, useProducts } from "@/hooks/use-products";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const productsQuery = useProducts({
    search,
    status,
    page,
    limit: 10,
  });

  const deleteProductMutation = useDeleteProduct();

  const products = productsQuery.data?.data ?? [];
  const meta = productsQuery.data?.meta;

  return (
    <AdminDashboardShell>
      <div className="space-y-6">
        <div className="glass rounded-[2.5rem] p-8">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm text-muted-foreground">
            <Boxes className="h-4 w-4" />
            Product management
          </p>

          <h1 className="text-4xl font-semibold">Products</h1>

          <p className="mt-3 text-muted-foreground">
            Review, search, and manage all marketplace products.
          </p>
        </div>

        <div className="glass rounded-[2rem] p-5">
          <div className="mb-5 grid gap-3 md:grid-cols-[1fr_180px]">
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search products..."
              className="h-12 rounded-full bg-background/60 px-5"
            />

            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value || "all");
                setPage(1);
              }}
            >
              <SelectTrigger className="h-12 rounded-full bg-background/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {productsQuery.isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-24 rounded-[1.5rem]" />
              ))}
            </div>
          )}

          {!productsQuery.isLoading && products.length === 0 && (
            <div className="rounded-[1.5rem] border border-border bg-background/50 p-8 text-center">
              <p className="font-medium">No products found</p>
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
                    className="flex flex-col gap-4 rounded-[1.5rem] border border-border bg-background/50 p-4 lg:flex-row lg:items-center lg:justify-between"
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
                          {product.brand} · {product.category?.name || "No category"}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2 text-xs">
                          <span className="rounded-full bg-muted px-3 py-1">
                            {product.status}
                          </span>
                          <span className="rounded-full bg-muted px-3 py-1">
                            Stock: {product.stock}
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

                    <div className="flex gap-2 lg:justify-end">
                      <Link
                        href={`/products/${product.slug}`}
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "rounded-full bg-background/50"
                        )}
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

          {meta?.totalPages && meta.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {meta.page} of {meta.totalPages}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full"
                  disabled={page >= (meta.totalPages ?? 1)}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardShell>
  );
}
