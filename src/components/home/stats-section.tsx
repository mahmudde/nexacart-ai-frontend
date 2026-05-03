import { SectionWrapper } from "@/components/shared/section-wrapper";

const stats = [
  {
    value: "1K+",
    label: "Products indexed",
  },
  {
    value: "24/7",
    label: "AI assistant support",
  },
  {
    value: "99%",
    label: "Secure checkout flow",
  },
  {
    value: "4.8★",
    label: "Customer satisfaction",
  },
];

export function StatsSection() {
  return (
    <SectionWrapper>
      <div className="glass grid gap-4 rounded-[2.5rem] p-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.75rem] bg-background/50 p-6 text-center">
            <p className="text-4xl font-bold text-gradient">{stat.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}