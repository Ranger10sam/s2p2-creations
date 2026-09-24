import type { Metadata } from "next";
import CursorGlow from "@/components/ui/CursorGlow";
import ShowroomCatalogue from "@/components/showroom/ShowroomCatalogue";
import ShowroomHero from "@/components/showroom/ShowroomHero";

export const metadata: Metadata = {
  title: "Website Showroom | S2P2 Creations",
  description: "Explore ready-to-customize website designs for cafés, restaurants, bakeries, gyms, salons, creatives and growing businesses. Customize a design and launch your website with S2P2 Creations.",
};

const steps = [
  { number: "01", title: "Choose a design", description: "Browse concepts built around the needs of real small businesses." },
  { number: "02", title: "Make it yours", description: "We adapt the branding, content, sections, and functionality to your business." },
  { number: "03", title: "Launch", description: "After content and approval, we build, test, and deploy your finished website." },
];

export default function ShowroomPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <CursorGlow />
      <ShowroomHero />
      <ShowroomCatalogue />
      <section id="process" className="border-t border-white/10 px-4 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-mono uppercase tracking-[0.2em] text-primary">How it works</p>
          <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">Choose. Customize. Launch.</h2>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="bg-background p-7 md:p-9">
                <p className="font-mono text-sm text-primary">{step.number}</p>
                <h3 className="mt-8 text-2xl font-bold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-foreground/55">{step.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-foreground/45">
            Displayed prices are starting prices for customization. Final pricing depends on requested changes, pages, integrations, and functionality.
          </p>
        </div>
      </section>
    </main>
  );
}