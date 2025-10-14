"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Users, MapPin, Heart } from "lucide-react";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if logged in
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Show loading while checking auth
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">NTU</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              MSc EEE Transition Portal
            </h1>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your MSc EEE Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive platform for navigating academic life, building
            connections, and thriving at Nanyang Technological University
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <FeatureCard
            icon={<Calendar className="w-8 h-8 text-blue-600" />}
            title="Calendar"
            description="Sync your academic timetable and never miss important events with Microsoft Outlook integration"
            href="/login"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-green-600" />}
            title="Community"
            description="Join clubs, participate in forums, and connect with fellow MSc EEE students"
            href="/login"
          />
          <FeatureCard
            icon={<MapPin className="w-8 h-8 text-orange-600" />}
            title="Student Life"
            description="Discover dining spots, campus bus routes, and the best study locations"
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
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Sign in with your NTU account to access personalized features and
            connect with your cohort
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>
            &copy; 2025 MSc EEE Transition Portal. Nanyang Technological
            University.
          </p>
        </div>
      </footer>
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
        className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
      >
        Learn more →
      </Link>
    </div>
  );
}
