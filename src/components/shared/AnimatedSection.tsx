"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

export interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

const getDirectionOffset = (
  direction: "up" | "down" | "left" | "right"
): { x: number; y: number } => {
  switch (direction) {
    case "up":
      return { x: 0, y: 40 };
    case "down":
      return { x: 0, y: -40 };
    case "left":
      return { x: 40, y: 0 };
    case "right":
      return { x: -40, y: 0 };
  }
};

export default function AnimatedSection({
  children,
  delay = 0,
  duration = 600,
  direction = "up",
  className = "",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const offset = getDirectionOffset(direction);

  // Convert ms to seconds for framer-motion
  const durationInSeconds = Math.min(Math.max(duration, 300), 800) / 1000;
  const delayInSeconds = Math.min(Math.max(delay, 0), 200) / 1000;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: durationInSeconds,
        delay: delayInSeconds,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
