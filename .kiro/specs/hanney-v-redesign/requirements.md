# Requirements Document

## Introduction

Complete redesign of the Hanney-V fashion brand website to deliver a premium, visually stunning experience befitting a luxury fashion house. The redesign replaces the existing Sanity Studio-based admin with a custom admin dashboard, introduces e-commerce functionality, and elevates the visual design to a "billion-dollar" aesthetic. The site is built with Next.js, Tailwind CSS, and deployed on Vercel.

## Glossary

- **Website**: The public-facing Hanney-V Next.js web application accessible to visitors
- **Admin_Dashboard**: The custom-built administrative interface accessible via a dedicated URL path for managing site content, orders, and bookings
- **Visitor**: Any unauthenticated user browsing the public website
- **Admin**: An authenticated user with access to the Admin_Dashboard
- **Portfolio_Gallery**: The filterable collection of Hanney-V's completed fashion works displayed on the portfolio page
- **Booking_System**: The appointment scheduling interface allowing visitors to request consultations
- **E_Commerce_Module**: The product catalog, cart, and checkout system for purchasing items
- **Newsletter_Service**: The email subscription system for collecting and managing subscriber emails
- **WhatsApp_Integration**: The click-to-chat functionality connecting visitors to Hanney-V's WhatsApp business number
- **Service_Category**: One of the three core service offerings — Bespoke Fashion, Bridal & Traditional Wear, or Event Styling

## Requirements

### Requirement 1: Premium Visual Design System

**User Story:** As a brand owner, I want the website to have a luxury, premium visual aesthetic, so that visitors perceive Hanney-V as a high-end fashion brand.

#### Acceptance Criteria

1. THE Website SHALL use a defined luxury color palette with gold accents and deep neutrals, and SHALL maintain a minimum WCAG AA contrast ratio of 4.5:1 for body text and 3:1 for large text and UI components throughout all pages
2. THE Website SHALL use a serif typeface for headings and a sans-serif typeface for body text, with a minimum body text size of 16px and heading sizes that maintain a consistent typographic scale across mobile, tablet, and desktop breakpoints
3. WHEN a Visitor scrolls to a content section or navigates between pages, THE Website SHALL animate the entering content using Framer Motion with a duration between 300ms and 800ms
4. THE Website SHALL render all pages across mobile (320px–767px), tablet (768px–1023px), and desktop (1024px and above) viewports without horizontal scrolling, content overflow, or overlapping elements, and with all interactive elements remaining accessible
5. THE Website SHALL display imagery at a minimum of 2x display density for standard viewport widths, using the Next.js Image component with lazy loading for below-the-fold content, and SHALL not cause a Cumulative Layout Shift greater than 0.1 during image loading
6. IF an animation or transition causes the page frame rate to drop below 30fps on a target device, THEN THE Website SHALL disable or reduce that animation to maintain usability

### Requirement 2: Homepage with Strong Branding

**User Story:** As a visitor, I want to see a compelling homepage that communicates the brand's luxury positioning, so that I understand what Hanney-V offers and feel motivated to explore further.

#### Acceptance Criteria

1. THE Website SHALL display a full-viewport hero section with the Hanney-V logo, brand tagline, and a primary call-to-action button linking to the booking page
2. THE Website SHALL display a services preview section showing the three Service_Category offerings, each with an image and a description of no more than 150 characters
3. THE Website SHALL display a portfolio preview section showing between 4 and 8 of the most recently added portfolio works, as managed via the Admin_Dashboard, with a link to the full Portfolio_Gallery
4. THE Website SHALL display a testimonials carousel showing client reviews with star ratings and client names, consistent with the testimonials defined in Requirement 8
5. THE Website SHALL display a newsletter subscription form in a section with distinct background styling positioned above the footer
6. WHEN a Visitor scrolls down the homepage, THE Website SHALL reveal each section with staggered fade-in animations where each successive element begins its animation 100ms to 200ms after the previous element
7. IF the portfolio contains fewer than 4 works or no testimonials are available, THEN THE Website SHALL hide the corresponding section rather than displaying an empty or broken layout

