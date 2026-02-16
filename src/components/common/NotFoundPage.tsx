import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-20 bg-white dark:bg-[#0f1114]">
      <div className="text-center px-6 max-w-2xl">
        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-black text-gray-200 dark:text-gray-800 mb-4">
            404
          </h1>
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50 dark:bg-gray-800 -mt-20">
            <i className="pi pi-search text-5xl text-gray-300 dark:text-gray-600"></i>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-[#2D4356] hover:bg-[#1f2e3c] text-white rounded-xl font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <i className="pi pi-home"></i>
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white dark:bg-transparent border-2 border-[#2D4356] text-[#2D4356] dark:text-white dark:border-gray-600 rounded-xl font-bold transition-all hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            <i className="pi pi-arrow-left"></i>
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You might be interested in:
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/properties"
              className="text-sm text-primary hover:underline"
            >
              Properties
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              href="/users"
              className="text-sm text-primary hover:underline"
            >
              Users
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link
              href="/products"
              className="text-sm text-primary hover:underline"
            >
              Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
