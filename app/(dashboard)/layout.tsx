"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Users,
  MapPin,
  Heart,
  Menu,
  X,
  Search,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const navigation = [
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Community", href: "/community", icon: Users },
  { name: "Student Life", href: "/student-life", icon: MapPin },
  { name: "Wellbeing", href: "/wellbeing", icon: Heart },
  {
    name: "Contact Us",
    href: "/contact",
    icon: () => (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <header className="bg-[#D9D9D9] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logos */}
            <div className="flex items-center space-x-4">
              {/* NTU Logo Placeholder */}
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 bg-[#181D62] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NTU</span>
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-bold text-[#181D62]">MSc</div>
                  <div className="text-xs text-[#D7143F]">EEE</div>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-white text-[#D7143F]"
                        : "text-gray-700 hover:bg-white/50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search & Profile */}
            <div className="flex items-center space-x-3">
              {/* Search */}
              <button className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-white/50 hover:bg-white rounded-lg transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 bg-white/50 hover:bg-white rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-[#181D62] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {session?.user?.name || "Student"}
                  </span>
                </button>

                {/* Profile Dropdown Menu */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session?.user?.email}
                      </p>
                    </div>
                    <button
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => {}}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <button
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:bg-white/50 rounded-lg"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-300 bg-[#D9D9D9]">
            <nav className="px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-white text-[#D7143F]"
                        : "text-gray-700 hover:bg-white/50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
