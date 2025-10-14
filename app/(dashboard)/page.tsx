"use client";

import Link from "next/link";
import { Calendar, Users, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#181D62] to-[#D7143F] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Welcome MSc EEE Freshmen!
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Your journey at Nanyang Technological University starts here
            </p>
            <button className="bg-white text-[#D7143F] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#181D62] mb-12">
            Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <ResourceCard
              icon={<Calendar className="w-12 h-12 text-white" />}
              title="Calendar"
              href="/calendar"
              delay={0}
              isVisible={isVisible}
            />
            <ResourceCard
              icon={<Users className="w-12 h-12 text-white" />}
              title="Community"
              href="/community"
              delay={100}
              isVisible={isVisible}
            />
            <ResourceCard
              icon={<GraduationCap className="w-12 h-12 text-white" />}
              title="Student Life"
              href="/student-life"
              delay={200}
              isVisible={isVisible}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#181D62] text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                © 2025 Nanyang Technological University
              </p>
              <p className="text-sm text-white/70">
                School of Electrical & Electronic Engineering
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/ntusg"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D7143F] transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/ntusg"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D7143F] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/school/ntu-singapore"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D7143F] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ResourceCard({
  icon,
  title,
  href,
  delay,
  isVisible,
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group transform transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-gradient-to-br from-[#D7143F] to-[#B01030] rounded-3xl p-8 text-center hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
        <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <div className="w-16 h-1 bg-white mx-auto rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </Link>
  );
}
