"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CursorGlow from "@/components/ui/CursorGlow";
import Link from "next/link";
import { Mail, MapPin, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Web Development",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    
    try {
      // Google Sheets backend - stores data & sends email notification
      const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
      
      if (!GOOGLE_SCRIPT_URL) {
        throw new Error("Script URL not configured");
      }
      
      // Use URL-encoded form data (most compatible with Google Apps Script)
      const urlEncodedData = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        message: formData.message,
      }).toString();

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData,
      });

      // no-cors mode doesn't return response body, so we assume success if no error
      setSubmitStatus("success");
      setFormData({ name: "", email: "", projectType: "Web Development", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                <p className="text-foreground/60 mb-6">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="text-primary hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                  </motion.div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-foreground/60 uppercase tracking-wider">Name</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-foreground/60 uppercase tracking-wider">Email</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-foreground/60 uppercase tracking-wider">Project Type</label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-primary/50 transition-colors text-foreground/80"
                  >
                    <option className="bg-black">Web Development</option>
                    <option className="bg-black">Mobile App</option>
                    <option className="bg-black">UI/UX Design</option>
                    <option className="bg-black">Shopify</option>
                    <option className="bg-black">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-foreground/60 uppercase tracking-wider">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <MagneticButton 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-lg font-medium flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Send Message</>
                  )}
                </MagneticButton>
              </form>
            )}
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
