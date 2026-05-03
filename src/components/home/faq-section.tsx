import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does NexaCart AI recommend products?",
    answer:
      "It uses product trends, ratings, top-selling data, and user activity to suggest products that match shopping intent.",
  },
  {
    question: "Is payment secure?",
    answer:
      "Yes. Payments are handled through Stripe Checkout, so card details are processed securely by Stripe.",
  },
  {
    question: "Can I save products for later?",
    answer:
      "Yes. Logged-in users can add products to their wishlist and manage saved products from the dashboard.",
  },
  {
    question: "Can the AI assistant help with support?",
    answer:
      "Yes. It can answer common questions about orders, payments, returns, and product discovery.",
  },
];

export function FaqSection() {
  return (
    <SectionWrapper>
      <SectionHeader
        centered
        eyebrow="FAQ"
        title="Questions shoppers ask"
        description="Everything you need to know about shopping with NexaCart AI."
      />

      <div className="glass mx-auto max-w-3xl rounded-[2rem] p-4">
        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-7 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionWrapper>
  );
}