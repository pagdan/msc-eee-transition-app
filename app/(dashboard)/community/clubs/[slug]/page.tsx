"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Users,
  Mail,
  Globe,
  ArrowLeft,
  Calendar,
  MessageSquare,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

interface Club {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  imageUrl?: string;
  memberCount: number;
  contactEmail?: string;
  website?: string;
  createdAt: string;
}

export default function ClubDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [club, setClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (params.slug) {
      fetchClub(params.slug as string);
    }
  }, [params.slug]);

  const fetchClub = async (slug: string) => {
    try {
      const response = await fetch(`/api/clubs/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setClub(data);
      } else {
        router.push("/community/clubs");
      }
    } catch (error) {
      console.error("Error fetching club:", error);
      router.push("/community/clubs");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinLeave = () => {
    setIsJoined(!isJoined);
    // TODO: Implement actual join/leave API call
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#D7143F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!club) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#D7143F] to-[#181D62] text-white">
        {/* Background Image Overlay */}
        {club.imageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${club.imageUrl})` }}
          />
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <button
            onClick={() => router.push("/community/clubs")}
            className="flex items-center text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Clubs
          </button>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Club Logo/Image */}
            <div className="w-32 h-32 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
              {club.imageUrl ? (
                <img
                  src={club.imageUrl}
                  alt={club.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <Users className="w-16 h-16 text-white/60" />
              )}
            </div>

            {/* Club Info */}
            <div className="flex-1">
              <div className="mb-4">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                    club.category,
                  )}`}
                >
                  {club.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{club.name}</h1>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{club.memberCount} members</span>
                </div>
              </div>
            </div>

            {/* Join Button */}
            <div className="md:ml-auto">
              <button
                onClick={handleJoinLeave}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  isJoined
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-white text-[#D7143F] hover:bg-gray-100"
                }`}
              >
                {isJoined ? "Leave Club" : "Join Club"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About {club.name}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {club.description}
              </p>
            </div>

            {/* Activities (Placeholder) */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recent Activities
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#D7143F] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Upcoming Workshop
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Details about upcoming club activities will appear here.
                    </p>
                    <span className="text-xs text-gray-500 mt-2 block">
                      Coming soon
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-[#D7143F] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Latest Discussion
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Club discussions and announcements will be displayed here.
                    </p>
                    <span className="text-xs text-gray-500 mt-2 block">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                {club.contactEmail && (
                  <a
                    href={`mailto:${club.contactEmail}`}
                    className="flex items-center gap-3 text-gray-700 hover:text-[#D7143F] transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-sm font-medium">
                        {club.contactEmail}
                      </div>
                    </div>
                  </a>
                )}
                {club.website && (
                  <a
                    href={club.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-[#D7143F] transition-colors group"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Website</div>
                      <div className="text-sm font-medium">Visit Website</div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Total Members</div>
                  <div className="text-2xl font-bold text-[#D7143F]">
                    {club.memberCount}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Category</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {club.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
