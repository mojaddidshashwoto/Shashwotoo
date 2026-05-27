import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/shop/CartDrawer";
import IntroSplashScreen from "@/components/ui/IntroSplashScreen";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-sand-50">
      {/* Starting splash animations */}
      <IntroSplashScreen />

      {/* Navbar header */}
      <Navbar />

      {/* Main page content wrapper */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Footer at the bottom */}
      <Footer />

      {/* Side cart sliding drawer */}
      <CartDrawer />
    </div>
  );
}
