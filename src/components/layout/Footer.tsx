"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/data";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/Logo/photo_2026-05-21 06.13.30.jpeg"
                alt="Hanney-V logo"
                width={32}
                height={32}
                className="h-8 w-auto object-contain rounded-full"
              />
              <span className="font-heading text-xl font-bold text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/products", label: "Shop" },
                { href: "/blog", label: "Blog" },
                { href: "/booking", label: "Book Appointment" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg mb-4 text-gold">Services</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Bespoke Fashion</li>
              <li>Bridal &amp; Traditional Wear</li>
              <li>Event Styling</li>
              <li>Asoebi Coordination</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-heading text-lg mb-4 text-gold">Contact</h4>
            <div className="space-y-3 text-sm text-neutral-400">
              <p>{siteConfig.address}</p>
              <p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-gold transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {siteConfig.email}
                </a>
              </p>

              {/* Social Media Icons */}
              <div className="flex gap-4 pt-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-gold transition-colors"
                >
                  <InstagramIcon className="w-5 h-5" />
                  <span className="sr-only">
                    Follow us on Instagram (hanney_vfashion)
                  </span>
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-gold transition-colors"
                >
                  <FacebookIcon className="w-5 h-5" />
                  <span className="sr-only">
                    Follow us on Facebook (Hanney-v palace)
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-gold transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
              <span className="sr-only">Instagram (hanney_vfashion)</span>
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-gold transition-colors"
            >
              <FacebookIcon className="w-4 h-4" />
              <span className="sr-only">Facebook (Hanney-v palace)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
