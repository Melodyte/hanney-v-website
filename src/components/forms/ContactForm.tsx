"use client";

import { useState, FormEvent } from "react";
import { Input, Button, Textarea } from "@/components/ui";
import { contactSchema, type ContactFormData } from "@/lib/validations";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setSubmitStatus("idle");

    // Validate with Zod
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit contact form");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      // Preserve form data on error (don't clear)
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          Message Sent
        </h3>
        <p className="text-neutral-600">
          Thank you for reaching out! We&apos;ll get back to you as soon as possible.
        </p>
        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => setSubmitStatus("idle")}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-700" role="alert">
          Something went wrong. Please try again.
        </div>
      )}

      <Input
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Your name"
        maxLength={100}
        required
      />

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="you@example.com"
        maxLength={254}
        required
      />

      <Input
        label="Subject"
        name="subject"
        type="text"
        value={formData.subject}
        onChange={handleChange}
        error={errors.subject}
        placeholder="What is this about?"
        maxLength={150}
        required
      />

      <Textarea
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        placeholder="Tell us how we can help..."
        maxLength={2000}
        required
      />

      <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
