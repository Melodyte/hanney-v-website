"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "gold" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      fullWidth,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants: Record<string, string> = {
      primary:
        "bg-gold-gradient text-neutral-950 font-semibold shadow-gold hover:shadow-lg hover:brightness-110 active:brightness-95",
      secondary:
        "border-2 border-gold-400 text-gold-400 bg-transparent hover:bg-gold-400/10 active:bg-gold-400/20",
      ghost:
        "bg-transparent text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 active:bg-neutral-200",
      gold:
        "bg-gold-gradient text-neutral-950 font-semibold shadow-gold hover:shadow-lg hover:brightness-110 active:brightness-95",
      outline:
        "border-2 border-gold-400 text-gold-400 bg-transparent hover:bg-gold-400/10 active:bg-gold-400/20",
    };

    const sizes: Record<string, string> = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-medium rounded-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
