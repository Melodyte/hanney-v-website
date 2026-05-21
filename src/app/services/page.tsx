"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { services } from "@/lib/data";

export default function ServicesPage() {
  return (
    <div>
      <section className="relative pt-32 pb-20 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              Our <span className="text-gold">Services</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Premium fashion services tailored to your unique style and occasion
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""} relative`}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`absolute -bottom-4 ${
                      index % 2 === 1 ? "-left-4" : "-right-4"
                    } w-24 h-24 bg-gold/20`}
                  />
                </div>
                <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="text-gold text-sm uppercase tracking-widest font-semibold">
                    {service.subtitle}
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl text-black mt-2 mb-4">
                    {service.title}
                  </h2>
                  <div className="w-12 h-0.5 bg-gold mb-6" />
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-700">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-black">
                      {service.price}
                    </span>
                    <Link href="/booking">
                      <Button variant="gold" size="md">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
