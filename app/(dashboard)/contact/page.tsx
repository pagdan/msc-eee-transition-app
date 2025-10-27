"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Calendar,
  Users,
  Heart,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log the form data to console
    console.log("Form submitted with data:", formData);
    // Show success message
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    // Clear the form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#181D62] to-[#D7143F] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Have questions? We're here to help you succeed in your MSc EEE
              journey.
            </p>
          </div>
        </div>

        {/* Contact Information & Form Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#D7143F] p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Email Us
                    </h3>
                    <a
                      href="mailto:eee@ntu.edu.sg"
                      className="text-[#D7143F] hover:underline"
                    >
                      Application Matters: eee_mscadmission@ntu.edu.sg
                    </a>
                    <br></br>
                    <a
                      href="mailto:eee@ntu.edu.sg"
                      className="text-[#D7143F] hover:underline"
                    >
                      Academic Matters: eee_msc@ntu.edu.sg
                    </a>
                    <br></br>
                    <a
                      href="mailto:eee@ntu.edu.sg"
                      className="text-[#D7143F] hover:underline"
                    >
                      Student Care: eeestudentcare@ntu.edu.sg
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#181D62] p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Call Us
                    </h3>
                    <a
                      href="tel:+6567905432"
                      className="text-[#181D62] hover:underline"
                    >
                      Application Matters: +6567905432
                    </a>
                    <br></br>
                    <a
                      href="tel:+6567906324"
                      className="text-[#181D62] hover:underline"
                    >
                      Academic Matters: +6567906324
                    </a>
                    <br></br>
                    <a
                      href="tel:+6567906365"
                      className="text-[#181D62] hover:underline"
                    >
                      Student Care: +6567906365
                    </a>
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#D7143F] p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Visit Us
                    </h3>
                    <p className="text-gray-600 text-sm">
                      School of Electrical & Electronic Engineering
                      <br />
                      Nanyang Technological University
                      <br />
                      50 Nanyang Avenue
                      <br />
                      Singapore 639798
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-gradient-to-br from-[#181D62] to-[#D7143F] rounded-xl p-6 text-white">
                <h3 className="font-semibold mb-3">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <p>Monday - Friday: 9:00 AM - 5:30 PM</p>
                  <p>Saturday - Sunday: Closed</p>
                  <p className="text-white/80 mt-4 text-xs">
                    *Closed on Public Holidays
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </p>

                {submitted && (
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                    <div className="bg-green-500 rounded-full p-1">
                      <svg
                        className="w-4 h-4 text-white"
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
                    </div>
                    <p className="text-green-800 font-medium">
                      Message sent successfully!
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7143F] focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7143F] focus:border-transparent"
                        placeholder="john.doe@ntu.edu.sg"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7143F] focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7143F] focus:border-transparent resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D7143F] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#B01034] transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Need Help With Something Specific?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="/wellbeing"
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <Heart className="w-10 h-10 text-[#D7143F] mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Wellbeing Support
                </h3>
                <p className="text-sm text-gray-600">
                  Access mental health and wellness resources
                </p>
              </a>

              <a
                href="/community"
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <Users className="w-10 h-10 text-[#181D62] mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Join the Community
                </h3>
                <p className="text-sm text-gray-600">
                  Connect with fellow students and clubs
                </p>
              </a>

              <a
                href="/calendar"
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <Calendar className="w-10 h-10 text-[#D7143F] mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  View Events
                </h3>
                <p className="text-sm text-gray-600">
                  Check out upcoming academic and social events
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
