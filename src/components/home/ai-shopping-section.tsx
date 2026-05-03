import { Bot, MessageSquareText, Search, Tags } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import { GlassCard } from "@/components/shared/glass-card";

const features = [
  {
    icon: Search,
    title: "AI search suggestions",
    description:
      "Help shoppers discover products faster with intelligent search suggestions.",
  },
  {
    icon: Bot,
    title: "Shopping assistant",
    description:
      "Guide customers through product discovery, support, and buying decisions.",
  },
  {
    icon: Tags,
    title: "Smart product ideas",
    description:
      "Admins and managers can generate product names, descriptions, tags, and pricing ideas.",
  },
  {
    icon: MessageSquareText,
    title: "Support help",
    description:
      "Answer common questions about orders, payments, support, and returns.",
  },
];

export function AiShoppingSection() {
  return (
    <SectionWrapper>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="AI shopping"
            title="A smarter buying experience for every customer"
            description="Velora helps users find the best products, compare options, and get support without friction."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="rounded-[1.75rem]">
              <feature.icon className="mb-5 h-7 w-7 text-primary" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
