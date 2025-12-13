"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export default function Card({ children, className, hoverEffect = true }: CardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-zinc-900/50 border border-white/10 p-8 backdrop-blur-sm",
        "hover:border-white/20 hover:bg-zinc-900/80 transition-colors duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
