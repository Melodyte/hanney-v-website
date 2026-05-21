"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-black mb-4">
        {title}
      </h2>
      <div className={`w-16 h-0.5 bg-gold mb-4 ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
