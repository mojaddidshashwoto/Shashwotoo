import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Heart, Recycle } from "lucide-react";
import { mockProducts } from "@/lib/mockProducts";
import ProductCard from "@/components/ui/ProductCard";

export default function Homepage() {
  // Get first 4 products to display as featured
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-sand-200 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Slow living minimalist interior background"
            fill
            priority
            className="object-cover object-center brightness-95 transition-transform duration-10000 ease-out scale-102 hover:scale-100"
          />
          {/* Subtle warm overlay */}
          <div className="absolute inset-0 bg-sand-900/10 mix-blend-multiply" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-moss-700 mb-4 bg-sand-50/80 px-3 py-1 backdrop-blur-xs opacity-0 animate-fade-in">
            Artisanal & Sustainable
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-sand-900 leading-tight opacity-0 animate-fade-in-up animation-delay-100">
            Curated for the <span className="italic font-normal text-terracotta-600">Mindful Home</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-sand-800 leading-relaxed font-medium opacity-0 animate-fade-in-up animation-delay-200">
            Handpicked eco-friendly gift boxes and minimalist home decor that bring warmth, intention, and slow-living simplicity into your everyday space.
          </p>
          <div className="mt-10 flex justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-300">
            <Link
              href="/products"
              className="px-8 py-3.5 bg-terracotta-600 hover:bg-terracotta-700 hover:scale-102 hover:shadow-md active:scale-98 text-sand-50 font-semibold tracking-wider uppercase text-xs transition-all duration-200 shadow-sm"
            >
              Explore Collections
            </Link>
            <Link
              href="#our-story"
              className="px-8 py-3.5 bg-sand-50/90 hover:bg-sand-50 hover:scale-102 hover:shadow-md active:scale-98 text-sand-850 border border-sand-300 font-semibold tracking-wider uppercase text-xs transition-all duration-200 shadow-sm backdrop-blur-xs"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 opacity-0 animate-fade-in-up">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-sand-900">
            Mindfully Curated Essentials
          </h2>
          <p className="mt-4 text-sand-600 leading-relaxed">
            Sourced from small-scale artisans who prioritize the earth. Explore our most-loved gift sets and home accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 opacity-0 animate-fade-in-up animation-delay-100">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center opacity-0 animate-fade-in-up animation-delay-200">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-moss-700 hover:text-terracotta-600 transition-colors group/link"
          >
            <span>View All Collections</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Brand Story Section */}
      <section id="our-story" className="bg-moss-100/50 py-24 scroll-mt-16 border-y border-sand-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image side */}
            <div className="lg:col-span-6 relative aspect-4/3 sm:aspect-16/10 lg:aspect-square w-full overflow-hidden border border-sand-200 shadow-xs group/img">
              <Image
                src="/images/artisan-story.png"
                alt="Artisan hands shaping a terracotta pot"
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-103"
              />
            </div>

            {/* Text side */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-moss-700 mb-3 block">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-sand-900 mb-6">
                Crafted by Nature, Curated by Us
              </h2>
              <div className="space-y-4 text-sand-700 text-base leading-relaxed">
                <p>
                  At <strong>MimiSh Crafts</strong>, we believe that your home should be a sanctuary of calmness—a reflection of the peace you seek in the world.
                </p>
                <p>
                  Each item in our boutique is selected with deep intention. From organic, plastic-free gift boxes to hand-thrown rustic terracotta ceramics, we partner with independent makers who share our deep respect for the natural environment.
                </p>
                <p>
                  We design for longevity, use 100% biodegradable and recyclable packaging, and ensure that every curation supports artisanal communities.
                </p>
              </div>

              {/* Eco Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-sand-200/60">
                <div className="flex items-start gap-3 transition-transform duration-300 hover:-translate-y-1">
                  <div className="p-2 bg-moss-100 rounded-none text-moss-700">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-sand-900">100% Organic</h4>
                    <p className="text-xs text-sand-500 mt-0.5">Sustainable botanicals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 transition-transform duration-300 hover:-translate-y-1">
                  <div className="p-2 bg-moss-100 rounded-none text-moss-700">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-sand-900">Handcrafted</h4>
                    <p className="text-xs text-sand-500 mt-0.5">Small-batch makers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 transition-transform duration-300 hover:-translate-y-1">
                  <div className="p-2 bg-moss-100 rounded-none text-moss-700">
                    <Recycle className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-sand-900">Plastic-Free</h4>
                    <p className="text-xs text-sand-500 mt-0.5">Zero-waste shipping</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
