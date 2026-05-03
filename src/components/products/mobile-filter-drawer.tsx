"use client";

import type { Category } from "@/types";
import type { ProductFilters } from "./product-filter-types";
import { ProductFilterSidebar } from "./product-filter-sidebar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

type MobileFilterDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: ProductFilters;
  categories: Category[];
  onChange: <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K]
  ) => void;
  onReset: () => void;
};

export function MobileFilterDrawer({
  open,
  onOpenChange,
  filters,
  categories,
  onChange,
  onReset,
}: MobileFilterDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-80 overflow-y-auto p-4">
        <SheetTitle className="mb-5 text-left">Product filters</SheetTitle>

        <ProductFilterSidebar
          filters={filters}
          categories={categories}
          onChange={onChange}
          onReset={onReset}
        />
      </SheetContent>
    </Sheet>
  );
}
