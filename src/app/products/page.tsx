"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/data";
import Button from "@/components/ui/Button";

export default function ProductsPage() {
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
              Our <span className="text-gold">Collection</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our latest creations — inquire via WhatsApp to order
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-gray-50 overflow-hidden"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <a
                      href={`https://wa.me/2348105177258?text=${encodeURIComponent(
                        `Hello Hanney-V! I'm interested in the ${product.name} (${product.price}). Please send me more details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gold text-black px-6 py-3 text-sm font-semibold"
                    >
                      Inquire via WhatsApp
                    </a>
                  </div>
                  <span className="absolute top-3 left-3 bg-black/80 text-white text-xs font-medium px-2 py-1">
                    {product.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg text-black mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-gold-dark font-semibold">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
