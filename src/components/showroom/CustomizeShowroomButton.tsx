"use client";

import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactWidget } from "@/components/contact/ContactWidgetProvider";
import { formatDelivery, ShowroomProduct } from "@/data/showroom";
import { trackShowroomEvent } from "@/lib/showroom-events";

type CustomizeShowroomButtonProps = {
  product: ShowroomProduct;
  className?: string;
};

export default function CustomizeShowroomButton({ product, className }: CustomizeShowroomButtonProps) {
  const { openContact } = useContactWidget();

  if (product.status === "coming-soon") return null;

  const handleClick = () => {
    trackShowroomEvent("showroom_customize_click", { productId: product.id, productName: product.name });
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

  return (
    <MagneticButton onClick={handleClick} className={className}>
      <span className="flex items-center justify-center gap-2">
        Customize This Website <ArrowUpRight className="h-4 w-4" />
      </span>
    </MagneticButton>
  );
}