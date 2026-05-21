# Implementation Plan: Hanney-V Website Redesign

## Overview

This plan implements the complete Hanney-V website redesign: replacing Sanity Studio with Supabase + custom admin dashboard, building a luxury public-facing site with WhatsApp-based e-commerce, booking system, portfolio gallery, blog, and newsletter. Implementation uses Next.js 16 (App Router), Tailwind CSS v4, Framer Motion 12, and Supabase for data/auth/storage.

## Tasks

- [x] 1. Project foundation and infrastructure setup
  - [x] 1.1 Initialize project structure, install dependencies, and configure Tailwind CSS v4
    - Remove Sanity dependencies from package.json
    - Install Supabase client (`@supabase/supabase-js`, `@supabase/ssr`), Zod, Tiptap editor packages, Resend, `@fast-check/vitest`
    - Configure Tailwind CSS v4 with luxury design tokens (gold accents, deep neutrals, serif/sans-serif font pairing)
    - Create `src/app/globals.css` with custom properties for the design system
    - Set up directory structure: `src/app/(public)/`, `src/app/(admin)/`, `src/components/`, `src/lib/`, `tests/`
    - _Requirements: 1.1, 1.2, 15.2_

  - [x] 1.2 Set up Supabase client, database schema, and Row Level Security
    - Create `src/lib/supabase/client.ts` (browser client) and `src/lib/supabase/server.ts` (server client)
    - Create SQL migration file with all tables: `portfolio_items`, `products`, `bookings`, `testimonials`, `blog_posts`, `newsletter_subscribers`, `contact_messages`
    - Configure Row Level Security policies: public read for visible content, authenticated write for admin
    - Create Supabase Storage buckets for portfolio images, product images, and blog images
    - Set up environment variables in `.env.local` for Supabase URL, anon key, and service role key
    - _Requirements: 15.2, 15.3_

  - [x] 1.3 Create TypeScript types and Zod validation schemas
    - Create `src/lib/types.ts` with all database row types (PortfolioItem, Product, Booking, Testimonial, BlogPost, NewsletterSubscriber, ContactMessage)
    - Create `src/lib/validations.ts` with Zod schemas for booking, contact, newsletter, product, blog post, and testimonial
    - _Requirements: 6.1, 6.5, 7.2, 7.7, 10.4, 12.3, 13.5_

  - [ ]* 1.4 Write property tests for booking form validation (Property 1)
    - **Property 1: Booking form validation accepts valid inputs and rejects invalid ones**
    - **Validates: Requirements 6.1, 6.2, 6.5**

  - [ ]* 1.5 Write property tests for contact form validation (Property 2)
    - **Property 2: Contact form validation accepts valid inputs and rejects invalid ones**
    - **Validates: Requirements 7.2, 7.7**

  - [x] 1.6 Create utility functions (formatting, URL generation, filtering, pagination)
    - Create `src/lib/utils/format.ts` with price formatter (Naira with ₦ prefix and comma separators)
    - Create `src/lib/utils/whatsapp.ts` with WhatsApp deep link URL generator for business number 2348105177258
    - Create `src/lib/utils/filter.ts` with category filter function (returns matching items or all when "All" selected)
    - Create `src/lib/utils/pagination.ts` with blog pagination function (9 posts per page, ordered by date descending)
    - Create `src/lib/utils/metadata.ts` with metadata generator (title max 60 chars, description max 160 chars with ellipsis truncation)
    - Create `src/lib/utils/csv.ts` with CSV export function for newsletter subscribers
    - Create `src/lib/utils/portfolio.ts` with portfolio preview selection (4-8 items, ordered by creation date)
    - Create `src/lib/utils/jsonld.ts` with JSON-LD structured data generators for Product, LocalBusiness, Review
    - _Requirements: 13.1, 7.3, 13.4, 5.4, 9.1, 14.1, 12.8, 2.3, 14.2_

  - [ ]* 1.7 Write property tests for utility functions (Properties 3-5, 8-12)
    - **Property 3: Category filtering returns only matching items**
    - **Property 4: WhatsApp URL generation produces valid deep links**
    - **Property 5: Blog pagination returns correct page slices**
    - **Property 8: Price formatting produces correct Naira representation**
    - **Property 9: CSV export contains all subscriber emails**
    - **Property 10: Portfolio preview selection respects count bounds**
    - **Property 11: JSON-LD generation produces valid structured data**
    - **Property 12: Page metadata respects length constraints**
    - **Validates: Requirements 5.4, 9.5, 13.2, 7.3, 13.4, 9.1, 13.1, 12.8, 2.3, 2.7, 14.2, 14.1**

  - [ ]* 1.8 Write property test for file upload validation (Property 7)
    - **Property 7: File upload validation enforces format and size constraints**
    - **Validates: Requirements 12.3, 12.13**

  - [ ]* 1.9 Write property test for color contrast ratio (Property 13)
    - **Property 13: Color contrast ratio meets WCAG AA**
    - **Validates: Requirements 1.1**

