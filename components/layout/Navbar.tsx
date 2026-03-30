"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";

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

interface NavbarProps {
  userEmail?: string | null;
  userName?: string | null;
  userRole?: string | null;
}

export default function Navbar({ userEmail, userName, userRole }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const isAdmin = userRole === "admin";

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="bg-[#D9D9D9] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logos */}
          <Link
            href="/dashboard"
            className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center space-x-2">
              {/* NTU Logo */}
              <div className="w-10 h-10 bg-[#181D62] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">NTU</span>
              </div>
              {/* MSc EEE Logo */}
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-[#181D62]">MSc</div>
                <div className="text-sm font-bold text-[#D7143F]">EEE</div>
              </div>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-white text-[#D7143F]"
                      : "text-[#181D62] hover:bg-white/50"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}

            {/* Admin link — only visible to admins */}
            {isAdmin && (
              <Link
                href="/admin"
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  pathname.startsWith("/admin")
                    ? "bg-[#181D62] text-white"
                    : "text-[#181D62] hover:bg-white/50"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">Admin</span>
              </Link>
            )}
          </nav>

          {/* Right: Search & Profile */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <button className="hidden sm:flex items-center space-x-2 px-3 py-2 hover:bg-white rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 hover:bg-white rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-[#181D62] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {userName || "Student"}
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {userName || "Student"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {userEmail}
                      </p>
                      {isAdmin && (
                        <span className="inline-block mt-1 text-[10px] font-bold bg-[#181D62] text-white px-2 py-0.5 rounded-full">
                          ADMIN
                        </span>
                      )}
                    </div>
                    {/*<button
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>*/}
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setProfileMenuOpen(false)}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-[#181D62] hover:bg-blue-50"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}
                    <button
                      className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </>
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
              const IconComponent = item.icon;

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
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}

            {/* Admin link — mobile, only visible to admins */}
            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname.startsWith("/admin")
                    ? "bg-[#181D62] text-white"
                    : "text-gray-700 hover:bg-white/50"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">Admin</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
