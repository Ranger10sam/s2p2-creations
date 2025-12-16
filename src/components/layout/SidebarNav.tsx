"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Section {
  id: string;
  label: string;
  number: string;
  path?: string; // Optional path for navigation
  icon?: React.ReactNode; // Optional icon
}

const homeSections: Section[] = [
  { id: "hero", label: "Intro", number: "01" },
  { id: "services", label: "Services", number: "02" },
  { id: "work", label: "Selected Work", number: "03" },
  { id: "philosophy", label: "Philosophy", number: "04" },
  { id: "contact", label: "Contact", number: "05" },
];

const projectSections: Section[] = [
  { id: "back", label: "Go Back", number: "←" },
  { id: "hero", label: "Intro", number: "01" },
  { id: "overview", label: "Overview", number: "02" },
  { id: "features", label: "Features", number: "03" },
  { id: "tech", label: "Tech Stack", number: "04" },
];

const serviceSections: Section[] = [
  { id: "back", label: "Go Back", number: "←" },
  { id: "hero", label: "Expertise", number: "01" },
  { id: "list", label: "Services", number: "02" },
  { id: "process", label: "Process", number: "03" },
];

const workSections: Section[] = [
  { id: "back", label: "Go Back", number: "←" },
  { id: "hero", label: "Intro", number: "01" },
  { id: "projects", label: "Projects", number: "02" },
];

const aboutSections: Section[] = [
  { id: "back", label: "Go Back", number: "←" },
  { id: "hero", label: "Intro", number: "01" },
  { id: "values", label: "Values", number: "02" },
  { id: "experience", label: "Experience", number: "03" },
  { id: "connect", label: "Connect", number: "04" },
];

const defaultSections: Section[] = [
  { id: "home", label: "Home", number: "01", path: "/" },
  { id: "services", label: "Services", number: "02", path: "/services" },
  { id: "work", label: "Work", number: "03", path: "/work" },
  { id: "about", label: "About", number: "04", path: "/about" },
  { id: "contact", label: "Contact", number: "05", path: "/contact" },
];

export default function SidebarNav() {
  const [scrollActiveSection, setScrollActiveSection] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Determine which sections to show based on current path
  const getSections = () => {
    if (pathname === "/") return homeSections;
    if (pathname === "/work") return workSections;
    if (pathname.startsWith("/work/")) return projectSections;
    if (pathname === "/services") return serviceSections;
    if (pathname === "/about") return aboutSections;
    return defaultSections;
  };

  const currentSections = getSections();
  const isDefaultNav = currentSections === defaultSections;

  // Derived active section state
  const activeSection = isDefaultNav
    ? (currentSections.find(s => s.path === pathname)?.id || currentSections[0].id)
    : (scrollActiveSection || (currentSections[0].id === "back" ? currentSections[1].id : currentSections[0].id));

  useLayoutEffect(() => {
    if (!isDefaultNav) {
      const handleScroll = () => {
        const sectionElements = currentSections.map((section) => ({
          id: section.id,
          element: document.getElementById(section.id),
        }));

        // Reverse iterate to find the topmost stacked section
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (!section.element) continue;
          
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setScrollActiveSection(section.id);
            break;
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Trigger once to set initial state
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isDefaultNav, currentSections]);

  // Update CSS variable for layout padding
  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '80px' : '240px');
  }, [isCollapsed]);

  const handleNavClick = (section: Section) => {
    if (section.id === "back") {
      router.back();
      return;
    }
    
    if (section.path) {
      router.push(section.path);
    } else {
      const element = document.getElementById(section.id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          width: isCollapsed ? 80 : 240 
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-0 h-screen bg-background/80 backdrop-blur-xl border-r border-white/5 z-60 hidden lg:flex flex-col justify-between py-12 overflow-hidden"
      >
        {/* Top: Toggle & Brand */}
        <div className="w-full flex flex-col items-center gap-4 px-4">
          <div className="flex items-center justify-between w-full">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm font-bold tracking-widest uppercase whitespace-nowrap"
                >
                  S2P2 Creations
                </motion.span>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={cn(
                "p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white",
                isCollapsed && "mx-auto"
              )}
            >
              {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* Middle: Navigation */}
        <div className="flex-1 flex flex-col justify-center relative w-full">
          <div className="flex flex-col gap-8">
            {currentSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section)}
                className="group relative w-full flex items-center px-6"
              >
                <span className={cn(
                  "text-xs font-mono transition-colors duration-300",
                  activeSection === section.id ? "text-primary" : "text-white/40 group-hover:text-white/60"
                )}>
                  {section.number}
                </span>
                
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "ml-4 text-sm font-medium tracking-wide transition-colors duration-300 whitespace-nowrap",
                        activeSection === section.id ? "text-white" : "text-white/40 group-hover:text-white/60"
                      )}
                    >
                      {section.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active Indicator Line */}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute left-0 w-0.5 h-full bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom: Social/Info */}
        <div className="px-6">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-white/20 font-mono"
              >
                © 2025 S2P2 Creations
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-background/80 backdrop-blur-xl border-t border-white/10 z-60 lg:hidden px-6 py-4 flex justify-between items-center overflow-x-auto">
        {currentSections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleNavClick(section)}
            className={cn(
              "flex flex-col items-center gap-1 min-w-15",
              (activeSection === section.id || pathname === section.path) ? "text-primary" : "text-white/40"
            )}
          >
            <span className="text-[10px] font-mono">{section.number}</span>
            <span className="text-xs font-medium whitespace-nowrap">{section.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </>
  );
}
