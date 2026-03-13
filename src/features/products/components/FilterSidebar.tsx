"use client";

import { useEffect, useState } from "react";
import { Slider } from "primereact/slider";
import { Category } from "../types/product.types";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  totalProducts: number;
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
  totalProducts,
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
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  // Sync state when opened
  useEffect(() => {
    if (isOpen) {
      setMinPrice(initialFilters.minPrice ?? "");
      setMaxPrice(initialFilters.maxPrice ?? "");
      setSelectedCategory(initialFilters.categoryId ?? "");
      setActiveSubMenu(null); // Reset sub-menu on open
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

  const currentCategoryLabel =
    selectedCategory === ""
      ? "All Categories"
      : categories.find((cat) => cat.id === selectedCategory)?.[
          locale === "mm" ? "name" : "name_other"
        ] || "All Categories";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${backdropStyles}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[400px] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${sidebarStyles}`}
      >
        {/* Main Menu View */}
        <div
          className={`absolute inset-0 flex flex-col transition-transform duration-300 ease-in-out ${
            activeSubMenu ? "-translate-x-full" : "translate-x-0"
          }`}
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

              {/* Categories Trigger */}
              <div
                className="flex items-center justify-between cursor-pointer py-2 group"
                onClick={() => setActiveSubMenu("categories")}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase">
                    Categories
                  </span>
                  <span className="text-xs text-gray-400 uppercase mt-0.5">
                    {currentCategoryLabel}
                  </span>
                </div>
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
                  className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                >
                  <path d="M9 18l6-6-6-6"></path>
                </svg>
              </div>

              {/* Other Dummy Filters (Placeholder) */}
              {[
                "Color",
                "Size",
                "Fit",
                "Function",
                "Pattern",
                "Material",
                "Style",
              ].map((filter) => (
                <div
                  key={filter}
                  className="flex items-center justify-between cursor-pointer py-2 opacity-50 pointer-events-none"
                >
                  <span className="text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase">
                    {filter}
                  </span>
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
                    className="w-4 h-4 text-gray-400"
                  >
                    <path d="M9 18l6-6-6-6"></path>
                  </svg>
                </div>
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

        {/* Categories Sub-Menu View */}
        <div
          className={`absolute inset-0 flex flex-col bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out ${
            activeSubMenu === "categories" ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveSubMenu(null)}
                className="p-1 -ml-1 text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h2 className="text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase">
                Categories
              </h2>
            </div>
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

          {/* Body - Radio List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-medium text-gray-900 dark:text-white uppercase">
                All Categories
              </span>
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="category_sub"
                  checked={selectedCategory === ""}
                  onChange={() => setSelectedCategory("")}
                  className="peer appearance-none w-6 h-6 rounded-full border border-gray-300 checked:border-black dark:border-gray-600 dark:checked:border-white transition-all cursor-pointer"
                />
                <div className="absolute w-3 h-3 bg-black dark:bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
              </div>
            </label>

            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center justify-between cursor-pointer group"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white uppercase">
                  {locale === "mm" ? cat.name : cat.name_other}
                </span>
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="category_sub"
                    checked={selectedCategory === cat.id}
                    onChange={() => setSelectedCategory(cat.id)}
                    className="peer appearance-none w-6 h-6 rounded-full border border-gray-300 checked:border-black dark:border-gray-600 dark:checked:border-white transition-all cursor-pointer"
                  />
                  <div className="absolute w-3 h-3 bg-black dark:bg-white rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                </div>
              </label>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="text-center mb-6">
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Showing {totalProducts} Products
              </p>
            </div>
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
      </div>
    </>
  );
}
