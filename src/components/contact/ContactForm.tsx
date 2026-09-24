"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { formatPrice } from "@/data/showroom";

export type ContactPrefill = {
  source?: "showroom";
  showroomProductId?: string;
  showroomProductName?: string;
  category?: string[];
  websiteType?: string[];
  startingPrice?: number;
  delivery?: string;
  intent?: "customize";
};

type ContactFormProps = {
  prefill?: ContactPrefill | null;
  compact?: boolean;
  onSuccess?: () => void;
};

const emptyForm = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  projectType: "Web Development",
  customization: "I’m not sure yet",
  message: "",
};

export default function ContactForm({ prefill, compact = false, onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState(() => ({
    ...emptyForm,
    projectType: prefill ? "Website Customization" : "Web Development",
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (!scriptUrl) {
        throw new Error("Script URL not configured");
      }

      const payload = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        message: formData.message,
        businessName: formData.businessName,
        phone: formData.phone,
        customization: prefill ? formData.customization : "",
        source: prefill?.source ?? "website",
        showroomProductId: prefill?.showroomProductId ?? "",
        showroomProductName: prefill?.showroomProductName ?? "",
        showroomCategory: prefill?.category?.join(", ") ?? "",
        showroomWebsiteType: prefill?.websiteType?.join(", ") ?? "",
        showroomStartingPrice: prefill?.startingPrice?.toString() ?? "",
        showroomDelivery: prefill?.delivery ?? "",
        intent: prefill?.intent ?? "",
      });

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });

      if (prefill?.source === "showroom") {
        window.dispatchEvent(new CustomEvent("showroom_contact_submitted", { detail: prefill }));
      }
      setSubmitStatus("success");
      setFormData({ ...emptyForm, projectType: prefill ? "Website Customization" : "Web Development" });
      onSuccess?.();
    } catch {
      setSubmitStatus("error");
      setErrorMessage("Failed to send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  if (submitStatus === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-10 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <h3 className="mb-3 text-2xl font-bold">Message sent</h3>
        <p className="mb-6 text-foreground/60">Thanks for reaching out. I&apos;ll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setSubmitStatus("idle")}
          className="rounded-sm text-primary outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-primary"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {prefill?.showroomProductName && (
        <div className="rounded-xl border border-primary/25 bg-primary/10 p-4">
          <p className="text-xs font-mono uppercase tracking-widest text-primary">You&apos;re enquiring about</p>
          <p className="mt-2 text-lg font-semibold">{prefill.showroomProductName}</p>
          <p className="mt-1 text-sm text-foreground/60">
            {prefill.startingPrice ? `Customization from ${formatPrice(prefill.startingPrice)}` : "Custom pricing"}
            {prefill.delivery ? ` · ${prefill.delivery}` : ""}
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4"
          role="alert"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
          <p className="text-sm text-red-300">{errorMessage}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" name="name">
          <input id="name" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" className="contact-input" placeholder="Your name" />
        </Field>
        <Field label="Business name" name="businessName">
          <input id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} autoComplete="organization" className="contact-input" placeholder="Your business" />
        </Field>
        <Field label="Email" name="email">
          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" className="contact-input" placeholder="you@example.com" />
        </Field>
        <Field label="WhatsApp / Phone" name="phone">
          <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" className="contact-input" placeholder="Your number" />
        </Field>
      </div>

      {!prefill && (
        <Field label="Project type" name="projectType">
          <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} className="contact-input">
            <option className="bg-black">Web Development</option>
            <option className="bg-black">Mobile App</option>
            <option className="bg-black">UI/UX Design</option>
            <option className="bg-black">Shopify</option>
            <option className="bg-black">Other</option>
          </select>
        </Field>
      )}

      {prefill && (
        <Field label="What would you like customized?" name="customization">
          <select id="customization" name="customization" value={formData.customization} onChange={handleChange} className="contact-input">
            <option className="bg-black">Branding &amp; content</option>
            <option className="bg-black">Additional sections</option>
            <option className="bg-black">Additional functionality</option>
            <option className="bg-black">I’m not sure yet</option>
          </select>
        </Field>
      )}

      <Field label={prefill ? "Anything else we should know?" : "Message"} name="message">
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={compact ? 3 : 4} className="contact-input resize-none" placeholder="Tell us about your business and what you need..." />
      </Field>

      <MagneticButton type="submit" disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 py-4 text-base">
        {isSubmitting ? <><Loader2 className="h-5 w-5 animate-spin" /> Sending...</> : <><Send className="h-5 w-5" /> Send enquiry</>}
      </MagneticButton>
    </form>
  );
}

function Field({ label, name, children }: { label: string; name: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-xs uppercase tracking-wider text-foreground/60">{label}</label>
      {children}
    </div>
  );
}