"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { siteConfig, services } from "@/lib/data";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    details: "",
  });

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Hello Hanney-V! I'd like to book a consultation.%0A%0A` +
        `Name: ${form.name}%0A` +
        `Email: ${form.email}%0A` +
        `Phone: ${form.phone}%0A` +
        `Service: ${form.service}%0A` +
        `Preferred Date: ${form.date}%0A` +
        `Preferred Time: ${form.time}%0A` +
        `Details: ${form.details}`
    );
    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${message}`,
      "_blank"
    );
  };

  const canNext = () => {
    if (step === 1) return form.name && form.email && form.phone;
    if (step === 2) return form.service && form.date;
    return true;
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
              Book a <span className="text-gold">Consultation</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Let&apos;s create something extraordinary together
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step >= s
                      ? "bg-gold text-black"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {s}
                </div>
                <span
                  className={`text-sm hidden sm:block ${
                    step >= s ? "text-black" : "text-gray-400"
                  }`}
                >
                  {s === 1 ? "Info" : s === 2 ? "Service" : "Confirm"}
                </span>
                {s < 3 && <div className={`w-8 h-0.5 ${step > s ? "bg-gold" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="font-heading text-2xl text-black mb-6">Your Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-gold transition-colors"
                    placeholder="080..."
                    required
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="font-heading text-2xl text-black mb-6">Service & Schedule</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interested In *
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => updateField("service", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-black focus:outline-none focus:border-gold transition-colors"
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} - {s.subtitle}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-black focus:outline-none focus:border-gold transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-black focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="font-heading text-2xl text-black mb-6">Additional Details</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    value={form.details}
                    onChange={(e) => updateField("details", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-gold transition-colors min-h-[150px]"
                    placeholder="Describe what you're looking for, fabric preferences, occasion, etc."
                    rows={5}
                  />
                </div>
                <div className="bg-cream p-6 border border-gold/30">
                  <h3 className="font-heading text-lg text-black mb-3">Summary</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Name:</strong> {form.name}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Phone:</strong> {form.phone}</p>
                    <p><strong>Service:</strong> {form.service}</p>
                    <p><strong>Date:</strong> {form.date}</p>
                    {form.time && <p><strong>Time:</strong> {form.time}</p>}
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Your booking request will be sent via WhatsApp. We&apos;ll confirm your
                  appointment shortly.
                </p>
              </motion.div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canNext()}
                  className={`px-8 py-3 font-medium transition-colors ${
                    canNext()
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gold text-black font-semibold hover:bg-gold-light transition-colors"
                >
                  Send via WhatsApp
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
