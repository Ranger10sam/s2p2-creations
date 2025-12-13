"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ConversionCTA() {
  return (
    <section className="py-32 px-4 w-full flex flex-col items-center justify-center text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
          Ready to build something <span className="text-primary">extraordinary</span>?
        </h2>
        <p className="text-xl text-foreground/60 mb-12 max-w-2xl mx-auto">
          Let's turn your vision into a high-performance digital reality.
        </p>
        
        <div className="flex justify-center">
          <MagneticButton className="px-10 py-5 text-xl bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25">
            Start Your Project
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
