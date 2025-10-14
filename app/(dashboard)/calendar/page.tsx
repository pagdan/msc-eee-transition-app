"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  Calendar as CalendarIcon,
  RefreshCw,
  Plus,
  Filter,
} from "lucide-react";
import { format } from "date-fns";

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  category?: string;
  isAllDay: boolean;
}

export default function CalendarPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { value: "all", label: "All Events", color: "#D7143F" },
    { value: "academic", label: "Academic", color: "#181D62" },
    { value: "orientation", label: "Orientation", color: "#7B68EE" },
    { value: "social", label: "Social", color: "#4CAF50" },
    { value: "deadline", label: "Deadlines", color: "#FF6B6B" },
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async (sync = false) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (sync) params.append("syncOutlook", "true");

      const response = await fetch(`/api/calendar/events?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    await fetchEvents(true);
  };

  const filteredEvents =
    selectedCategory === "all"
      ? events
      : events.filter((event) => event.category === selectedCategory);

  const upcomingEvents = filteredEvents.filter(
    (event) => new Date(event.startTime) >= new Date(),
  );
  const pastEvents = filteredEvents.filter(
    (event) => new Date(event.startTime) < new Date(),
  );

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#181D62]">Calendar</h1>
            <p className="text-gray-600 mt-1">
              Manage your academic schedule and events
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center space-x-2 px-4 py-2 bg-[#181D62] text-white rounded-lg hover:bg-[#181D62]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw
                className={`w-5 h-5 ${syncing ? "animate-spin" : ""}`}
              />
              <span>{syncing ? "Syncing..." : "Sync with Outlook"}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#D7143F] text-white rounded-lg hover:bg-[#D7143F]/90 transition-all">
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Event</span>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-[#D9D9D9] rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">
              Filter by Category
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.value
                    ? "bg-white text-[#D7143F] shadow-sm"
                    : "bg-white/50 text-gray-700 hover:bg-white"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#D7143F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          </div>
        )}

        {/* Events List */}
        {!loading && (
          <div className="space-y-6">
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[#181D62] mb-4">
                  Upcoming Events ({upcomingEvents.length})
                </h2>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-500 mb-4">
                  Past Events ({pastEvents.length})
                </h2>
                <div className="space-y-3 opacity-60">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} isPast />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No events found
                </h3>
                <p className="text-gray-600 mb-4">
                  {selectedCategory === "all"
                    ? "Get started by syncing with Outlook or adding a custom event"
                    : "No events in this category"}
                </p>
                <button
                  onClick={handleSync}
                  className="px-6 py-2 bg-[#D7143F] text-white rounded-lg hover:bg-[#D7143F]/90 transition-colors"
                >
                  Sync with Outlook
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({
  event,
  isPast = false,
}: {
  event: CalendarEvent;
  isPast?: boolean;
}) {
  const categoryColors: Record<string, string> = {
    academic: "bg-[#181D62] text-white",
    orientation: "bg-purple-100 text-purple-800",
    social: "bg-green-100 text-green-800",
    deadline: "bg-red-100 text-red-800",
  };

  const categoryColor =
    categoryColors[event.category || ""] || "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white rounded-lg border-2 border-[#D9D9D9] p-4 hover:shadow-md hover:border-[#D7143F] transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-[#181D62]">
              {event.title}
            </h3>
            {event.category && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColor}`}
              >
                {event.category}
              </span>
            )}
          </div>
          {event.description && (
            <p className="text-gray-600 text-sm mb-2">{event.description}</p>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <CalendarIcon className="w-4 h-4" />
              <span>
                {event.isAllDay
                  ? format(new Date(event.startTime), "MMM d, yyyy")
                  : `${format(
                      new Date(event.startTime),
                      "MMM d, yyyy • h:mm a",
                    )} - ${format(new Date(event.endTime), "h:mm a")}`}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center space-x-1">
                <span>📍</span>
                <span>{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
