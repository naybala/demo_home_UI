"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import {
  NestedCategory,
  Product,
} from "@/features/products/types/product.types";
import { useAuthStore } from "@/stores/auth";
import PriceTag from "../common/PriceTag";

interface MegaMenuDesktopProps {
  isOpen: boolean;
  onClose: () => void;
  categories: NestedCategory[];
  selectedCategory: NestedCategory | null;
  selectedSubCategory: { id: number; label: string; image: string } | null;
  changeCategory: (cat: NestedCategory) => void;
  setSelectedSubCategory: (sub: {
    id: number;
    label: string;
    image: string;
  }) => void;
  loading: boolean;
  products: Product[];
}

export default function MegaMenuDesktop({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  selectedSubCategory,
  changeCategory,
  setSelectedSubCategory,
  loading,
  products,
}: MegaMenuDesktopProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuthStore();
  const [showNext, setShowNext] = useState(false);

  const checkOverflow = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const hasOverflow = el.scrollWidth > el.clientWidth;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;

    setShowNext(hasOverflow && !isAtEnd);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(checkOverflow, 200);
    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [isOpen, products, checkOverflow]);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 450, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -450, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`hidden md:block fixed top-[64px] left-0 w-full z-40 bg-white dark:bg-[#0f1114] border-t border-gray-100 dark:border-gray-800 shadow-2xl transition-all duration-500 ease-in-out transform ${
        isOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto max-w-[1920px] py-16 px-10 min-h-[900px]">
        {/* Category Navigation */}
        <div className="flex items-center gap-12 mb-10 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => changeCategory(cat)}
              className={`text-[20px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border-b-2 py-3 ${
                selectedCategory?.id === cat.id
                  ? "text-red-600 border-red-600"
                  : "text-gray-400 border-transparent hover:text-black dark:hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sub-Category Pills */}
        {selectedCategory?.children && (
          <div className="flex flex-wrap items-center gap-4 mb-12">
            {selectedCategory.children.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-6 py-2.5 rounded-full border text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                  selectedSubCategory?.id === sub.id
                    ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-200 dark:shadow-red-900/30"
                    : "border-gray-100 dark:border-gray-800 hover:border-black dark:hover:border-white text-gray-500"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* Products Row */}
        <div className="relative flex-1 flex flex-col justify-center min-w-0">
          <div
            ref={scrollContainerRef}
            onScroll={checkOverflow}
            className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth items-start py-4"
          >
            {/* Hero card */}
            {loading ? (
              <div className="relative flex-shrink-0 w-[550px] aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl shadow-sm" />
            ) : (
              <div className="relative flex-shrink-0 w-[550px] aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden group rounded-xl shadow-sm">
                <img
                  src={selectedSubCategory?.image || "default"}
                  alt={selectedSubCategory?.label || "Category"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/70 transition-colors flex flex-col justify-end p-10">
                  <h4 className="text-white text-4xl font-black uppercase tracking-tighter leading-none mb-3">
                    {selectedSubCategory?.label}
                  </h4>
                  <p className="text-white/90 text-[11px] uppercase font-bold tracking-[0.4em]">
                    Discover the Collection
                  </p>
                </div>
              </div>
            )}

            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-72 h-[350px] bg-gray-200 dark:bg-gray-900 animate-pulse rounded-xl"
                />
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-72 group cursor-pointer relative pt-4"
                >
                  {/* Cover Photo Background */}
                  <div className="absolute top-0 left-0 w-full h-[65%] rounded-t-lg overflow-hidden z-0 shadow-sm border border-gray-100 dark:border-gray-800 transition-all group-hover:shadow-md">
                    <img
                      src={
                        product.cover_photo ||
                        "https://fastly.picsum.photos/id/250/200/300.jpg?hmac=igVdxs-AgITpHwPAZ80mpAfmhrGBvN_xThJlhp7vOqE"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-t-lg"
                    />
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent" />
                  </div>

                  {/* Top Text / Badge overlay */}
                  <div className="relative z-10 w-full flex items-center justify-center gap-2 pt-4 pb-2 px-4 text-white pointer-events-none">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M2 12h7M15 12h7" strokeLinecap="round" />
                    </svg>
                    <span className="text-[12px] font-black uppercase tracking-[0.2em] pt-0.5 truncate drop-shadow-md">
                      {product.name}
                    </span>
                  </div>

                  {/* Primary Product Image Overlapping */}
                  <div className="relative z-10 w-full aspect-[4/5] flex items-end justify-center pointer-events-none mt-[4.2rem]">
                    <img
                      src={product.primary_photo}
                      alt={product.name}
                      className="max-h-[90%] max-w-[85%] object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500"
                    />
                  </div>

                  {/* Price */}
                  {isAuthenticated() && (
                    <PriceTag
                      price={product.price}
                      discount_price={product.discount_price}
                      discount_percentage={product.discount_percentage}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full text-gray-300 italic py-20">
                No products available in this sub-category.
              </div>
            )}
          </div>

          {/* Prev / Next buttons */}
          {products.length > 3 && (
            <>
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-xl z-10 hover:bg-red-600 hover:text-white transition-all active:scale-95 group border border-gray-100 dark:border-gray-800"
                aria-label="Previous Products"
              >
                <i className="pi pi-chevron-left text-2xl text-gray-700 dark:text-gray-200 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
              </button>
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-xl z-10 hover:bg-red-600 hover:text-white transition-all active:scale-95 group border border-gray-100 dark:border-gray-800"
                aria-label="Next Products"
              >
                <i className="pi pi-chevron-right text-2xl text-gray-700 dark:text-gray-200 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 top-[64px] -z-10 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
    </div>
  );
}
