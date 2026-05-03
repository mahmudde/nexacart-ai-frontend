import { LucideIcon } from "lucide-react";

type PublicPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export function PublicPageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
}: PublicPageHeroProps) {
  return (
    <section className="px-4 pt-16 pb-12 sm:px-6 lg:px-8 border-b border-border bg-background">
      <div className="mx-auto max-w-7xl text-center">
        <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-md bg-muted px-4 py-2 text-sm font-medium tracking-wide text-muted-foreground uppercase">
          <Icon className="h-4 w-4" />
          {eyebrow}
        </p>

        <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}
