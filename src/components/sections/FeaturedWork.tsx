"use client";

import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import MagneticButton from "@/components/ui/MagneticButton";
import InteractiveBackground from "@/components/ui/InteractiveBackground";

const projects = [
  {
    title: "Formabit",
    slug: "formabit",
    description: "A powerful SaaS platform for form building and data collection.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    link: "https://www.formabit.in",
    color: "bg-violet-500",
  },
  {
    title: "ChefBit",
    slug: "chefbit",
    description: "Smart kitchen management system for modern restaurants.",
    tags: ["React Native", "Firebase", "Redux", "Analytics"],
    link: "https://play.google.com/store/apps/details?id=com.chefbit.in",
    color: "bg-orange-500",
  },
  {
    title: "Deployed Store",
    slug: "deployed-store",
    description: "High-conversion Shopify Plus store with custom headless architecture.",
    tags: ["Shopify Plus", "Liquid", "Hydrogen", "React"],
    link: "https://www.deployed.store",
    color: "bg-blue-500",
  },
  {
    title: "Declutter",
    slug: "declutter",
    description: "Minimalist e-commerce experience focused on sustainable living.",
    tags: ["Shopify", "Theme Dev", "UX Design", "Performance"],
    link: "https://declutter.shop",
    color: "bg-emerald-500",
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-32 px-4 w-full max-w-7xl mx-auto relative">
      <InteractiveBackground className="opacity-50" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10"
      >
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Featured Work</h2>
          <p className="text-xl text-foreground/60 max-w-xl font-light">
            Real products, real users, real impact. We build software that solves actual problems.
          </p>
        </div>
        <MagneticButton href="/work" className="hidden md:block">View All Projects</MagneticButton>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
          >
            <Card className="min-h-[500px] flex flex-col justify-between group p-10">
              <div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 text-sm rounded-full bg-white/5 border border-white/10 text-foreground/80 hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xl text-foreground/70 mb-10 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto pt-8 border-t border-white/5">
                <MagneticButton href={`/work/${project.slug}`} className="px-6 py-3 text-sm w-full sm:w-auto text-center">
                  View Case Study
                </MagneticButton>
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-sm font-medium rounded-full border border-white/20 text-foreground/80 hover:bg-white/10 hover:text-foreground transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Live Site 
                  <span>↗</span>
                </a>
              </div>

              <div 
                className={`absolute top-0 right-0 w-96 h-96 ${project.color} opacity-5 blur-[120px] -z-10 group-hover:opacity-15 transition-opacity duration-700`} 
              />
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 md:hidden flex justify-center">
        <MagneticButton href="/work">View All Projects</MagneticButton>
      </div>
    </section>
  );
}
