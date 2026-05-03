"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { PublicLayout } from "@/components/layout/public-layout";
import { PublicPageHero } from "@/components/shared/public-page-hero";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { apiClient, getApiErrorMessage } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      await apiClient.post("/support/messages", form);

      toast.success("Message sent successfully");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicLayout>
      <main>
        <PublicPageHero
          eyebrow="Contact us"
          title="Need help? We are here for you."
          description="Contact our support team for product questions, order help, payment issues, or marketplace guidance."
          icon={Mail}
        />

        <SectionWrapper>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-4">
              <div className="glass rounded-[2rem] p-6">
                <MapPin className="mb-4 h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Location</h2>
                <p className="mt-2 text-muted-foreground">
                  Dhaka, Bangladesh
                </p>
              </div>

              <div className="glass rounded-[2rem] p-6">
                <Mail className="mb-4 h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Email</h2>
                <p className="mt-2 text-muted-foreground">
                  support@nexacart.ai
                </p>
              </div>

              <div className="glass rounded-[2rem] p-6">
                <Phone className="mb-4 h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Phone</h2>
                <p className="mt-2 text-muted-foreground">
                  +880 1712 345678
                </p>
              </div>
            </div>

            <div className="glass rounded-[2.5rem] p-6 md:p-8">
              <h2 className="text-3xl font-semibold">Send a message</h2>
              <p className="mt-2 text-muted-foreground">
                We usually respond as soon as possible.
              </p>

              <div className="mt-6 grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Input
                    value={form.name}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                    placeholder="Your name"
                    className="h-12 rounded-full bg-background/60 px-5"
                  />

                  <Input
                    value={form.email}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, email: event.target.value }))
                    }
                    placeholder="Your email"
                    type="email"
                    className="h-12 rounded-full bg-background/60 px-5"
                  />
                </div>

                <Input
                  value={form.subject}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, subject: event.target.value }))
                  }
                  placeholder="Subject"
                  className="h-12 rounded-full bg-background/60 px-5"
                />

                <Textarea
                  value={form.message}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, message: event.target.value }))
                  }
                  placeholder="Write your message..."
                  className="min-h-40 rounded-[1.5rem] bg-background/60 p-5"
                />

                <Button
                  type="button"
                  className="h-12 rounded-full md:w-fit md:px-8"
                  disabled={isLoading}
                  onClick={handleSubmit}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
    </PublicLayout>
  );
}