### Requirement 3: About Page

**User Story:** As a visitor, I want to learn about Hanney-V's story and values, so that I can build trust and connection with the brand.

#### Acceptance Criteria

1. THE Website SHALL display the brand story, mission statement, and founding narrative as distinct content sections on the about page
2. THE Website SHALL display at least 3 core values and at least 2 unique selling propositions, each with a title and a description of no more than 200 characters
3. THE Website SHALL display the studio location with full address (street, city, state, country) and either an embedded map or a directions link that opens in a new browser tab
4. THE Website SHALL display the founder's profile with a professional portrait image and a biography of no more than 500 characters
5. WHEN a Visitor navigates to the about page, THE Website SHALL present sections in the following order: brand story, core values, founder profile, and studio location

### Requirement 4: Services Page

**User Story:** As a visitor, I want to view detailed information about each service offering, so that I can understand what Hanney-V provides and choose the right service for my needs.

#### Acceptance Criteria

1. THE Website SHALL display three distinct service sections for Bespoke Fashion, Bridal & Traditional Wear, and Event Styling, each visually separated with clear boundaries
2. THE Website SHALL display for each service section the service title, subtitle, a description of no more than 300 characters, a feature list containing between 3 and 6 items, a starting price, and a representative image
3. THE Website SHALL display a call-to-action button on each service section that navigates to the Booking_System with the corresponding Service_Category pre-selected
4. THE Website SHALL display the services in a layout with alternating image-text arrangements across the three sections such that adjacent sections mirror their image and text positions
5. IF a service section image fails to load, THEN THE Website SHALL display a branded placeholder image in place of the representative image

### Requirement 5: Portfolio Gallery

**User Story:** As a visitor, I want to browse Hanney-V's completed works organized by category, so that I can assess the quality and style of their craftsmanship.

#### Acceptance Criteria

1. THE Portfolio_Gallery SHALL display all portfolio images in a responsive grid layout with 1 column on mobile (320px–767px), 2 columns on tablet (768px–1023px), and 3 or more columns on desktop (1024px and above)
2. THE Portfolio_Gallery SHALL provide category filter buttons for Bespoke, Bridal, Traditional, and Event categories, plus an "All" option that displays images from every category
3. WHEN the Portfolio_Gallery page loads, THE Portfolio_Gallery SHALL display all portfolio images with the "All" filter selected by default
4. WHEN a Visitor selects a category filter, THE Portfolio_Gallery SHALL display only images matching the selected category with a transition animation between 300ms and 500ms
5. IF a selected category contains no images, THEN THE Portfolio_Gallery SHALL display a message indicating no works are available in that category
6. WHEN a Visitor clicks a portfolio image, THE Portfolio_Gallery SHALL open a lightbox overlay displaying the full-resolution image with left and right navigation arrows to browse other images in the current filtered set
7. WHEN a Visitor clicks outside the lightbox image, presses the Escape key, or clicks a close button, THE Portfolio_Gallery SHALL close the lightbox overlay and return to the gallery view
8. THE Portfolio_Gallery SHALL load images progressively with blur-up placeholder effects using the Next.js Image component

### Requirement 6: Booking and Appointment System

**User Story:** As a visitor, I want to book a consultation or fitting appointment, so that I can begin the process of getting custom fashion made.

#### Acceptance Criteria

