"use client";

import { useEffect, useState } from "react";
import { Users, Mail, Globe, Search, Filter } from "lucide-react";
import Link from "next/link";
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
}

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [filteredClubs, setFilteredClubs] = useState<Club[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ["All", "Academic", "Technical", "Professional", "Social"];

  useEffect(() => {
    console.log("Component mounted, fetching clubs...");
    fetchClubs();
  }, []);

  useEffect(() => {
    console.log(
      "Filtering clubs. Category:",
      selectedCategory,
      "Query:",
      searchQuery,
    );
    filterClubs();
  }, [selectedCategory, searchQuery, clubs]);

  const fetchClubs = async () => {
    try {
      console.log("Starting fetch from /api/clubs");
      const response = await fetch("/api/clubs");
      console.log("Response received:", response.status, response.ok);

      if (response.ok) {
        const data = await response.json();
        console.log("Data received:", data.length, "clubs");
        console.log("First club:", data[0]);
        setClubs(data);
        setFilteredClubs(data);
        setError(null);
      } else {
        const errorText = await response.text();
        console.error("API error:", response.status, errorText);
        setError(`API Error: ${response.status}`);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      console.log("Setting loading to false");
      setLoading(false);
    }
  };

  const filterClubs = () => {
    let filtered = clubs;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((club) => club.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (club) =>
          club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          club.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    console.log("Filtered clubs count:", filtered.length);
    setFilteredClubs(filtered);
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

  console.log(
    "Render - Loading:",
    loading,
    "Error:",
    error,
    "Clubs:",
    clubs.length,
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D7143F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading clubs...</p>
          <p className="text-sm text-gray-400 mt-2">
            Check browser console for details
          </p>
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
            Error Loading Clubs
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
          <h1 className="text-4xl font-bold mb-4">EEE Student Clubs</h1>
          <p className="text-xl text-white/90">
            Discover and join clubs that match your interests. Connect with
            peers, develop new skills, and make the most of your MSc journey.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search clubs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7143F] focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="text-gray-500 w-5 h-5 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? "bg-[#D7143F] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredClubs.length} of {clubs.length} clubs
          </div>
        </div>
      </div>

      {/* Clubs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredClubs.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No clubs found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <div
                key={club.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Club Image */}
                <div className="h-48 bg-gradient-to-br from-[#D7143F] to-[#181D62] flex items-center justify-center">
                  {club.imageUrl ? (
                    <img
                      src={club.imageUrl}
                      alt={club.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users className="w-20 h-20 text-white/50" />
                  )}
                </div>

                {/* Club Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                        club.category,
                      )}`}
                    >
                      {club.category}
                    </span>
                  </div>

                  {/* Club Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {club.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                    {club.description}
                  </p>

                  {/* Stats and Actions */}
                  <div className="border-t pt-4 mt-auto">
                    {/* Member Count */}
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{club.memberCount} members</span>
                    </div>

                    {/* Contact Information */}
                    <div className="flex flex-col gap-2 mb-4">
                      {club.contactEmail && (
                        <a
                          href={`mailto:${club.contactEmail}`}
                          className="flex items-center text-sm text-gray-600 hover:text-[#D7143F] transition-colors"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          {club.contactEmail}
                        </a>
                      )}
                      {club.website && (
                        <a
                          href={club.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-gray-600 hover:text-[#D7143F] transition-colors"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Visit Website
                        </a>
                      )}
                    </div>

                    {/* Learn More Button - Links to Club Detail Page */}
                    <Link
                      href={`/community/clubs/${club.slug}`}
                      className="w-full bg-[#D7143F] text-white py-3 rounded-lg font-semibold hover:bg-[#B01030] transition-colors flex items-center justify-center gap-2 group"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