- [x] 2. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 3. Core UI components and design system
  - [x] 3.1 Build primitive UI components (Button, Input, Textarea, Select, Badge, Card, Modal, Toast, Skeleton, SectionHeading)
    - Implement Button with primary, secondary, ghost variants using Tailwind CSS v4 luxury tokens
    - Implement Input and Textarea with validation states (error border, helper text)
    - Implement Select dropdown, Badge (status colors), Card container
    - Implement Modal overlay with backdrop click/Escape to close
    - Implement Toast notification system with auto-dismiss
    - Implement Skeleton loading placeholders and SectionHeading with decorative elements
    - _Requirements: 1.1, 1.2, 1.4_

  - [x] 3.2 Build layout components (Navbar, Footer, AdminSidebar, AdminHeader)
    - Implement responsive Navbar with mobile hamburger menu, logo, and navigation links
    - Implement Footer with social media icon links (Instagram, Facebook) with accessible labels, `target="_blank"` and `rel="noopener noreferrer"`
    - Implement AdminSidebar with navigation to all admin sections
    - Implement AdminHeader with user info and logout
    - _Requirements: 11.1, 11.3, 12.10_

  - [x] 3.3 Build shared interactive components (WhatsAppButton, Lightbox, CategoryFilter, Pagination, AnimatedSection, StarRating)
    - Implement floating WhatsApp FAB button visible on all pages during scroll
    - Implement Lightbox with left/right navigation, close on backdrop click/Escape
    - Implement CategoryFilter with "All" option and active state styling
    - Implement Pagination component with page numbers and prev/next
    - Implement AnimatedSection using Framer Motion scroll-triggered reveal (300-800ms duration, configurable direction)
    - Implement StarRating display component (1-5 whole stars)
    - _Requirements: 7.4, 5.6, 5.7, 5.4, 9.1, 1.3, 8.1_

  - [x] 3.4 Build form components (BookingForm, ContactForm, NewsletterForm)
    - Implement BookingForm with all fields, date picker (today to +90 days), service category pre-selection support, Zod validation, per-field error display
    - Implement ContactForm with all fields, Zod validation, per-field error display, data preservation on error
    - Implement NewsletterForm with email input, submit button disable on submission, success/error/duplicate messaging
    - _Requirements: 6.1, 6.2, 6.5, 7.2, 7.7, 10.1, 10.2, 10.3, 10.4_

- [x] 4. Authentication and admin middleware
  - [x] 4.1 Implement authentication middleware and admin login page
    - Create `src/middleware.ts` to guard `/admin/*` routes (except `/admin/login`)
    - Validate Supabase session token from cookies, redirect unauthenticated users to `/admin/login`
    - Create `/admin/login/page.tsx` with email/password form, error messaging for invalid credentials
    - Implement login Server Action using Supabase Auth
    - _Requirements: 12.1, 12.9, 12.11_

