import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/data";
import AnimatedSection from "@/components/shared/AnimatedSection";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Hanney-V's luxury fashion services: bespoke menswear, bridal & traditional wear, and event styling in Akure, Nigeria.",
};

const serviceQueryMap: Record<string, string> = {
  bespoke: "bespoke",
  bridal: "bridal",
  event: "event",
};

export default function ServicesPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0} duration={600}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
              <span className="block w-2 h-2 rotate-45 bg-gold-400" aria-hidden="true" />
              <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-950 mb-4">
              Our Services
            </h1>
            <div className="w-16 h-0.5 bg-gold-gradient mx-auto mb-4" />
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Premium fashion services tailored to your unique style and occasion
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-24 mt-16">
          {services.map((service, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <AnimatedSection
                key={service.id}
                delay={100}
                duration={600}
                direction={isReversed ? "right" : "left"}
              >
                <section
                  id={service.id}
                  className={`flex flex-col ${
                    isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  } gap-8 lg:gap-16 items-center`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200">
                      <Image
                        src={service.image}
                        alt={`${service.title} - Hanney-V fashion service`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <div>
                      <p className="text-gold-600 font-medium text-sm uppercase tracking-wider mb-2">
                        {service.subtitle}
                      </p>
                      <h2 className="font-heading text-3xl md:text-4xl text-neutral-950 mb-4">
                        {service.title}
                      </h2>
                      <p className="text-neutral-600 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-neutral-700"
                        >
                          <svg
                            className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <p className="text-lg font-semibold text-neutral-950">
                      {service.price}
                    </p>

                    {/* CTA */}
                    <Link
                      href={`/booking?service=${serviceQueryMap[service.id]}`}
                    >
                      <Button variant="primary" size="lg">
                        Book a Consultation
                      </Button>
                    </Link>
                  </div>
                </section>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
