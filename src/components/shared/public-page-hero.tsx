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
    <section className="px-4 pt-8 sm:px-6 lg:px-8">
      <div className="glass mx-auto max-w-7xl rounded-[2.5rem] px-6 py-14 text-center md:px-10">
        <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm text-muted-foreground">
          <Icon className="h-4 w-4" />
          {eyebrow}
        </p>

        <h1 className="text-gradient mx-auto max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
          {title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-muted-foreground md:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}