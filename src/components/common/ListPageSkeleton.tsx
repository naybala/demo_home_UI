export default function ListPageSkeleton() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-white dark:bg-[#0f1114]">
      <div className="container mx-auto px-6">
        {/* Header skeleton */}
        <header className="mb-12">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4"></div>
          <div className="h-6 w-96 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
        </header>

        {/* Search/Filter bar skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700"
            >
              {/* Image skeleton */}
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

              {/* Content skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="flex items-center justify-between pt-2">
                  <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator */}
        <div className="fixed bottom-8 right-8 bg-white dark:bg-gray-800 px-6 py-4 rounded-full shadow-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-3">
          <div className="w-5 h-5 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Loading...
          </span>
        </div>
      </div>
    </main>
  );
}
