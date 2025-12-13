"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function TopLogoBar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 right-0 z-[60] flex justify-center items-center py-6 pointer-events-none mix-blend-difference transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] left-0 lg:left-[var(--sidebar-width,240px)]"
    >
      <Link href="/" className="pointer-events-auto">
        <h1 className="text-xl font-bold tracking-widest uppercase text-white">
          S2P2 Creations
        </h1>
      </Link>
    </motion.header>
  );
}
