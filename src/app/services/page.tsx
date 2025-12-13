"use client";

import { motion } from "framer-motion";
import CursorGlow from "@/components/ui/CursorGlow";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const services = [
  {
    title: "SaaS Development",
    description: "We build scalable, multi-tenant architectures designed for growth. From MVP to enterprise-grade solutions, we ensure your platform is robust, secure, and performant.",
    features: ["Microservices Architecture", "Real-time Data Processing", "Cloud-Native Solutions", "API Design & Integration"]
  },
  {
    title: "Mobile Applications",
    description: "Native-feel cross-platform experiences built with React Native. We focus on smooth animations, offline capabilities, and seamless device integration.",
    features: ["iOS & Android", "Offline-First Architecture", "Complex State Management", "Native Module Integration"]
  },
  {
    title: "Shopify Solutions",
    description: "Custom themes and headless commerce experiences that drive conversions. We push the boundaries of what's possible on Shopify Plus.",
    features: ["Custom Theme Development", "Headless (Hydrogen/Next.js)", "App Development", "Performance Optimization"]
  },
  {
    title: "UI/UX Engineering",
    description: "We don't just design; we engineer interfaces. Our focus is on micro-interactions, accessibility, and creating a design system that scales.",
    features: ["Design Systems", "Interactive Prototyping", "Motion Design", "Accessibility Audits"]
  }
];

const process = [
  { step: "01", title: "Discovery", description: "We dive deep into your business goals, user needs, and technical requirements." },
  { step: "02", title: "Strategy", description: "We architect the solution, choosing the right stack and planning the roadmap." },
  { step: "03", title: "Design", description: "We create high-fidelity prototypes with a focus on user experience and brand identity." },
  { step: "04", title: "Development", description: "We write clean, testable code using modern best practices and rigorous QA." },
  { step: "05", title: "Launch", description: "We handle the deployment, monitoring, and ensure a smooth go-live experience." }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden pt-32 pb-20 px-4 md:px-20">
      <CursorGlow />
      
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          id="hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
            Our Expertise
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl font-light">
            We provide end-to-end digital product development. From concept to code, we handle it all.
          </p>
        </motion.div>

        {/* Services List */}
        <div id="list" className="grid grid-cols-1 gap-24 mb-40">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start border-t border-white/10 pt-12"
            >
              <div>
                <h2 className="text-4xl font-bold mb-6">{service.title}</h2>
                <p className="text-lg text-foreground/70 font-light leading-relaxed max-w-md">
                  {service.description}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div id="process" className="mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-16"
          >
            How We Work
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-white/5 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{item.description}</p>
                
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent translate-x-1/2 -z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-20 border-t border-white/10">
          <h2 className="text-4xl font-bold mb-8">Have a project in mind?</h2>
          <MagneticButton href="/contact" className="px-10 py-4 text-lg">
            Let's Talk
          </MagneticButton>
        </div>
      </div>
    </main>
  );
}
