"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Badge from "@/components/ui/Badge";
import type { Product } from "@/lib/types";

interface ProductCatalogProps {
  products: Product[];
  categories: string[];
}

function formatPrice(priceNaira: number): string {
  return `₦${priceNaira.toLocaleString()}`;
}

function getAvailabilityBadge(availability: Product["availability"]) {
  switch (availability) {
    case "available":
      return <Badge variant="success">Available</Badge>;
    case "made-to-order":
      return <Badge variant="gold">Made to Order</Badge>;
    case "sold-out":
      return <Badge variant="error">Sold Out</Badge>;
  }
}

export default function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-500 text-lg">
          No products available yet. Check back soon for our latest collection!
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-10">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-neutral-500 text-lg">
            No products available in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              <article className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                  {product.image_urls[0] ? (
                    <Image
                      src={product.image_urls[0]}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gold-gradient opacity-20" />
                  )}
                  {/* Availability Badge */}
                  <div className="absolute top-3 left-3">
                    {getAvailabilityBadge(product.availability)}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="font-heading text-lg text-neutral-950 mb-2 line-clamp-1 group-hover:text-gold-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-semibold text-neutral-900">
                    {formatPrice(product.price_naira)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
