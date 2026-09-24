"use client";

import { usePathname } from "next/navigation";
import SidebarNav from "@/components/layout/SidebarNav";
import SmoothScroll from "@/components/layout/SmoothScroll";
import TopLogoBar from "@/components/layout/TopLogoBar";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isShowroomPreview = /^\/showroom\/[^/]+\/preview\/?$/.test(pathname);

  if (isShowroomPreview) return children;

  return (
    <SmoothScroll>
      <TopLogoBar />
      <SidebarNav />
      <div className="transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:pl-[var(--sidebar-width,240px)]">
        {children}
      </div>
    </SmoothScroll>
  );
}