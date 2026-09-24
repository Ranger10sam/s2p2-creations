"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, Laptop, MessageSquareText, Smartphone, X } from "lucide-react";
import { useContactWidget } from "@/components/contact/ContactWidgetProvider";
import { formatDelivery, formatPrice, ShowroomProduct } from "@/data/showroom";
import { trackShowroomEvent } from "@/lib/showroom-events";

type PreviewMode = "desktop" | "mobile";

export default function ShowroomPreview({ product }: { product: ShowroomProduct }) {
  const [mode, setMode] = useState<PreviewMode>("desktop");
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { openContact } = useContactWidget();

  const openCustomization = () => {
    trackShowroomEvent("showroom_customize_click", { productId: product.id, location: "preview" });
    openContact({
      source: "showroom",
      showroomProductId: product.id,
      showroomProductName: product.name,
      category: product.category,
      websiteType: product.websiteType,
      startingPrice: product.startingPrice,
      delivery: formatDelivery(product),
      intent: "customize",
    });
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type === "s2p2:customize") openCustomization();
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  });

  if (!product.demoUrl) return null;

  return (
    <main className="flex h-dvh min-h-[560px] flex-col overflow-hidden bg-[#111] text-white">
      <header className="relative z-20 flex h-16 shrink-0 items-center gap-3 border-b border-white/10 bg-[#080808] px-3 sm:px-5">
        <Link
          href={`/showroom/${product.slug}`}
          aria-label={`Close preview and return to ${product.name}`}
          title="Close preview"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/65 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="h-5 w-5" />
        </Link>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{product.name}</p>
          <p className="hidden truncate text-xs text-white/40 sm:block">Concept preview · from {formatPrice(product.startingPrice)}</p>
        </div>

        <div className="flex shrink-0 rounded-lg border border-white/10 bg-white/5 p-1" aria-label="Preview device">
          <button
            type="button"
            onClick={() => setMode("desktop")}
            aria-label="Desktop preview"
            aria-pressed={mode === "desktop"}
            title="Desktop preview"
            className={`flex h-8 w-9 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${mode === "desktop" ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
          >
            <Laptop className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setMode("mobile")}
            aria-label="Mobile preview"
            aria-pressed={mode === "mobile"}
            title="Mobile preview"
            className={`flex h-8 w-9 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${mode === "mobile" ? "bg-white text-black" : "text-white/50 hover:text-white"}`}
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>

        <a
          href={product.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackShowroomEvent("showroom_live_demo_click", { productId: product.id, location: "preview-toolbar" })}
          aria-label="Open preview in a new tab"
          title="Open in new tab"
          className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:flex"
        >
          <ExternalLink className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={openCustomization}
          className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-white px-3 text-sm font-semibold text-black transition-colors hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-5"
        >
          <MessageSquareText className="h-4 w-4" />
          <span className="hidden sm:inline">Customize</span>
        </button>
      </header>

      <div className="relative min-h-0 flex-1 overflow-auto bg-[#1a1a1a] p-0 sm:p-4">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#1a1a1a] text-sm text-white/45">
            Loading preview...
          </div>
        )}
        <div className={`mx-auto h-full overflow-hidden bg-white shadow-2xl transition-[width,border-radius] duration-300 ${mode === "mobile" ? "w-[390px] max-w-full rounded-[24px] border-[6px] border-[#303030]" : "w-full max-w-[1440px] rounded-none sm:rounded-lg"}`}>
          <iframe
            ref={iframeRef}
            src={product.demoUrl}
            title={`${product.name} interactive website preview`}
            sandbox="allow-scripts allow-forms allow-same-origin"
            onLoad={() => setIsLoading(false)}
            className="h-full w-full border-0 bg-white"
          />
        </div>
      </div>
    </main>
  );
}