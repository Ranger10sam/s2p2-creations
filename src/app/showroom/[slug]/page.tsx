import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShowroomProductDetail from "@/components/showroom/ShowroomProductDetail";
import { formatDelivery, formatPrice, getShowroomProduct, showroomProducts } from "@/data/showroom";

type ShowroomProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return showroomProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ShowroomProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getShowroomProduct(slug);
  if (!product) return {};

  return {
    title: `${product.name} | Website Showroom | S2P2 Creations`,
    description: `${product.category.join(" and ")} website concept ready to customize from ${formatPrice(product.startingPrice)}, with estimated delivery in ${formatDelivery(product)}.`,
  };
}

export default async function ShowroomProductPage({ params }: ShowroomProductPageProps) {
  const { slug } = await params;
  const product = getShowroomProduct(slug);
  if (!product) notFound();

  return <ShowroomProductDetail product={product} />;
}