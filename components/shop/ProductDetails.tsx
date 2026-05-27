"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Leaf, ShoppingBag, Plus, Minus, ArrowLeft, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-sand-50">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sand-500 hover:text-terracotta-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Collections</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Product Image Panel */}
        <div className="lg:col-span-7">
          <div className="relative aspect-square w-full overflow-hidden bg-sand-100 border border-sand-200">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Product Specifications Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs tracking-widest uppercase text-sand-500 mb-3 font-semibold">
              <span>{product.category.replace("-", " ")}</span>
              <div className="flex items-center gap-1 font-sans">
                <Star className="h-4 w-4 fill-terracotta-500 text-terracotta-500" />
                <span className="text-sand-800 font-bold">{product.rating}</span>
                <span className="text-sand-400 font-normal">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-4 font-sans font-bold text-xl sm:text-2xl text-sand-850">
              {formatPrice(product.price)}
            </p>

            {/* Description */}
            <p className="mt-6 text-sm sm:text-base text-sand-600 leading-relaxed">
              {product.description}
            </p>

            {/* Eco Attributes */}
            <div className="mt-8 border-t border-sand-200 pt-6">
              <h3 className="font-serif text-sm font-semibold text-sand-900 tracking-wider uppercase mb-3">
                Eco-Friendly Attributes
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {product.ecoAttributes.map((attr) => (
                  <span
                    key={attr}
                    className="inline-flex items-center gap-1.5 bg-moss-100/60 px-3 py-1.5 text-xs font-semibold tracking-wide uppercase text-moss-700 border border-moss-200/30"
                  >
                    <Leaf className="h-3.5 w-3.5" />
                    {attr}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-8 border-t border-sand-200 pt-6">
              <h3 className="font-serif text-sm font-semibold text-sand-900 tracking-wider uppercase mb-3">
                Curation Highlights
              </h3>
              <ul className="list-disc pl-5 text-sm text-sand-600 space-y-2 leading-relaxed">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add to Cart Controls */}
          <div className="mt-8 border-t border-sand-200 pt-6">
            <div className="flex items-center gap-4">
              {/* Quantity input */}
              <div className="flex items-center border border-sand-300 bg-sand-100 h-12">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 text-sand-600 hover:text-sand-900 transition-colors h-full flex items-center"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 font-sans font-semibold text-sand-800 w-12 text-center select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 text-sand-600 hover:text-sand-900 transition-colors h-full flex items-center"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 h-12 bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 font-bold text-xs uppercase tracking-widest transition-colors duration-200 rounded-none shadow-xs"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Bag
              </button>
            </div>

            {/* Shipping & Specs Info */}
            <div className="mt-8 divide-y divide-sand-200 border-t border-b border-sand-200">
              <details className="py-4 group">
                <summary className="font-serif text-sm font-semibold text-sand-900 uppercase flex justify-between items-center cursor-pointer list-none select-none">
                  <span>Product Specifications</span>
                  <span className="font-sans text-xs text-sand-400 group-open:rotate-185 transition-transform duration-200">▼</span>
                </summary>
                <ul className="mt-3 list-disc pl-5 text-xs text-sand-500 space-y-1.5 leading-relaxed">
                  {product.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </details>

              <details className="py-4 group">
                <summary className="font-serif text-sm font-semibold text-sand-900 uppercase flex justify-between items-center cursor-pointer list-none select-none">
                  <span>Shipping & Eco-Packaging</span>
                  <span className="font-sans text-xs text-sand-400 group-open:rotate-185 transition-transform duration-200">▼</span>
                </summary>
                <p className="mt-3 text-xs text-sand-500 leading-relaxed">
                  Every order is packed and shipped using 100% plastic-free, water-soluble, or curbside recyclable materials. Carbon-neutral delivery is standard for all domestic shipments. Standard delivery arrives in 3–5 business days.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