- [ ] 5. API routes and server actions
  - [x] 5.1 Implement booking API route and server action
    - Create `src/app/api/bookings/route.ts` with POST (create booking) and GET (list bookings for admin)
    - Validate request body with Zod bookingSchema
    - Store booking in Supabase with status 'pending'
    - Return appropriate error responses (400 for validation, 503 for DB errors)
    - _Requirements: 6.3, 6.4, 6.6_

  - [x] 5.2 Implement contact form API route
    - Create `src/app/api/contact/route.ts` with POST handler
    - Validate with contactSchema, store in `contact_messages` table
    - Return success confirmation or error responses
    - _Requirements: 7.6, 7.8_

  - [x] 5.3 Implement newsletter subscription API route
    - Create `src/app/api/newsletter/route.ts` with POST (subscribe) and GET (list for admin)
    - Check for existing subscriber before insert (deduplication)
    - Return appropriate response for new subscription, duplicate, or error
    - _Requirements: 10.2, 10.3, 10.5_

  - [ ]* 5.4 Write property test for newsletter deduplication (Property 6)
    - **Property 6: Newsletter subscription deduplication**
    - **Validates: Requirements 10.3**

  - [x] 5.5 Implement product CRUD API routes
    - Create `src/app/api/products/route.ts` with GET (public catalog, filtered by visibility) and POST (admin create)
    - Create `src/app/api/products/[id]/route.ts` with PUT (update) and DELETE
    - Validate with productSchema, handle slug generation
    - Trigger revalidation of product pages on mutation
    - _Requirements: 13.5, 13.6_

  - [x] 5.6 Implement portfolio CRUD API routes
    - Create `src/app/api/portfolio/route.ts` with GET (public, ordered by sort_order) and POST (admin create)
    - Support reorder and delete operations
    - Trigger revalidation of portfolio page on mutation
    - _Requirements: 12.3_

  - [x] 5.7 Implement blog CRUD API routes
    - Create `src/app/api/blog/route.ts` with GET (public, published only, paginated) and POST (admin create)
    - Create `src/app/api/blog/[id]/route.ts` with PUT (update/publish/unpublish) and DELETE
    - Validate with blogPostSchema, handle slug generation from title
    - Trigger revalidation of blog pages on mutation
    - _Requirements: 9.4_

  - [x] 5.8 Implement testimonials CRUD API routes
    - Create `src/app/api/testimonials/route.ts` with GET (public, visible only) and POST (admin create)
    - Support edit, delete, and toggle visibility
    - Trigger revalidation of homepage on mutation
    - _Requirements: 12.6_

  - [x] 5.9 Implement image upload API route
    - Create `src/app/api/upload/route.ts` handling multipart/form-data
    - Validate file size (max 10MB) and MIME type (JPEG, PNG, WebP)
    - Upload to Supabase Storage, return public URL
    - Return 413 for oversized files, 415 for wrong format
    - _Requirements: 12.3, 12.13_

  - [x] 5.10 Implement on-demand revalidation API route
    - Create `src/app/api/revalidate/route.ts` accepting paths array and secret
    - Call `revalidatePath()` for each provided path
    - Implement retry with exponential backoff (1s, 2s, 4s) on failure
    - _Requirements: 15.4_

