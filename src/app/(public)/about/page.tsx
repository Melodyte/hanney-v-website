import type { Metadata } from "next";
import Image from "next/image";
import AnimatedSection from "@/components/shared/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind Hanney-V — a luxury fashion brand rooted in Nigerian heritage, crafting bespoke menswear and bridal couture in Akure.",
};

const coreValues = [
  {
    title: "Craftsmanship",
    description:
      "Every stitch tells a story. We dedicate meticulous attention to detail, ensuring each piece meets the highest standards of quality.",
  },
  {
    title: "Heritage",
    description:
      "We honor Nigerian textile traditions while embracing modern design, creating garments that bridge generations.",
  },
  {
    title: "Excellence",
    description:
      "From consultation to final fitting, we pursue perfection at every stage, delivering an experience worthy of our clients.",
  },
  {
    title: "Innovation",
    description:
      "We blend time-honored techniques with contemporary aesthetics, pushing boundaries in African luxury fashion.",
  },
];

const usps = [
  {
    title: "Personalized Experience",
    description:
      "Every client receives a dedicated consultation, custom measurements, and a garment designed exclusively for them — no two pieces are alike.",
  },
  {
    title: "Cultural Authenticity",
    description:
      "We source premium Aso-Oke and traditional fabrics directly from master weavers, ensuring authenticity in every cultural design.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      {/* Brand Story */}
      <AnimatedSection delay={0} duration={600}>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
              <span className="block w-2 h-2 rotate-45 bg-gold-400" aria-hidden="true" />
              <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-950 mb-4">
              Our Story
            </h1>
            <div className="w-16 h-0.5 bg-gold-gradient mx-auto mb-4" />
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Where tradition meets tailored elegance
            </p>
          </div>
          <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed space-y-6">
            <p>
              Hanney-V was born from a deep passion for fashion and an unwavering commitment to celebrating African heritage through clothing. Founded in Akure, Ondo State, Nigeria, our brand emerged from the belief that every individual deserves garments that tell their unique story.
            </p>
            <p>
              What started as a small tailoring studio has grown into a recognized luxury fashion house, known for impeccable bespoke menswear, breathtaking bridal couture, and culturally rich event styling. Our journey has been guided by a simple philosophy: clothing is not just fabric — it is identity, confidence, and art.
            </p>
            <p>
              Today, Hanney-V serves discerning clients who value quality, heritage, and individuality. From the boardroom to the altar, from cultural celebrations to milestone events, we craft garments that make lasting impressions.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Core Values */}
      <AnimatedSection delay={100} duration={600}>
        <section className="bg-cream py-20 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Our Core Values"
              subtitle="The principles that guide everything we create"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  className="text-center p-6 bg-white border border-neutral-200 rounded-lg hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <span className="block w-3 h-3 rotate-45 bg-gold-400" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl text-neutral-950 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* USPs */}
      <AnimatedSection delay={100} duration={600}>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <SectionHeading
            title="Why Choose Hanney-V"
            subtitle="What sets us apart in luxury fashion"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {usps.map((usp) => (
              <div
                key={usp.title}
                className="p-8 border-l-4 border-gold-400 bg-neutral-50"
              >
                <h3 className="font-heading text-xl text-neutral-950 mb-3">
                  {usp.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {usp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Founder Profile */}
      <AnimatedSection delay={100} duration={600}>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <SectionHeading
            title="Meet the Founder"
            subtitle="The creative vision behind Hanney-V"
          />
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden bg-neutral-200 flex-shrink-0 relative">
              <Image
                src="/images/Logo/photo_2026-05-21 06.13.30.jpeg"
                alt="Hanney V, Creative Director and Founder of Hanney-V fashion"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
              />
            </div>
            <div>
              <h3 className="font-heading text-2xl text-neutral-950 mb-2">
                Hanney V.
              </h3>
              <p className="text-gold-600 font-medium mb-4">
                Creative Director & Founder
              </p>
              <p className="text-neutral-600 leading-relaxed">
                With years of experience in fashion design and a deep love for Nigerian textile heritage, Hanney V. founded the brand to bridge the gap between traditional craftsmanship and modern luxury. Every collection reflects a commitment to excellence, cultural pride, and the belief that fashion should empower.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Studio Location */}
      <AnimatedSection delay={100} duration={600}>
        <section className="bg-neutral-950 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-white mb-4">
              Visit Our Studio
            </h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-gray-400 text-lg mb-6">
              Experience luxury fashion in person at our Akure studio
            </p>
            <address className="not-italic text-gray-300 text-lg mb-8 leading-relaxed">
              Futa Campus Main Rd,<br />
              Opposite Four-Square Church,<br />
              Akure 340110, Ondo State, Nigeria
            </address>
            <a
              href="https://maps.google.com/?q=Futa+Campus+Main+Rd+Akure+Ondo+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold-gradient text-neutral-950 font-semibold rounded-md hover:brightness-110 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Get Directions
            </a>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
