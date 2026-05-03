import { Sparkles } from "lucide-react";

export function ProductsHero() {
  return (
    <section className="px-4 pt-8 sm:px-6 lg:px-8">
      <div className="glass mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-14 text-center md:px-10">
        <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-amber-400" />
          AI-powered product discovery
        </p>

        <h1 className="text-gradient mx-auto max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          Explore products made for smarter shopping.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
          Search, filter, sort, and discover products with a premium marketplace
          experience powered by real product data.
        </p>
      </div>
    </section>
  );
}