- [x] 6. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Public pages implementation
  - [x] 7.1 Implement root layout, global error boundary, and not-found page
    - Create `src/app/layout.tsx` with font loading (serif headings, sans-serif body), metadata defaults, and global providers
    - Create `src/app/error.tsx` global error boundary with branded error UI
    - Create `src/app/not-found.tsx` custom 404 page with navigation back to homepage
    - Create `src/app/(public)/layout.tsx` with Navbar, Footer, and floating WhatsApp button
    - _Requirements: 1.2, 14.4, 7.4_

  - [x] 7.2 Implement homepage with all sections
    - Create `src/app/(public)/page.tsx` as Server Component fetching portfolio, testimonials from Supabase
    - Implement HeroSection with full-viewport layout, logo, tagline, CTA button to booking
    - Implement ServicesPreview showing 3 service categories with images and descriptions (max 150 chars)
    - Implement PortfolioPreview showing 4-8 recent works with link to full gallery (hide if < 4)
    - Implement TestimonialsCarousel with auto-scroll (5s interval), pause on hover/interaction, resume after 10s
    - Implement NewsletterSection with distinct background styling above footer
    - Wrap all sections in AnimatedSection with staggered fade-in (100-200ms delay between elements)
    - Add ISR with `revalidate: 60`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 8.1, 8.2, 8.4, 8.5_

  - [x] 7.3 Implement about page
    - Create `src/app/(public)/about/page.tsx` with brand story, core values (3+), USPs (2+), founder profile, studio location
    - Order sections: brand story → core values → founder profile → studio location
    - Include embedded map or directions link (opens in new tab)
    - Wrap sections in AnimatedSection for scroll reveal
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 7.4 Implement services page
    - Create `src/app/(public)/services/page.tsx` with three service sections (Bespoke, Bridal, Event)
    - Display title, subtitle, description (max 300 chars), feature list (3-6 items), starting price, image
    - Implement alternating image-text layout across sections
    - Add CTA buttons linking to booking with service category pre-selected
    - Handle image load failure with branded placeholder
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 7.5 Implement portfolio gallery page
    - Create `src/app/(public)/portfolio/page.tsx` as Server Component fetching portfolio items
    - Implement responsive grid (1 col mobile, 2 col tablet, 3+ col desktop)
    - Integrate CategoryFilter (Bespoke, Bridal, Traditional, Event, All) with "All" selected by default
    - Implement filter transition animation (300-500ms)
    - Integrate Lightbox on image click with navigation within filtered set
    - Display empty category message when no images match
    - Use Next.js Image with blur-up placeholder and progressive loading
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

  - [x] 7.6 Implement booking page
    - Create `src/app/(public)/booking/page.tsx` integrating BookingForm component
    - Wire form submission to booking API route
    - Display confirmation message on success, error message on failure
    - Support URL query param for pre-selecting service category from services page
    - _Requirements: 6.1, 6.2, 6.3, 6.5, 6.6_

  - [x] 7.7 Implement contact page
    - Create `src/app/(public)/contact/page.tsx` with business info (email, phone, address)
    - Integrate ContactForm with submission to contact API route
    - Display social media links section (Instagram, Facebook) separate from footer
    - Display confirmation on success, error on failure with data preservation
    - _Requirements: 7.1, 7.2, 7.5, 7.6, 7.7, 7.8, 11.2_

  - [x] 7.8 Implement blog listing and detail pages
    - Create `src/app/(public)/blog/page.tsx` with paginated post cards (9 per page), category filter
    - Display title, excerpt (max 200 chars), category, date, featured image per card
    - Create `src/app/(public)/blog/[slug]/page.tsx` with full article rendering (title, author, date, category, image, rich text body)
    - Create `src/components/shared/RichTextRenderer.tsx` for rendering HTML content
    - Display empty state message when no posts available
    - _Requirements: 9.1, 9.2, 9.3, 9.5, 9.6_

  - [x] 7.9 Implement product catalog and detail pages
    - Create `src/app/(public)/products/page.tsx` with product cards (image, name, price in ₦, category), category filter
    - Create `src/app/(public)/products/[id]/page.tsx` with full product detail (description, image gallery, price, availability, order button)
    - Implement WhatsApp order button (opens WhatsApp with product name, price, availability pre-filled)
    - Disable order button for "sold-out" products
    - Display availability status badge on cards
    - Display empty state when no products match filter
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.6, 13.7_

