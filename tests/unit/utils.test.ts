import { describe, it, expect } from 'vitest';
import { formatPrice } from '@/lib/utils/format';
import { generateWhatsAppUrl, generateProductOrderUrl, generateGreetingUrl } from '@/lib/utils/whatsapp';
import { filterByCategory } from '@/lib/utils/filter';
import { paginatePosts } from '@/lib/utils/pagination';
import { generateMetadata } from '@/lib/utils/metadata';
import { exportSubscribersToCSV } from '@/lib/utils/csv';
import { selectPortfolioPreview } from '@/lib/utils/portfolio';
import { generateProductJsonLd, generateLocalBusinessJsonLd, generateReviewJsonLd } from '@/lib/utils/jsonld';
import type { BlogPost, NewsletterSubscriber, PortfolioItem, Product, Testimonial } from '@/lib/types';

describe('formatPrice', () => {
  it('formats a simple price', () => {
    expect(formatPrice(150000)).toBe('₦150,000');
  });

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('₦0');
  });

  it('formats small numbers without commas', () => {
    expect(formatPrice(500)).toBe('₦500');
  });

  it('formats large numbers with multiple commas', () => {
    expect(formatPrice(1500000)).toBe('₦1,500,000');
  });

  it('handles negative numbers gracefully', () => {
    expect(formatPrice(-100)).toBe('₦0');
  });
});

describe('generateWhatsAppUrl', () => {
  it('generates a valid URL with encoded message', () => {
    const url = generateWhatsAppUrl('Hello');
    expect(url).toBe('https://wa.me/2348105177258?text=Hello');
  });

  it('encodes special characters in the message', () => {
    const url = generateWhatsAppUrl('Hello World!');
    expect(url).toBe('https://wa.me/2348105177258?text=Hello%20World!');
  });

  it('generates a greeting URL', () => {
    const url = generateGreetingUrl();
    expect(url).toContain('https://wa.me/2348105177258?text=');
    expect(url).toContain('Hanney-V');
  });

  it('generates a product order URL', () => {
    const url = generateProductOrderUrl('Silk Dress', 150000, 'available');
    expect(url).toContain('https://wa.me/2348105177258?text=');
    expect(url).toContain('Silk%20Dress');
  });
});

describe('filterByCategory', () => {
  const items = [
    { id: '1', category: 'Bespoke', name: 'Item 1' },
    { id: '2', category: 'Bridal', name: 'Item 2' },
    { id: '3', category: 'Bespoke', name: 'Item 3' },
    { id: '4', category: 'Event', name: 'Item 4' },
  ];

  it('returns all items when category is "All"', () => {
    expect(filterByCategory(items, 'All')).toEqual(items);
  });

  it('filters items by category', () => {
    const result = filterByCategory(items, 'Bespoke');
    expect(result).toHaveLength(2);
    expect(result.every((item) => item.category === 'Bespoke')).toBe(true);
  });

  it('returns empty array when no items match', () => {
    expect(filterByCategory(items, 'Traditional')).toEqual([]);
  });

  it('handles empty input array', () => {
    expect(filterByCategory([], 'Bespoke')).toEqual([]);
  });
});

describe('paginatePosts', () => {
  const makePosts = (count: number): BlogPost[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `${i}`,
      title: `Post ${i}`,
      slug: `post-${i}`,
      excerpt: null,
      body_html: '<p>Content</p>',
      category: 'Fashion',
      featured_image_url: 'https://example.com/img.jpg',
      author: 'Author',
      is_published: true,
      published_at: new Date(2024, 0, count - i).toISOString(),
      created_at: new Date(2024, 0, count - i).toISOString(),
      updated_at: new Date(2024, 0, count - i).toISOString(),
    }));

  it('returns 9 items for page 1 when more than 9 posts exist', () => {
    const result = paginatePosts(makePosts(20), 1);
    expect(result.items).toHaveLength(9);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(3);
  });

  it('returns remaining items on last page', () => {
    const result = paginatePosts(makePosts(20), 3);
    expect(result.items).toHaveLength(2);
  });

  it('returns all items when fewer than 9', () => {
    const result = paginatePosts(makePosts(5), 1);
    expect(result.items).toHaveLength(5);
    expect(result.totalPages).toBe(1);
  });

  it('orders posts by date descending', () => {
    const posts = makePosts(3);
    const result = paginatePosts(posts, 1);
    const dates = result.items.map((p) => new Date(p.published_at!).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
    }
  });

  it('handles page 0 as page 1', () => {
    const result = paginatePosts(makePosts(5), 0);
    expect(result.currentPage).toBe(1);
  });
});

