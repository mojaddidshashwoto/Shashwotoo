import Image from "next/image";
import Link from "next/link";
import { Leaf, Award, Recycle, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story & Philosophy | MimiSh Crafts",
  description: "Learn about the intentional design philosophy behind MimiSh Crafts. Sourcing natural materials and hand-pressed clay pottery.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-sand-50">
      {/* Page Header */}
      <section className="bg-sand-100 border-b border-sand-200 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-moss-700 mb-2 block">
            Our Story
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-sand-900 leading-tight">
            Designed for Intentional Living
          </h1>
          <p className="mt-4 text-sm sm:text-base text-sand-600 max-w-xl mx-auto leading-relaxed">
            MimiSh Crafts was born from a desire to reconnect with natural processes, small-scale artisan makers, and simple tactile products.
          </p>
        </div>
      </section>

      {/* Main Philosophy Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text panel */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sand-900">
              The Slow Living Ideology
            </h2>
            <p className="text-sm sm:text-base text-sand-700 leading-relaxed">
              We live in a world that values speed and disposable convenience. At MimiSh Crafts, we choose a different path. We believe that your home should be a collection of things that carry a history, evoke a feeling, and tread lightly on the Earth.
            </p>
            <p className="text-sm sm:text-base text-sand-700 leading-relaxed">
              Every terracotta vase, organic linen towel, and pressed clay ornament we offer is selected because it represents a slower pace of life. We believe in buying fewer, higher-quality items that grow more beautiful with age.
            </p>
            <p className="text-sm sm:text-base text-sand-700 leading-relaxed">
              By working with craft communities who use traditional techniques, we help keep these essential skills alive while providing you with unique accents for your home.
            </p>
          </div>

          {/* Image panel */}
          <div className="lg:col-span-5 relative aspect-square w-full overflow-hidden border border-sand-200 shadow-xs group">
            <Image
              src="/images/sourcing-about.png"
              alt="Artisan tools and cotton paper sheets"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
            />
          </div>
        </div>
      </section>

      {/* Letter from the Founder */}
      <section className="bg-sand-50 py-20 border-t border-sand-200">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-moss-700 mb-4 block">
            A Note from our Founder
          </span>
          <span className="font-serif text-6xl text-terracotta-200 block -mb-4 leading-none select-none" aria-hidden="true">“</span>
          <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-sand-850 italic leading-relaxed max-w-3xl mx-auto">
            MimiSh Crafts started as a quiet rebellion against the loud, disposable nature of modern living. I wanted to build a sanctuary of objects that carry history, evoke presence, and celebrate slow craftsmanship. When you touch a rough clay mug or hang a pressed clay ornament, you're invited to pause and breathe. Thank you for inviting our crafts into your home.
          </blockquote>
          <div className="mt-8">
            <h4 className="font-serif text-base font-bold text-sand-900">Mimi</h4>
            <p className="text-xs font-semibold uppercase tracking-widest text-moss-600 mt-1">Founder & Curator</p>
          </div>
        </div>
      </section>

      {/* Values Cards */}
      <section className="bg-sand-100 border-t border-b border-sand-200 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl font-semibold text-sand-900">
              Our Core Commitments
            </h2>
            <p className="mt-3 text-sm text-sand-600">
              How we keep our footprint small and our quality uncompromising.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-sand-50 p-8 border border-sand-200 text-center">
              <div className="inline-flex p-3 bg-moss-100 text-moss-700 mb-6">
                <Leaf className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-sand-900 mb-3">Sustainably Gathered</h3>
              <p className="text-sm text-sand-600 leading-relaxed">
                From French flax fibers to local unglazed clay, we trace our raw materials back to their source to ensure sustainable harvests and clean processes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-sand-50 p-8 border border-sand-200 text-center">
              <div className="inline-flex p-3 bg-moss-100 text-moss-700 mb-6">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-sand-900 mb-3">Artisan Support</h3>
              <p className="text-sm text-sand-600 leading-relaxed">
                We trade fairly and transparently. We source items in small, intentional batches to ensure makers are paid justly and resources are preserved.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-sand-50 p-8 border border-sand-200 text-center">
              <div className="inline-flex p-3 bg-moss-100 text-moss-700 mb-6">
                <Recycle className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-sand-900 mb-3">100% Zero Plastic</h3>
              <p className="text-xs sm:text-sm text-sand-600 leading-relaxed">
                We never ship using plastic wrap or bubbles. Instead, we use unbleached craft boxes, water-soluble starch peanuts, and natural hemp ties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="mx-auto max-w-4xl px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-semibold text-sand-900 mb-6">
          Ready to discover our collection?
        </h2>
        <p className="text-sm text-sand-600 max-w-md mx-auto mb-8 leading-relaxed">
          Browse through our curated gift kits, celestial pottery ornaments, and minimalist interior decor.
        </p>
        <Link
          href="/products"
          className="inline-flex px-8 py-3.5 bg-terracotta-600 hover:bg-terracotta-700 text-sand-50 text-xs font-semibold uppercase tracking-widest transition-colors rounded-none shadow-sm"
        >
          Browse the Shop
        </Link>
      </section>
    </div>
  );
}
