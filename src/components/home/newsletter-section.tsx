"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { newsletterService } from "@/services/newsletter.service";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/lib/api-client";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setIsLoading(true);
      await newsletterService.subscribe(email);
      toast.success("Newsletter subscription successful");
      setEmail("");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionWrapper>
      <div className="glass overflow-hidden rounded-[2.5rem] p-8 text-center md:p-14">
        <p className="mb-4 inline-flex rounded-full border border-border bg-background/50 px-4 py-2 text-sm text-muted-foreground">
          Stay updated
        </p>

        <h2 className="text-gradient mx-auto max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Get smart deals and shopping insights.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          Subscribe to receive product tips, trending picks, and marketplace
          updates from Velora.
        </p>

        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-full border border-border bg-background/60 p-2 backdrop-blur-xl sm:flex-row">
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="h-12 rounded-full border-0 bg-transparent px-5 shadow-none focus-visible:ring-0"
          />

          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="h-12 rounded-full px-7"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
