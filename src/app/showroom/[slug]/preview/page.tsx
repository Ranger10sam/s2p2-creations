import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShowroomPreview from "@/components/showroom/ShowroomPreview";
import { getShowroomProduct, showroomProducts } from "@/data/showroom";

type ShowroomPreviewPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return showroomProducts
    .filter((product) => product.demoUrl)
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ShowroomPreviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getShowroomProduct(slug);

  return {
    title: product ? `Preview ${product.name} | S2P2 Creations` : "Website Preview | S2P2 Creations",
    robots: { index: false, follow: false },
  };
}

export default async function ShowroomPreviewPage({ params }: ShowroomPreviewPageProps) {
  const { slug } = await params;
  const product = getShowroomProduct(slug);
  if (!product?.demoUrl) notFound();

  return <ShowroomPreview product={product} />;
}