1. THE Booking_System SHALL display a booking form with fields for full name (required, maximum 100 characters), email (required), phone number (required, maximum 20 characters), preferred service category (required, selectable from Bespoke Fashion, Bridal & Traditional Wear, and Event Styling), preferred date (required), and additional notes (optional, maximum 500 characters)
2. THE Booking_System SHALL only allow selection of preferred dates that are today or later and no more than 90 days in the future
3. WHEN a Visitor submits a valid booking form, THE Booking_System SHALL store the booking request in the database and display a confirmation message indicating the booking request was received and that the Admin will follow up
4. WHEN a Visitor submits a valid booking form, THE Booking_System SHALL send a notification to the Admin via the Admin_Dashboard
5. IF a Visitor submits a form with an invalid email format, a phone number containing non-numeric characters (excluding + and spaces), or any required field left empty, THEN THE Booking_System SHALL prevent submission, highlight each invalid field, and display a per-field error description indicating the validation failure reason
6. IF the Booking_System fails to store the booking request due to a database or network error, THEN THE Booking_System SHALL display an error message indicating the request could not be processed and prompt the Visitor to try again

### Requirement 7: Contact Page with WhatsApp Integration

**User Story:** As a visitor, I want multiple ways to contact Hanney-V including WhatsApp, so that I can reach them through my preferred communication channel.

#### Acceptance Criteria

1. THE Website SHALL display the business email address, phone number, and physical address on the contact page
2. THE Website SHALL display a contact form with required fields for name (maximum 100 characters), email, subject (maximum 150 characters), and message (maximum 2000 characters)
3. WHEN a Visitor clicks the WhatsApp button, THE WhatsApp_Integration SHALL open WhatsApp (or WhatsApp Web) with a pre-filled greeting message including the business name directed to the business number 2348105177258
4. THE Website SHALL display a floating WhatsApp button on all pages that remains visible during scrolling
5. THE Website SHALL display links to the Facebook page (Hanney-v palace) and Instagram account (hanney_vfashion)
6. WHEN a Visitor submits a valid contact form, THE Website SHALL store the message and display a confirmation message indicating the inquiry was sent
7. IF a Visitor submits the contact form with an invalid email format or missing required fields, THEN THE Website SHALL highlight the invalid fields and display inline error descriptions without clearing the entered data
8. IF the contact form submission fails due to a server error, THEN THE Website SHALL display an error message indicating the submission was unsuccessful and retain the form data so the Visitor can retry

### Requirement 8: Testimonials Section

**User Story:** As a visitor, I want to read reviews from previous clients, so that I can trust the quality of Hanney-V's work before booking.

#### Acceptance Criteria

1. THE Website SHALL display client testimonials with the client name, service type, review text (maximum 500 characters), and star rating on a scale of 1 to 5 whole stars
2. THE Website SHALL display testimonials in an auto-scrolling carousel that advances every 5 seconds, with previous/next arrow controls and dot indicators for manual navigation
3. IF a testimonial has an associated screenshot image, THEN THE Website SHALL display the screenshot image alongside the text review
4. WHEN a Visitor interacts with carousel controls, THE Website SHALL transition between testimonials with a sliding animation lasting between 300ms and 500ms
5. WHEN a Visitor interacts with the carousel controls or hovers over the carousel, THE Website SHALL pause auto-scrolling and resume auto-scrolling after 10 seconds of inactivity

### Requirement 9: Blog and Content Section

**User Story:** As a visitor, I want to read fashion tips, behind-the-scenes content, and cultural articles, so that I stay engaged with the brand and learn about fashion.

#### Acceptance Criteria

1. THE Website SHALL display a blog listing page showing post cards with title, excerpt (maximum 200 characters), category, publication date, and featured image, ordered by publication date descending, with a maximum of 9 posts per page and pagination controls to access additional pages
2. WHEN a Visitor clicks a blog post card, THE Website SHALL navigate to a dedicated blog post page displaying the full article content including title, author, publication date, category, featured image, and the rich text body
3. THE Website SHALL support rich text content including headings, paragraphs, images, block quotes, and lists in blog posts
4. THE Admin_Dashboard SHALL provide an interface for creating, editing, and deleting blog posts with required fields for title, category, featured image, and body content, and optional fields for excerpt and publication date
5. WHEN a Visitor selects a category filter on the blog listing page, THE Website SHALL display only posts matching the selected category
6. IF no blog posts exist or no posts match the selected category filter, THEN THE Website SHALL display a message indicating no posts are available

