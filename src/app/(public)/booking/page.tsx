import type { Metadata } from "next";
import BookingForm from "@/components/forms/BookingForm";
import AnimatedSection from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Schedule a consultation with Hanney-V for bespoke fashion, bridal wear, or event styling services.",
};

interface BookingPageProps {
  searchParams: Promise<{ service?: string }>;
}

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const params = await searchParams;
  const serviceParam = params.service;

  // Validate the service query param
  const validServices = ["bespoke", "bridal", "event"] as const;
  const defaultService = validServices.includes(serviceParam as typeof validServices[number])
    ? (serviceParam as "bespoke" | "bridal" | "event")
    : undefined;

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0} duration={600}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
              <span className="block w-2 h-2 rotate-45 bg-gold-400" aria-hidden="true" />
              <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-950 mb-4">
              Book a Consultation
            </h1>
            <div className="w-16 h-0.5 bg-gold-gradient mx-auto mb-4" />
            <p className="text-neutral-500 text-lg max-w-xl mx-auto">
              Schedule your appointment and let us bring your fashion vision to life
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100} duration={600}>
          <div className="bg-white border border-neutral-200 rounded-lg p-6 md:p-8 shadow-sm">
            <BookingForm defaultService={defaultService} />
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
