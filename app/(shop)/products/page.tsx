import { mockProducts } from "@/lib/mockProducts";
import ShopClient from "@/components/shop/ShopClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Collections | MimiSh Crafts",
  description: "Browse our eco-friendly gift boxes and minimalist home decor. Ethically handcrafted and sustainably sourced.",
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const category = resolvedParams.category || "all";

  return (
    <div className="flex flex-col min-h-screen bg-sand-50">
      {/* Page Header */}
      <section className="bg-sand-100 border-b border-sand-200 py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-moss-700 mb-2 block">
            Our Collections
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sand-900 leading-tight">
            Shop Mindful Crafts
          </h1>
          <p className="mt-4 text-sm sm:text-base text-sand-600 max-w-xl mx-auto leading-relaxed">
            Discover a hand-selected collection of organic gift sets, artisanal ceramics, and cozy textile essentials built to last.
          </p>
        </div>
      </section>

      {/* Interactive Products Grid & Filters */}
      <ShopClient products={mockProducts} initialCategory={category} />
    </div>
  );
}
