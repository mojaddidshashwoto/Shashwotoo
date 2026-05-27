export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  ecoAttributes: string[]; // e.g. ["100% Organic Cotton", "Biodegradable", "Plastic-Free"]
  highlights: string[];    // e.g. ["Hand-poured", "Sustainably harvested"]
  details: string[];       // detailed bullet points for product detail page
}

export interface CartItem {
  id: string; // matches product.id
  product: Product;
  quantity: number;
}
