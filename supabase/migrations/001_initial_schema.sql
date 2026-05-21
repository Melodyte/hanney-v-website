-- Hanney-V Website Database Schema
-- Run this migration against your Supabase project

-- ============================================================
-- TABLES
-- ============================================================

-- Portfolio Items
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Bespoke', 'Bridal', 'Traditional', 'Event')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  price_naira INTEGER NOT NULL CHECK (price_naira > 0),
  category TEXT NOT NULL,
  availability TEXT NOT NULL DEFAULT 'available' CHECK (availability IN ('available', 'made-to-order', 'sold-out')),
  is_visible BOOLEAN NOT NULL DEFAULT true,
  image_urls TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bookings
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_category TEXT NOT NULL CHECK (service_category IN ('bespoke', 'bridal', 'event')),
  preferred_date DATE NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  review_text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  screenshot_url TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  body_html TEXT NOT NULL,
  category TEXT NOT NULL,
  featured_image_url TEXT NOT NULL,
  author TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Contact Messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_portfolio_items_category ON portfolio_items(category);
CREATE INDEX idx_portfolio_items_sort_order ON portfolio_items(sort_order);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_visible ON products(is_visible);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_testimonials_is_visible ON testimonials(is_visible);
CREATE INDEX idx_testimonials_sort_order ON testimonials(sort_order);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_is_active ON newsletter_subscribers(is_active);
CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_portfolio_items_updated_at
  BEFORE UPDATE ON portfolio_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES: portfolio_items
-- ============================================================

-- Public can read all portfolio items
CREATE POLICY "Public can view portfolio items"
  ON portfolio_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users (admin) can insert
CREATE POLICY "Admin can insert portfolio items"
  ON portfolio_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users (admin) can update
CREATE POLICY "Admin can update portfolio items"
  ON portfolio_items FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users (admin) can delete
CREATE POLICY "Admin can delete portfolio items"
  ON portfolio_items FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- RLS POLICIES: products
-- ============================================================

-- Public can read visible products only
CREATE POLICY "Public can view visible products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

-- Admin can read all products (including hidden)
CREATE POLICY "Admin can view all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

-- Admin can insert products
CREATE POLICY "Admin can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admin can update products
CREATE POLICY "Admin can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admin can delete products
CREATE POLICY "Admin can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- RLS POLICIES: bookings
-- ============================================================

-- Public can insert bookings (submit booking form)
CREATE POLICY "Public can create bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admin can view bookings
CREATE POLICY "Admin can view bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

-- Only admin can update bookings
CREATE POLICY "Admin can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only admin can delete bookings
CREATE POLICY "Admin can delete bookings"
  ON bookings FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- RLS POLICIES: testimonials
-- ============================================================

-- Public can read visible testimonials
CREATE POLICY "Public can view visible testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

-- Admin can read all testimonials
CREATE POLICY "Admin can view all testimonials"
  ON testimonials FOR SELECT
  TO authenticated
  USING (true);

-- Admin can insert testimonials
CREATE POLICY "Admin can insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admin can update testimonials
CREATE POLICY "Admin can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admin can delete testimonials
CREATE POLICY "Admin can delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- RLS POLICIES: blog_posts
-- ============================================================

-- Public can read published blog posts only
CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Admin can read all blog posts
CREATE POLICY "Admin can view all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

-- Admin can insert blog posts
CREATE POLICY "Admin can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admin can update blog posts
CREATE POLICY "Admin can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Admin can delete blog posts
CREATE POLICY "Admin can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- RLS POLICIES: newsletter_subscribers
-- ============================================================

-- Public can insert (subscribe)
CREATE POLICY "Public can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admin can view subscribers
CREATE POLICY "Admin can view subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

-- Only admin can update subscribers
CREATE POLICY "Admin can update subscribers"
  ON newsletter_subscribers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only admin can delete subscribers
CREATE POLICY "Admin can delete subscribers"
  ON newsletter_subscribers FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- RLS POLICIES: contact_messages
-- ============================================================

-- Public can insert (submit contact form)
CREATE POLICY "Public can submit contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admin can view messages
CREATE POLICY "Admin can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- Only admin can update messages (mark as read)
CREATE POLICY "Admin can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only admin can delete messages
CREATE POLICY "Admin can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);

-- Storage policies: public read access for all image buckets
CREATE POLICY "Public can view portfolio images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Public can view product images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Public can view blog images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blog-images');

-- Storage policies: authenticated users can upload to image buckets
CREATE POLICY "Admin can upload portfolio images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Admin can upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Admin can upload blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-images');

-- Storage policies: authenticated users can update/delete images
CREATE POLICY "Admin can update portfolio images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'portfolio-images')
  WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Admin can update product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images')
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Admin can update blog images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-images')
  WITH CHECK (bucket_id = 'blog-images');

CREATE POLICY "Admin can delete portfolio images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admin can delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');

CREATE POLICY "Admin can delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-images');
