"use client";

import {
  useCategories,
  useInfiniteProducts,
} from "../queries/products.queries";
import ContentLoader from "@/components/common/ContentLoader";
import Link from "next/link";
import { ProductListResponse } from "../types/product.types";
import { useEffect, useRef, useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import SingleSelect from "@/components/common/SingleSelect";
import { useDebounce } from "../../../hooks/use-debounce";

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

  // Filter states
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | number>("");
  const debouncedSearch = useDebounce(search, 500);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts(initialData, {
    categoryId,
    search: debouncedSearch,
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

  const handleSearch = () => {
    // Search is handled by debouncedSearch, but we can trigger it manually if needed
  };

  const handleClear = () => {
    setSearch("");
    setCategoryId("");
  };

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
    <main className="pt-32 min-h-screen px-4 pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <SearchBar
            searchValue={search}
            onSearchChange={setSearch}
            onSearch={handleSearch}
            onClear={handleClear}
            showClearButton={!!search || !!categoryId}
            isLoading={isLoading}
            placeholder={t.search_placeholder || "Search products..."}
          >
            <SingleSelect
              data={categoriesData?.data || []}
              selectedValue={categoryId}
              onValueChange={setCategoryId}
              valueKey="id"
              labelKey={locale === "mm" ? "name" : "name_other"}
              placeholder={t.category_placeholder || "Category"}
              emptyText={t.all_categories || "All Categories"}
              isLoading={isLoadingCategories}
              className="w-full md:w-64"
            />
          </SearchBar>
        </header>

        {mounted && isLoading && allProducts.length === 0 ? (
          <ContentLoader message="Loading products..." />
        ) : allProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">
              No products foundmatching your criteria
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allProducts.map((product) => {
              const isMM = locale === "mm";
              const name = isMM ? product.name : product.name_other;

              return (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.id}`}
                  prefetch={true}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 block"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100 p-8">
                    <img
                      src={product.primary_photo}
                      alt={name}
                      className="absolute inset-0 w-full h-full object-fill transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {product.category_names[0]}
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-white line-clamp-2 min-h-[3.5rem]">
                      {name}
                    </h2>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                        {product.price} Ks
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
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
  );
}
