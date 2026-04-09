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
  Bus,
  ForkKnifeCrossed,
  MousePointerSquareDashed,
  Mouse,
  ScanFace,
  ScanFaceIcon,
  ArmchairIcon,
  LucideHeart,
  LucideHelpingHand,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import Footer from "@/components/layout/Footer";

const resources = [
  {
    icon: <ScanFaceIcon className="w-16 h-16 text-white" />,
    title: "Emotional Wellbeing",
    description:
      "Explore resources and support services for emotional wellbeing on campus.",
    href: "/wellbeing/emotional",
    gradient: "from-[#F5DA27] to-[#B01030]",
  },
  {
    icon: <LucideHeart className="w-16 h-16 text-white" />,
    title: "Physical Wellbeing",
    description: "Discover how to maintain a healthy lifestyle on campus.",
    href: "/wellbeing/physical",
    gradient: "from-[#F52727] to-[#0F1142]",
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
  const [isVisible, setIsVisible] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    setIsVisible(true);
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      const response = await fetch("/api/events?limit=12");
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
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
        {/* Background Image */}
        <img
          src="/images/thehive.jpg"
          alt="The Hive at NTU"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#181D62]/85 via-[#181D62]/40 to-transparent" />

        {/* Content — top-right */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-end">
          <div className="max-w-md text-right">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">
              Wellbeing
            </h1>
            <p className="text-xl text-white/90 mb-8 drop-shadow">
              Here at NTU, we're committed to your wellbeing. That's why we have
              a range of resources to help you stay healthy and happy.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section with Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#181D62] mb-4">
            Resources
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Here are some resources to keep your wellbeing in tip-top shape.
          </p>

          {/* Carousel Container */}
          <div className="relative">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              grabCursor={true}
              slidesPerView={1}
              spaceBetween={0}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: false,
              }}
              loop={true}
              className="resources-swiper"
            >
              {resources.map((resource, index) => (
                <SwiperSlide key={index}>
                  <ResourceCard {...resource} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
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

      {/* Footer */}
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

function EventCard({ event }: { event: Event }) {
  const handleAddToCalendar = async (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Implement add to calendar functionality
    alert("Add to calendar functionality will be implemented");
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      {/* Event Image */}
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
        {/* Date Badge */}
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

      {/* Event Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-[#181D62] mb-2 line-clamp-2 group-hover:text-[#D7143F] transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
          {event.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/events/${event.id}`}
            className="flex-1 px-4 py-2 bg-[#D7143F] text-white rounded-lg hover:bg-[#B01030] transition-colors text-center text-sm font-medium"
          >
            Learn More
          </Link>
          <button
            onClick={handleAddToCalendar}
            className="px-4 py-2 bg-[#D9D9D9] text-[#181D62] rounded-lg hover:bg-[#181D62] hover:text-white transition-colors"
            aria-label="Add to calendar"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
