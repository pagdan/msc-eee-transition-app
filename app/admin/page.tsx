import { prisma } from "@/lib/prisma";
import {
  CalendarDays,
  UtensilsCrossed,
  BookOpen,
  Users,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

async function getStats() {
  const [events, dining, studySpots, clubs, contacts, newContacts] =
    await Promise.all([
      prisma.event.count(),
      prisma.diningLocation.count(),
      prisma.studySpot.count(),
      prisma.club.count(),
      prisma.contact.count(),
      prisma.contact.count({ where: { status: "new" } }),
    ]);
  return { events, dining, studySpots, clubs, contacts, newContacts };
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  const STAT_CARDS = [
    {
      label: "Events",
      value: stats.events,
      icon: CalendarDays,
      href: "/admin/events",
      color: "bg-violet-50 text-violet-600",
    },
    {
      label: "Dining Locations",
      value: stats.dining,
      icon: UtensilsCrossed,
      href: "/admin/dining",
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Study Spots",
      value: stats.studySpots,
      icon: BookOpen,
      href: "/admin/study-spots",
      color: "bg-sky-50 text-sky-600",
    },
    {
      label: "Clubs",
      value: stats.clubs,
      icon: Users,
      href: "/admin/clubs",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Contact Submissions",
      value: stats.contacts,
      icon: MessageSquare,
      href: "/admin/contacts",
      color: "bg-rose-50 text-rose-600",
      badge: stats.newContacts > 0 ? stats.newContacts : null,
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage content across the NTU MSc EEE platform.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {STAT_CARDS.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
            </div>
            {card.badge && (
              <div className="flex items-center gap-1 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full">
                <AlertCircle className="w-3 h-3" />
                {card.badge} new
              </div>
            )}
          </a>
        ))}
      </div>

      {/* Quick tips */}
      <div className="bg-[#181D62] text-white rounded-xl p-6">
        <h2 className="text-sm font-semibold mb-3 text-blue-200 uppercase tracking-wide">
          Admin Guide
        </h2>
        <ul className="space-y-2 text-sm text-blue-100">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            Use <span className="font-medium text-white">Events</span> to create
            and manage upcoming events shown on the student dashboard.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            Use <span className="font-medium text-white">Dining</span> and{" "}
            <span className="font-medium text-white">Study Spots</span> to
            update listings and toggle visibility.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            Use <span className="font-medium text-white">Clubs</span> to keep
            club details and social media links up to date.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-0.5">•</span>
            Check{" "}
            <span className="font-medium text-white">
              Contact Submissions
            </span>{" "}
            regularly — new submissions are highlighted.
          </li>
        </ul>
      </div>
    </div>
  );
}
