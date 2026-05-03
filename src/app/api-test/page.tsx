"use client";

import { useCategories } from "@/hooks/use-categories";
import { useProducts, useTrendingProducts } from "@/hooks/use-products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiTestPage() {
  const categoriesQuery = useCategories({ page: 1, limit: 5 });
  const productsQuery = useProducts({ page: 1, limit: 4 });
  const trendingQuery = useTrendingProducts();

  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-4xl font-semibold">API Test</h1>
          <p className="mt-2 text-muted-foreground">
            Testing frontend connection with the NexaCart AI backend.
          </p>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {categoriesQuery.isLoading && <p>Loading categories...</p>}
            {categoriesQuery.isError && <p>Failed to load categories.</p>}
            {categoriesQuery.data?.data?.map((category) => (
              <div key={category.id} className="border-b py-2 last:border-b-0">
                {category.name}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            {productsQuery.isLoading && <p>Loading products...</p>}
            {productsQuery.isError && <p>Failed to load products.</p>}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {productsQuery.data?.data?.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border bg-background/50 p-4"
                >
                  <p className="font-medium">{product.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    ${product.discountPrice ?? product.price}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Trending Products</CardTitle>
          </CardHeader>
          <CardContent>
            {trendingQuery.isLoading && <p>Loading trending products...</p>}
            {trendingQuery.isError && <p>Failed to load trending products.</p>}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {trendingQuery.data?.data?.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border bg-background/50 p-4"
                >
                  <p className="font-medium">{product.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sold: {product.soldCount}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}