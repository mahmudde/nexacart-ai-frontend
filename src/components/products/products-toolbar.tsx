"use client";

import { Filter } from "lucide-react";
import type { ProductFilters } from "./product-filter-types";
import { SmartSearchBox } from "@/components/ai/smart-search-box";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductsToolbarProps = {
  filters: ProductFilters;
  total?: number;
  onChange: <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) => void;
  onOpenFilters: () => void;
};

export function ProductsToolbar({
  filters,
  total,
  onChange,
  onOpenFilters,
}: ProductsToolbarProps) {
  return (
    <div className="glass mb-6 flex flex-col gap-4 rounded-[2rem] p-4 md:flex-row md:items-center md:justify-between">
      <SmartSearchBox
        value={filters.search}
        onChange={(value) => onChange("search", value)}
        placeholder="Search products, brands, tags..."
        className="flex-1"
      />

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="rounded-full lg:hidden"
          onClick={onOpenFilters}
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>

        <Select
          value={filters.sort}
          onValueChange={(value) => onChange("sort", value ?? "")}
        >
          <SelectTrigger className="h-12 w-[190px] rounded-full bg-background/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="top-selling">Top Selling</SelectItem>
            <SelectItem value="most-viewed">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground md:min-w-28 md:text-right">
        {typeof total === "number" ? `${total} products` : "Loading..."}
      </p>
    </div>
  );
}
