"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Loader2,
  CalendarDays,
  MapPin,
  Clock,
  Info,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

interface CalendarEvent {
  id: string;
  title: string;
  description?: string | null;
  location?: string | null;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  category?: string | null;
}

interface DashboardEvent {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  imageUrl?: string;
}

const CATEGORIES = [
  { value: "academic", label: "Academic", color: "bg-[#181D62] text-white" },
  {
    value: "orientation",
    label: "Orientation",
    color: "bg-purple-500 text-white",
  },
  { value: "social", label: "Social", color: "bg-green-500 text-white" },
  { value: "deadline", label: "Deadline", color: "bg-red-500 text-white" },
  { value: "personal", label: "Personal", color: "bg-amber-500 text-white" },
];

const CATEGORY_DOT: Record<string, string> = {
  academic: "bg-[#181D62]",
  orientation: "bg-purple-500",
  social: "bg-green-500",
  deadline: "bg-red-500",
  personal: "bg-amber-500",
};

const CATEGORY_PILL: Record<string, string> = {
  academic: "bg-[#181D62] text-white",
  orientation: "bg-purple-500 text-white",
  social: "bg-green-500 text-white",
  deadline: "bg-red-500 text-white",
  personal: "bg-amber-500 text-white",
};

const EMPTY_FORM = {
  title: "",
  description: "",
  location: "",
  date: "",
  startTime: "09:00",
  endTime: "10:00",
  isAllDay: false,
  category: "academic",
};

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showDayPanel, setShowDayPanel] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [dashboardEvents, setDashboardEvents] = useState<DashboardEvent[]>([]);
  const [loadingDashboardEvents, setLoadingDashboardEvents] = useState(true);

  useEffect(() => {
    fetchEvents();
    fetchDashboardEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    try {
      const res = await fetch("/api/calendar/events");
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch {
      setEvents([]);
    }
    setLoading(false);
  }

  async function fetchDashboardEvents() {
    try {
      const res = await fetch("/api/events?limit=12");
      const data = await res.json();
      if (data.success) setDashboardEvents(data.data);
    } catch {
      // fail silently
    }
    setLoadingDashboardEvents(false);
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: { date: Date; isCurrentMonth: boolean }[] = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({ date: new Date(year, month, d), isCurrentMonth: true });
  }
  const remaining = 42 - calendarDays.length;
  for (let d = 1; d <= remaining; d++) {
    calendarDays.push({
      date: new Date(year, month + 1, d),
      isCurrentMonth: false,
    });
  }

  function getEventsForDate(date: Date) {
    return events.filter((e) => {
      const eventDate = new Date(e.startTime);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  }

  function isToday(date: Date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  function isSelected(date: Date) {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  }

  function handleDayClick(date: Date) {
    setSelectedDate(date);
    setShowDayPanel(true);
  }

  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
  }
  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
  }
  function goToToday() {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
    setShowDayPanel(true);
  }

  const upcoming = events
    .filter((e) => {
      const d = new Date(e.startTime);
      const now = new Date();
      const in7 = new Date();
      in7.setDate(in7.getDate() + 7);
      return d >= now && d <= in7;
    })
    .slice(0, 5);

  function openAddForm(date?: Date) {
    const d = date ?? selectedDate ?? new Date();
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    setForm({ ...EMPTY_FORM, date: dateStr });
    setError(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setError(null);
  }

  async function handleSubmit() {
    if (!form.title || !form.date) {
      setError("Title and date are required.");
      return;
    }
    setSaving(true);
    setError(null);
    const startTime = form.isAllDay
      ? new Date(`${form.date}T00:00:00`)
      : new Date(`${form.date}T${form.startTime}:00`);
    const endTime = form.isAllDay
      ? new Date(`${form.date}T23:59:59`)
      : new Date(`${form.date}T${form.endTime}:00`);
    if (endTime <= startTime && !form.isAllDay) {
      setError("End time must be after start time.");
      setSaving(false);
      return;
    }
    const res = await fetch("/api/calendar/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        description: form.description || null,
        location: form.location || null,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        isAllDay: form.isAllDay,
        category: form.category,
      }),
    });
    if (res.ok) {
      await fetchEvents();
      closeForm();
    } else {
      setError("Something went wrong. Please try again.");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this event?")) return;
    setDeleting(id);
    await fetch("/api/calendar/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchEvents();
    setDeleting(null);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage your academic schedule and personal events.
            </p>
          </div>
          <button
            onClick={() => openAddForm()}
            className="inline-flex items-center gap-2 bg-[#D7143F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#b91139] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Calendar Grid */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevMonth}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                  </button>
                  <h2 className="text-lg font-bold text-gray-900 w-44 text-center">
                    {MONTHS[month]} {year}
                  </h2>
                  <button
                    onClick={nextMonth}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={goToToday}
                  className="text-xs font-medium text-[#D7143F] hover:underline"
                >
                  Today
                </button>
              </div>

              <div className="grid grid-cols-7 border-b border-gray-100">
                {DAYS_OF_WEEK.map((d) => (
                  <div
                    key={d}
                    className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide"
                  >
                    {d}
                  </div>
                ))}
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              ) : (
                <div className="grid grid-cols-7">
                  {calendarDays.map(({ date, isCurrentMonth }, i) => {
                    const dayEvents = getEventsForDate(date);
                    const today = isToday(date);
                    const selected = isSelected(date);
                    return (
                      <div
                        key={i}
                        onClick={() => handleDayClick(date)}
                        className={`min-h-[90px] p-2 border-b border-r border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${!isCurrentMonth ? "bg-gray-50/50" : ""} ${selected ? "bg-red-50/60" : ""}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${today ? "bg-[#D7143F] text-white font-bold" : isCurrentMonth ? "text-gray-800" : "text-gray-300"}`}
                          >
                            {date.getDate()}
                          </span>
                          {isCurrentMonth && dayEvents.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openAddForm(date);
                              }}
                              className="opacity-0 hover:opacity-100 p-0.5 hover:bg-gray-200 rounded transition-opacity"
                            >
                              <Plus className="w-3 h-3 text-gray-400" />
                            </button>
                          )}
                        </div>
                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 3).map((event) => (
                            <div
                              key={event.id}
                              className={`text-[10px] px-1.5 py-0.5 rounded font-medium truncate ${CATEGORY_PILL[event.category ?? ""] ?? "bg-gray-200 text-gray-700"}`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <p className="text-[10px] text-gray-400 pl-1">
                              +{dayEvents.length - 3} more
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Category legend */}
            <div className="flex flex-wrap gap-3 mt-3 px-1">
              {CATEGORIES.map((c) => (
                <div key={c.value} className="flex items-center gap-1.5">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${CATEGORY_DOT[c.value]}`}
                  />
                  <span className="text-xs text-gray-500">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {showDayPanel && selectedDate && (
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                      {DAYS_OF_WEEK[selectedDate.getDay()]}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]}
                    </p>
                  </div>
                  <button
                    onClick={() => openAddForm(selectedDate)}
                    className="p-1.5 bg-[#D7143F] text-white rounded-lg hover:bg-[#b91139] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-3">
                  {getEventsForDate(selectedDate).length === 0 ? (
                    <div className="text-center py-6">
                      <CalendarDays className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                      <p className="text-xs text-gray-400">No events</p>
                      <button
                        onClick={() => openAddForm(selectedDate)}
                        className="text-xs text-[#D7143F] hover:underline mt-1"
                      >
                        Add one
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {getEventsForDate(selectedDate).map((event) => (
                        <DayEventCard
                          key={event.id}
                          event={event}
                          onDelete={handleDelete}
                          deleting={deleting}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">
                  Next 7 Days
                </p>
              </div>
              <div className="p-3">
                {upcoming.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-xs text-gray-400">No upcoming events</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {upcoming.map((event) => {
                      const d = new Date(event.startTime);
                      return (
                        <div
                          key={event.id}
                          className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedDate(d);
                            setCurrentDate(
                              new Date(d.getFullYear(), d.getMonth(), 1),
                            );
                            setShowDayPanel(true);
                          }}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${CATEGORY_DOT[event.category ?? ""] ?? "bg-gray-300"}`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-900 truncate">
                              {event.title}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              {d.toLocaleDateString("en-SG", {
                                day: "numeric",
                                month: "short",
                              })}
                              {!event.isAllDay &&
                                ` · ${d.toLocaleTimeString("en-SG", { hour: "2-digit", minute: "2-digit" })}`}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming NTU Events Section */}
        <section className="py-16 border-t border-gray-200 mt-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#181D62] mb-2">
              Upcoming Events
            </h2>
            <p className="text-gray-600">
              Stay connected with the latest happenings in the MSc EEE community
            </p>
          </div>
          {loadingDashboardEvents ? (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-[#D7143F] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardEvents.map((event) => (
                <NTUEventCard
                  key={event.id}
                  event={event}
                  onAdded={fetchEvents}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Add Event Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeForm} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Add Event</h2>
              <button
                onClick={closeForm}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="e.g. EEE5001 Assignment Due"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setForm({ ...form, category: c.value })}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${form.category === c.value ? c.color : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isAllDay"
                  checked={form.isAllDay}
                  onChange={(e) =>
                    setForm({ ...form, isAllDay: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#D7143F]"
                />
                <label htmlFor="isAllDay" className="text-sm text-gray-700">
                  All day event
                </label>
              </div>
              {!form.isAllDay && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={form.startTime}
                      onChange={(e) =>
                        setForm({ ...form, startTime: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={form.endTime}
                      onChange={(e) =>
                        setForm({ ...form, endTime: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F]"
                  placeholder="e.g. S2-B2a-30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D7143F] resize-none"
                  placeholder="Optional notes"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={closeForm}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#D7143F] text-white text-sm font-medium rounded-lg hover:bg-[#b91139] transition-colors disabled:opacity-60"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Save Event
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
}

// ── Day Event Card ─────────────────────────────────────────────────────────────

function DayEventCard({
  event,
  onDelete,
  deleting,
}: {
  event: CalendarEvent;
  onDelete: (id: string) => void;
  deleting: string | null;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 group relative">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${CATEGORY_DOT[event.category ?? ""] ?? "bg-gray-300"}`}
            />
            <p className="text-xs font-semibold text-gray-900 truncate">
              {event.title}
            </p>
          </div>
          {!event.isAllDay && (
            <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-1">
              <Clock className="w-3 h-3" />
              {new Date(event.startTime).toLocaleTimeString("en-SG", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" – "}
              {new Date(event.endTime).toLocaleTimeString("en-SG", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <MapPin className="w-3 h-3" />
              {event.location}
            </div>
          )}
          {event.description && (
            <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>
        <button
          onClick={() => onDelete(event.id)}
          disabled={deleting === event.id}
          className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0"
        >
          {deleting === event.id ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <X className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

// ── NTU Event Card ─────────────────────────────────────────────────────────────

function NTUEventCard({
  event,
  onAdded,
}: {
  event: DashboardEvent;
  onAdded: () => void;
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
        onAdded();
        setTimeout(() => setAdded(false), 3000);
      } else {
        alert("Failed to add to calendar. Please try again.");
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
            <CalendarDays className="w-16 h-16 text-white opacity-50" />
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
          <button
            onClick={handleAddToCalendar}
            disabled={adding || added}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${added ? "bg-green-100 text-green-600" : "bg-[#D9D9D9] text-[#181D62] hover:bg-[#181D62] hover:text-white"}`}
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
        </div>
      </div>
    </div>
  );
}
