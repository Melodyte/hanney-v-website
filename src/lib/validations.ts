import { z } from 'zod';

export const bookingSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name must be 100 characters or less'),
  email: z.string().email('Invalid email address').max(254, 'Email must be 254 characters or less'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .max(20, 'Phone number must be 20 characters or less')
    .regex(/^[\d\s+]+$/, 'Phone number can only contain digits, spaces, and +'),
  serviceCategory: z.enum(['bespoke', 'bridal', 'event'], {
    errorMap: () => ({ message: 'Please select a valid service category' }),
  }),
  preferredDate: z.string().refine((date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 90);
    return d >= today && d <= maxDate;
  }, 'Date must be between today and 90 days from now'),
  notes: z.string().max(500, 'Notes must be 500 characters or less').optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  email: z.string().email('Invalid email address').max(254, 'Email must be 254 characters or less'),
  subject: z.string().min(1, 'Subject is required').max(150, 'Subject must be 150 characters or less'),
  message: z.string().min(1, 'Message is required').max(2000, 'Message must be 2000 characters or less'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address').max(254, 'Email must be 254 characters or less'),
});

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(150, 'Product name must be 150 characters or less'),
  description: z.string().min(1, 'Description is required').max(2000, 'Description must be 2000 characters or less'),
  price_naira: z.number().positive('Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  availability: z.enum(['available', 'made-to-order', 'sold-out'], {
    errorMap: () => ({ message: 'Please select a valid availability status' }),
  }),
  image_urls: z.array(z.string().url('Each image must be a valid URL')).min(1, 'At least one image is required').max(10, 'Maximum 10 images allowed'),
  is_visible: z.boolean(),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
  excerpt: z.string().max(200, 'Excerpt must be 200 characters or less').optional(),
  body_html: z.string().min(1, 'Body content is required'),
  category: z.string().min(1, 'Category is required'),
  featured_image_url: z.string().url('Featured image must be a valid URL'),
  author: z.string().min(1, 'Author is required'),
  is_published: z.boolean(),
  published_at: z.string().optional(),
});

export const testimonialSchema = z.object({
  client_name: z.string().min(1, 'Client name is required').max(100, 'Client name must be 100 characters or less'),
  service_type: z.string().min(1, 'Service type is required'),
  review_text: z.string().min(1, 'Review text is required').max(500, 'Review text must be 500 characters or less'),
  rating: z.number().int('Rating must be a whole number').min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  screenshot_url: z.string().url('Screenshot must be a valid URL').optional(),
  is_visible: z.boolean(),
});

// Inferred types from schemas for form usage
export type BookingFormData = z.infer<typeof bookingSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type BlogPostFormData = z.infer<typeof blogPostSchema>;
export type TestimonialFormData = z.infer<typeof testimonialSchema>;
