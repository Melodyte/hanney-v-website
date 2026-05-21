"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

export default function NewsletterSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-2xl md:text-3xl text-black mb-2">
            Stay in Style
          </h3>
          <p className="text-gray-500 mb-6">
            Subscribe for exclusive updates, fashion tips, and new collections
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
