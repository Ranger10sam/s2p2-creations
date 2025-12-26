"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export default function MagneticButton({ 
  children, 
  className, 
  onClick, 
  href, 
  type = "button", 
  disabled = false,
  target,
  rel
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  const content = (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-8 py-4 rounded-full bg-foreground text-background font-medium text-lg transition-colors hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center",
        className
      )}
    >
      {children}
    </button>
  );

  const Wrapper = href ? (
    target ? (
      <a href={href} target={target} rel={rel} className="w-full block">
        {content}
      </a>
    ) : (
      <Link href={href} className="w-full block">
        {content}
      </Link>
    )
  ) : (
    content
  );

  return (
    <motion.div
      style={{ position: "relative" }}
      className="inline-block w-full sm:w-auto"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {Wrapper}
    </motion.div>
  );
}
