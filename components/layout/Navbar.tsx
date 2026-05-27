"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const { toggleCart, getTotalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for cart badge count
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Cart", href: "/cart" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-sand-50/95 backdrop-blur-md py-4 border-sand-200"
          : "bg-sand-50 py-6 border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-6 items-center justify-between">
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors duration-200",
                  pathname === link.href
                    ? "text-terracotta-600"
                    : "text-sand-800 hover:text-terracotta-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-sand-800 hover:text-terracotta-600 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo / Brand Name */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex flex-col items-center">
              <h1 className="font-serif text-xl md:text-2xl font-semibold tracking-widest text-sand-900 uppercase">
                MimiSh
              </h1>
              <span className="text-[9px] font-sans tracking-widest text-moss-600 uppercase -mt-1">
                Crafts
              </span>
            </Link>
          </div>

          {/* Right Icons: Account & Cart */}
          <div className="flex items-center space-x-6">
            <Link
              href="/account/profile"
              className="text-sand-800 hover:text-terracotta-600 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>

            <button
              onClick={() => toggleCart(true)}
              className="group relative flex items-center p-1"
            >
              <ShoppingBag className="h-5 w-5 text-sand-800 group-hover:text-terracotta-600 transition-colors" />
              {mounted && getTotalItems() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-terracotta-500 text-[10px] font-bold text-sand-50">
                  {getTotalItems()}
                </span>
              )}
              <span className="sr-only">Items in cart, view bag</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-sand-50 border-b border-sand-200 transition-all duration-300 ease-in-out origin-top",
          isOpen ? "scale-y-100 opacity-100 py-6" : "scale-y-0 opacity-0 h-0 overflow-hidden"
        )}
      >
        <div className="space-y-4 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block text-base font-medium tracking-wide py-2 border-b border-sand-100",
                pathname === link.href
                  ? "text-terracotta-600"
                  : "text-sand-800"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
