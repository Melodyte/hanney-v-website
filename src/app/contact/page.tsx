"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/data";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const message = encodeURIComponent(
      `Hello Hanney-V! I have a question.%0A%0A` +
        `Name: ${data.get("name")}%0A` +
        `Email: ${data.get("email")}%0A` +
        `Message: ${data.get("message")}`
    );
    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div>
      <section className="relative pt-32 pb-20 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">
              Get in <span className="text-gold">Touch</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We&apos;d love to hear from you
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading title="Send a Message" align="left" subtitle="We'll get back to you within 24 hours" />
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                </div>
                <Button type="submit" variant="gold" size="lg">
                  Send Message
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <SectionHeading title="Contact Info" align="left" />
                <div className="space-y-6 mt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading text-lg text-black mb-1">Email</h4>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-gray-500 hover:text-gold transition-colors"
                      >
                        {siteConfig.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading text-lg text-black mb-1">Phone / WhatsApp</h4>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="text-gray-500 hover:text-gold transition-colors"
                      >
                        {siteConfig.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading text-lg text-black mb-1">Address</h4>
                      <p className="text-gray-500">{siteConfig.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4.244 4.243a4 4 0 105.656 5.656l1.414-1.414" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-heading text-lg text-black mb-1">Follow Us</h4>
                      <div className="flex gap-4">
                        <a
                          href={siteConfig.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gold transition-colors font-medium"
                        >
                          Instagram
                        </a>
                        <a
                          href={siteConfig.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gold transition-colors font-medium"
                        >
                          Facebook
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
