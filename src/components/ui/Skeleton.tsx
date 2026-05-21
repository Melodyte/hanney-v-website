import { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string;
  height?: string;
}

export default function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
  ...props
}: SkeletonProps) {
  const variantStyles: Record<string, string> = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-md",
  };

  const defaultDimensions: Record<string, { width?: string; height?: string }> = {
    text: { width: "100%", height: undefined },
    circular: { width: "40px", height: "40px" },
    rectangular: { width: "100%", height: "200px" },
  };

  const finalWidth = width || defaultDimensions[variant].width;
  const finalHeight = height || defaultDimensions[variant].height;

  return (
    <div
      className={`animate-shimmer ${variantStyles[variant]} ${className}`}
      style={{ width: finalWidth, height: finalHeight }}
      role="status"
      aria-label="Loading"
      aria-busy="true"
      {...props}
    />
  );
}

// Convenience components for common skeleton patterns
export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading content">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? "75%" : "100%"}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-lg border border-neutral-200 overflow-hidden ${className}`} role="status" aria-label="Loading card">
      <Skeleton variant="rectangular" height="200px" />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  );
}
