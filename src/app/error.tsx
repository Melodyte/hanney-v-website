"use client";

import { useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
          <span className="block w-2 h-2 rotate-45 bg-gold-400" aria-hidden="true" />
          <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl text-neutral-950 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-neutral-600 mb-8 leading-relaxed">
          We apologize for the inconvenience. An unexpected error occurred. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={reset}>
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline">Back to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
