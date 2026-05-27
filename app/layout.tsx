import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MimiSh Crafts | Eco-Friendly Gift Boxes & Minimalist Home Decor",
  description: "Curated eco-friendly gift boxes and minimalist home decor designed for intentional, slow living. Sustainable, high-quality, and mindfully sourced.",
  keywords: ["eco-friendly gifts", "minimalist home decor", "sustainable gift boxes", "slow living", "MimiSh Crafts"],
  openGraph: {
    title: "MimiSh Crafts | Eco-Friendly Gift Boxes",
    description: "Curated eco-friendly gift boxes and minimalist home decor designed for intentional, slow living.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-sand-50 text-sand-900 font-sans selection:bg-terracotta-200 selection:text-terracotta-700">
        {children}
      </body>
    </html>
  );
}

