"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-24 bg-gold relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-black rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-black rounded-full" />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-black font-bold mb-4">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-black/70 text-lg mb-8 max-w-xl mx-auto">
            Book a consultation and let&apos;s bring your fashion vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button variant="primary" size="lg">
                Book Consultation
              </Button>
            </Link>
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
