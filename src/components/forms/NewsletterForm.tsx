"use client";

import { useState, FormEvent } from "react";
import { Input, Button } from "@/components/ui";
import { newsletterSchema } from "@/lib/validations";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "duplicate" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(undefined);
    setSubmitStatus("idle");

    // Validate with Zod
    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: result.data.email }),
      });

      if (response.status === 409) {
        setSubmitStatus("duplicate");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setSubmitStatus("success");
      setEmail("");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  }

  if (submitStatus === "success") {
    return (
      <div className="text-center py-4">
        <p className="text-neutral-900 font-medium">
          You&apos;re subscribed! 🎉
        </p>
        <p className="text-neutral-600 text-sm mt-1">
          Thank you for joining our newsletter.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3">
      {submitStatus === "duplicate" && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3" role="status">
          This email is already subscribed.
        </p>
      )}

      {submitStatus === "error" && (
        <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3" role="alert">
          Something went wrong. Please try again.
        </p>
      )}

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(undefined);
              if (submitStatus !== "idle") setSubmitStatus("idle");
            }}
            error={error}
            placeholder="Enter your email"
            maxLength={254}
            aria-label="Email address"
            required
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "..." : "Subscribe"}
        </Button>
      </div>
    </form>
  );
}
