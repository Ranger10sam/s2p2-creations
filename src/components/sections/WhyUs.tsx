"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight } from "lucide-react";

const reasons = [
  {
    title: "Performance First",
    description: "We don't just build websites; we engineer high-performance digital assets. Every millisecond counts for conversion.",
  },
  {
    title: "Conversion Design",
    description: "Aesthetics attract, but strategy converts. We design with a focus on user psychology and business goals.",
  },
  {
    title: "Built for Scale",
    description: "Future-proof architecture that grows with your business. No technical debt, just solid engineering.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-32 px-4 w-full max-w-7xl mx-auto relative">
      <InteractiveBackground className="opacity-30" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        {/* Left Column: Who We Are */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-mono text-primary mb-6 tracking-widest uppercase">Who We Are</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Bridging the gap between <span className="text-primary">Design</span> and <span className="text-primary">Engineering</span>.
          </h3>
          <p className="text-xl text-foreground/70 font-light leading-relaxed mb-8">
            S2P2 Creations is a premium digital product studio led by a solo creative engineer. 
            We do not just build websites; we craft immersive digital experiences that tell stories and drive results.
          </p>
          <MagneticButton href="/about" className="group flex items-center gap-2">
            Read Our Story
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </motion.div>

        {/* Right Column: Why S2P2 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-8">Why S2P2?</h2>
          <div className="space-y-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors duration-300"
              >
                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                <p className="text-base text-foreground/70 font-light">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
