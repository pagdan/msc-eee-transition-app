"use client";

import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Clock,
  Users,
  Wifi,
  Zap,
  Volume2,
  MonitorPlay,
  Coffee,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

const GOOGLE_MAPS_LINKS: Record<string, string> = {
  "Nanyang Business School @ Wee Cho Yaw Plaza":
    "https://maps.app.goo.gl/5KVKa1DkTwfo8ftd7",
  "The Hive @ Learning Hub South": "https://maps.app.goo.gl/t4Lx8HZDBm3JZiP46",
  "ADM Library @ School of ADM": "https://maps.app.goo.gl/Se5mdP4h5LxpC3kD8",
  "NIE Library @ NIE Block 1": "https://maps.app.goo.gl/UmZ3qwq6YWeikmzk9",
  "The Arc @ Learning Hub North": "https://maps.app.goo.gl/8H7KAnjRnhV9CGM8A",
  "Lee Wee Nam Library @ North Spine":
    "https://maps.app.goo.gl/f41VZxpSavDLNuio6",
};

interface StudySpot {
  id: string;
  name: string;
  location: string;
  capacity: string;
  amenities: string[];
  openingHours: string | null;
  imageUrl: string | null;
  isAvailable: boolean;
}

const CAPACITY_OPTIONS = ["All", "Small", "Medium", "Large"];

const AMENITY_OPTIONS = [
  "All",
  "WiFi",
  "Power Outlets",
  "Quiet Zone",
  "Group Study",
  "Café",
  "Screens",
];

const LOCATION_OPTIONS = [
  "All",
  "North Spine",
  "South Spine",
  "Learning Hub South",
  "Learning Hub North",
  "School of ADM",
  "NIE Block 1",
  "Wee Cho Yaw Plaza",
];

// Amenity icon mapping
const AMENITY_ICONS: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-3 h-3" />,
  "Power Outlets": <Zap className="w-3 h-3" />,
  "Quiet Zone": <Volume2 className="w-3 h-3" />,
  "Group Study": <Users className="w-3 h-3" />,
  Café: <Coffee className="w-3 h-3" />,
  Screens: <MonitorPlay className="w-3 h-3" />,
};

const CAPACITY_LABELS: Record<string, { label: string; color: string }> = {
  small: { label: "Small", color: "bg-blue-100 text-blue-700" },
  medium: { label: "Medium", color: "bg-amber-100 text-amber-700" },
  large: { label: "Large", color: "bg-green-100 text-green-700" },
};

export default function StudySpotsPage() {
  const [spots, setSpots] = useState<StudySpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("All");
  const [amenityFilter, setAmenityFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  useEffect(() => {
    fetch("/api/student-life/study-spots")
      .then((res) => res.json())
      .then((data) => {
        setSpots(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = spots.filter((spot) => {
    const matchesSearch =
      search === "" ||
      spot.name.toLowerCase().includes(search.toLowerCase()) ||
      spot.location.toLowerCase().includes(search.toLowerCase());

    const matchesCapacity =
      capacityFilter === "All" ||
      spot.capacity.toLowerCase() === capacityFilter.toLowerCase();

    const matchesAmenity =
      amenityFilter === "All" || spot.amenities.includes(amenityFilter);

    const matchesLocation =
      locationFilter === "All" || spot.location === locationFilter;

    return (
      matchesSearch && matchesCapacity && matchesAmenity && matchesLocation
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Spots</h1>
          <p className="text-gray-600">
            Find the perfect place to study across NTU campus, curated for MSc
            EEE students.
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

          {/* Capacity */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs font-medium text-gray-500 mr-1">
              Capacity:
            </span>
            {CAPACITY_OPTIONS.map((c) => (
              <button
                key={c}
                onClick={() => setCapacityFilter(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  capacityFilter === c
                    ? "bg-[#D7143F] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs font-medium text-gray-500 mr-1">
              Amenities:
            </span>
            {AMENITY_OPTIONS.map((a) => (
              <button
                key={a}
                onClick={() => setAmenityFilter(a)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  amenityFilter === a
                    ? "bg-[#D7143F] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {a}
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

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-4">
          {loading
            ? "Loading..."
            : `${filtered.length} spot${filtered.length !== 1 ? "s" : ""} found`}
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
            {filtered.map((spot) => (
              <StudySpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

function StudySpotCard({ spot }: { spot: StudySpot }) {
  const mapsUrl = GOOGLE_MAPS_LINKS[spot.name];
  const capacityInfo = CAPACITY_LABELS[spot.capacity.toLowerCase()];

  // Split amenities into "tagged" (known icons) and "other"
  const knownAmenities = spot.amenities.filter((a) => AMENITY_ICONS[a]);
  const otherAmenities = spot.amenities.filter((a) => !AMENITY_ICONS[a]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
      {/* Image */}
      <div className="h-40 bg-gray-100 overflow-hidden relative">
        {spot.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={spot.imageUrl}
            alt={spot.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <BookOpen className="w-10 h-10 text-gray-300" />
          </div>
        )}

        {/* Capacity badge */}
        {capacityInfo && (
          <div className="absolute top-2 left-2">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${capacityInfo.color}`}
            >
              {capacityInfo.label}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
          {spot.name}
        </h3>

        <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span>{spot.location}</span>
        </div>

        {/* Known amenity icon pills */}
        {knownAmenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {knownAmenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full"
              >
                {AMENITY_ICONS[amenity]}
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* Other amenities as plain text pills */}
        {otherAmenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {otherAmenities.map((amenity) => (
              <span
                key={amenity}
                className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-start gap-1 text-gray-500 text-xs mb-3 mt-auto pt-2">
          <Clock className="w-3 h-3 flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            {spot.openingHours ?? "Hours not available"}
          </span>
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
