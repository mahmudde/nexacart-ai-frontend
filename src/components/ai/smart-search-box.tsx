"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useProducts } from "@/hooks/use-products";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SmartSearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function SmartSearchBox({
  value,
  onChange,
  placeholder = "Search products...",
  className,
}: SmartSearchBoxProps) {
  const [focused, setFocused] = useState(false);

  const productsQuery = useProducts({
    search: value,
    page: 1,
    limit: 5,
  });

  const suggestions = value.trim().length >= 2 ? productsQuery.data?.data ?? [] : [];

  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setTimeout(() => setFocused(false), 180);
        }}
        placeholder={placeholder}
        className="h-12 rounded-full bg-background/60 pl-11"
      />

      {focused && value.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-14 z-40 overflow-hidden rounded-[1.5rem] border border-border bg-background/95 shadow-2xl backdrop-blur-xl">
          <div className="border-b border-border px-4 py-3">
            <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              Smart search suggestions
            </p>
          </div>

          {productsQuery.isLoading && (
            <div className="p-4 text-sm text-muted-foreground">
              Searching...
            </div>
          )}

          {!productsQuery.isLoading && suggestions.length === 0 && (
            <div className="p-4 text-sm text-muted-foreground">
              No suggestions found.
            </div>
          )}

          {!productsQuery.isLoading && suggestions.length > 0 && (
            <div className="max-h-80 overflow-y-auto p-2 custom-scrollbar">
              {suggestions.map((product) => {
                const image =
                  product.images?.[0]?.url || "/placeholder-product.png";

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="flex items-center gap-3 rounded-[1rem] p-2 transition-colors hover:bg-muted"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-muted">
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="60px"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-sm font-medium">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${Number(product.discountPrice ?? product.price).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          <Link
            href={`/products?search=${encodeURIComponent(value)}`}
            className="block border-t border-border px-4 py-3 text-sm font-medium hover:bg-muted"
          >
            Search all results for “{value}”
          </Link>
        </div>
      )}
    </div>
  );
}