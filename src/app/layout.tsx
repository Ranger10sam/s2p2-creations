import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import SidebarNav from "@/components/layout/SidebarNav";
import TopLogoBar from "@/components/layout/TopLogoBar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S2P2 Creations | Premium Digital Experiences",
  description: "We build interactive digital products that convert. SaaS, Mobile Apps, Shopify, and High-Performance Web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <SmoothScroll>
          <TopLogoBar />
          <SidebarNav />
          <div 
            className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:pl-[var(--sidebar-width,240px)]"
          >
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
