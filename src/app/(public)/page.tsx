import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/sections/HeroSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import CTASection from "@/components/sections/CTASection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { generateLocalBusinessJsonLd, generateReviewJsonLd } from "@/lib/utils/jsonld";
import type { PortfolioItem, Testimonial } from "@/lib/types";

export const revalidate = 60;

const localBusinessJsonLd = generateLocalBusinessJsonLd({
  name: "Hanney-V",
  description:
    "Luxury fashion brand specializing in bespoke menswear, bridal couture, and cultural event styling in Akure, Nigeria.",
  streetAddress: "Futa Campus Main Rd, Opposite Four-Square Church",
  city: "Akure",
  state: "Ondo",
  country: "NG",
  telephone: "+2348105177258",
  url: "https://hanney-v.com",
});

export default async function HomePage() {
  let portfolio: PortfolioItem[] = [];
  let reviews: Testimonial[] = [];

  try {
    const supabase = await createClient();

    // Fetch portfolio items (most recent, up to 8)
    const { data: portfolioItems } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(8);

    // Fetch visible testimonials
    const { data: testimonials } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });

    portfolio = (portfolioItems as PortfolioItem[] | null) || [];
    reviews = (testimonials as Testimonial[] | null) || [];
  } catch (error) {
    // Supabase not configured yet — render page without dynamic data
    console.error("Failed to fetch data from Supabase:", error);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      {reviews.map((review) => (
        <script
          key={review.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateReviewJsonLd(review)),
          }}
        />
      ))}
      <HeroSection />

      <AnimatedSection delay={0} duration={600}>
        <ServicesPreview />
      </AnimatedSection>

      {portfolio.length >= 4 && (
        <AnimatedSection delay={100} duration={600}>
          <PortfolioPreview />
        </AnimatedSection>
      )}

      {reviews.length > 0 && (
        <AnimatedSection delay={150} duration={600}>
          <TestimonialsCarousel testimonials={reviews} />
        </AnimatedSection>
      )}

      <AnimatedSection delay={100} duration={600}>
        <CTASection />
      </AnimatedSection>

      <AnimatedSection delay={150} duration={600}>
        <NewsletterSection />
      </AnimatedSection>
    </>
  );
}
