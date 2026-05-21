/**
 * JSON-LD structured data generators for schema.org types.
 * Generates valid structured data for Product, LocalBusiness, and Review.
 */

import type { Product, Testimonial } from '../types';

export interface ProductJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  image: string | string[];
  offers: {
    '@type': 'Offer';
    price: number;
    priceCurrency: string;
    availability: string;
  };
}

export interface LocalBusinessJsonLd {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  name: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  telephone: string;
  url: string;
  image?: string;
}

export interface ReviewJsonLd {
  '@context': 'https://schema.org';
  '@type': 'Review';
  author: {
    '@type': 'Person';
    name: string;
  };
  reviewBody: string;
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating: number;
    worstRating: number;
  };
  itemReviewed: {
    '@type': 'LocalBusiness';
    name: string;
  };
}

/**
 * Maps product availability status to schema.org ItemAvailability values.
 */
function mapAvailability(availability: string): string {
  switch (availability) {
    case 'available':
      return 'https://schema.org/InStock';
    case 'made-to-order':
      return 'https://schema.org/PreOrder';
    case 'sold-out':
      return 'https://schema.org/OutOfStock';
    default:
      return 'https://schema.org/InStock';
  }
}

/**
 * Generates JSON-LD structured data for a Product.
 * @param product - The product data
 * @returns A valid schema.org Product JSON-LD object
 */
export function generateProductJsonLd(product: Product): ProductJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_urls.length === 1 ? product.image_urls[0] : product.image_urls,
    offers: {
      '@type': 'Offer',
      price: product.price_naira,
      priceCurrency: 'NGN',
      availability: mapAvailability(product.availability),
    },
  };
}

/**
 * Generates JSON-LD structured data for a LocalBusiness.
 * @param config - Business configuration
 * @returns A valid schema.org LocalBusiness JSON-LD object
 */
export function generateLocalBusinessJsonLd(config: {
  name: string;
  description: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  telephone: string;
  url: string;
  image?: string;
}): LocalBusinessJsonLd {
  const jsonLd: LocalBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.name,
    description: config.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.streetAddress,
      addressLocality: config.city,
      addressRegion: config.state,
      addressCountry: config.country,
    },
    telephone: config.telephone,
    url: config.url,
  };

  if (config.image) {
    jsonLd.image = config.image;
  }

  return jsonLd;
}

/**
 * Generates JSON-LD structured data for a Review.
 * @param testimonial - The testimonial data
 * @param businessName - The name of the business being reviewed
 * @returns A valid schema.org Review JSON-LD object
 */
export function generateReviewJsonLd(
  testimonial: Testimonial,
  businessName: string = 'Hanney-V'
): ReviewJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.client_name,
    },
    reviewBody: testimonial.review_text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: businessName,
    },
  };
}
