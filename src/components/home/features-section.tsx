import { CreditCard, Heart, PackageCheck, ShieldCheck, Truck, WandSparkles } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";

const features = [
  {
    icon: WandSparkles,
    title: "Personalized discovery",
    description: "AI-powered recommendations based on trends and behavior.",
  },
  {
    icon: CreditCard,
    title: "Secure checkout",
    description: "Stripe-powered payments with trusted transaction flow.",
  },
  {
    icon: PackageCheck,
    title: "Order tracking",
    description: "Clean order history and status updates for customers.",
  },
  {
    icon: Heart,
    title: "Wishlist",
    description: "Save favorite products and return to them anytime.",
  },
  {
    icon: Truck,
    title: "Smooth checkout",
    description: "Cart, shipping details, taxes, and payment in one flow.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted reviews",
    description: "Real ratings and reviews power better decisions.",
  },
];

export function FeaturesSection() {
  return (
    <SectionWrapper>
      <SectionHeader
        centered
        eyebrow="Why Velora"
        title="Everything modern shoppers expect"
        description="A complete premium marketplace experience with speed, intelligence, security, and trust."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-[1.75rem] border border-border bg-card/70 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <feature.icon className="h-5 w-5" />
            </div>

            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
