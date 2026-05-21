"use client";

import { useState, FormEvent } from "react";
import { Input, Button, Select, Textarea } from "@/components/ui";
import { bookingSchema, type BookingFormData } from "@/lib/validations";
import type { SelectOption } from "@/components/ui/Select";
import { ZodError } from "zod";

interface BookingFormProps {
  defaultService?: "bespoke" | "bridal" | "event";
}

const SERVICE_OPTIONS: SelectOption[] = [
  { value: "bespoke", label: "Bespoke Fashion" },
  { value: "bridal", label: "Bridal & Traditional Wear" },
  { value: "event", label: "Event Styling" },
];

function getDateLimits() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 90);

  const formatDate = (d: Date) => d.toISOString().split("T")[0];
  return { min: formatDate(today), max: formatDate(maxDate) };
}

export default function BookingForm({ defaultService }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    email: "",
    phone: "",
    serviceCategory: defaultService || "bespoke",
    preferredDate: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const dateLimits = getDateLimits();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setSubmitStatus("idle");

    // Validate with Zod
    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingFormData, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof BookingFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit booking");
      }

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        serviceCategory: defaultService || "bespoke",
        preferredDate: "",
        notes: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">
          Booking Request Received
        </h3>
        <p className="text-neutral-600">
          Thank you! We&apos;ve received your booking request and will follow up shortly.
        </p>
        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => setSubmitStatus("idle")}
        >
          Book Another Appointment
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
        label="Full Name"
        name="fullName"
        type="text"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        placeholder="Enter your full name"
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
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        placeholder="+234 801 234 5678"
        maxLength={20}
        required
      />

      <Select
        label="Service Category"
        name="serviceCategory"
        value={formData.serviceCategory}
        onChange={handleChange}
        error={errors.serviceCategory}
        options={SERVICE_OPTIONS}
        required
      />

      <Input
        label="Preferred Date"
        name="preferredDate"
        type="date"
        value={formData.preferredDate}
        onChange={handleChange}
        error={errors.preferredDate}
        min={dateLimits.min}
        max={dateLimits.max}
        required
      />

      <Textarea
        label="Additional Notes"
        name="notes"
        value={formData.notes || ""}
        onChange={handleChange}
        error={errors.notes}
        placeholder="Any additional details about your appointment..."
        maxLength={500}
      />

      <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
        {isLoading ? "Submitting..." : "Book Appointment"}
      </Button>
    </form>
  );
}