- [x] 8. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Admin dashboard implementation
  - [x] 9.1 Implement admin layout and dashboard overview
    - Create `src/app/(admin)/admin/layout.tsx` with AdminSidebar and AdminHeader
    - Create `src/app/(admin)/admin/page.tsx` dashboard with summary stats (bookings, orders, subscribers, 7-day activity)
    - Ensure responsive layout for tablet (768px+) and desktop (1024px+)
    - _Requirements: 12.2, 12.10_

  - [x] 9.2 Implement admin portfolio management page
    - Create `src/app/(admin)/admin/portfolio/page.tsx` with image grid
    - Integrate ImageUploader component (JPEG, PNG, WebP, max 10MB)
    - Implement categorize, reorder (drag or sort controls), and delete with confirmation prompt
    - Trigger revalidation on changes
    - _Requirements: 12.3, 12.12, 12.13_

  - [x] 9.3 Implement admin products management page
    - Create `src/app/(admin)/admin/products/page.tsx` with product list/grid
    - Implement create/edit form with all product fields (name, description, price, category, availability, images)
    - Implement delete with confirmation and toggle visibility
    - Trigger revalidation on changes
    - _Requirements: 12.4, 13.5_

  - [x] 9.4 Implement admin bookings management page
    - Create `src/app/(admin)/admin/bookings/page.tsx` with bookings list
    - Display booking details, implement status update (pending → confirmed → completed / cancelled)
    - Show notification indicator for new bookings
    - _Requirements: 12.5, 6.4_

  - [x] 9.5 Implement admin testimonials management page
    - Create `src/app/(admin)/admin/testimonials/page.tsx` with testimonials list
    - Implement create/edit form (client name, service type, review text, rating, screenshot)
    - Implement delete with confirmation and toggle visibility
    - Trigger revalidation on changes
    - _Requirements: 12.6_

  - [x] 9.6 Implement admin blog management with rich text editor
    - Create `src/app/(admin)/admin/blog/page.tsx` with blog post list
    - Create `src/app/(admin)/admin/blog/[id]/edit/page.tsx` with Tiptap rich text editor
    - Implement create, edit, publish/unpublish, delete with confirmation
    - Support headings, paragraphs, images, block quotes, lists in editor
    - Trigger revalidation on changes
    - _Requirements: 9.3, 9.4, 12.7_

  - [x] 9.7 Implement admin newsletter subscribers page with CSV export
    - Create `src/app/(admin)/admin/subscribers/page.tsx` with subscriber list
    - Implement CSV export download using csv utility function
    - Display subscriber count and active/inactive status
    - _Requirements: 12.8_

- [x] 10. SEO, metadata, and performance optimization
  - [x] 10.1 Implement SEO metadata, structured data, and sitemap
    - Add unique meta title (max 60 chars) and description (max 160 chars) to every page using Next.js metadata API
    - Add Open Graph and Twitter Card meta tags to all pages
    - Implement JSON-LD structured data for LocalBusiness, Product pages, and Review
    - Create `src/app/sitemap.ts` generating dynamic sitemap with all public URLs
    - Create `src/app/robots.ts` permitting public pages, blocking `/admin/*`
    - Ensure heading hierarchy (one h1 per page, no skipped levels)
    - Ensure all content images have descriptive alt text (5-125 chars)
    - _Requirements: 14.1, 14.2, 14.4, 14.5, 14.6, 11.4_

  - [x] 10.2 Optimize images and performance
    - Ensure all images use Next.js Image component with proper srcSet, lazy loading for below-fold content
    - Verify 2x display density for standard viewports
    - Ensure CLS < 0.1 during image loading with proper width/height or aspect-ratio
    - Verify responsive rendering across mobile/tablet/desktop without overflow
    - _Requirements: 1.4, 1.5, 14.3_

- [x] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The design uses TypeScript throughout — all implementation uses `.ts`/`.tsx` files
- Supabase migration SQL should be run manually against the Supabase project before starting API route implementation
- Admin dashboard requires Supabase Auth to be configured with at least one admin user

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["1.4", "1.5", "1.6"] },
    { "id": 3, "tasks": ["1.7", "1.8", "1.9", "3.1"] },
    { "id": 4, "tasks": ["3.2", "3.3", "3.4", "4.1"] },
    { "id": 5, "tasks": ["5.1", "5.2", "5.3", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10"] },
    { "id": 6, "tasks": ["5.4", "7.1"] },
    { "id": 7, "tasks": ["7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8", "7.9"] },
    { "id": 8, "tasks": ["9.1"] },
    { "id": 9, "tasks": ["9.2", "9.3", "9.4", "9.5", "9.6", "9.7"] },
    { "id": 10, "tasks": ["10.1", "10.2"] }
  ]
}
```
