import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import StickySection from "@/components/ui/StickySection";
import CursorGlow from "@/components/ui/CursorGlow";

const BentoGrid = dynamic(() => import("@/components/sections/BentoGrid"), {
  loading: () => <div className="h-screen w-full bg-background" />,
});
const FeaturedWork = dynamic(() => import("@/components/sections/FeaturedWork"));
const WhyUs = dynamic(() => import("@/components/sections/WhyUs"));
const ConversionCTA = dynamic(() => import("@/components/sections/ConversionCTA"));

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-background text-foreground">
      <CursorGlow />
      
      <StickySection id="hero" zIndex={0}>
        <Hero />
      </StickySection>
      
      <StickySection id="services" zIndex={10} className="shadow-2xl shadow-black/50">
        <BentoGrid />
      </StickySection>
      
      <StickySection id="work" zIndex={20} className="shadow-2xl shadow-black/50">
        <FeaturedWork />
      </StickySection>
      
      <StickySection id="philosophy" zIndex={30} className="shadow-2xl shadow-black/50">
        <WhyUs />
      </StickySection>
      
      {/* Last section is relative to ensure it covers the previous sticky section and ends the page naturally */}
      <section 
        id="contact" 
        className="w-full relative z-40 bg-background shadow-2xl shadow-black/50 min-h-screen flex flex-col justify-center"
      >
        <ConversionCTA />
      </section>
    </main>
  );
}
