"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { formatDelivery, formatPrice, ShowroomProduct } from "@/data/showroom";
import { cn } from "@/lib/utils";

type ShowroomCardProps = {
  product: ShowroomProduct;
  priority?: boolean;
  compact?: boolean;
};

export default function ShowroomCard({ product, priority = false, compact = false }: ShowroomCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition-colors hover:border-white/20"
    >
      <Link
        href={`/showroom/${product.slug}`}
        aria-label={`View ${product.name}`}
        className={cn("relative block overflow-hidden bg-white/5", compact ? "aspect-[16/10]" : "aspect-[16/10]")}
      >
        <Image
          src={product.image}
          alt={`${product.name} ready-to-customize concept preview`}
          fill
          priority={priority}
          sizes={compact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <div className="absolute left-3 top-3 rounded-full border border-black/10 bg-black/75 px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
          {product.status === "coming-soon" ? "Coming soon" : "Concept design"}
        </div>
      </Link>

      <div className={cn("flex flex-1 flex-col", compact ? "p-5" : "p-6")}>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
          <span>{product.category.join(" · ")}</span>
          <span className="text-white/20">/</span>
          <span className="text-foreground/45">{product.websiteType[0]}</span>
        </div>
        <h3 className={cn("font-bold tracking-tight", compact ? "text-2xl" : "text-3xl")}>{product.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/60">{product.shortDescription}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/65">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-5 mt-6">
          <div>
            <p className="text-xs text-foreground/40">Customization from</p>
            <p className="mt-1 text-xl font-semibold">{formatPrice(product.startingPrice)}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-foreground/50">
              <Clock3 className="h-3.5 w-3.5" /> {formatDelivery(product)}
            </p>
          </div>
          <Link
            href={`/showroom/${product.slug}`}
            className="flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            View Design <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}