"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef, memo } from "react";

interface InteractiveBackgroundProps {
  className?: string;
}

function InteractiveBackground({ className }: InteractiveBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Calculate relative to window center for a subtle parallax feel
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      mouseX.set((clientX - centerX) * 0.1);
      mouseY.set((clientY - centerY) * 0.1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      {/* Primary Blob */}
      <motion.div
        style={{ 
          x: springX, 
          y: y1,
          rotate: rotate
        }}
        className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/30 rounded-full blur-[80px] will-change-transform"
      />
      
      {/* Secondary Blob */}
      <motion.div
        style={{ 
          x: useTransform(springX, (x) => -x), 
          y: y2,
          rotate: useTransform(rotate, (r) => -r)
        }}
        className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-secondary/30 rounded-full blur-[100px] will-change-transform"
      />

      {/* Accent Blob */}
      <motion.div
        style={{ 
          x: useTransform(springX, (x) => x * 0.5), 
          y: useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])
        }}
        className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-accent/30 rounded-full blur-[60px] will-change-transform"
      />
    </div>
  );
}

export default memo(InteractiveBackground);
