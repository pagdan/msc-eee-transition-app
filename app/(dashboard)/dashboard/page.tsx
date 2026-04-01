"use client";

import Link from "next/link";
import {
  Calendar,
  Users,
  GraduationCap,
  Heart,
  Mail,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import Footer from "@/components/layout/Footer";

const resources = [
  {
    icon: <Calendar className="w-16 h-16 text-white" />,
    title: "Calendar",
    description:
      "Manage your academic schedule and sync with Outlook calendar. Never miss an important deadline or event.",
    href: "/calendar",
    gradient: "from-[#D7143F] to-[#B01030]",
  },
  {
    icon: <Users className="w-16 h-16 text-white" />,
    title: "Community",
    description:
      "Join clubs, participate in forums, and connect with fellow MSc EEE students. Build your network.",
    href: "/community",
    gradient: "from-[#181D62] to-[#0F1142]",
  },
  {
    icon: <GraduationCap className="w-16 h-16 text-white" />,
    title: "Student Life",
    description:
      "Discover dining spots, campus bus routes, and the best study locations. Navigate campus with ease.",
    href: "/student-life",
    gradient: "from-purple-600 to-purple-800",
  },
  {
    icon: <Heart className="w-16 h-16 text-white" />,
    title: "Wellbeing",
    description:
      "Access mental health resources, counseling services, and wellness programs. Take care of yourself.",
    href: "/wellbeing",
    gradient: "from-pink-600 to-pink-800",
  },
  {
    icon: <Mail className="w-16 h-16 text-white" />,
    title: "Contact Us",
    description:
      "Get in touch with support, administration, and faculty. We're here to help you succeed.",
    href: "/contact",
    gradient: "from-green-600 to-green-800",
  },
];

interface Event {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  imageUrl?: string;
}

export default function HomePage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const swiperRef = useRef<SwiperType>();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      const [upcomingRes, pastRes] = await Promise.all([
        fetch("/api/events?upcoming=true"),
        fetch("/api/events?limit=12"),
      ]);
      const upcomingData = await upcomingRes.json();
      const pastData = await pastRes.json();

      if (upcomingData.success) setUpcomingEvents(upcomingData.data);
      if (pastData.success) {
        const upcomingIds = new Set(
          upcomingData.data?.map((e: Event) => e.id) ?? [],
        );
        setPastEvents(
          pastData.data.filter((e: Event) => !upcomingIds.has(e.id)),
        );
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoadingEvents(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative text-white overflow-hidden"
        style={{ minHeight: "480px" }}
      >
        <img
          src="/images/welcome.jpg"
          alt="MSc EEE Students at NTU"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#181D62]/85 via-[#181D62]/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-end">
          <div className="max-w-md text-right">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
              Welcome MSc EEE Freshmen!
            </h1>
            <p className="text-xl text-white/90 mb-8 drop-shadow">
              Your journey at Nanyang Technological University starts here!
            </p>
            <Link
              href="/calendar"
              className="inline-block bg-white text-[#D7143F] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#181D62] mb-4">
            Resources
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore the tools and services designed to support your academic
            journey
          </p>
          <div className="relative">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              grabCursor={true}
              slidesPerView={1}
              spaceBetween={0}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true, dynamicBullets: false }}
              loop={true}
              className="resources-swiper"
            >
              {resources.map((resource, index) => (
                <SwiperSlide key={index}>
                  <ResourceCard {...resource} />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-[#D7143F] hover:bg-[#D7143F] hover:text-white transition-all transform hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center text-[#D7143F] hover:bg-[#D7143F] hover:text-white transition-all transform hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loadingEvents ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-[#D7143F] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div className="mb-16">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#181D62] mb-2">
                      Upcoming Events
                    </h2>
                    <p className="text-gray-600">
                      Stay connected with the latest happenings in the MSc EEE
                      community
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {upcomingEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        isPast={false}
                        onAdded={fetchEvents}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-[#181D62] mb-2">
                      {upcomingEvents.length > 0
                        ? "Past Events"
                        : "Recent Events"}
                    </h2>
                    <p className="text-gray-600">
                      A look back at recent MSc EEE community events
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pastEvents.map((event) => (
                      <EventCard key={event.id} event={event} isPast={true} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .resources-swiper {
          width: 100%;
          height: 600px;
          padding: 40px 0 80px 0;
        }
        .resources-swiper .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
        }
        .resources-swiper .swiper-pagination {
          bottom: 10px !important;
        }
        .resources-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #d7143f !important;
          opacity: 0.3;
          transition: all 0.3s ease;
        }
        .resources-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 30px;
          border-radius: 6px;
        }
        @media (max-width: 640px) {
          .resources-swiper {
            height: 550px;
            padding: 30px 0 60px 0;
          }
        }
      `}</style>
    </div>
  );
}

function ResourceCard({
  icon,
  title,
  description,
  href,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  gradient: string;
}) {
  return (
    <Link href={href} className="group block w-full max-w-4xl mx-auto">
      <div
        className={`bg-gradient-to-br ${gradient} rounded-3xl p-8 md:p-12 text-center hover:scale-[1.02] transition-transform duration-300 hover:shadow-2xl min-h-[380px] flex flex-col justify-center`}
      >
        <div className="w-28 h-28 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all group-hover:scale-110">
          {icon}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h3>
        <p className="text-white/95 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="mt-6 inline-flex items-center justify-center mx-auto px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold group-hover:bg-white/30 transition-all">
          Explore →
        </div>
      </div>
    </Link>
  );
}

function EventCard({
  event,
  isPast = false,
  onAdded,
}: {
  event: Event;
  isPast?: boolean;
  onAdded?: () => void;
}) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCalendar = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (adding || added) return;
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
        onAdded?.();
        setTimeout(() => setAdded(false), 3000);
      } else {
        alert("Failed to add event to calendar. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
    setAdding(false);
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      <div className="relative h-48 bg-gradient-to-br from-[#D7143F] to-[#181D62] overflow-hidden">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CalendarIcon className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        <div className="absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-lg">
          <div className="text-[#D7143F] font-bold text-lg">
            {new Date(event.date).getDate()}
          </div>
          <div className="text-gray-600 text-xs font-medium">
            {new Date(event.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-[#181D62] mb-2 line-clamp-2 group-hover:text-[#D7143F] transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {event.subtitle}
        </p>
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/events/${event.id}`}
            className="flex-1 px-4 py-2 bg-[#D7143F] text-white rounded-lg hover:bg-[#B01030] transition-colors text-center text-sm font-medium"
          >
            Learn More
          </Link>
          {!isPast && (
            <button
              onClick={handleAddToCalendar}
              disabled={adding || added}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                added
                  ? "bg-green-100 text-green-600"
                  : "bg-[#D9D9D9] text-[#181D62] hover:bg-[#181D62] hover:text-white"
              }`}
              title={added ? "Added to calendar!" : "Add to calendar"}
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
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
