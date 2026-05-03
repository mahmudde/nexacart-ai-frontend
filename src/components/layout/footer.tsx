import Link from "next/link";
import { Code, Globe, Link as LinkIcon, Mail, MapPin, Phone, Sparkles } from "lucide-react";

import { siteConfig } from "@/config/site";

const footerLinks = [
  {
    title: "Marketplace",
    links: [
      { label: "Products", href: "/products" },
      { label: "Trending", href: "/products?sort=top-selling" },
      { label: "Blogs", href: "/blogs" },
      { label: "Help", href: "/help" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold">{siteConfig.name}</span>
          </Link>

          <p className="mt-5 max-w-md leading-7 text-muted-foreground">
            Shop smarter with AI-powered recommendations, trusted reviews,
            secure checkout, and a premium marketplace experience.
          </p>

          <div className="mt-6 space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> support@nexacart.ai
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> +880 1712 345678
            </p>
          </div>
        </div>

        {footerLinks.map((group) => (
          <div key={group.title}>
            <h3 className="font-semibold">{group.title}</h3>
            <div className="mt-4 flex flex-col gap-3">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} NexaCart AI. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <Link href={siteConfig.links.github} aria-label="GitHub">
              <Code className="h-4 w-4" />
            </Link>
            <Link href={siteConfig.links.facebook} aria-label="Facebook">
              <Globe className="h-4 w-4" />
            </Link>
            <Link href={siteConfig.links.linkedin} aria-label="LinkedIn">
              <LinkIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}