import {
  Dumbbell,
  Waves,
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  Users,
  Zap,
} from "lucide-react";

import Footer from "@/components/layout/Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const GYMS = [
  {
    name: "North Hill Gym",
    address: "60 Nanyang Crescent, Level 3, Block 19A Binjai Hall",
    hours: "Mon–Sun (incl. PH): 7:30am–10pm",
    contact: "6904 1253",
    mapsUrl: "https://maps.app.goo.gl/ZCfHFHuWZwo31ag47",
  },
  {
    name: "Anytime Fitness @ The Wave",
    address: "The Wave, NTU",
    hours:
      "Staffed: Weekdays 11am–8pm, Sat 10am–2pm\nSun & PH: Unstaffed (24hr access)",
    contact: null,
    website:
      "https://www.anytimefitness.sg/gyms/sg-0023/singapore-north-west-636956/",
    mapsUrl: "https://maps.app.goo.gl/S8Z5R3MYqNLWFKoP7",
  },
];

const RACKET_FACILITIES = [
  {
    facility: "Badminton Courts & Table Tennis Tables",
    location: "North Hill Function Hall (North Hill 21B – 1)",
    hours: "Mon–Sun (incl. PH): 9am–10pm",
  },
  {
    facility: "Tennis Courts",
    location: "Sports & Recreation Centre (SRC–1) · 30 Nanyang Link",
    hours: "Mon–Sun (incl. PH): 7am–10pm",
  },
  {
    facility: "Squash Courts",
    location: "Sports & Recreation Centre (SRC–1)",
    hours: "Mon–Sun (incl. PH): 9am–10pm",
  },
];