### Requirement 10: Email Newsletter Subscription

**User Story:** As a brand owner, I want to collect visitor email addresses for marketing, so that I can send updates about new collections and promotions.

#### Acceptance Criteria

1. THE Newsletter_Service SHALL display a subscription form with an email input field that accepts a maximum of 254 characters and a submit button
2. WHEN a Visitor submits a valid email address, THE Newsletter_Service SHALL disable the submit button to prevent duplicate submissions, store the email in the database, and display a success confirmation message
3. IF a Visitor submits an already-subscribed email address, THEN THE Newsletter_Service SHALL display a message indicating the email is already subscribed without creating a duplicate entry
4. IF a Visitor submits an invalid email format, THEN THE Newsletter_Service SHALL display an inline validation error indicating the expected format and SHALL NOT submit the form
5. IF the Newsletter_Service fails to store the email due to a network or database error, THEN THE Newsletter_Service SHALL display an error message indicating the subscription could not be completed and SHALL preserve the entered email address in the input field

### Requirement 11: Social Media Integration

**User Story:** As a brand owner, I want social media links prominently displayed, so that visitors can follow Hanney-V on social platforms and increase brand reach.

#### Acceptance Criteria

1. THE Website SHALL display social media icon links for Instagram (hanney_vfashion) and Facebook (Hanney-v palace) in the footer of every page, each with an accessible text label identifying the platform name
2. THE Website SHALL display social media icon links in the contact page content area as a distinct section separate from the footer
3. WHEN a Visitor clicks a social media icon, THE Website SHALL open the corresponding social media profile in a new browser tab using target="_blank" and rel="noopener noreferrer" attributes
4. THE Website SHALL include Open Graph meta tags (og:title, og:description, og:image, og:url, og:type) and Twitter Card meta tags (twitter:card, twitter:title, twitter:description, twitter:image) on all pages
5. IF a social media profile URL fails to load or the external platform is unreachable, THEN THE Website SHALL still render the icon link with the correct href without preventing page display

### Requirement 12: Custom Admin Dashboard

**User Story:** As a brand owner, I want a custom admin dashboard accessible via URL (not Sanity Studio), so that I can easily manage all website content, bookings, and orders without technical knowledge.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL be accessible via a dedicated URL path (e.g., /admin) and require authentication with email and password
2. WHEN an Admin logs in with valid credentials, THE Admin_Dashboard SHALL display a main overview with summary statistics for bookings, orders, subscribers, and activity from the last 7 days
3. THE Admin_Dashboard SHALL provide interfaces for managing portfolio images including upload (accepting JPEG, PNG, and WebP formats up to 10MB per file), categorize, reorder, and delete operations
4. THE Admin_Dashboard SHALL provide interfaces for managing products including create, edit, delete, and toggle visibility
5. THE Admin_Dashboard SHALL provide interfaces for managing bookings including view, update status (pending, confirmed, completed, cancelled), and respond to clients
6. THE Admin_Dashboard SHALL provide interfaces for managing testimonials including create, edit, delete, and toggle visibility
7. THE Admin_Dashboard SHALL provide interfaces for managing blog posts including create with rich text editor, edit, publish, unpublish, and delete
8. THE Admin_Dashboard SHALL provide an interface for viewing and exporting the newsletter subscriber list in CSV format
9. IF an unauthenticated user attempts to access the Admin_Dashboard URL, THEN THE Admin_Dashboard SHALL redirect to the login page
10. THE Admin_Dashboard SHALL use a sidebar navigation layout and be responsive for tablet (768px and above) and desktop (1024px and above) viewports
11. IF an Admin submits invalid credentials, THEN THE Admin_Dashboard SHALL display an error message indicating that the email or password is incorrect and remain on the login page
12. WHEN an Admin initiates a delete operation on any content item, THE Admin_Dashboard SHALL display a confirmation prompt before executing the deletion
13. IF an image upload exceeds 10MB or is not in an accepted format, THEN THE Admin_Dashboard SHALL reject the upload and display an error message indicating the file size limit or accepted formats

