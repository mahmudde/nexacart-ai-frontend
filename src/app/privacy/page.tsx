import { ShieldCheck } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PublicPageHero } from "@/components/shared/public-page-hero";
import { SectionWrapper } from "@/components/shared/section-wrapper";

const sections = [
  {
    title: "Information we collect",
    content:
      "We collect account information, profile details, order details, cart and wishlist activity, reviews, and support messages needed to operate the marketplace.",
  },
  {
    title: "How we use information",
    content:
      "We use information to provide authentication, order management, secure checkout, product recommendations, dashboard analytics, support, and communication.",
  },
  {
    title: "Payments",
    content:
      "Payments are processed by Stripe. We do not store card numbers on our servers.",
  },
  {
    title: "AI features",
    content:
      "AI features may use product, shopping, and support context to provide suggestions, assistant responses, and admin insights.",
  },
  {
    title: "Data protection",
    content:
      "We use protected API routes, role-based access, secure cookies, and permission-aware dashboards to protect user and admin data.",
  },
];

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <main>
        <PublicPageHero
          eyebrow="Privacy Policy"
          title="Your privacy matters."
          description="This page explains how NexaCart AI handles user data, marketplace activity, payments, and AI-powered features."
          icon={ShieldCheck}
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