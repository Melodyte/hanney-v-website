"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", fullWidth, children, ...props }, ref) => {
    const variants: Record<string, string> = {
      primary: "bg-black text-white hover:bg-gray-800",
      secondary: "bg-cream text-black hover:bg-cream-dark",
      gold: "bg-gold text-black hover:bg-gold-light",
      outline: "border-2 border-black text-black hover:bg-black hover:text-white",
      ghost: "text-black hover:bg-gray-100",
    };

    const sizes: Record<string, string> = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-medium transition-all duration-300 rounded-none ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
