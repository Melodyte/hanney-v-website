"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/data";
import Button from "@/components/ui/Button";

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-black mb-4">
            Our Services
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Premium fashion services tailored to your unique style and occasion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden bg-gray-50"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading text-xl text-white mb-1">{service.title}</h3>
                  <p className="text-gray-300 text-sm">{service.subtitle}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  href={`/services#${service.id}`}
                  className="text-sm font-semibold text-gold-dark hover:text-gold transition-colors inline-flex items-center gap-1"
                >
                  Learn More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button variant="outline" size="lg">
              View All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
