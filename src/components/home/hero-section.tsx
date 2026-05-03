"use client";

import Link from "next/link";
import { ArrowRight, Bot, ShieldCheck, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAiChatStore } from "@/store/ai-chat-store";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/shared/glass-card";
import { fadeUp, smoothTransition, staggerContainer } from "@/lib/motion";

const floatingCards = [
  {
    icon: Sparkles,
    title: "AI Picks",
    value: "Smart deals",
  },
  {
    icon: ShieldCheck,
    title: "Secure Pay",
    value: "Stripe checkout",
  },
  {
    icon: Star,
    title: "Trusted",
    value: "Real reviews",
  },
];

export function HeroSection() {
  const openChat = useAiChatStore((state) => state.openChat);

  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-80" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto grid min-h-[70vh] max-w-7xl items-center gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14"
      >
        <div>
          <motion.p
            variants={fadeUp}
            transition={smoothTransition}
            className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background/90 px-4 py-2 text-sm font-medium tracking-wide text-muted-foreground uppercase"
          >
            <Sparkles className="h-4 w-4" />
            AI-powered premium marketplace
          </motion.p>

          <motion.h1
            variants={fadeUp}
            transition={smoothTransition}
            className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground md:text-7xl"
          >
            Shop smarter with AI-curated products.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg"
          >
            Discover trending products, get personalized recommendations, ask
            an intelligent shopping assistant, and checkout securely with a
            premium marketplace experience.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/products"
              className={cn(buttonVariants({ size: "lg" }), "rounded-md px-8")}
            >
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/products?sort=top-selling"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "rounded-md bg-background px-8"
              )}
            >
              View Top Sellers
            </Link>

            <Button
              type="button"
              size="lg"
              variant="outline"
              className="rounded-md bg-background px-8"
              onClick={openChat}
            >
              Ask AI Assistant
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={smoothTransition}
            className="mt-10 grid gap-3 sm:grid-cols-3"
          >
            {floatingCards.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-background p-5 shadow-sm"
              >
                <item.icon className="mb-3 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          transition={smoothTransition}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-xl border border-border bg-background p-5 shadow-lg">
            <div className="rounded-lg bg-primary p-6 text-primary-foreground">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white/10">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Nexa AI Assistant</p>
                  <p className="text-sm text-primary-foreground/70">
                    Online now
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="max-w-[85%] rounded-md bg-white/10 p-4 text-sm leading-relaxed">
                  Looking for top-selling electronics under $100?
                </div>

                <div className="ml-auto max-w-[88%] rounded-md bg-white text-sm text-primary p-4 leading-relaxed font-medium">
                  I found premium headphones, gaming mice, and fast chargers
                  with high ratings and strong discounts.
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="rounded-md bg-white/10 p-5">
                    <p className="text-3xl font-bold">4.8★</p>
                    <p className="mt-1 text-sm text-primary-foreground/70">
                      Avg. rating
                    </p>
                  </div>
                  <div className="rounded-md bg-white/10 p-5">
                    <p className="text-3xl font-bold">24/7</p>
                    <p className="mt-1 text-sm text-primary-foreground/70">
                      Smart support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 -top-4 h-28 w-28 rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute -bottom-6 -left-4 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
        </motion.div>
      </motion.div>
    </section>
  );
}