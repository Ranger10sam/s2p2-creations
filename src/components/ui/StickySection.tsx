"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface StickySectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  zIndex?: number;
}

export default function StickySection({ children, className, id, zIndex = 0 }: StickySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    const updateStickyTop = () => {
      if (!ref.current) return;
      const height = ref.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // If content is taller than viewport, stick so bottom aligns with viewport bottom
      // Otherwise stick at top
      if (height > windowHeight) {
        setStickyTop(windowHeight - height);
      } else {
        setStickyTop(0);
      }
    };

    // Initial calculation
    updateStickyTop();

    // Observer for content height changes
    const resizeObserver = new ResizeObserver(() => {
      updateStickyTop();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Listener for window resize
    window.addEventListener("resize", updateStickyTop);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateStickyTop);
    };
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      style={{ 
        position: "sticky", 
        top: `${stickyTop}px`, 
        zIndex 
      }}
      className={cn("w-full min-h-screen bg-background", className)}
    >
      {children}
    </section>
  );
}
