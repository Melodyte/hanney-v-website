"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export default function AboutPage() {
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
              About <span className="text-gold">Hanney-V</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/Graphics/photo_2026-05-21 06.28.26.jpeg"
                  alt="Hanney-V Studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 hidden lg:block" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl text-black mb-6">
                Our Story
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Hanney-V is a luxury fashion brand specializing in bespoke menswear, bridal couture, and cultural event styling. Founded with a passion for craftsmanship and African heritage, every piece is meticulously tailored to celebrate individuality.
                </p>
                <p>
                  From custom suits that command attention to intricately designed Aso-Oke bridal ensembles, we bring your style vision to life with precision, passion, and an unwavering commitment to quality.
                </p>
                <p>
                  Based in Akure, Ondo State, we serve clients across Nigeria who demand the finest in fashion craftsmanship. Our studio is where tradition meets contemporary elegance — every stitch tells a story.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/booking">
                  <Button variant="gold" size="lg">
                    Book a Consultation
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose Hanney-V"
            subtitle="Craftsmanship, heritage, and elegance — delivered with every piece"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Premium Craftsmanship",
                desc: "Every garment is handcrafted with meticulous attention to detail, using the finest fabrics and techniques.",
                icon: "✦",
              },
              {
                title: "Cultural Heritage",
                desc: "We celebrate African traditions through our designs, from Aso-Oke to contemporary silhouettes.",
                icon: "◆",
              },
              {
                title: "Personalized Service",
                desc: "From consultation to final fitting, you receive dedicated attention every step of the way.",
                icon: "●",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-8 text-center border border-gray-100 hover:border-gold/40 transition-all duration-300"
              >
                <span className="text-3xl text-gold mb-4 block">{item.icon}</span>
                <h3 className="font-heading text-xl text-black mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Happy Clients" },
              { number: "100+", label: "Outfits Delivered" },
              { number: "20+", label: "Events Styled" },
              { number: "5", label: "Years Experience" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="font-heading text-4xl md:text-5xl text-gold font-bold mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
