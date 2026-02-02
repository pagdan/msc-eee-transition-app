"use client";

import { useEffect, useState } from "react";
import { Instagram, Facebook, Linkedin, Share2 } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

interface Club {
  id: string;
  name: string;
  slug: string;
  category: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
}

export default function SocialMediaPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch("/api/clubs");

      if (response.ok) {
        const data = await response.json();
        // Filter clubs that have at least one social media link
        const clubsWithSocial = data.filter(
          (club: Club) => club.instagram || club.facebook || club.linkedin,
        );
        setClubs(clubsWithSocial);
        setError(null);
      } else {
        setError(`API Error: ${response.status}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const getSocialIcon = (platform: string) => {
    const iconClass = "w-5 h-5";
    switch (platform) {
      case "instagram":
        return <Instagram className={iconClass} />;
      case "facebook":
        return <Facebook className={iconClass} />;
      case "linkedin":
        return <Linkedin className={iconClass} />;
      default:
        return null;
    }
  };

  const getSocialColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600";
      case "facebook":
        return "bg-blue-600 hover:bg-blue-700";
      case "linkedin":
        return "bg-blue-700 hover:bg-blue-800";
      default:
        return "bg-gray-600 hover:bg-gray-700";
    }
  };

  const getSocialName = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "Instagram";
      case "facebook":
        return "Facebook";
      case "linkedin":
        return "LinkedIn";
      default:
        return platform;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-blue-100 text-blue-800";
      case "Technical":
        return "bg-purple-100 text-purple-800";
      case "Professional":
        return "bg-green-100 text-green-800";
      case "Social":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D7143F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading social media links...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Content
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchClubs();
            }}
            className="px-6 py-3 bg-[#D7143F] text-white rounded-lg hover:bg-[#B01030]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#D7143F] to-[#B01030] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <Share2 className="w-10 h-10" />
            <h1 className="text-4xl font-bold">Social Media Hub</h1>
          </div>
          <p className="text-xl text-white/90">
            Connect with EEE clubs on social media. Follow, engage, and stay
            updated with club activities and events.
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#D7143F]">
                {clubs.length}
              </div>
              <div className="text-sm text-gray-600">Clubs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">
                {clubs.filter((c) => c.instagram).length}
              </div>
              <div className="text-sm text-gray-600">On Instagram</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {clubs.filter((c) => c.facebook).length}
              </div>
              <div className="text-sm text-gray-600">On Facebook</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">
                {clubs.filter((c) => c.linkedin).length}
              </div>
              <div className="text-sm text-gray-600">On LinkedIn</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clubs Social Media Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {clubs.length === 0 ? (
          <div className="text-center py-20">
            <Share2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No social media links available
            </h3>
            <p className="text-gray-500">
              Social media links will be added soon
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {clubs.map((club) => {
              const socialLinks = [
                { platform: "instagram", url: club.instagram },
                { platform: "facebook", url: club.facebook },
                { platform: "linkedin", url: club.linkedin },
              ].filter((link) => link.url);

              return (
                <div
                  key={club.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                      {/* Club Info */}
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {club.name}
                          </h3>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                              club.category,
                            )}`}
                          >
                            {club.category}
                          </span>
                        </div>
                        <Link
                          href={`/community/clubs/${club.slug}`}
                          className="text-sm text-[#D7143F] hover:text-[#B01030] font-medium"
                        >
                          View Club Details →
                        </Link>
                      </div>

                      {/* Social Links Count */}
                      <div className="text-sm text-gray-500">
                        {socialLinks.length} platform
                        {socialLinks.length !== 1 ? "s" : ""}
                      </div>
                    </div>

                    {/* Social Media Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {socialLinks.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${getSocialColor(
                            link.platform,
                          )} text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 transform`}
                        >
                          {getSocialIcon(link.platform)}
                          <span className="text-sm">
                            {getSocialName(link.platform)}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick Guide Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Stay Connected
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl mb-3">👥</div>
              <h3 className="font-semibold text-gray-900 mb-2">Follow</h3>
              <p className="text-sm text-gray-600">
                Follow clubs on your preferred platforms to get updates in your
                feed
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">🔔</div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Notified</h3>
              <p className="text-sm text-gray-600">
                Turn on notifications to never miss important announcements and
                events
              </p>
            </div>
            <div>
              <div className="text-4xl mb-3">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2">Engage</h3>
              <p className="text-sm text-gray-600">
                Like, comment, and share posts to show your support and build
                community
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
