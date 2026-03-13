"use client";

import { useEffect, useState } from "react";
import { Slider } from "primereact/slider";
import { Category } from "../types/product.types";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  initialFilters: {
    minPrice?: number;
    maxPrice?: number;
    categoryId?: string | number;
  };
  onApply: (filters: {
    minPrice?: number;
    maxPrice?: number;
    categoryId?: string | number;
  }) => void;
  locale: string;
  t?: any;
}

export default function FilterSidebar({
  isOpen,
  onClose,
  categories,
  initialFilters,
  onApply,
  locale,
  t,
}: FilterSidebarProps) {
  const [minPrice, setMinPrice] = useState<number | "">(
    initialFilters.minPrice ?? "",
  );
  const [maxPrice, setMaxPrice] = useState<number | "">(
    initialFilters.maxPrice ?? "",
  );
  const [selectedCategory, setSelectedCategory] = useState<string | number>(
    initialFilters.categoryId ?? "",
  );

  // Sync state when opened
  useEffect(() => {
    if (isOpen) {
      setMinPrice(initialFilters.minPrice ?? "");
      setMaxPrice(initialFilters.maxPrice ?? "");
      setSelectedCategory(initialFilters.categoryId ?? "");
    }
  }, [isOpen, initialFilters]);

  // Sidebar transition styles
  const sidebarStyles = isOpen
    ? "translate-x-0 opacity-100"
    : "translate-x-full opacity-0";
  const backdropStyles = isOpen
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  const handleApply = () => {
    onApply({
      minPrice: minPrice !== "" ? Number(minPrice) : undefined,
      maxPrice: maxPrice !== "" ? Number(maxPrice) : undefined,
      categoryId: selectedCategory !== "" ? selectedCategory : undefined,
    });
    onClose();
  };

  const handleClear = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
    onApply({
      minPrice: undefined,
      maxPrice: undefined,
      categoryId: undefined,
    });
    onClose();
  };

  const dummyFilters = [
    // "SORT BY",
    // "COLOR",
    // "SIZE",
    // "CONCEPT",
    // "CUSTOMER GROUP",
    // "FIT",
    // "FUNCTION",
    // "PATTERN",
    // "PRODUCT TYPE",
    // "QUALITY",
    // "STYLE",
    // "FEATURE",
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${backdropStyles}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-all duration-300 ease-in-out flex flex-col ${sidebarStyles}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Price Range */}
            <details className="group" open>
              <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase">
                Price Range
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    className="w-4 h-4"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="mt-8 px-2">
                <div className="flex justify-between mb-6">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    MMK {(minPrice || 0).toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    MMK {(maxPrice || 10000000).toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[Number(minPrice) || 0, Number(maxPrice) || 10000000]}
                  onChange={(e) => {
                    const [min, max] = e.value as [number, number];
                    setMinPrice(min);
                    setMaxPrice(max);
                  }}
                  range
                  min={0}
                  max={10000000}
                  className="price-slider"
                />
              </div>
            </details>

            {/* Categories */}
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase">
                Categories
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    className="w-4 h-4"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === ""}
                    onChange={() => setSelectedCategory("")}
                    className="w-4 h-4 text-black border-gray-300 focus:ring-black dark:border-gray-600 dark:bg-gray-800"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    All Categories
                  </span>
                </label>
                {categories.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.id}
                      onChange={() => setSelectedCategory(cat.id)}
                      className="w-4 h-4 text-black border-gray-300 focus:ring-black dark:border-gray-600 dark:bg-gray-800"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {locale === "mm" ? cat.name : cat.name_other}
                    </span>
                  </label>
                ))}
              </div>
            </details>

            {/* Dummy Filters */}
            {dummyFilters.map((filter) => (
              <details key={filter} className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase">
                  {filter}
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                      className="w-4 h-4"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </summary>
              </details>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex gap-4">
            <button
              onClick={handleClear}
              className="flex-1 px-4 py-3 text-sm font-semibold tracking-widest uppercase border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors rounded-sm"
            >
              Clear All
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-3 text-sm font-semibold tracking-widest uppercase bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors rounded-sm"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