### Requirement 13: E-Commerce Functionality

**User Story:** As a visitor, I want to browse and purchase fashion items online, so that I can buy ready-made pieces or place orders for custom items.

#### Acceptance Criteria

1. THE E_Commerce_Module SHALL display a product catalog page with product cards showing image, name, price displayed in Nigerian Naira (₦) format, and category
2. WHEN a Visitor selects a category filter, THE E_Commerce_Module SHALL display only products matching the selected category, and display an "All" option to reset filtering
3. WHEN a Visitor clicks a product card, THE E_Commerce_Module SHALL navigate to a product detail page showing the product description (up to 2000 characters), between 1 and 10 images in a gallery view, price, availability status, and an order button
4. WHEN a Visitor clicks the order button on a product with availability status "available" or "made-to-order", THE E_Commerce_Module SHALL open WhatsApp directed to the business number 2348105177258 with a pre-filled message containing the product name, price, and availability status
5. THE Admin_Dashboard SHALL provide interfaces for adding, editing, and removing products from the catalog, where each product requires a name (max 150 characters), at least one image, a price, a category, a description, and an availability status
6. THE E_Commerce_Module SHALL display product availability status (available, made-to-order, sold-out) on each product card, and SHALL disable the order button for products with "sold-out" status
7. IF no products match the selected category filter or the catalog is empty, THEN THE E_Commerce_Module SHALL display a message indicating no products are available for the current selection

### Requirement 14: SEO and Performance Optimization

**User Story:** As a brand owner, I want the website to rank well on search engines and load quickly, so that potential clients can find Hanney-V online and have a smooth browsing experience.

#### Acceptance Criteria

1. THE Website SHALL generate a unique meta title (maximum 60 characters) and meta description (maximum 160 characters) for each page using Next.js metadata API, where no two pages share the same meta title
2. THE Website SHALL implement structured data (JSON-LD) for the business (LocalBusiness), products (Product), and reviews (Review) that passes validation with no errors
3. THE Website SHALL achieve a Lighthouse performance score of 90 or above on desktop and 80 or above on mobile under simulated 4G throttling conditions
4. THE Website SHALL implement heading hierarchy on all pages with exactly one h1 element per page and no skipped heading levels (e.g., h2 must not be followed directly by h4)
5. THE Website SHALL generate a sitemap.xml containing all public page URLs and a robots.txt that permits search engine crawling of public pages while blocking admin routes
6. THE Website SHALL provide descriptive alt text on all content images, where alt text is between 5 and 125 characters and describes the image content

### Requirement 15: Deployment and Infrastructure

**User Story:** As a brand owner, I want the website deployed on Vercel with proper domain configuration, so that the site is live, fast, and accessible worldwide.

#### Acceptance Criteria

1. WHEN a commit is pushed to the GitHub repository's main branch, THE Website SHALL complete the Vercel build process without errors and serve the site at the configured domain
2. THE Website SHALL use environment variables for all sensitive configuration (API keys, database credentials, admin secrets) and SHALL NOT include any sensitive values in the source code repository
3. THE Website SHALL use a database for persistent storage of bookings, subscribers, blog posts, products, and admin data, accessible from the Vercel deployment environment
4. WHEN the Admin updates content via the Admin_Dashboard, THE Website SHALL reflect the changes to public-facing pages within 60 seconds without requiring a new build or redeployment
5. IF the database is unreachable during a page request, THEN THE Website SHALL display an error message indicating the service is temporarily unavailable rather than exposing technical details or crashing
