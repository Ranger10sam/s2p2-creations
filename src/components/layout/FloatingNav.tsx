"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "philosophy", label: "Philosophy" },
  { id: "contact", label: "Contact" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const currentSection = sectionElements.find((section) => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        // Check if section is roughly in the middle of the viewport
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center justify-end"
        >
          <span 
            className={cn(
              "absolute right-8 px-3 py-1 rounded-md bg-background/80 backdrop-blur-sm border border-white/10 text-xs font-medium opacity-0 -translate-x-2 transition-all duration-300 pointer-events-none",
              "group-hover:opacity-100 group-hover:translate-x-0",
              activeSection === section.id && "opacity-100 translate-x-0"
            )}
          >
            {section.label}
          </span>
          
          <div 
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300 border border-white/20",
              activeSection === section.id 
                ? "bg-primary scale-125 border-primary" 
                : "bg-white/20 group-hover:bg-white/50"
            )} 
          />
          
          {activeSection === section.id && (
            <motion.div
              layoutId="activeSectionGlow"
              className="absolute inset-0 -z-10 bg-primary/50 blur-md rounded-full"
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      ))}
    </motion.div>
  );
}
