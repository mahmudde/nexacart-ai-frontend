import { FileText } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PublicPageHero } from "@/components/shared/public-page-hero";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const sections = [
  {
    title: "Account responsibilities",
    content:
      "Users are responsible for maintaining accurate account information and keeping login credentials secure.",
  },
  {
    title: "Orders and payments",
    content:
      "Orders must be completed through the checkout flow. Payment processing is handled securely through Stripe.",
  },
  {
    title: "Product information",
    content:
      "We aim to keep product details, prices, stock, and images accurate. Availability may change based on inventory and order activity.",
  },
  {
    title: "Reviews and content",
    content:
      "Users should submit honest, respectful reviews and avoid abusive, misleading, or harmful content.",
  },
  {
    title: "Admin and manager access",
    content:
      "Manager and admin dashboards are restricted by role-based access. Unauthorized use is not allowed.",
  },
];

export default function TermsPage() {
  return (
    <PublicLayout>
      <main>
        <PublicPageHero
          eyebrow="Terms and Conditions"
          title="Marketplace terms for safe shopping."
          description="These terms describe responsible use of NexaCart AI, including accounts, orders, payments, reviews, and dashboard access."
          icon={FileText}
        />

        <SectionWrapper>
          <div className="glass mx-auto max-w-4xl rounded-[2.5rem] p-6 md:p-10">
            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-semibold">{section.title}</h2>
                  <p className="mt-3 leading-8 text-muted-foreground">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </main>
    </PublicLayout>
  );
}