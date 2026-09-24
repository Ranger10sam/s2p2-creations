"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ShowroomHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative mx-auto flex min-h-[72vh] w-full max-w-7xl flex-col justify-center overflow-hidden px-4 pb-20 pt-32 md:px-10">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <p className="mb-6 text-xs font-mono uppercase tracking-[0.22em] text-primary">Website Showroom</p>
        <h1 className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-tighter sm:text-6xl md:text-8xl">
          Websites built for businesses like yours.
        </h1>
        <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-foreground/60 md:text-xl">
          Skip the blank canvas. Start with a proven direction and customize it around your brand, content, and goals.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/45">
          <span>Ready-to-customize</span><span aria-hidden="true">·</span>
          <span>Transparent starting prices</span><span aria-hidden="true">·</span>
          <span>Fast delivery</span>
        </div>
        <a href="#catalogue" className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Browse Designs <ArrowDown className="h-4 w-4" />
        </a>
      </motion.div>
      <div className="pointer-events-none absolute right-[-12%] top-[14%] h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
    </section>
  );
}