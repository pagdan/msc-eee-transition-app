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

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const swiperRef = useRef<SwiperType>();

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
            <Link
              href="/calendar"
              className="inline-block bg-white text-[#D7143F] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
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
            Explore the tools and services designed to support your academic
            journey
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
