"use client";

import { useParams } from "next/navigation";
import { projects } from "@/lib/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import CursorGlow from "@/components/ui/CursorGlow";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find((p) => p.slug === slug || p.title.toLowerCase().replace(/\s+/g, '-') === slug);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <CursorGlow />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[80vh] flex flex-col justify-center px-4 md:px-20 pt-32">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-5xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {project.tags.map((tag, i) => (
              <span 
                key={i}
                className="px-4 py-1.5 text-sm rounded-full bg-white/5 border border-white/10 text-foreground/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]"
          >
            {project.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/60 max-w-2xl font-light mb-12"
          >
            {project.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-6"
          >
            <MagneticButton href={project.link} className="flex items-center gap-2">
              Visit Live Site <ExternalLink className="w-4 h-4" />
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Background Gradient */}
        <div className={`absolute top-0 right-0 w-[60vw] h-[60vw] ${project.color} opacity-10 blur-[150px] rounded-full -z-10 pointer-events-none`} />
      </section>

      {/* Content Grid */}
      <section className="px-4 md:px-20 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left Column: Overview & Role */}
          <div className="lg:col-span-2 space-y-16">
            <motion.div
              id="overview"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-lg text-foreground/70 leading-relaxed font-light">
                {project.overview}
              </p>
            </motion.div>
            <motion.div
              id="features"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.features.map((feature, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {project.challenges && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-8">Technical Challenges</h2>
                <div className="space-y-6">
                  {project.challenges.map((challenge, i) => (
                    <div key={i} className="border-l-2 border-primary/50 pl-6 py-2">
                      <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                      <p className="text-foreground/60 leading-relaxed">{challenge.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Tech Stack & Info */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm"
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-foreground/40 mb-2">Role</h3>
                  <p className="text-lg font-medium">{project.role || "Developer"}</p>
                </div>
                {project.timeline && (
                  <div>
                    <h3 className="text-sm uppercase tracking-widest text-foreground/40 mb-2">Timeline</h3>
                    <p className="text-lg font-medium">{project.timeline}</p>
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div
              id="tech"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-6">Tech Stack</h3>
              <div className="space-y-6">
                {project.techStack.map((stack, i) => (
                  <div key={i}>
                    <h4 className="text-sm text-primary mb-3 font-medium">{stack.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {stack.items.map((item, j) => (
                        <span key={j} className="px-3 py-1 text-xs rounded-md bg-white/5 text-foreground/70 border border-white/5">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Next Project Navigation */}
      <section className="py-32 border-t border-white/5 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-foreground/40 mb-4 uppercase tracking-widest text-sm">Ready for more?</p>
          <Link href="/#work">
            <h2 className="text-4xl md:text-6xl font-bold hover:text-primary transition-colors cursor-pointer inline-block">
              View All Projects
            </h2>
          </Link>
        </div>
      </section>
    </main>
  );
}