const TEAM_FACILITIES = [
  {
    facility:
      "Basketball Courts · Futsal Court · Multipurpose Court 3 (Volleyball)",
    location: "Sports & Recreation Centre (SRC–1)",
    hours: "Mon–Sun (incl. PH): 8am–10pm",
  },
  {
    facility: "Main Field · Multi-Purpose Fields",
    location: "Sports & Recreation Centre (SRC–1)",
    hours: "Mon–Sun (incl. PH): 8am–7pm",
  },
  {
    facility:
      "Multipurpose Court 4 (Volleyball) · Multipurpose Court 5 (Netball & Futsal)",
    location: "Hall 2 (Hall 2–1)",
    hours: "Mon–Sun (incl. PH): 8am–10pm",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function PhysicalWellbeingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#181D62] text-xs font-medium px-3 py-1 rounded-full mb-4">
            <Dumbbell className="w-3 h-3" />
            Physical Well-being
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Stay active, stay well.
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            Between lectures, assignments, and labs, it can be easy to forget to
            move. Staying physically active goes a long way in managing stress.
            Visit NTU's facilties below to help you keep fit!
          </p>
        </div>

        {/* ── Gyms ── */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Campus Gyms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GYMS.map((gym) => (
              <div
                key={gym.name}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow flex flex-col"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-[#181D62] p-2.5 rounded-lg flex-shrink-0">
                    <Dumbbell className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {gym.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-600 flex-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-400" />
                    <span>{gym.address}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-400" />
                    <span className="whitespace-pre-line">{gym.hours}</span>
                  </div>
                  {gym.contact && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                      <a
                        href={`tel:+65${gym.contact.replace(/\s/g, "")}`}
                        className="hover:text-[#D7143F] transition-colors"
                      >
                        {gym.contact}
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <a
                    href={gym.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 flex-1 justify-center px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-[#181D62] hover:text-[#181D62] transition-colors"
                  >
                    <MapPin className="w-3 h-3" />
                    Google Maps
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {gym.website && (
                    <a
                      href={gym.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 flex-1 justify-center px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-[#181D62] hover:text-[#181D62] transition-colors"
                    >
                      Website
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Swimming Pool ── */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Swimming Complex
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-start gap-4 mb-5">
              <div className="bg-sky-500 p-2.5 rounded-lg flex-shrink-0">
                <Waves className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  NTU Swimming Complex
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  20 Nanyang Green, Singapore 637715
                </p>
              </div>
            </div>

            {/* Hours table */}
            <div className="bg-gray-50 rounded-lg overflow-hidden mb-5">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#181D62] text-white">
                    <th className="text-left px-4 py-2.5 font-medium">Days</th>
                    <th className="text-left px-4 py-2.5 font-medium">Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Mon–Fri</td>
                    <td className="px-4 py-3 text-gray-700">7am–9:30pm*</td>
                  </tr>
                  <tr className="bg-amber-50">
                    <td className="px-4 py-3 text-gray-600 text-[11px]">
                      *Partial closure for cleaning:
                      <br />
                      Mon & Fri (Main pool): 2pm–5pm
                      <br />
                      Wed (Wading, Leisure & Lap pools): 2pm–5pm
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-[11px]">
                      Partial closure
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-gray-700">Weekends & PH</td>
                    <td className="px-4 py-3 text-gray-700">8am–8pm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Getting there */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Getting there
              </p>
              <ul className="space-y-1.5 text-xs text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  Nearest carpark: Carpark K
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  Short walk from Hall 2 and Hall 6
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>
                    <span className="font-medium">Hall 2</span> — Bus 179, 179A,
                    179B · Campus Red & Green Loop
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>
                    <span className="font-medium">Opp Hall 2</span> — Campus
                    Green Loop
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>
                    <span className="font-medium">Hall 6</span> — Campus Blue
                    Loop
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>
                    <span className="font-medium">Opp Hall 6</span> — Bus 179,
                    179A, 179B
                  </span>
                </li>
              </ul>
            </div>

            <a
              href="https://maps.app.goo.gl/nfZfzxW2ZrWQgdSe6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-[#181D62] hover:text-[#181D62] transition-colors"
            >
              <MapPin className="w-3 h-3" />
              View on Google Maps
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </section>

        {/* ── Sports Facilities ── */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Sports Facilities
          </h2>

          {/* Racket Sports */}
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#181D62]" />
            Racket Sports
          </h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-5">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#181D62] text-white">
                  <th className="text-left px-4 py-2.5 font-medium">
                    Facility
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium hidden sm:table-cell">
                    Location
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium">Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {RACKET_FACILITIES.map((f) => (
                  <tr key={f.facility} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800 font-medium align-top">
                      {f.facility}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell align-top">
                      {f.location}
                    </td>
                    <td className="px-4 py-3 text-gray-600 align-top whitespace-nowrap">
                      {f.hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Team Sports */}
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#181D62]" />
            Team Sports
          </h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-[#181D62] text-white">
                  <th className="text-left px-4 py-2.5 font-medium">
                    Facility
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium hidden sm:table-cell">
                    Location
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium">Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TEAM_FACILITIES.map((f) => (
                  <tr key={f.facility} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-800 font-medium align-top">
                      {f.facility}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell align-top">
                      {f.location}
                    </td>
                    <td className="px-4 py-3 text-gray-600 align-top whitespace-nowrap">
                      {f.hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Booking + SRC Office ── */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Booking & Contact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Facility Booking */}
            <div className="bg-[#181D62] text-white rounded-xl p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-300" />
                <h3 className="font-semibold text-sm">Facility Booking</h3>
              </div>
              <p className="text-blue-200 text-xs leading-relaxed mb-4 flex-1">
                Book sports facilities online through NTU&apos;s facility
                booking portal. Log in with your NTU credentials.
              </p>
              <a
                href="https://ntu.facilitiesbooking.com/login.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 justify-center bg-white text-[#181D62] text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Book a Facility
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* SRC General Office */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-gray-500" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  SRC General Office
                </h3>
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-400" />
                  <span>
                    The Wave, Level 1 · 110 Nanyang Crescent, Singapore 636956
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-400" />
                  <span>
                    Mon–Thu: 8:30am–5:45pm · Fri: 8:30am–5:15pm
                    <br />
                    Closed on Public Holidays
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                  <a
                    href="tel:+6567905169"
                    className="hover:text-[#D7143F] transition-colors"
                  >
                    6790 5169
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                  <a
                    href="mailto:srcgo@ntu.edu.sg"
                    className="hover:text-[#D7143F] transition-colors"
                  >
                    srcgo@ntu.edu.sg
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── More Info ── */}
        <div className="bg-gray-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Want more information?
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Visit the official NTU SRC website for the full list of
              facilities, programmes, and updates.
            </p>
          </div>
          <a
            href="https://www.ntu.edu.sg/life-at-ntu/recreational-spaces-facilities/sports-recreation-centre"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#181D62] text-white text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-[#0f1340] transition-colors whitespace-nowrap"
          >
            Visit NTU SRC
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
