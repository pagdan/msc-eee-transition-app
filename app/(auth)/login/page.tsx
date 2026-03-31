"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleMicrosoftSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("azure-ad", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: "demo@e.ntu.edu.sg",
        password: "demo123",
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Demo sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="w-full max-w-md relative">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <span className="mr-2">←</span>
          Back to home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 grid grid-cols-2 gap-0.5">
                <div className="bg-red-500" />
                <div className="bg-green-500" />
                <div className="bg-blue-500" />
                <div className="bg-yellow-500" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Sign in
            </h1>
            <p className="text-gray-600">
              to continue to MSc EEE Transition Portal
            </p>
          </div>

          <button
            onClick={handleMicrosoftSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
              <div className="bg-red-500" />
              <div className="bg-green-500" />
              <div className="bg-blue-500" />
              <div className="bg-yellow-500" />
            </div>
            <span className="text-gray-700 font-medium">
              {isLoading ? "Signing in..." : "Sign in with Microsoft"}
            </span>
          </button>

          <div className="text-sm text-center text-gray-600 mb-6">
            Use your NTU email
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or for demo</span>
            </div>
          </div>

          <button
            onClick={handleDemoSignIn}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Continue as Demo User
          </button>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600 mb-2">Need help signing in?</p>
            <a
              href="mailto:eee_msc@ntu.edu.sg"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </a>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>By signing in, you agree to our Terms and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
