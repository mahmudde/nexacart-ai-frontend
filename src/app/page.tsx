import { PublicLayout } from "@/components/layout/public-layout";
import { HeroSection } from "@/components/home/hero-section";
import { CategorySection } from "@/components/home/category-section";
import { TopProductsSection } from "@/components/home/top-products-section";
import { AiShoppingSection } from "@/components/home/ai-shopping-section";
import { FeaturesSection } from "@/components/home/features-section";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BlogPreviewSection } from "@/components/home/blog-preview-section";
import { FaqSection } from "@/components/home/faq-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function HomePage() {
  return (
    <PublicLayout>
      <main>
        <HeroSection />
        <CategorySection />
        <TopProductsSection />
        <AiShoppingSection />
        <FeaturesSection />
        <StatsSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <FaqSection />
        <NewsletterSection />
      </main>
    </PublicLayout>
  );
}