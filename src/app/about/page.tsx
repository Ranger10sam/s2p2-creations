"use client";

import { motion } from "framer-motion";
import CursorGlow from "@/components/ui/CursorGlow";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowUpRight, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

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
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">
            Engineering <br />
            <span className="text-primary">Digital Excellence.</span>
          </h1>
          <div className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed space-y-8 max-w-3xl">
            <p>
              S2P2 Creations is a premium digital product studio led by a solo creative engineer. 
              I bridge the gap between design and development to build high-performance, conversion-focused web experiences.
            </p>
            <p className="text-foreground/60">
              With a background in scaling tech products, I bring big-tech engineering standards to boutique creative projects.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <div id="values" className="mb-40">
          <h2 className="text-sm font-mono text-primary mb-12 tracking-widest uppercase">Our Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Precision", desc: "Pixel-perfect implementation. If it's in the design, it's in the code." },
              { title: "Performance", desc: "Core Web Vitals are not an afterthought. Speed is a feature." },
              { title: "Ownership", desc: "Direct collaboration. No account managers, no lost translation." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors"
              >
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div id="experience" className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-4xl font-bold mb-6 sticky top-32">Experience</h2>
          </div>
          <div className="lg:col-span-8 space-y-12">
            {[
              {
                role: "Programming Analyst",
                company: "Cognizant",
                period: "Sep 2024 - Present",
                desc: "Contribute to a high-performing development team on enterprise-level projects for global clients, focusing on creating scalable and robust Salesforce solutions. Specialized in Apex Programming and Lightning Web Components."
              },
              {
                role: "Programmer Analyst Trainee",
                company: "Cognizant",
                period: "Sep 2023 - Sep 2024",
                desc: "Successfully transitioned from an intern to this role, taking on greater responsibility in building and maintaining Salesforce applications."
              },
              {
                role: "Salesforce Intern",
                company: "Cognizant",
                period: "Apr 2023 - Sep 2023",
                desc: "Selected for a competitive internship program to gain foundational knowledge in Salesforce Development and Administration within an enterprise environment."
              },
              {
                role: "Java Intern",
                company: "LTIMindtree",
                period: "Jan 2023 - Apr 2023",
                desc: "Established a strong foundation in object-oriented programming and enterprise software development within a structured corporate training environment. Focused on Core Java."
              },
              {
                role: "Web Developer",
                company: "Deployed",
                period: "Jun 2021 - Jan 2023",
                desc: "Given full ownership and strategic oversight of the company's 2 primary e-commerce websites on the Shopify platform, directly influencing business growth. Specialized in CSS and Shopify."
              }
            ].map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-l-2 border-white/10 pl-8 py-2 relative group"
              >
                <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-background border-2 border-white/10 group-hover:border-primary transition-colors" />
                <h3 className="text-2xl font-bold text-foreground">{job.role}</h3>
                <div className="flex items-center gap-3 text-primary font-mono text-sm my-2">
                  <span>{job.company}</span>
                  <span>•</span>
                  <span>{job.period}</span>
                </div>
                <p className="text-foreground/60 leading-relaxed max-w-xl">
                  {job.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Connect / Socials */}
        <div id="connect" className="mb-32">
           <h2 className="text-sm font-mono text-primary mb-12 tracking-widest uppercase">Connect</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="https://x.com/sarcastic_prit" target="_blank" className="group">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-black/20 text-white">
                      <Twitter size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Follow on X</h3>
                      <p className="text-foreground/50 text-sm">@sarcastic_prit</p>
                    </div>
                  </div>
                  <ArrowUpRight className="text-foreground/30 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>

              <Link href="https://www.linkedin.com/in/samprit-chaudhury/" target="_blank" className="group">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-600/20 text-blue-400">
                      <Linkedin size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Connect on LinkedIn</h3>
                      <p className="text-foreground/50 text-sm">Samprit Chaudhury</p>
                    </div>
                  </div>
                  <ArrowUpRight className="text-foreground/30 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
           </div>
        </div>

        {/* CTA */}
        <div className="text-center py-20 border-t border-white/10">
          <h2 className="text-4xl font-bold mb-8">Ready to build something great?</h2>
          <MagneticButton href="/contact" className="px-10 py-4 text-lg">
            Start a Project
          </MagneticButton>
        </div>
      </div>
    </main>
  );
}
