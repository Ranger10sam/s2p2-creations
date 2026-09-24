"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import ShowroomCard from "@/components/showroom/ShowroomCard";
import { showroomProducts } from "@/data/showroom";

const featuredProducts = showroomProducts
  .filter((product) => product.featured)
  .sort((left, right) => left.sortOrder - right.sortOrder)
  .slice(0, 3);

export default function FeaturedShowroom() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-24 md:px-10 md:py-28">
      <InteractiveBackground className="opacity-35" />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end"
      >
        <div>
          <p className="mb-5 text-xs font-mono uppercase tracking-[0.2em] text-primary">Website Showroom</p>
          <h2 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Websites ready for your business.
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-foreground/60">
            Pick a direction. We&apos;ll customize the design around your brand, content, and goals.
          </p>
        </div>
        <Link href="/showroom" className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Explore Showroom <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredProducts.map((product, index) => (
          <ShowroomCard key={product.id} product={product} compact priority={index === 0} />
        ))}
      </div>
    </section>
  );
}