"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Plus } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();

  return (
    <div className="group relative flex flex-col overflow-hidden bg-transparent">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-sand-100 border border-sand-200">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            priority={product.id === "p1"} // Prioritize first product for performance
          />
        </Link>

        {/* Eco attributes badges inside card (top left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.ecoAttributes.slice(0, 2).map((attr) => (
            <span
              key={attr}
              className="inline-flex items-center bg-sand-50/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-medium tracking-wide uppercase text-moss-700 border border-moss-200/50"
            >
              {attr}
            </span>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs tracking-wider uppercase text-sand-500 mb-1.5 font-medium">
            <span>{product.category.replace("-", " ")}</span>
            <div className="flex items-center gap-1 font-sans">
              <Star className="h-3.5 w-3.5 fill-terracotta-500 text-terracotta-500" />
              <span className="text-sand-800 font-medium">{product.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg text-sand-900 group-hover:text-terracotta-600 transition-colors duration-200">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Eco attribute highlight text */}
          <p className="mt-1 text-xs text-moss-600 italic line-clamp-1">
            {product.highlights[0]}
          </p>

          {/* Price */}
          <p className="mt-2 font-sans font-semibold text-sand-800 text-base">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4">
          <button
            onClick={() => addToCart(product)}
            className="flex items-center justify-center gap-2 border border-sand-300 bg-transparent text-sand-800 hover:bg-terracotta-600 hover:text-sand-50 hover:border-transparent transition-all duration-200 w-full py-2.5 text-xs font-semibold uppercase tracking-widest rounded-none focus:outline-none focus:ring-1 focus:ring-terracotta-500"
          >
            <Plus className="h-4 w-4" />
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
