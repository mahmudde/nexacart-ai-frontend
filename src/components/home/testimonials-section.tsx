import { Quote, Star } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";

const testimonials = [
  {
    name: "Ayesha Karim",
    role: "Remote worker",
    quote:
      "The AI assistant helped me find a reliable headset within my budget in less than a minute.",
  },
  {
    name: "Rafi Hasan",
    role: "Student",
    quote:
      "Product filters, wishlist, and checkout feel smooth. It feels like a premium marketplace.",
  },
  {
    name: "Nadia Islam",
    role: "Small business owner",
    quote:
      "The recommendations are practical and the product details are easy to compare.",
  },
];

export function TestimonialsSection() {
  return (
    <SectionWrapper>
      <SectionHeader
        centered
        eyebrow="Customer stories"
        title="Trusted by modern shoppers"
        description="NexaCart AI is designed for fast product discovery, safer checkout, and smarter buying."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="rounded-[1.75rem] border border-border bg-card/80 p-6 backdrop-blur-xl"
          >
            <Quote className="mb-5 h-8 w-8 text-primary" />

            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <p className="leading-7 text-muted-foreground">“{item.quote}”</p>

            <div className="mt-6">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.role}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}