"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/Logo/photo_2026-05-21 06.13.30.jpeg"
                alt="Hanney-V"
                className="h-8 w-auto object-contain"
              />
              <span className="font-heading text-xl font-bold text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4 text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/products", label: "Shop" },
                { href: "/blog", label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4 text-gold">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Bespoke Fashion</li>
              <li>Bridal & Traditional Wear</li>
              <li>Event Styling</li>
              <li>Asoebi Coordination</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4 text-gold">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
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
              <div className="flex gap-3 pt-2">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
