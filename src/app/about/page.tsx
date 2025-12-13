"use client";

import { motion } from "framer-motion";
import CursorGlow from "@/components/ui/CursorGlow";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden pt-32 pb-20 px-4 md:px-20">
      <CursorGlow />
      
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <motion.div
          id="hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12">
            We Are S2P2.
          </h1>
          <div className="text-2xl md:text-3xl text-foreground/80 font-light leading-relaxed space-y-8">
            <p>
              We are a digital product agency focused on the intersection of design and engineering.
            </p>
            <p className="text-foreground/60">
              We don't just build websites; we craft immersive digital experiences that tell stories and drive results. Our philosophy is simple: <span className="text-primary font-normal">Code is Art.</span>
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <div id="values" className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-40">
          {[
            { title: "Precision", desc: "Every pixel, every animation, every line of code is intentional." },
            { title: "Performance", desc: "Speed is a feature. We optimize for the best possible user experience." },
            { title: "Innovation", desc: "We push boundaries and explore new technologies to stay ahead." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/5"
            >
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-foreground/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Story / Manifesto */}
        <div id="manifesto" className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">The Manifesto</h2>
            <div className="space-y-6 text-lg text-foreground/70 font-light">
              <p>
                In a world of templates and generic solutions, we choose to build bespoke. We believe that your digital presence should be as unique as your brand.
              </p>
              <p>
                We are not a large agency with layers of management. We are a lean team of senior engineers and designers who work directly with you. No middlemen, no fluff. Just pure craft.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-3xl"
          />
        </div>

        {/* CTA */}
        <div className="text-center py-20 border-t border-white/10">
          <h2 className="text-4xl font-bold mb-8">Join the movement.</h2>
          <MagneticButton href="/contact" className="px-10 py-4 text-lg">
            Work With Us
          </MagneticButton>
        </div>
      </div>
    </main>
  );
}
