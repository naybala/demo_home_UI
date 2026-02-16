export default function DetailPageSkeleton() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-white dark:bg-[#0f1114]">
      <div className="container mx-auto px-6">
        {/* Back button skeleton */}
        <div className="h-6 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-8"></div>
        <br />
        <br />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2">
            {/* Header skeleton */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-6 w-28 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
              <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2"></div>
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            </header>

            {/* Main content skeleton */}
            <section className="mb-12">
              <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
            </section>

            {/* Description skeleton */}
            <section className="mb-12">
              <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
            </section>

            {/* Additional info skeleton */}
            <section>
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-6"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"
                  >
                    <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                    <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              {/* Info box skeleton */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="mb-6">
                  <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                  <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
                </div>
              </div>

              {/* Profile skeleton */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl flex items-center gap-4 border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="flex gap-2">
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading indicator */}
        <div className="fixed bottom-8 right-8 bg-white dark:bg-gray-800 px-6 py-4 rounded-full shadow-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
          <div className="w-5 h-5 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Loading details...
          </span>
        </div>
      </div>
    </main>
  );
}
