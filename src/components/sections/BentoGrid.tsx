"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import InteractiveBackground from "@/components/ui/InteractiveBackground";
import { cn } from "@/lib/utils";
import { SaasIcon, MobileIcon, ShopifyIcon, WebIcon, UiIcon } from "@/components/ui/ServiceIcons";
import TiltCard from "@/components/ui/TiltCard";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "SaaS Development",
    description: "Scalable, multi-tenant architectures built for growth.",
    className: "md:col-span-2",
    gradient: "from-violet-500/20 to-purple-500/20",
    icon: <SaasIcon />,
  },
  {
    title: "Mobile Apps",
    description: "Native-feel cross-platform experiences.",
    className: "md:col-span-1",
    gradient: "from-blue-500/20 to-cyan-500/20",
    icon: <MobileIcon />,
  },
  {
    title: "Shopify Solutions",
    description: "Custom themes and headless commerce.",
    className: "md:col-span-1",
    gradient: "from-emerald-500/20 to-green-500/20",
    icon: <ShopifyIcon />,
  },
  {
    title: "Web Experiences",
    description: "High-performance marketing sites that convert.",
    className: "md:col-span-2",
    gradient: "from-orange-500/20 to-red-500/20",
    icon: <WebIcon />,
  },
  {
    title: "UI/UX Engineering",
    description: "Design systems and micro-interactions.",
    className: "md:col-span-3",
    gradient: "from-pink-500/20 to-rose-500/20",
    icon: <UiIcon />,
  },
];

export default function BentoGrid() {
  return (
    <section className="py-32 px-4 w-full max-w-7xl mx-auto relative">
      <InteractiveBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24 text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">What We Do</h2>
        <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
          We combine technical excellence with creative design to build digital products that stand out.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn("h-full", service.className)}
          >
            <TiltCard className="h-full">
              <Card
                className="group h-full min-h-[300px] flex flex-col justify-between p-10"
                hoverEffect={false} // Disable default hover effect as we use TiltCard
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out",
                    service.gradient
                  )}
                />
                
                <div className="relative z-10 transform transition-transform duration-500 group-hover:scale-110 origin-top-left">
                  {service.icon}
                </div>

                <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                  <p className="text-lg text-foreground/70 font-light leading-relaxed">{service.description}</p>
                </div>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <MagneticButton href="/services" className="group flex items-center gap-2 px-8 py-4">
          View All Services
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </MagneticButton>
      </div>
    </section>
  );
}
