import { mockProducts } from "@/lib/mockProducts";
import ProductDetails from "@/components/shop/ProductDetails";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = mockProducts.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found | MimiSh Crafts",
    };
  }

  return {
    title: `${product.name} | MimiSh Crafts`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0],
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = mockProducts.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-sand-50 min-h-screen">
      <ProductDetails product={product} />
    </div>
  );
}
