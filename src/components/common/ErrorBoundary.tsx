"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center pt-20 bg-white dark:bg-[#0f1114]">
      <div className="text-center px-6 max-w-2xl">
        {/* Error Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 dark:bg-red-900/20 mb-8">
          <i className="pi pi-exclamation-triangle text-5xl text-red-500 dark:text-red-400"></i>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          We encountered an unexpected error. Don't worry, our team has been
          notified.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-8 text-left">
            <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-[#2D4356] hover:bg-[#1f2e3c] text-white rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <i className="pi pi-refresh"></i>
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 bg-white dark:bg-transparent border-2 border-[#2D4356] text-[#2D4356] dark:text-white dark:border-gray-600 rounded-xl font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            <i className="pi pi-home"></i>
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
