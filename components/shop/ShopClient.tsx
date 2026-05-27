"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ui/ProductCard";
import { Grid, List, Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopClientProps {
  products: Product[];
  initialCategory?: string;
}

export default function ShopClient({ products, initialCategory = "all" }: ShopClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const categories = [
    { name: "All Products", value: "all" },
    { name: "Gift Boxes", value: "gift-boxes" },
    { name: "Home Decor", value: "home-decor" },
    { name: "Ornaments", value: "ornaments" },
  ];

  const sortedAndFilteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.highlights.some((h) => h.toLowerCase().includes(query)) ||
          p.ecoAttributes.some((a) => a.toLowerCase().includes(query))
      );
    }

    // Sort Products
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center pb-8 border-b border-sand-200 mb-12">
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={cn(
                "px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded-none border",
                selectedCategory === cat.value
                  ? "bg-moss-600 text-sand-50 border-transparent shadow-xs"
                  : "bg-transparent text-sand-800 border-sand-300 hover:border-moss-500 hover:text-moss-600"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-stretch sm:items-center">
          {/* Search bar */}
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-sand-400" />
            </div>
            <input
              type="text"
              placeholder="Search crafts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full text-sm bg-sand-100 border border-sand-350 focus:outline-none focus:border-moss-500 rounded-none placeholder-sand-400 transition-colors"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 border border-sand-300 bg-sand-100 px-3 py-2 w-full sm:w-auto">
            <SlidersHorizontal className="h-4 w-4 text-sand-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm text-sand-800 focus:outline-none cursor-pointer w-full font-medium"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid display */}
      {sortedAndFilteredProducts.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-sand-300">
          <Search className="mx-auto h-12 w-12 text-sand-300 mb-4" />
          <h3 className="font-serif text-xl text-sand-800">No crafts found</h3>
          <p className="text-sm text-sand-500 mt-2 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
              setSortBy("featured");
            }}
            className="mt-6 px-6 py-2.5 bg-moss-600 text-sand-50 font-medium text-sm rounded-none hover:bg-moss-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center text-xs text-sand-500 mb-6 font-medium uppercase tracking-wider">
            <span>Showing {sortedAndFilteredProducts.length} crafts</span>
          </div>

          <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedAndFilteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
