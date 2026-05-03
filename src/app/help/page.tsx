"use client";

import { Bot, CreditCard, HelpCircle, PackageCheck, RotateCcw, ShieldCheck } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PublicPageHero } from "@/components/shared/public-page-hero";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const helpTopics = [
  {
    icon: Bot,
    title: "AI shopping assistant",
    description:
      "Ask questions, get product suggestions, and discover top-selling items faster.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description:
      "Payments are processed securely through Stripe Checkout.",
  },
  {
    icon: PackageCheck,
    title: "Orders",
    description:
      "Track your order status from the user dashboard after checkout.",
  },
  {
    icon: RotateCcw,
    title: "Returns",
    description:
      "Contact support for return, refund, or order issue assistance.",
  },
];

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Add products to your cart, open checkout, enter shipping details, and complete payment through Stripe Checkout.",
  },
  {
    question: "Do I need an account to buy products?",
    answer:
      "Yes. You need to login so your cart, orders, wishlist, and profile can be connected to your account.",
  },
  {
    question: "How does AI help me shop?",
    answer:
      "The AI assistant can suggest products, answer support-style questions, and help you discover popular or relevant items.",
  },
  {
    question: "Where can I view my orders?",
    answer:
      "After login, open your user dashboard and go to the Orders page.",
  },
];

export default function HelpPage() {
  return (
    <PublicLayout>
      <main>
        <PublicPageHero
          eyebrow="Help center"
          title="Find answers and support quickly."
          description="Learn how to shop, checkout, manage orders, and use AI-powered marketplace features."
          icon={HelpCircle}
        />

        <SectionWrapper>
          <SectionHeader
            eyebrow="Support topics"
            title="How can we help?"
            description="Explore the main areas where NexaCart AI supports customers."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {helpTopics.map((topic) => (
              <div key={topic.title} className="rounded-lg border border-border bg-background p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <topic.icon className="mb-5 h-7 w-7 text-primary" />
                <h3 className="text-xl font-semibold">{topic.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper className="pt-0">
          <SectionHeader
            centered
            eyebrow="FAQ"
            title="Common questions"
            description="Quick answers about shopping, payment, support, and AI features."
          />

          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-background p-6 shadow-sm">
            <Accordion>
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
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

        <SectionWrapper className="pt-0">
          <div className="rounded-xl border border-border bg-background p-10 text-center shadow-sm">
            <ShieldCheck className="mx-auto mb-5 h-10 w-10 text-primary" />
            <h2 className="text-3xl font-semibold">Still need help?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Contact our support team from the Contact page and we’ll help with
              order, payment, or product questions.
            </p>
          </div>
        </SectionWrapper>
      </main>
    </PublicLayout>
  );
}