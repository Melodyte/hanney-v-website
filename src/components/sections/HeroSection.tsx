"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img
        src="/images/Works/photo_2026-05-21 06.13.24.jpeg"
        alt="Hanney-V Fashion"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/images/Logo/photo_2026-05-21 06.13.30.jpeg"
            alt="Hanney-V Logo"
            className="h-20 w-auto object-contain mx-auto mb-6"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-4 leading-tight"
        >
          Where Tradition Meets
          <br />
          <span className="text-gold">Tailored Elegance</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-200 text-lg sm:text-xl mb-8 max-w-2xl mx-auto"
        >
          Bespoke menswear, bridal couture, and cultural event styling — crafted for the bold, styled for the timeless.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/booking">
            <Button variant="gold" size="lg">
              Book a Consultation
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              View Our Work
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
