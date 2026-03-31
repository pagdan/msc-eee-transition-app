"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Users, MapPin, Heart } from "lucide-react";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-[#D9D9D9] shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
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

            <Link
              href="/login"
              className="px-4 py-2 bg-[#D7143F] text-white rounded-lg hover:bg-[#B81136] transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section with background image */}
        <div className="relative w-full h-[500px] mb-16 rounded-2xl overflow-hidden shadow-lg">
          {/* Background image — swap src for any preferred NTU campus photo */}
          <img
            src="images/landingpage.jpg"
            alt="NTU Campus"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Navy overlay for readability */}
          <div className="absolute inset-0 bg-[#181D62]/70" />
          {/* Centred text */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow">
              Welcome to Your MSc EEE Journey
            </h2>
            <p className="text-xl text-white/85 max-w-3xl mx-auto drop-shadow">
              Your comprehensive platform for navigating academic life, building
              connections, and thriving at Nanyang Technological University
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Calendar className="w-8 h-8 text-blue-600" />}
            title="Calendar"
            description="Plan your academic timetable and never miss important events"
            href="/login"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-green-600" />}
            title="Community"
            description="Browse clubs, follow our social media, and connect with fellow MSc EEE students"
            href="/login"
          />
          <FeatureCard
            icon={<MapPin className="w-8 h-8 text-orange-600" />}
            title="Student Life"
            description="Discover dining spots and the best study locations on campus."
            href="/login"
          />
          <FeatureCard
            icon={<Heart className="w-8 h-8 text-red-600" />}
            title="Wellbeing"
            description="Access mental health resources, counseling services, and wellness programs"
            href="/login"
          />
        </div>

        {/* CTA Section */}
        <div className="bg-[#181D62] rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Sign in with your NTU account to access personalized features and
            connect with your cohort
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-[#D7143F] text-white font-semibold rounded-lg hover:bg-[#B81136] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        href={href}
        className="text-[#D7143F] font-medium hover:text-[#B81136] transition-colors"
      >
        Learn more →
      </Link>
    </div>
  );
}
