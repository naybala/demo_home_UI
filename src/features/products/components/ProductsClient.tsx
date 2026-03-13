"use client";

import {
  useCategories,
  useInfiniteProducts,
} from "../queries/products.queries";
import ContentLoader from "@/components/common/ContentLoader";
import Link from "next/link";
import { ProductListResponse } from "../types/product.types";
import { useEffect, useRef, useState } from "react";
import FilterSidebar from "./FilterSidebar";
import { useAuthStore } from "@/stores/auth";
import ProductCard from "./ProductCard";

interface ProductsClientProps {
  locale: string;
  t: any;
  initialData?: ProductListResponse;
}

export default function ProductsClient({
  locale,
  t,
  initialData,
}: ProductsClientProps) {
  const [mounted, setMounted] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuthStore();

  // Search/Filter states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | number>("");
  const [activeMinPrice, setActiveMinPrice] = useState<number | undefined>();
  const [activeMaxPrice, setActiveMaxPrice] = useState<number | undefined>();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts(initialData, {
    categoryId: activeCategoryId,
    minPrice: activeMinPrice,
    maxPrice: activeMaxPrice,
  });

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [mounted, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all products from all pages
  const allProducts = data?.pages.flatMap((page) => page.data.data) || [];

  // handle functions removed

  if (mounted && isError && allProducts.length === 0) {
    return (
      <div className="pt-32 min-h-screen px-4 pb-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Error loading products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 pt-20">
        <img
          src="https://media.tudorwatch.com/image/upload/q_auto/f_auto/c_limit,w_1920/v1/tudorwatch/watches/collection/family-banners/tudorwatch-collection-black-bay-chrono-banner-bpm"
          alt=""
          className="h-80 w-full object-cover"
        />
      </div>
      <main className=" min-h-screen px-4 pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer text-sm font-semibold tracking-wider text-gray-900 dark:text-gray-100 uppercase"></div>
            <div
              className="flex items-center gap-2 cursor-pointer text-sm font-semibold tracking-wider text-gray-900 dark:text-gray-100 uppercase"
              onClick={() => setIsSidebarOpen(true)}
            >
              FILTERS
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </header>

          <FilterSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            categories={categoriesData?.data || []}
            totalProducts={allProducts.length}
            initialFilters={{
              categoryId: activeCategoryId,
              minPrice: activeMinPrice,
              maxPrice: activeMaxPrice,
            }}
            onApply={(filters) => {
              setActiveCategoryId(filters.categoryId ?? "");
              setActiveMinPrice(filters.minPrice);
              setActiveMaxPrice(filters.maxPrice);
            }}
            locale={locale}
            t={t}
          />

          {mounted && isLoading && allProducts.length === 0 ? (
            <ContentLoader message="Loading products..." />
          ) : allProducts.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                No products found matching your criteria
              </h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {allProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                  isAuthenticated={isAuthenticated()}
                  mounted={mounted}
                />
              ))}
            </div>
          )}

          {/* Intersection Observer Trigger */}
          <div
            ref={observerRef}
            className="w-full h-20 flex items-center justify-center mt-8"
          >
            {isFetchingNextPage && (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  Fetching more products...
                </p>
              </div>
            )}
            {!hasNextPage && !isLoading && allProducts.length > 0 && (
              <p className="text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-800 px-6 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                You've seen all products
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
