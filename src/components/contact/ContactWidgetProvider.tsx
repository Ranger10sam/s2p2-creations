"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import ContactForm, { ContactPrefill } from "@/components/contact/ContactForm";

type ContactWidgetContextValue = {
  openContact: (prefill?: ContactPrefill) => void;
  closeContact: () => void;
};

const ContactWidgetContext = createContext<ContactWidgetContextValue | null>(null);

export function useContactWidget() {
  const context = useContext(ContactWidgetContext);
  if (!context) throw new Error("useContactWidget must be used within ContactWidgetProvider");
  return context;
}

export default function ContactWidgetProvider({ children }: { children: React.ReactNode }) {
  const [prefill, setPrefill] = useState<ContactPrefill | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const closeContact = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);
  const openContact = useCallback((nextPrefill?: ContactPrefill) => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPrefill(nextPrefill ?? null);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContact();
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]',
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeContact, isOpen]);

  return (
    <ContactWidgetContext.Provider value={{ openContact, closeContact }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-end bg-black/75 p-0 backdrop-blur-sm sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) closeContact();
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-widget-title"
              initial={{ opacity: 0, y: 32, x: 24 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 24, x: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border border-white/10 bg-[#090909] p-5 shadow-2xl sm:max-w-xl sm:rounded-2xl sm:p-8"
            >
              <div className="mb-6 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Start a project</p>
                  <h2 id="contact-widget-title" className="text-2xl font-bold sm:text-3xl">
                    {prefill ? "Let’s build this for you." : "Tell us what you need."}
                  </h2>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeContact}
                  aria-label="Close contact form"
                  className="rounded-full border border-white/10 p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ContactForm key={prefill?.showroomProductId ?? "general"} prefill={prefill} compact />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ContactWidgetContext.Provider>
  );
}