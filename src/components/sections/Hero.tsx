"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
      <motion.div 
        style={{ y, opacity }}
        className="z-10 flex flex-col items-center text-center max-w-5xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]"
        >
          DIGITAL
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            ALCHEMY
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-xl md:text-2xl text-foreground/60 mb-12 max-w-2xl font-light"
        >
          We transform ideas into high-performance digital experiences.
          <br />
          <span className="text-sm uppercase tracking-widest mt-4 block opacity-50">SaaS • Mobile • Shopify • Web</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto px-4 sm:px-0"
        >
          <MagneticButton href="/work" className="w-full sm:w-auto justify-center">View Our Work</MagneticButton>
          <MagneticButton href="/contact" className="bg-transparent border border-foreground/20 text-foreground hover:bg-foreground/10 hover:text-foreground w-full sm:w-auto justify-center">
            Start a Project
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 will-change-transform" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[80px] -z-10 will-change-transform" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[80px] -z-10 will-change-transform" 
      />
    </section>
  );
}
