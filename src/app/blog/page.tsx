"use client";

import { motion } from "framer-motion";
import { blogPosts } from "@/lib/data";
import Link from "next/link";

export default function BlogPage() {
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
              Our <span className="text-gold">Blog</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Fashion tips, style guides, and behind-the-scenes stories
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white group cursor-pointer overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold text-black text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 text-sm mb-2">{post.date}</p>
                  <h3 className="font-heading text-xl text-black mb-3 group-hover:text-gold-dark transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="text-sm font-semibold text-gold-dark hover:text-gold transition-colors inline-flex items-center gap-1">
                    Read More →
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
