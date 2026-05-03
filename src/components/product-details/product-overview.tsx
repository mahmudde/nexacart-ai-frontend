import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";

type ProductOverviewProps = {
  product: Product;
};

export function ProductOverview({ product }: ProductOverviewProps) {
  return (
    <div className="space-y-8">
      <section className="glass rounded-[2rem] p-6">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="mt-4 leading-8 text-muted-foreground">
          {product.description}
        </p>
      </section>

      {product.tags.length > 0 && (
        <section className="glass rounded-[2rem] p-6">
          <h2 className="text-2xl font-semibold">Tags</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-full bg-background/50 px-4 py-2"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {product.specifications && product.specifications.length > 0 && (
        <section className="glass rounded-[2rem] p-6">
          <h2 className="text-2xl font-semibold">Specifications</h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {product.specifications.map((specification) => (
              <div
                key={`${specification.name}-${specification.value}`}
                className="rounded-2xl border border-border bg-background/50 p-4"
              >
                <p className="text-sm text-muted-foreground">
                  {specification.name}
                </p>
                <p className="mt-1 font-semibold">{specification.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
