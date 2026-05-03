"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PublicLayout } from "@/components/layout/public-layout";
import { ProductsHero } from "@/components/products/products-hero";
import { ProductFilterSidebar } from "@/components/products/product-filter-sidebar";
import { ProductsToolbar } from "@/components/products/products-toolbar";
import { ProductsGrid } from "@/components/products/products-grid";
import { MobileFilterDrawer } from "@/components/products/mobile-filter-drawer";
import { ProductPagination } from "@/components/products/product-pagination";
import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import type { ProductFilters } from "@/components/products/product-filter-types";
import { createQueryString } from "@/utils/create-query-string";

const defaultFilters: ProductFilters = {
  search: "",
  categoryId: "",
  brand: "",
  minPrice: "",
  maxPrice: "",
  minRating: "",
  sort: "newest",
  page: 1,
  limit: 12,
};

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const [filters, setFilters] = useState<ProductFilters>(() => ({
    search: searchParams.get("search") || "",
    categoryId: searchParams.get("categoryId") || "",
    brand: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    minRating: searchParams.get("minRating") || "",
    sort: searchParams.get("sort") || "newest",
    page: Number(searchParams.get("page") || 1),
    limit: Number(searchParams.get("limit") || 12),
  }));

  const productQuery = useMemo(
    () => ({
      search: filters.search,
      categoryId: filters.categoryId,
      brand: filters.brand,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
      sort: filters.sort,
      page: filters.page,
      limit: filters.limit,
    }),
    [filters]
  );

  const categoriesQuery = useCategories({
    isActive: true,
    limit: 100,
  });

  const productsQuery = useProducts(productQuery);

  const categories = categoriesQuery.data?.data ?? [];
  const products = productsQuery.data?.data ?? [];
  const meta = productsQuery.data?.meta;

  useEffect(() => {
    const queryString = createQueryString(filters);
    router.replace(`/products${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  }, [filters, router]);

  const handleChange = <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
      page: key === "page" ? Number(value) : 1,
    }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setFilterDrawerOpen(false);
  };

  return (
    <PublicLayout>
      <main>
        <ProductsHero />

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
          <div className="hidden lg:block">
            <ProductFilterSidebar
              filters={filters}
              categories={categories}
              onChange={handleChange}
              onReset={handleReset}
            />
          </div>

          <div>
            <ProductsToolbar
              filters={filters}
              total={meta?.total}
              onChange={handleChange}
              onOpenFilters={() => setFilterDrawerOpen(true)}
            />

            <ProductsGrid
              products={products}
              isLoading={productsQuery.isLoading}
              isError={productsQuery.isError}
              onReset={handleReset}
            />

            <ProductPagination
              page={filters.page}
              totalPages={meta?.totalPages ?? 0}
              onPageChange={(page) => handleChange("page", page)}
            />
          </div>
        </section>

        <MobileFilterDrawer
          open={filterDrawerOpen}
          onOpenChange={setFilterDrawerOpen}
          filters={filters}
          categories={categories}
          onChange={handleChange}
          onReset={handleReset}
        />
      </main>
    </PublicLayout>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsPageContent />
    </Suspense>
  );
}
