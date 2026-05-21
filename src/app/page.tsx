import HeroSection from "@/components/sections/HeroSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import PortfolioPreview from "@/components/sections/PortfolioPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
      <NewsletterSection />
    </>
  );
}
