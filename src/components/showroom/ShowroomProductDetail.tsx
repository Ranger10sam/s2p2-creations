"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, Clock3, ExternalLink, Plus } from "lucide-react";
import CustomizeShowroomButton from "@/components/showroom/CustomizeShowroomButton";
import CursorGlow from "@/components/ui/CursorGlow";
import { formatDelivery, formatPrice, ShowroomProduct } from "@/data/showroom";
import { trackShowroomEvent } from "@/lib/showroom-events";

export default function ShowroomProductDetail({ product }: { product: ShowroomProduct }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    trackShowroomEvent("showroom_product_view", { productId: product.id, productName: product.name });
  }, [product.id, product.name]);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <CursorGlow />
      <section id="hero" className="relative px-4 pb-20 pt-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Link href="/showroom" className="mb-10 inline-flex min-h-11 items-center gap-2 text-sm text-foreground/55 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <ArrowLeft className="h-4 w-4" /> Back to showroom
          </Link>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono uppercase tracking-wider text-primary">
                  {product.status === "available" ? "Ready to customize" : "Coming soon"}
                </span>
                <span className="text-sm text-foreground/45">Ready-to-customize concept</span>
              </div>
              <p className="mb-4 text-sm font-mono uppercase tracking-wider text-foreground/50">{product.category.join(" · ")}</p>
              <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-8xl">{product.name}</h1>
              <p className="mt-7 max-w-3xl text-xl font-light leading-relaxed text-foreground/65 md:text-2xl">{product.statement}</p>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs uppercase tracking-wider text-foreground/40">Customization from</p>
              <p className="mt-2 text-4xl font-bold">{formatPrice(product.startingPrice)}</p>
              <p className="mt-4 flex items-center gap-2 text-sm text-foreground/60"><Clock3 className="h-4 w-4 text-primary" /> Estimated delivery: {formatDelivery(product)}</p>
              <div className="mt-7 space-y-3">
                {product.status === "available" ? (
                  <CustomizeShowroomButton product={product} className="w-full px-5 py-4 text-base" />
                ) : (
                  <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-foreground/55">This concept is being prepared for customization.</p>
                )}
                {product.demoUrl && (
                  <Link href={`/showroom/${product.slug}/preview`} onClick={() => trackShowroomEvent("showroom_live_demo_click", { productId: product.id, location: "product-detail" })} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-semibold transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    Preview Website <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </aside>
          </motion.div>

          <div className="relative mt-14 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <Image src={product.image} alt={`${product.name} website concept preview`} fill priority sizes="(max-width: 1024px) 100vw, 80vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 py-20 md:px-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div id="overview">
          <p className="mb-4 text-xs font-mono uppercase tracking-widest text-primary">Overview</p>
          <h2 className="text-3xl font-bold md:text-4xl">Built for {product.category.join(" and ").toLowerCase()} businesses.</h2>
        </div>
        <p className="text-lg font-light leading-relaxed text-foreground/65">{product.overview}</p>
      </section>

      <section id="included" className="border-y border-white/10 bg-white/[0.02] px-4 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-2">
          <DetailList title="What’s included" items={product.included} icon="check" />
          <DetailList title="What we customize" items={product.customizable} icon="plus" />
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-4 text-xs font-mono uppercase tracking-widest text-primary">Optional add-ons</p>
            <h2 className="text-3xl font-bold md:text-4xl">Add what your business needs.</h2>
            <div className="mt-9 divide-y divide-white/10 border-y border-white/10">
              {product.addons.map((addon) => (
                <div key={addon.name} className="flex flex-col justify-between gap-2 py-5 sm:flex-row sm:items-center">
                  <div><h3 className="font-semibold">{addon.name}</h3>{addon.description && <p className="mt-1 text-sm text-foreground/45">{addon.description}</p>}</div>
                  <p className="shrink-0 text-sm text-foreground/65">{addon.startingPrice ? `from ${formatPrice(addon.startingPrice)}` : "Quoted separately"}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-xs font-mono uppercase tracking-widest text-primary">Timeline &amp; pricing</p>
            <h2 className="mt-5 text-3xl font-bold">{formatDelivery(product)}</h2>
            <p className="mt-4 leading-relaxed text-foreground/55">The timeline begins after the required content and advance payment are received.</p>
            <p className="mt-7 border-t border-white/10 pt-7 text-sm leading-relaxed text-foreground/45">Displayed price is a starting price for customization. Final pricing depends on requested changes, pages, integrations, and functionality.</p>
          </div>
        </div>
      </section>

      <section id="customize" className="border-t border-white/10 px-4 py-28 text-center md:px-10">
        <p className="mb-4 text-xs font-mono uppercase tracking-widest text-primary">Your version starts here</p>
        <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">Like this direction? We&apos;ll make it yours.</h2>
        {product.status === "available" && <div className="mx-auto mt-9 max-w-sm"><CustomizeShowroomButton product={product} /></div>}
      </section>
    </main>
  );
}

function DetailList({ title, items, icon }: { title: string; items: string[]; icon: "check" | "plus" }) {
  const Icon = icon === "check" ? Check : Plus;
  return (
    <div>
      <h2 className="mb-8 text-3xl font-bold">{title}</h2>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.025] p-4 text-sm text-foreground/70">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}