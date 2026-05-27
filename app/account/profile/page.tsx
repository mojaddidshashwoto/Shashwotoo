import { User, MapPin, Package, Heart, LogOut } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function ProfilePage() {
  // Mock customer info
  const customer = {
    name: "Sarah Rahman",
    email: "sarah.rahman@example.com",
    phone: "+880 1712-345678",
    memberSince: "May 2026",
    avatar: "S",
  };

  const defaultAddress = {
    label: "Home (Default)",
    street: "House 42, Road 11, Banani",
    city: "Dhaka - 1213",
    country: "Bangladesh",
  };

  const pastOrders = [
    {
      id: "MS-84920",
      date: "May 15, 2026",
      status: "Delivered",
      total: 8500, // BDT
      items: "The Meadow Gift Box (1)",
    },
    {
      id: "MS-83719",
      date: "April 28, 2026",
      status: "Delivered",
      total: 3800, // BDT
      items: "Earthy Terracotta Vase (1)",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-sand-50 opacity-0 animate-fade-in">
      {/* Profile Header */}
      <div className="border-b border-sand-200 pb-8 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-moss-700 mb-2 block">
            Customer Dashboard
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sand-900 leading-tight">
            Welcome back, {customer.name}
          </h1>
        </div>
        <button className="flex items-center gap-2 border border-sand-300 hover:bg-terracotta-600 hover:text-sand-50 hover:border-transparent transition-all duration-200 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-none">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Profile & Address */}
        <div className="lg:col-span-4 space-y-8">
          {/* Account Details */}
          <div className="bg-sand-100 p-6 border border-sand-200">
            <h2 className="font-serif text-lg font-semibold text-sand-900 border-b border-sand-200 pb-3 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-moss-500" />
              Account Details
            </h2>
            <div className="space-y-3.5 text-sm">
              <div>
                <p className="text-xs text-sand-500 font-medium uppercase tracking-wider">Full Name</p>
                <p className="text-sand-800 font-semibold mt-0.5">{customer.name}</p>
              </div>
              <div>
                <p className="text-xs text-sand-500 font-medium uppercase tracking-wider">Email Address</p>
                <p className="text-sand-800 font-semibold mt-0.5">{customer.email}</p>
              </div>
              <div>
                <p className="text-xs text-sand-500 font-medium uppercase tracking-wider">Phone Number</p>
                <p className="text-sand-800 font-semibold mt-0.5">{customer.phone}</p>
              </div>
              <div>
                <p className="text-xs text-sand-500 font-medium uppercase tracking-wider">Member Since</p>
                <p className="text-sand-600 mt-0.5">{customer.memberSince}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-sand-100 p-6 border border-sand-200">
            <h2 className="font-serif text-lg font-semibold text-sand-900 border-b border-sand-200 pb-3 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-moss-500" />
              Default Shipping Address
            </h2>
            <div className="text-sm text-sand-700 space-y-1">
              <p className="font-semibold text-sand-900">{customer.name}</p>
              <p className="font-medium text-moss-600 text-xs uppercase tracking-wider mb-1">{defaultAddress.label}</p>
              <p>{defaultAddress.street}</p>
              <p>{defaultAddress.city}</p>
              <p>{defaultAddress.country}</p>
            </div>
            <button className="mt-6 text-xs font-semibold uppercase tracking-wider text-moss-700 hover:text-terracotta-600 transition-colors">
              Edit Address
            </button>
          </div>
        </div>

        {/* Right Side: Orders History */}
        <div className="lg:col-span-8">
          <div className="bg-sand-100 p-6 border border-sand-200">
            <h2 className="font-serif text-lg font-semibold text-sand-900 border-b border-sand-200 pb-3 mb-6 flex items-center gap-2">
              <Package className="h-5 w-5 text-moss-500" />
              Order History
            </h2>

            {pastOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-10 w-10 text-sand-300 mx-auto mb-3" />
                <p className="text-sm text-sand-500">You haven't placed any orders yet.</p>
                <Link
                  href="/products"
                  className="mt-4 inline-flex px-6 py-2.5 bg-moss-600 hover:bg-moss-700 text-sand-50 text-xs font-semibold uppercase tracking-wider rounded-none transition-colors"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-sand-250 text-xs text-sand-500 uppercase font-semibold tracking-wider pb-3">
                      <th className="pb-3 font-semibold">Order ID</th>
                      <th className="pb-3 font-semibold">Date</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Items</th>
                      <th className="pb-3 text-right font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-200">
                    {pastOrders.map((order) => (
                      <tr key={order.id} className="text-sand-800">
                        <td className="py-4 font-mono font-medium text-terracotta-600">{order.id}</td>
                        <td className="py-4">{order.date}</td>
                        <td className="py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-moss-100 text-moss-800 rounded-full">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 max-w-xs truncate">{order.items}</td>
                        <td className="py-4 text-right font-semibold">{formatPrice(order.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
