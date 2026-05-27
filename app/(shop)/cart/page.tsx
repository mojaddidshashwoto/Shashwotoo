"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!mounted) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-sand-50 opacity-0 animate-fade-in">
      <div className="border-b border-sand-200 pb-8 mb-12 flex justify-between items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-moss-700 mb-2 block">
            Shopping Cart
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900 leading-tight">
            Your Shopping Bag
          </h1>
        </div>
        <p className="text-sm text-sand-500 font-medium">
          ({getTotalItems()} {getTotalItems() === 1 ? "item" : "items"})
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 bg-sand-100 border border-sand-200">
          <ShoppingBag className="mx-auto h-16 w-16 text-sand-300 mb-4" />
          <h3 className="font-serif text-2xl text-sand-800">Your bag is empty</h3>
          <p className="text-sm text-sand-500 mt-2 max-w-sm mx-auto">
            Fill it with handpicked eco-friendly boxes, minimalist home decor, and celestial ornaments.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex px-8 py-3.5 bg-moss-600 hover:bg-moss-700 text-sand-50 text-xs font-semibold uppercase tracking-widest transition-colors rounded-none"
          >
            Start Browsing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart items list */}
          <div className="lg:col-span-8 bg-sand-100 p-6 border border-sand-200">
            <div className="divide-y divide-sand-200">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row py-6 first:pt-0 last:pb-0 gap-6">
                  {/* Product Image */}
                  <div className="relative h-28 w-28 flex-shrink-0 bg-sand-50 border border-sand-200 mx-auto sm:mx-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <h3 className="font-serif text-lg font-medium text-sand-900 leading-tight">
                          <Link href={`/products/${item.product.slug}`} className="hover:text-terracotta-600 transition-colors">
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="font-sans font-bold text-sand-950 text-base">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                      <p className="text-xs text-moss-600 italic mt-1 uppercase tracking-wider font-semibold">
                        {item.product.category.replace("-", " ")}
                      </p>
                      <p className="text-xs text-sand-500 mt-2 line-clamp-2 max-w-md">
                        {item.product.description}
                      </p>
                    </div>

                    {/* Quantity selectors */}
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center border border-sand-300 bg-sand-50 h-10">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 text-sand-600 hover:text-sand-950 h-full flex items-center transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 font-sans font-semibold text-sand-800 text-sm min-w-[32px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 text-sand-600 hover:text-sand-950 h-full flex items-center transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1.5 text-xs text-sand-400 hover:text-terracotta-600 transition-colors py-1.5"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Remove item</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Order Summary Sidepanel */}
          <div className="lg:col-span-4 bg-sand-100 border border-sand-200 p-6 sticky top-24">
            <h2 className="font-serif text-lg font-semibold text-sand-900 border-b border-sand-200 pb-3 mb-6">
              Cart Summary
            </h2>
            <div className="space-y-4 text-sm mb-8">
              <div className="flex justify-between text-sand-600">
                <span>Items Subtotal</span>
                <span className="font-medium text-sand-900">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-sand-600">
                <span>Eco Shipping (BD)</span>
                <span className="text-moss-600 font-semibold uppercase tracking-wider text-xs">Calculated next</span>
              </div>
              <div className="border-t border-sand-200 pt-4 flex justify-between text-base font-bold text-sand-950">
                <span className="font-serif">Subtotal</span>
                <span className="text-lg">{formatPrice(getTotalPrice())}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="flex w-full items-center justify-center bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-none shadow-xs"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-6 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-moss-700 hover:text-terracotta-600 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
