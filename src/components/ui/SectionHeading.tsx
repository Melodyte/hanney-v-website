"use client";

import { motion } from "framer-motion";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  decorated?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  decorated = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {decorated && (
        <div
          className={`flex items-center gap-3 mb-4 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
          <span className="block w-2 h-2 rotate-45 bg-gold-400" aria-hidden="true" />
          <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
        </div>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-950 mb-4">
        {title}
      </h2>
      {decorated && (
        <div
          className={`w-16 h-0.5 bg-gold-gradient mb-4 ${
            align === "center" ? "mx-auto" : ""
          }`}
          aria-hidden="true"
        />
      )}
      {subtitle && (
        <p className="text-neutral-500 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
