import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import ContactWidgetProvider from "@/components/contact/ContactWidgetProvider";
import SiteChrome from "@/components/layout/SiteChrome";
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
  title: "Ready-to-Customize Websites for Small Businesses | S2P2 Creations",
  description: "Explore ready-to-customize websites for cafés, restaurants, bakeries, gyms, salons, photographers, interior designers, and growing local businesses. Choose a design and launch with S2P2 Creations.",
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
        <ContactWidgetProvider>
          <SiteChrome>{children}</SiteChrome>
        </ContactWidgetProvider>
      </body>
    </html>
  );
}
