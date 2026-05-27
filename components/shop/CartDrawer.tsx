"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    toggleCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const [isHydrated, setIsHydrated] = useState(false);

  // Rehydrate state on client to prevent SSR issues
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isHydrated) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${
        isOpen ? "visible" : "invisible"
      }`}
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-sand-900/40 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => toggleCart(false)}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className={`w-screen max-w-md transform bg-sand-50 shadow-2xl transition-transform duration-300 ease-in-out border-l border-sand-200 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-sand-200 px-6 py-5">
              <h2 className="font-serif text-xl font-medium text-sand-900 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-moss-500" />
                Shopping Cart
                <span className="text-sm font-sans font-normal text-sand-500">
                  ({getTotalItems()})
                </span>
              </h2>
              <button
                type="button"
                className="rounded-full p-1 text-sand-500 hover:text-sand-900 hover:bg-sand-100 transition-colors"
                onClick={() => toggleCart(false)}
              >
                <span className="sr-only">Close panel</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Content / Cart items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-12 w-12 text-sand-300 mb-4" />
                  <p className="font-serif text-lg text-sand-800">Your cart is empty</p>
                  <p className="text-sm text-sand-500 mt-1 max-w-[250px]">
                    Fill it with curated eco-friendly boxes and minimalist home decor.
                  </p>
                  <button
                    onClick={() => {
                      toggleCart(false);
                    }}
                    className="mt-6 inline-flex justify-center items-center px-6 py-2.5 bg-moss-600 text-sand-50 font-medium text-sm rounded-none hover:bg-moss-700 transition-colors duration-200"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-sand-200">
                  {items.map((item) => (
                    <div key={item.id} className="flex py-6 first:pt-2">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-sand-100 border border-sand-200">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-sand-900">
                            <h3 className="font-serif text-sm md:text-base leading-snug">
                              <Link
                                href={`/products/${item.product.slug}`}
                                onClick={() => toggleCart(false)}
                                className="hover:text-terracotta-600 transition-colors"
                              >
                                {item.product.name}
                              </Link>
                            </h3>
                            <p className="ml-4 font-sans text-sm md:text-base font-semibold text-sand-900">
                              {formatPrice(item.product.price * item.quantity)}
                            </p>
                          </div>
                          <p className="mt-1 text-xs text-moss-600 italic">
                            {item.product.ecoAttributes[0]}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-sand-200 bg-sand-100">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-2 py-1 text-sand-600 hover:text-sand-900 transition-colors"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 py-1 font-sans text-xs text-sand-800 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1 text-sand-600 hover:text-sand-900 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-1 text-xs text-sand-400 hover:text-terracotta-600 transition-colors py-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-sand-200 px-6 py-6 bg-sand-100">
                <div className="flex justify-between text-base font-medium text-sand-900">
                  <p className="font-serif">Subtotal</p>
                  <p className="font-sans font-bold text-lg">{formatPrice(getTotalPrice())}</p>
                </div>
                <p className="mt-0.5 text-xs text-sand-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    href="/checkout"
                    onClick={() => toggleCart(false)}
                    className="flex items-center justify-center rounded-none border border-transparent bg-terracotta-600 px-6 py-3 text-base font-medium text-sand-50 shadow-xs hover:bg-terracotta-700 transition-colors duration-200 w-full"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
                <div className="mt-4 flex justify-center text-center text-sm text-sand-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      className="font-medium text-moss-600 hover:text-moss-700 transition-colors underline"
                      onClick={() => toggleCart(false)}
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
