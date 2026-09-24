"use client";

import { motion } from "framer-motion";
import CursorGlow from "@/components/ui/CursorGlow";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden pt-32 pb-20 px-4 md:px-20">
      <CursorGlow />
      
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
            Lets Talk.
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl font-light">
            Have a project in mind? We would love to hear about it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm"
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
              <div className="space-y-6">
                <a href="mailto:sampritchaudhury@gmail.com" className="flex items-center gap-4 text-foreground/60 hover:text-primary transition-colors group">
                  <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <span className="text-lg">sampritchaudhury@gmail.com</span>
                </a>
                <div className="flex items-center gap-4 text-foreground/60">
                  <div className="p-3 rounded-full bg-white/5">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="text-lg">India</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-linear-to-br from-primary/20 to-purple-500/20 border border-white/10">
              <h3 className="text-xl font-bold mb-4">Collaboration</h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Open to collaborations and partnerships. Lets build something great together.
              </p>
              <Link href="/about" className="text-primary hover:underline">
                Read my Story →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
