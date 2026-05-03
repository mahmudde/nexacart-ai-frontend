import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

type CartEmptyStateProps = {
  compact?: boolean;
};

export function CartEmptyState({ compact = false }: CartEmptyStateProps) {
  return (
    <div
      className={
        compact
          ? "flex flex-col items-center justify-center rounded-[2rem] border border-border bg-background/50 p-8 text-center"
          : "glass flex min-h-[420px] flex-col items-center justify-center rounded-[2.5rem] p-8 text-center"
      }
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
      </div>

      <h2 className="text-2xl font-semibold">Your cart is empty</h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Explore trending products and add your favorite items to start checkout.
      </p>

      <Link
        href="/products"
        className={buttonVariants({
          className: "mt-6 rounded-full px-6",
        })}
      >
        Explore Products
      </Link>
    </div>
  );
}
