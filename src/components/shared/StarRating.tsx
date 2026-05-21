export interface StarRatingProps {
  rating: 1 | 2 | 3 | 4 | 5;
  size?: "sm" | "md" | "lg";
}

const sizeStyles: Record<string, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export default function StarRating({ rating, size = "md" }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {stars.map((filled, index) => (
        <svg
          key={index}
          className={`${sizeStyles[size]} ${
            filled ? "text-gold-400" : "text-neutral-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
