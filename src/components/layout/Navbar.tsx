"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/products", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/Logo/photo_2026-05-21 06.13.30.jpeg"
              alt="Hanney-V"
              className="h-10 w-auto object-contain"
            />
            <span className={`font-heading text-xl font-bold transition-colors duration-500 ${scrolled ? "text-black" : "text-white"}`}>
              {siteConfig.name}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wider uppercase transition-colors duration-300 hover:text-gold ${
                  pathname === link.href
                    ? "text-gold"
                    : scrolled
                    ? "text-gray-700"
                    : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/booking">
              <button className="bg-gold text-black px-6 py-2.5 text-sm font-semibold tracking-wider uppercase hover:bg-gold-light transition-colors duration-300">
                Book Now
              </button>
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-1" : ""
              } ${scrolled ? "bg-black" : "bg-white"}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              } ${scrolled ? "bg-black" : "bg-white"}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-1" : ""
              } ${scrolled ? "bg-black" : "bg-white"}`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/98 backdrop-blur-md"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-sm font-medium tracking-wider uppercase py-2 ${
                    pathname === link.href ? "text-gold" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/booking">
                <button className="w-full bg-gold text-black px-6 py-3 text-sm font-semibold tracking-wider uppercase mt-4">
                  Book Now
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
