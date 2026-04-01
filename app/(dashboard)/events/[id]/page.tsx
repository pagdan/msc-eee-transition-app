"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, ArrowLeft, Plus } from "lucide-react";
import { format } from "date-fns";
import Footer from "@/components/layout/Footer";

interface Event {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  imageUrl?: string;
  content?: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [params.id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setEvent(data.data);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCalendar = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (adding || added || !event) return;
    setAdding(true);

    const eventDate = new Date(event.date);
    const startTime = new Date(eventDate);
    startTime.setHours(9, 0, 0, 0);
    const endTime = new Date(eventDate);
    endTime.setHours(10, 0, 0, 0);

    try {
      const res = await fetch("/api/calendar/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: event.title,
          description: event.subtitle,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          isAllDay: false,
          category: "social",
        }),
      });

      if (res.ok) {
        setAdded(true);
        setTimeout(() => setAdded(false), 3000);
      } else {
        alert("Failed to add event to calendar. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }

    setAdding(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#D7143F] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Event Not Found
          </h2>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-[#D7143F] hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isPast = new Date(event.date) < new Date();

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-[#D9D9D9] py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-700 hover:text-[#D7143F] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Event Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Event Image */}
        {event.imageUrl ? (
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="relative h-96 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-[#D7143F] to-[#181D62] flex items-center justify-center">
            <Calendar className="w-32 h-32 text-white opacity-30" />
          </div>
        )}

        {/* Event Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#D7143F]" />
              <span>{format(new Date(event.date), "MMMM d, yyyy")}</span>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-[#181D62] mb-4">
            {event.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{event.subtitle}</p>

          {!isPast && (
            <button
              onClick={handleAddToCalendar}
              disabled={adding || added}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-[#D7143F] text-white hover:bg-[#B01030]"
              }`}
            >
              {adding ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : added ? (
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <Plus className="w-5 h-5" />
              )}
              <span>
                {adding
                  ? "Adding..."
                  : added
                    ? "Added to Calendar!"
                    : "Add to Calendar"}
              </span>
            </button>
          )}
        </div>

        {/* Event Description */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-[#181D62] mb-4">
              About This Event
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {event.content || event.subtitle}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
