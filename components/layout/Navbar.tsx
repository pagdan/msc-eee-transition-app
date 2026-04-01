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
  LogOut,
  User,
  LayoutDashboard,
  ChevronDown,
  Instagram,
  UtensilsCrossed,
  BookOpen,
  Bus,
  Smile,
  Dumbbell,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Items without dropdowns
const SIMPLE_NAV = [
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Contact Us", href: "/contact", icon: null },
];

// Items with dropdowns
const DROPDOWN_NAV = [
  {
    name: "Community",
    href: "/community",
    icon: Users,
    children: [
      { name: "Clubs", href: "/community/clubs", icon: Users },
      {
        name: "Social Media",
        href: "/community/social",
        icon: Instagram,
      },
    ],
  },
  {
    name: "Student Life",
    href: "/student-life",
    icon: MapPin,
    children: [
      {
        name: "Food Recommendations",
        href: "/student-life/food-recos",
        icon: UtensilsCrossed,
      },
      {
        name: "Study Spots",
        href: "/student-life/study-spots",
        icon: BookOpen,
      },
      {
        name: "Getting Around",
        href: "/student-life/getting-around",
        icon: Bus,
      },
    ],
  },
  {
    name: "Wellbeing",
    href: "/wellbeing",
    icon: Heart,
    children: [
      { name: "Emotional", href: "/wellbeing/emotional", icon: Smile },
      { name: "Physical", href: "/wellbeing/physical", icon: Dumbbell },
    ],
  },
];

const ContactIcon = () => (
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
);

interface NavbarProps {
  userEmail?: string | null;
  userName?: string | null;
  userRole?: string | null;
}

export default function Navbar({ userEmail, userName, userRole }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAdmin = userRole === "admin";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="bg-[#D9D9D9] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <Link
            href="/dashboard"
            className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-[#181D62] rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">NTU</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-[#181D62]">MSc</div>
                <div className="text-sm font-bold text-[#D7143F]">EEE</div>
              </div>
            </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-1"
            ref={dropdownRef}
          >
            {/* Calendar */}
            <Link
              href="/calendar"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                pathname === "/calendar"
                  ? "bg-white text-[#D7143F]"
                  : "text-[#181D62] hover:bg-white/50"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Calendar</span>
            </Link>

            {/* Dropdown items */}
            {DROPDOWN_NAV.map((item) => {
              const isActive = pathname.startsWith(item.href);
              const isOpen = openDropdown === item.name;
              const IconComponent = item.icon;

              return (
                <div key={item.name} className="relative">
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "bg-white text-[#D7143F]"
                        : "text-[#181D62] hover:bg-white/50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown menu */}
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 z-30">
                      {/* Link to parent page */}
                      <Link
                        href={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <span>All {item.name}</span>
                      </Link>
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className={`flex items-center space-x-3 px-4 py-2.5 text-sm transition-colors ${
                              childActive
                                ? "text-[#D7143F] bg-red-50 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <ChildIcon className="w-4 h-4 flex-shrink-0" />
                            <span>{child.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Contact Us */}
            <Link
              href="/contact"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                pathname === "/contact"
                  ? "bg-white text-[#D7143F]"
                  : "text-[#181D62] hover:bg-white/50"
              }`}
            >
              <ContactIcon />
              <span className="font-medium">Contact Us</span>
            </Link>

            {/* Admin link */}
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

          {/* Right: Profile */}
          <div className="flex items-center space-x-3">
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
          <nav className="px-4 py-4 space-y-1">
            {/* Calendar */}
            <Link
              href="/calendar"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === "/calendar"
                  ? "bg-white text-[#D7143F]"
                  : "text-gray-700 hover:bg-white/50"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Calendar</span>
            </Link>

            {/* Expandable items */}
            {DROPDOWN_NAV.map((item) => {
              const isExpanded = mobileExpanded === item.name;
              const isActive = pathname.startsWith(item.href);
              const IconComponent = item.icon;

              return (
                <div key={item.name}>
                  <button
                    onClick={() =>
                      setMobileExpanded(isExpanded ? null : item.name)
                    }
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-white text-[#D7143F]"
                        : "text-gray-700 hover:bg-white/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-300 pl-4">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                              pathname === child.href
                                ? "bg-white text-[#D7143F] font-medium"
                                : "text-gray-600 hover:bg-white/50"
                            }`}
                          >
                            <ChildIcon className="w-4 h-4" />
                            <span>{child.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Contact Us */}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === "/contact"
                  ? "bg-white text-[#D7143F]"
                  : "text-gray-700 hover:bg-white/50"
              }`}
            >
              <ContactIcon />
              <span className="font-medium">Contact Us</span>
            </Link>

            {/* Admin */}
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
