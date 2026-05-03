import { Bot, CreditCard, PackageCheck, ShieldCheck, Sparkles, Users } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PublicPageHero } from "@/components/shared/public-page-hero";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { SectionHeader } from "@/components/shared/section-header";

const values = [
  {
    icon: Bot,
    title: "AI-first shopping",
    description:
      "We use AI to help customers discover products, compare options, and make confident buying decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Trust and security",
    description:
      "Authentication, protected dashboards, secure checkout, and reliable order flows are core to the platform.",
  },
  {
    icon: PackageCheck,
    title: "Marketplace quality",
    description:
      "Products are organized with categories, reviews, stock management, and smart recommendations.",
  },
  {
    icon: Users,
    title: "Role-based experience",
    description:
      "Users, managers, and admins each get focused dashboards built for their needs.",
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <main>
        <PublicPageHero
          eyebrow="About NexaCart AI"
          title="A smarter marketplace for modern shoppers."
          description="NexaCart AI combines e-commerce, secure payments, role-based dashboards, and AI assistance to create a premium shopping experience."
          icon={Sparkles}
        />

        <SectionWrapper>
          <SectionHeader
            eyebrow="Our mission"
            title="Make online shopping easier, safer, and more intelligent."
            description="We help customers find the right products faster while giving managers and admins the tools they need to run a professional marketplace."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="glass rounded-[2rem] p-6 transition-all hover:-translate-y-1"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <value.icon className="h-6 w-6" />
                </div>

                <h3 className="text-2xl font-semibold">{value.title}</h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper className="pt-0">
          <div className="glass grid gap-6 rounded-[2.5rem] p-8 md:grid-cols-3">
            <div>
              <p className="text-4xl font-bold text-gradient">AI</p>
              <p className="mt-2 text-muted-foreground">
                Search, support, suggestions, and admin insights.
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold text-gradient">Stripe</p>
              <p className="mt-2 text-muted-foreground">
                Secure checkout and payment processing.
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold text-gradient">Cloudinary</p>
              <p className="mt-2 text-muted-foreground">
                Fast, reliable product and category image hosting.
              </p>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </PublicLayout>
  );
}