describe('generateMetadata', () => {
  it('returns title and description unchanged when within limits', () => {
    const result = generateMetadata('Short Title', 'Short description');
    expect(result.title).toBe('Short Title');
    expect(result.description).toBe('Short description');
  });

  it('truncates title to 60 chars with ellipsis', () => {
    const longTitle = 'A'.repeat(70);
    const result = generateMetadata(longTitle, 'desc');
    expect(result.title.length).toBe(60);
    expect(result.title.endsWith('...')).toBe(true);
  });

  it('truncates description to 160 chars with ellipsis', () => {
    const longDesc = 'B'.repeat(200);
    const result = generateMetadata('title', longDesc);
    expect(result.description.length).toBe(160);
    expect(result.description.endsWith('...')).toBe(true);
  });

  it('does not truncate title at exactly 60 chars', () => {
    const title = 'A'.repeat(60);
    const result = generateMetadata(title, 'desc');
    expect(result.title).toBe(title);
    expect(result.title.endsWith('...')).toBe(false);
  });
});

describe('exportSubscribersToCSV', () => {
  const subscribers: NewsletterSubscriber[] = [
    { id: '1', email: 'test@example.com', subscribed_at: '2024-01-01T00:00:00Z', is_active: true },
    { id: '2', email: 'user@test.com', subscribed_at: '2024-02-01T00:00:00Z', is_active: false },
  ];

  it('includes a header row', () => {
    const csv = exportSubscribersToCSV(subscribers);
    const lines = csv.split('\n');
    expect(lines[0]).toBe('id,email,subscribed_at,is_active');
  });

  it('has one data row per subscriber', () => {
    const csv = exportSubscribersToCSV(subscribers);
    const lines = csv.split('\n');
    expect(lines.length).toBe(3); // header + 2 data rows
  });

  it('returns only header for empty array', () => {
    const csv = exportSubscribersToCSV([]);
    expect(csv).toBe('id,email,subscribed_at,is_active');
  });

  it('escapes fields containing commas', () => {
    const subs: NewsletterSubscriber[] = [
      { id: '1', email: 'test,comma@example.com', subscribed_at: '2024-01-01', is_active: true },
    ];
    const csv = exportSubscribersToCSV(subs);
    expect(csv).toContain('"test,comma@example.com"');
  });
});

describe('selectPortfolioPreview', () => {
  const makeItems = (count: number): PortfolioItem[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `${i}`,
      image_url: `https://example.com/img${i}.jpg`,
      alt_text: `Image ${i}`,
      category: 'Bespoke' as const,
      sort_order: i,
      created_at: new Date(2024, 0, i + 1).toISOString(),
      updated_at: new Date(2024, 0, i + 1).toISOString(),
    }));

  it('returns empty array when fewer than 4 items', () => {
    expect(selectPortfolioPreview(makeItems(3))).toEqual([]);
  });

  it('returns all items when exactly 4', () => {
    expect(selectPortfolioPreview(makeItems(4))).toHaveLength(4);
  });

  it('returns at most 8 items', () => {
    expect(selectPortfolioPreview(makeItems(20))).toHaveLength(8);
  });

  it('orders by creation date descending', () => {
    const result = selectPortfolioPreview(makeItems(10));
    const dates = result.map((item) => new Date(item.created_at).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
    }
  });
});

describe('generateProductJsonLd', () => {
  const product: Product = {
    id: '1',
    name: 'Silk Evening Gown',
    slug: 'silk-evening-gown',
    description: 'A beautiful silk evening gown',
    price_naira: 250000,
    category: 'Bespoke',
    availability: 'available',
    is_visible: true,
    image_urls: ['https://example.com/img1.jpg'],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  it('generates valid Product JSON-LD', () => {
    const jsonLd = generateProductJsonLd(product);
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('Product');
    expect(jsonLd.name).toBe('Silk Evening Gown');
    expect(jsonLd.offers.priceCurrency).toBe('NGN');
    expect(jsonLd.offers.price).toBe(250000);
  });

  it('maps availability correctly', () => {
    const soldOut = { ...product, availability: 'sold-out' as const };
    const jsonLd = generateProductJsonLd(soldOut);
    expect(jsonLd.offers.availability).toBe('https://schema.org/OutOfStock');
  });
});

describe('generateLocalBusinessJsonLd', () => {
  it('generates valid LocalBusiness JSON-LD', () => {
    const jsonLd = generateLocalBusinessJsonLd({
      name: 'Hanney-V',
      description: 'Luxury fashion house',
      streetAddress: '123 Fashion St',
      city: 'Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      telephone: '+2348105177258',
      url: 'https://hanney-v.com',
    });
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('LocalBusiness');
    expect(jsonLd.address['@type']).toBe('PostalAddress');
  });
});

describe('generateReviewJsonLd', () => {
  const testimonial: Testimonial = {
    id: '1',
    client_name: 'Jane Doe',
    service_type: 'Bridal',
    review_text: 'Amazing work!',
    rating: 5,
    screenshot_url: null,
    is_visible: true,
    sort_order: 1,
    created_at: '2024-01-01T00:00:00Z',
  };

  it('generates valid Review JSON-LD', () => {
    const jsonLd = generateReviewJsonLd(testimonial);
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd['@type']).toBe('Review');
    expect(jsonLd.author.name).toBe('Jane Doe');
    expect(jsonLd.reviewRating.ratingValue).toBe(5);
    expect(jsonLd.itemReviewed.name).toBe('Hanney-V');
  });
});
