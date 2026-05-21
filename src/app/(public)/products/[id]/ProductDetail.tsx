"use client";

import { useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Product } from "@/lib/types";

interface ProductDetailProps {
  product: Product;
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

function getAvailabilityLabel(availability: Product["availability"]): string {
  switch (availability) {
    case "available":
      return "Available";
    case "made-to-order":
      return "Made to Order";
    case "sold-out":
      return "Sold Out";
  }
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const isSoldOut = product.availability === "sold-out";

  const whatsappMessage = encodeURIComponent(
    `Hello Hanney-V, I'm interested in ordering:\n\nProduct: ${product.name}\nPrice: ${formatPrice(product.price_naira)}\nAvailability: ${getAvailabilityLabel(product.availability)}\n\nPlease let me know how to proceed.`
  );
  const whatsappUrl = `https://wa.me/2348105177258?text=${whatsappMessage}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100">
          {product.image_urls[selectedImage] ? (
            <Image
              src={product.image_urls[selectedImage]}
              alt={`${product.name} - Image ${selectedImage + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gold-gradient opacity-20" />
          )}
        </div>

        {/* Thumbnail Gallery */}
        {product.image_urls.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.image_urls.map((url, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                  index === selectedImage
                    ? "border-gold-400 ring-2 ring-gold-400/30"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={url}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-neutral-400 uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="font-heading text-3xl md:text-4xl text-neutral-950 mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl font-bold text-neutral-950">
              {formatPrice(product.price_naira)}
            </span>
            {getAvailabilityBadge(product.availability)}
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-3">
            Description
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Order Button */}
        <div className="pt-4 border-t border-neutral-200">
          {isSoldOut ? (
            <Button variant="primary" size="lg" fullWidth disabled>
              Sold Out
            </Button>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="primary" size="lg" fullWidth>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order via WhatsApp
              </Button>
            </a>
          )}
          {!isSoldOut && (
            <p className="text-xs text-neutral-500 text-center mt-3">
              Opens WhatsApp with your order details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
