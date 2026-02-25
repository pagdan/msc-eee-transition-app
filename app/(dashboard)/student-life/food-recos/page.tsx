"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Clock, Leaf, ExternalLink } from "lucide-react";
import Footer from "@/components/layout/Footer";

// Update these placeholder links with the correct Google Maps URLs
const GOOGLE_MAPS_LINKS: Record<string, string> = {
  "McDonald's @ North Spine Plaza": "https://maps.app.goo.gl/97ifvFYQahqUneE98",
  "Subway @ North Spine Plaza": "https://maps.app.goo.gl/peqUx1gVPehHtB2y6",
  "Starbucks @ North Spine Plaza": "https://maps.app.goo.gl/GeRG2HJbi9GsBNaK6",
  "Popeyes @ North Spine Plaza": "https://maps.app.goo.gl/fiT3xfWuoYA4H9VQ6",
  "Pasta Express @ North Spine Plaza":
    "https://maps.app.goo.gl/P1m8iuruUoxZRi9T9",
  "Paik's Bibim @ North Spine Plaza":
    "https://maps.app.goo.gl/Pztm5m9ALmFk4p2s8",
  "South Spine Food Court": "https://maps.app.goo.gl/TGktZDigbUJnjQ2o8",
  "The Crowded Bowl @ North Spine Plaza":
    "https://maps.app.goo.gl/RVdDLyyeAkB2FRjEA",
  "Connect 71 Cafe @ NTU Innovation Centre":
    "https://maps.app.goo.gl/NMg6wRWDMFdbYENGA",
  "Domino's Pizza @ The Arc": "https://maps.app.goo.gl/FaUujPzsmUsTwgtt7",
  "Encik Tan @ North Spine Plaza": "https://maps.app.goo.gl/LdFF4Djz1wFMJ7Ch6",
  "North Spine Food Court": "https://maps.app.goo.gl/FN29opWGUiNkFGQY7",
};

interface DiningLocation {
  id: string;
  name: string;
  location: string;
  cuisine: string[];
  openingHours: string;
  imageUrl: string | null;
  isOpen: boolean;
}

const CUISINE_OPTIONS = [
  "All",
  "Western",
  "Korean",
  "Italian",
  "American",
  "Malay",
  "Chinese",
  "Café",
  "Pizza",
];

const DIETARY_OPTIONS = ["All", "Halal", "Vegetarian"];

const LOCATION_OPTIONS = [
  "All",
  "North Spine Plaza",
  "South Spine",
  "The Arc",
  "NTU Innovation Centre",
];

export default function FoodRecosPage() {
  const [dining, setDining] = useState<DiningLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [dietaryFilter, setDietaryFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  useEffect(() => {
    fetch("/api/student-life/dining")
      .then((res) => res.json())
      .then((data) => {
        setDining(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = dining.filter((place) => {
    const matchesSearch =
      search === "" ||
      place.name.toLowerCase().includes(search.toLowerCase()) ||
      place.location.toLowerCase().includes(search.toLowerCase());

    const matchesCuisine =
      cuisineFilter === "All" || place.cuisine.includes(cuisineFilter);

    const matchesDietary =
      dietaryFilter === "All" || place.cuisine.includes(dietaryFilter);

    const matchesLocation =
      locationFilter === "All" || place.location === locationFilter;

    return matchesSearch && matchesCuisine && matchesDietary && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Food Recommendations
          </h1>
          <p className="text-gray-600">
            Discover dining options across NTU campus, curated for MSc EEE
            students.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F] focus:border-transparent"
            />
          </div>

          {/* Filter Pills Row */}
          <div className="flex flex-wrap gap-4">
            {/* Cuisine */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-medium text-gray-500 mr-1">
                Cuisine:
              </span>
              {CUISINE_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCuisineFilter(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    cuisineFilter === c
                      ? "bg-[#D7143F] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Dietary */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-medium text-gray-500 mr-1">
                Dietary:
              </span>
              {DIETARY_OPTIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDietaryFilter(d)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    dietaryFilter === d
                      ? "bg-[#D7143F] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Location */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-medium text-gray-500 mr-1">
                Location:
              </span>
              {LOCATION_OPTIONS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLocationFilter(l)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    locationFilter === l
                      ? "bg-[#D7143F] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          {loading
            ? "Loading..."
            : `${filtered.length} place${filtered.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse"
              >
                <div className="h-40 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm mt-1">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((place) => (
              <DiningCard key={place.id} place={place} />
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

function DiningCard({ place }: { place: DiningLocation }) {
  const mapsUrl = GOOGLE_MAPS_LINKS[place.name];
  const isHalal = place.cuisine.includes("Halal");
  const isVegetarian =
    place.cuisine.includes("Vegetarian") ||
    place.cuisine.includes("Vegetarian only");
  const isVegetarianOnly = place.cuisine.includes("Vegetarian only");

  // Filter out dietary tags for display as cuisine tags
  const cuisineTags = place.cuisine.filter(
    (c) => c !== "Halal" && c !== "Vegetarian" && c !== "Vegetarian only",
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="h-40 bg-gray-100 overflow-hidden relative">
        {place.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={place.imageUrl}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-3xl">🍽️</span>
          </div>
        )}

        {/* Dietary badges overlay */}
        <div className="absolute top-2 left-2 flex gap-1">
          {isHalal && (
            <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              HALAL
            </span>
          )}
          {isVegetarianOnly ? (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Leaf className="w-2.5 h-2.5" />
              VEG ONLY
            </span>
          ) : isVegetarian ? (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <Leaf className="w-2.5 h-2.5" />
              VEG
            </span>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
          {place.name}
        </h3>

        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span>{place.location}</span>
        </div>

        {/* Cuisine tags */}
        {cuisineTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {cuisineTags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-start gap-1 text-gray-500 text-xs mb-3">
          <Clock className="w-3 h-3 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">{place.openingHours}</span>
        </div>

        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 w-full justify-center px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-[#D7143F] hover:text-[#D7143F] transition-colors"
          >
            <MapPin className="w-3 h-3" />
            View on Google Maps
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
