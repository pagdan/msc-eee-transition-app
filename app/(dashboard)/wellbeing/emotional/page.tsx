import {
  Heart,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  AlertCircle,
  BookOpen,
  Users,
  Sunrise,
  Wind,
  Clock,
} from "lucide-react";

import Footer from "@/components/layout/Footer";

export default function EmotionalWellbeingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            <Heart className="w-3 h-3" />
            Emotional Well-being
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            It&apos;s okay to not be okay.
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-2xl">
            Starting a new chapter at NTU — especially as an international
            student — can be exciting and overwhelming at the same time.
            Whatever you&apos;re feeling, you&apos;re not alone, and support is
            always within reach.
          </p>
        </div>

        {/* Crisis Banner */}
        <div className="bg-[#D7143F] text-white rounded-xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">
                Need immediate support?
              </p>
              <p className="text-red-100 text-xs leading-relaxed">
                If you&apos;re in crisis or need urgent psychological support,
                please reach out right away. Help is available around the clock.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href="tel:+6567904462"
              className="inline-flex items-center gap-2 bg-white text-[#D7143F] text-xs font-bold px-4 py-2 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              +65 6790 4462 (24/7 PEL)
            </a>
            <p className="text-red-200 text-[10px] sm:text-right">
              After-hours Psychological Emergency Line
            </p>
          </div>
        </div>

        {/* NTU Support Services */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            NTU Support Services
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {/* Card 1 - Wellbeing for All */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-rose-50 p-2.5 rounded-lg flex-shrink-0">
                  <Heart className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-0.5">
                    Wellbeing for All
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    A message from VP (Wellbeing), Assoc Prof Vivien Huan Swee
                    Leng
                  </p>
                  <blockquote className="border-l-2 border-rose-200 pl-4 text-gray-600 text-sm leading-relaxed italic">
                    &ldquo;Wellbeing @NTU is a personal and shared
                    responsibility. It is an essential part of lifelong learning
                    — for our students, as they make the most of their
                    university years; for our staff as they contribute and
                    strive to achieve their potentials at work. @NTU, we adopt a
                    Campus Community Approach in supporting both student and
                    staff wellbeing.&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Card 2 - University Wellbeing Office */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-2.5 rounded-lg flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-0.5">
                    University Wellbeing Office (UWO)
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    Central wellbeing care & support coordinator
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The UWO serves as the central wellbeing care and support
                    provider and coordinator in NTU. Through an innovative
                    community activation approach, students and staff are
                    empowered to be active contributors to the University&apos;s
                    wellbeing ecosystem.
                  </p>
                  <a
                    href="https://www.ntu.edu.sg/life-at-ntu/student-life/campus-life-and-wellbeing/ntu-wellbeing/student-wellbeing-services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-[#D7143F] hover:underline"
                  >
                    Visit NTU's official website for more information
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 - Student Wellbeing Services */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 p-2.5 rounded-lg flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-0.5">
                    Student Wellbeing Services
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">
                    University Counselling Centre (UCC)
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    The University Counselling Centre (UCC) operates under the
                    University Wellbeing Office (UWO). Its primary focus is to
                    provide professional counselling and psychological services
                    to meet the psychological wellbeing needs of the student
                    community.
                  </p>

                  {/* Contact details */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2.5">
                    <div className="flex items-start gap-2 text-xs text-gray-600">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-gray-400" />
                      <span>
                        Level 2, University Health Service Building, 36 Nanyang
                        Avenue, Singapore 639801
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                      <a
                        href="mailto:ucc-students@ntu.edu.sg"
                        className="hover:text-[#D7143F] transition-colors"
                      >
                        ucc-students@ntu.edu.sg
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                      <div>
                        <a
                          href="tel:+6567904462"
                          className="hover:text-[#D7143F] transition-colors"
                        >
                          +65 6790 4462
                        </a>
                        <span className="text-gray-400 ml-1">
                          (during office hours)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                      <div>
                        <a
                          href="tel:+6567904462"
                          className="hover:text-[#D7143F] transition-colors font-medium"
                        >
                          +65 6790 4462
                        </a>
                        <span className="text-gray-400 ml-1">
                          (after-hours Psychological Emergency Line)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                      <span>General enquiries: </span>
                      <a
                        href="mailto:NTUWellbeing@ntu.edu.sg"
                        className="hover:text-[#D7143F] transition-colors"
                      >
                        NTUWellbeing@ntu.edu.sg
                      </a>
                    </div>
                  </div>

                  <a
                    href="https://entuedu.sharepoint.com/sites/Student/dept/uwo/SitePages/Counselling%20Services.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 text-xs font-medium text-[#D7143F] hover:underline"
                  >
                    Visit Student Intranet for counselling services
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips for MSc EEE Freshmen */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            You&apos;re not alone
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Practical tips for navigating the MSc EEE transition.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sunrise className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Build a routine early
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                MSc programmes move fast. Setting a consistent daily structure —
                study blocks, meals, and rest — helps manage the pace before
                deadlines pile up.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-500" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Connect with your cohort
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your classmates are going through the same experience. Study
                groups aren&apos;t just academically helpful — they&apos;re one
                of the fastest ways to feel at home.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Wind className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-semibold text-gray-900">
                  It&apos;s normal to struggle
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Many MSc EEE students feel overwhelmed in the first semester.
                Adjusting to a new country, environment, and academic standard
                at once is genuinely hard — not a sign of weakness.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Seek help early
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Don&apos;t wait until you&apos;re at breaking point. NTU&apos;s
                counselling services are free, confidential, and there for
                exactly this kind of transition. Reaching out is a sign of
                self-awareness, not weakness.
              </p>
            </div>
          </div>
        </section>

        {/* Self-help resources */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Self-help resources
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            A curated set of tools and links to support your mental wellness.
          </p>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {[
              {
                label: "NTU Student Wellness Portal",
                desc: "Official hub for all student wellbeing programmes and resources",
                href: "https://www.ntu.edu.sg/life-at-ntu/student-life/campus-life-and-wellbeing/ntu-wellbeing",
              },
              {
                label: "First Stop for Mental Health",
                desc: "A clear, 'no wrong door' support for individuals in mental distress or crisis.",
                href: "https://www.ntu.edu.sg/student-life/student-wellbeing",
              },
              {
                label: "CREST",
                desc: "Community mental health teams operated by social service agencies to provide psycho-social support services.",
                href: "https://mindline.sg/mental-health-service-providers/browse?category=all&view=list",
              },
              {
                label: "Samaritans of Singapore (SOS)",
                desc: "24-hour crisis helpline: 1-767",
                href: "https://www.sos.org.sg",
              },
              {
                label: "CHAT",
                desc: "A mental health service that conducts mental health assessments and consultations for youth aged 16 to 30 years.",
                href: "https://www.imh.com.sg/CHAT/Pages/default.aspx",
              },
            ].map((resource) => (
              <a
                key={resource.label}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-[#D7143F] transition-colors">
                    {resource.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {resource.desc}
                  </p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#D7143F] transition-colors flex-shrink-0 ml-4" />
              </a>
            ))}
          </div>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
