import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
          <span className="block w-2 h-2 rotate-45 bg-gold-400" aria-hidden="true" />
          <span className="block w-8 h-px bg-gold-400" aria-hidden="true" />
        </div>
        <h1 className="font-heading text-6xl md:text-7xl text-gold-400 mb-4">
          404
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl text-neutral-950 mb-4">
          Page Not Found
        </h2>
        <p className="text-neutral-600 mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us guide you back.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary">Back to Homepage</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
