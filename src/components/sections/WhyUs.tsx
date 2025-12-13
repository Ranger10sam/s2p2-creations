"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import InteractiveBackground from "@/components/ui/InteractiveBackground";

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            Why S2P2 Creations?
          </h2>
          <p className="text-xl text-foreground/60 mb-12 font-light">
            We bridge the gap between creative design and engineering excellence.
          </p>
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
                <h3 className="text-2xl font-bold mb-2">{reason.title}</h3>
                <p className="text-lg text-foreground/70 font-light">{reason.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6">
          <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800">
            <div className="h-48 flex items-center justify-center">
               {/* Abstract visual representation */}
               <div className="relative w-32 h-32">
                 <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 rounded-full border-2 border-dashed border-primary/50"
                 />
                 <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-4 rounded-full border-2 border-dashed border-secondary/50"
                 />
                 <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl">
                   100%
                 </div>
               </div>
            </div>
            <div className="text-center mt-4">
              <p className="font-mono text-sm text-primary">Lighthouse Score</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
