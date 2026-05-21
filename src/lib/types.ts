// Database row types matching Supabase schema

export interface PortfolioItem {
  id: string;
  image_url: string;
  alt_text: string;
  category: 'Bespoke' | 'Bridal' | 'Traditional' | 'Event';
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price_naira: number;
  category: string;
  availability: 'available' | 'made-to-order' | 'sold-out';
  is_visible: boolean;
  image_urls: string[];
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service_category: 'bespoke' | 'bridal' | 'event';
  preferred_date: string;
  notes: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  service_type: string;
  review_text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  screenshot_url: string | null;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body_html: string;
  category: string;
  featured_image_url: string;
  author: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}
