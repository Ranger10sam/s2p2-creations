"use client";

import { projects } from "@/lib/projects";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import MagneticButton from "@/components/ui/MagneticButton";
import CursorGlow from "@/components/ui/CursorGlow";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden pt-32 pb-20 px-4 md:px-20">
      <CursorGlow />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          id="hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
            Selected Work
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl font-light">
            A collection of projects where design meets engineering. We build digital products that perform.
          </p>
        </motion.div>

        <div id="projects" className="grid grid-cols-1 gap-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <Card className="group relative overflow-hidden border border-white/10 bg-white/5 rounded-3xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 items-center">
                  
                  {/* Content */}
                  <div className="order-2 lg:order-1">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 text-sm rounded-full bg-white/5 border border-white/10 text-foreground/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h2>
                    
                    <p className="text-lg text-foreground/70 mb-8 font-light leading-relaxed max-w-xl">
                      {project.description}
                    </p>

                    <div className="flex gap-4">
                      <MagneticButton href={`/work/${project.slug}`} className="px-8 py-4">
                        View Case Study
                      </MagneticButton>
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2"
                      >
                        Live Site <span className="text-xs">↗</span>
                      </a>
                    </div>
                  </div>

                  {/* Visual / Abstract Representation */}
                  <div className="order-1 lg:order-2 relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden bg-black/20 flex items-center justify-center">
                    <div className={`absolute inset-0 ${project.color} opacity-20 blur-[80px] group-hover:opacity-30 transition-opacity duration-500`} />
                    <div className="relative z-10 text-9xl font-bold text-white/5 select-none group-hover:scale-110 transition-transform duration-700">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </div>
                  </div>
                  
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
