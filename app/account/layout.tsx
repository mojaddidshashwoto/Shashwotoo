import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/shop/CartDrawer";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-sand-50">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
