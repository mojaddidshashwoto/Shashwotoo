"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() !== "") {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-sand-100 border-t border-sand-200 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex flex-col items-start mb-4">
              <span className="font-serif text-2xl font-semibold tracking-widest text-sand-900 uppercase">
                MimiSh
              </span>
              <span className="text-[10px] font-sans tracking-widest text-moss-600 uppercase -mt-1">
                Crafts
              </span>
            </Link>
            <p className="text-sm text-sand-600 leading-relaxed pr-4">
              Sourcing natural, biodegradable, and beautiful artisan goods to support a mindful, slow-living home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-sand-900 uppercase mb-4">
              Shop Collections
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=gift-boxes" className="text-sm text-sand-600 hover:text-terracotta-600 transition-colors">
                  Eco Gift Boxes
                </Link>
              </li>
              <li>
                <Link href="/products?category=home-decor" className="text-sm text-sand-600 hover:text-terracotta-600 transition-colors">
                  Minimalist Home Decor
                </Link>
              </li>
              <li>
                <Link href="/products?category=ornaments" className="text-sm text-sand-600 hover:text-terracotta-600 transition-colors">
                  Celestial Ornaments
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Info */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-sand-900 uppercase mb-4">
              Our Philosophy
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-sand-600 hover:text-terracotta-600 transition-colors">
                  About Our Brand
                </Link>
              </li>
              <li>
                <span className="text-sm text-sand-600">Sustainably Sourced</span>
              </li>
              <li>
                <span className="text-sm text-sand-600">Plastic-Free Packaging</span>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div>
            <h3 className="font-serif text-sm font-semibold tracking-wider text-sand-900 uppercase mb-4">
              MimiSh Journal
            </h3>
            <p className="text-sm text-sand-600 leading-relaxed mb-4">
              Subscribe to receive slow-living inspiration, product launches, and exclusive member updates.
            </p>
            {subscribed ? (
              <div className="bg-moss-100 border border-moss-200/50 p-4 text-moss-800 text-xs font-semibold uppercase tracking-wider animate-fade-in">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-4 w-4 text-sand-400" />
                  </div>
                  <input
                    id="email-address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-sand-50 border border-sand-300 text-sand-800 placeholder-sand-400 focus:outline-none focus:border-terracotta-500 rounded-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 font-medium text-sm px-4 py-2 border border-transparent rounded-none transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>


        {/* Bottom Area */}
        <div className="mt-16 pt-8 border-t border-sand-200 flex flex-col md:flex-row justify-between items-center text-xs text-sand-500 gap-4">
          <p>© {currentYear} MimiSh Crafts. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-terracotta-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-terracotta-600 transition-colors">Pinterest</a>
            <a href="#" className="hover:text-terracotta-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
