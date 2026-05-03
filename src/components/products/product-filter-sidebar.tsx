"use client";

import type { Category } from "@/types";
import type { ProductFilters } from "./product-filter-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductFilterSidebarProps = {
  filters: ProductFilters;
  categories: Category[];
  onChange: <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) => void;
  onReset: () => void;
};

export function ProductFilterSidebar({
  filters,
  categories,
  onChange,
  onReset,
}: ProductFilterSidebarProps) {
  const selectedCategory = categories.find(
    (category) => category.id === filters.categoryId
  );

  return (
    <aside className="glass h-fit rounded-[2rem] p-5 lg:sticky lg:top-28">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Search</label>
          <Input
            value={filters.search}
            onChange={(event) => onChange("search", event.target.value)}
            placeholder="Search products..."
            className="rounded-full bg-background/60"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>
          <Select
            value={filters.categoryId || "all"}
            onValueChange={(value) =>
              onChange("categoryId", value === "all" || value === null ? "" : value)
            }
          >
            <SelectTrigger className="rounded-full bg-background/60">
              <SelectValue>
                {selectedCategory?.name || "All categories"}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>

              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Brand</label>
          <Input
            value={filters.brand}
            onChange={(event) => onChange("brand", event.target.value)}
            placeholder="Example: NovaCharge"
            className="rounded-full bg-background/60"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-medium">Min price</label>
            <Input
              type="number"
              value={filters.minPrice}
              onChange={(event) => onChange("minPrice", event.target.value)}
              placeholder="0"
              className="rounded-full bg-background/60"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Max price</label>
            <Input
              type="number"
              value={filters.maxPrice}
              onChange={(event) => onChange("maxPrice", event.target.value)}
              placeholder="500"
              className="rounded-full bg-background/60"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Minimum rating
          </label>
          <Select
            value={filters.minRating || "all"}
            onValueChange={(value) =>
              onChange("minRating", value === "all" || value === null ? "" : value)
            }
          >
            <SelectTrigger className="rounded-full bg-background/60">
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">Any rating</SelectItem>
              <SelectItem value="4">4 stars & above</SelectItem>
              <SelectItem value="3">3 stars & above</SelectItem>
              <SelectItem value="2">2 stars & above</SelectItem>
              <SelectItem value="1">1 star & above</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </aside>
  );
}