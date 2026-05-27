"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { CheckCircle2, ArrowRight, ShieldCheck, CreditCard, Sparkles, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  
  // Shipping details form state
  const [form, setForm] = useState({
    name: "Sarah Rahman",
    email: "sarah.rahman@example.com",
    address: "House 42, Road 11, Banani",
    city: "Dhaka",
    zip: "1213",
    phone: "+880 1712-345678",
    paymentMethod: "cod",
  });

  const deliveryCharge = form.city.toLowerCase() === "dhaka" ? 100 : 150;

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate mock order reference
    const ref = `MS-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderRef(ref);
    setIsOrdered(true);
    // Clear the cart
    clearCart();
  };

  if (!mounted) return null;

  // Order Success Screen
  if (isOrdered) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center bg-sand-50 animate-fade-in">
        <div className="inline-flex p-3 bg-moss-100 text-moss-700 rounded-full mb-6 animate-fade-in-up">
          <CheckCircle2 className="h-16 w-16" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-moss-700 mb-2 block">
          Order Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900 leading-tight">
          Thank you for your purchase
        </h1>
        <p className="mt-4 text-sm text-sand-600 max-w-sm mx-auto leading-relaxed">
          Your order has been received and is being carefully packed in our eco-friendly packaging. We have sent a confirmation details invoice to your email address.
        </p>

        {/* Order details panel */}
        <div className="mt-8 bg-sand-100 border border-sand-200 p-6 text-left space-y-3">
          <div className="flex justify-between border-b border-sand-200 pb-2 text-xs uppercase tracking-wider text-sand-500 font-semibold">
            <span>Order Reference</span>
            <span className="font-mono text-terracotta-600 text-sm font-bold">{orderRef}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-sand-600">Shipping to</span>
            <span className="font-medium text-sand-800">{form.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-sand-600">Address</span>
            <span className="font-medium text-sand-800">{form.address}, {form.city}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-sand-600">Payment Method</span>
            <span className="font-medium text-sand-800 uppercase">
              {form.paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Bkash Mobile Wallet"}
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-6 py-3 bg-moss-600 hover:bg-moss-700 text-sand-50 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 rounded-none inline-flex items-center justify-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/account/profile"
            className="px-6 py-3 border border-sand-300 hover:bg-sand-100 text-sand-800 text-xs font-semibold uppercase tracking-widest transition-colors duration-200 rounded-none inline-flex items-center justify-center"
          >
            Track Order Status
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-sand-50 opacity-0 animate-fade-in">
      <div className="border-b border-sand-200 pb-8 mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-moss-700 mb-2 block">
          Secure checkout
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900 leading-tight">
          Complete Your Purchase
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-sand-100 border border-sand-200">
          <Sparkles className="h-10 w-10 text-sand-300 mx-auto mb-4" />
          <h3 className="font-serif text-xl text-sand-800">Your bag is empty</h3>
          <p className="text-sm text-sand-500 mt-2">You cannot checkout without items in your shopping bag.</p>
          <Link
            href="/products"
            className="mt-6 inline-flex px-6 py-2.5 bg-moss-600 text-sand-50 text-xs font-semibold uppercase tracking-wider transition-colors rounded-none"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel: Shipping Forms */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Delivery address */}
            <div className="bg-sand-100 p-6 border border-sand-200">
              <h2 className="font-serif text-lg font-semibold text-sand-900 border-b border-sand-200 pb-3 mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-moss-500" />
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-sand-500 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-sand-50 border border-sand-300 focus:outline-none focus:border-moss-500 rounded-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-sand-500 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-sand-50 border border-sand-300 focus:outline-none focus:border-moss-500 rounded-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-sand-500 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-sand-50 border border-sand-300 focus:outline-none focus:border-moss-500 rounded-none transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-sand-500 mb-1.5">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-sand-50 border border-sand-300 focus:outline-none focus:border-moss-500 rounded-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-sand-500 mb-1.5">
                    City (Dhaka/Other)
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-sand-50 border border-sand-300 focus:outline-none focus:border-moss-500 rounded-none transition-colors cursor-pointer"
                  >
                    <option value="Dhaka">Dhaka (৳100 shipping)</option>
                    <option value="Chittagong">Chittagong (৳150 shipping)</option>
                    <option value="Sylhet">Sylhet (৳150 shipping)</option>
                    <option value="Rajshahi">Rajshahi (৳150 shipping)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-sand-500 mb-1.5">
                    Postal / Zip Code
                  </label>
                  <input
                    type="text"
                    required
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-sand-50 border border-sand-300 focus:outline-none focus:border-moss-500 rounded-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-sand-100 p-6 border border-sand-200">
              <h2 className="font-serif text-lg font-semibold text-sand-900 border-b border-sand-200 pb-3 mb-6 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-moss-500" />
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center gap-3 border border-sand-300 bg-sand-50 p-4 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.paymentMethod === "cod"}
                    onChange={() => setForm({ ...form, paymentMethod: "cod" })}
                    className="h-4 w-4 text-moss-600 focus:ring-moss-500 border-sand-300"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-sand-900">Cash on Delivery</span>
                    <span className="block text-xs text-sand-500 mt-0.5">Pay with cash upon delivery of your packages.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 border border-sand-300 bg-sand-50 p-4 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="payment"
                    value="bkash"
                    checked={form.paymentMethod === "bkash"}
                    onChange={() => setForm({ ...form, paymentMethod: "bkash" })}
                    className="h-4 w-4 text-moss-600 focus:ring-moss-500 border-sand-300"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-sand-900">bKash wallet transfer</span>
                    <span className="block text-xs text-sand-500 mt-0.5">Redirect to payment gateway to pay securely via bKash mobile banking.</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Panel: Order Summary */}
          <div className="lg:col-span-5 bg-sand-100 border border-sand-200 p-6 sticky top-24">
            <h2 className="font-serif text-lg font-semibold text-sand-900 border-b border-sand-200 pb-3 mb-6">
              Order Summary
            </h2>

            {/* List items */}
            <div className="divide-y divide-sand-200 max-h-64 overflow-y-auto mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex py-4 first:pt-0">
                  <div className="relative h-14 w-14 flex-shrink-0 bg-sand-50 border border-sand-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-3 flex flex-1 flex-col justify-center">
                    <span className="text-sm font-serif font-medium text-sand-900 leading-tight">
                      {item.product.name}
                    </span>
                    <span className="text-xs text-sand-500 mt-0.5">Qty: {item.quantity}</span>
                  </div>
                  <div className="text-sm font-semibold text-sand-800 flex items-center">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-sand-200 pt-4 space-y-3.5 text-sm">
              <div className="flex justify-between text-sand-600">
                <span>Subtotal</span>
                <span className="font-medium text-sand-900">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-sand-600">
                <span>Delivery Charge ({form.city})</span>
                <span className="font-medium text-sand-900">{formatPrice(deliveryCharge)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-sand-900 border-t border-sand-200 pt-4">
                <span className="font-serif">Grand Total</span>
                <span className="text-lg">{formatPrice(getTotalPrice() + deliveryCharge)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-none shadow-xs"
            >
              Place Mock Order
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-sand-400">
              <ShieldCheck className="h-4 w-4 text-moss-500" />
              <span>Safe and secure checkout. Real shipping is mock.</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
