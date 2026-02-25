import Image from "next/image";
import Link from "next/link";
import { Bus, ExternalLink, Smartphone, MapPin, Apple } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function GettingAroundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Getting Around NTU
          </h1>
          <p className="text-gray-600">
            Everything you need to know about navigating campus as an MSc EEE
            student
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-[#D7143F] p-3 rounded-lg">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Download NTU Omnibus App
              </h2>
              <p className="text-gray-600 mb-4">
                Track campus shuttle buses in real-time, check occupancy levels,
                and get service updates.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://apps.apple.com/sg/app/ntu-omnibus/id1636457987"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Apple className="w-5 h-5" />
                  <span>App Store</span>
                </Link>
                <Link
                  href="https://play.google.com/store/apps/details?id=sg.edu.ntu.apps.ntuomnibus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Google Play</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-[#181D62] p-3 rounded-lg">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Campus Shuttle Bus Routes
              </h2>
              <p className="text-gray-600">
                Three shuttle bus routes serve the campus, providing free
                transportation for students and staff.
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold text-blue-600">
                    Campus Loop - Blue (CL-B)
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-red-600">
                    Campus Loop - Red (CL-R)
                  </span>{" "}
                  circle the campus, connecting major facilities and buildings.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold text-green-600">
                    Campus Rider (CR)
                  </span>{" "}
                  ventures off-campus to and from Pioneer MRT station.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-700 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-700">
                  On weekends and holidays, Campus Rider becomes{" "}
                  <span className="font-semibold text-amber-700">
                    Campus Weekend Rider (CWR)
                  </span>{" "}
                  with an extended route.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <div className="relative w-full aspect-[16/10]">
              <Image
                src="/images/ntu-shuttle-map.jpg"
                alt="NTU Campus Shuttle Bus Network Map"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="text-sm text-gray-500 text-center py-2 bg-gray-100">
              NTU Campus Shuttle Bus Network
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#D7143F]/5 to-[#181D62]/5 rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <MapPin className="w-6 h-6 text-[#D7143F]" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Quick Tips for EEE Students
              </h2>
              <p className="text-gray-600 mb-4">
                Key locations and routes for MSc Electrical and Electronic
                Engineering students
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                📍 Common Destinations
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• S1 Building (EEE Lecture Halls)</li>
                <li>• S2 Building (EEE Labs)</li>
                <li>• North Spine Plaza (Food & Shops)</li>
                <li>• Lee Wee Nam Library (North Spine Plaza)</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                🚌 Recommended Routes
              </h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  • <span className="text-blue-600 font-medium">CL-B</span>:
                  Stop at Opp. S2 (Walk to South Spine through S2)
                </li>
                <li>
                  • <span className="text-red-600 font-medium">CL-R</span>: Stop
                  at WKWSCI (Walk to South Spine through WKWSCI)
                </li>
                <li>
                  • <span className="text-green-600 font-medium">CR</span>: Stop
                  at TCT-LT (Walk to South Spine through North Spine)
                </li>
                <li>
                  • <span className="text-amber-700 font-medium">CWR</span>:
                  Stop at TCT-LT or WKWSCI
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Need More Information?
              </h3>
              <p className="text-sm text-gray-600">
                Check the official NTU transportation resources for detailed
                schedules and updates
              </p>
            </div>
            <Link
              href="https://www.ntu.edu.sg/about-us/visiting-ntu/internal-campus-shuttle"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D7143F] text-white px-6 py-3 rounded-lg hover:bg-[#b91139] transition-colors font-medium whitespace-nowrap"
            >
              <span>Visit NTU Website</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
