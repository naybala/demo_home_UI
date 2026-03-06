"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { ProductsAPI } from "@/features/products/api/products.api";
import {
  NestedCategory,
  Product,
} from "@/features/products/types/product.types";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  t: any;
}

export default function MegaMenu({ isOpen, onClose, t }: MegaMenuProps) {
  const [categories, setCategories] = useState<NestedCategory[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<NestedCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<{
    id: number;
    label: string;
    image: string;
  } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Body Scroll Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.setProperty("overflow", "hidden", "important");
      document.documentElement.style.setProperty(
        "overflow",
        "hidden",
        "important",
      );
    } else {
      document.body.style.setProperty("overflow", "unset", "");
      document.documentElement.style.setProperty("overflow", "unset", "");
    }
    return () => {
      document.body.style.setProperty("overflow", "unset", "");
      document.documentElement.style.setProperty("overflow", "unset", "");
    };
  }, [isOpen]);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await ProductsAPI.getNestedCategories();
        if (res.code === 200) {
          setCategories(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Auto-select first category and sub-category on first open
  useEffect(() => {
    if (isOpen && categories.length > 0 && !selectedCategory) {
      const firstCat = categories[0];
      setSelectedCategory(firstCat);
      if (firstCat.children && firstCat.children.length > 0) {
        setSelectedSubCategory(firstCat.children[0]);
      }
    }
  }, [isOpen, categories, selectedCategory]);

  // Fetch products when sub-category changes (Limit to 10 for better coverage)
  const fetchProducts = useCallback(async (subId: number) => {
    setLoading(true);
    try {
      const res = await ProductsAPI.getProducts(1, 10, subId);
      if (res.code === 200) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedSubCategory) {
      fetchProducts(selectedSubCategory.id);
    }
  }, [selectedSubCategory, fetchProducts]);

  // Handle Button Visibility - Guaranteed for > 1 products
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
    console.log("scrollRight");
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 450, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed top-[64px] left-0 w-full z-40 bg-white dark:bg-[#0f1114] border-t border-gray-100 dark:border-gray-800 shadow-2xl transition-all duration-500 ease-in-out transform ${
        isOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="container mx-auto max-w-[1700px] py-16 px-10 lg:min-h-[800px]">
        {/* Category Navigation (Horizontal Bars) */}
        <div className="flex items-center gap-12 mb-10 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat);
                if (cat.children && cat.children.length > 0) {
                  setSelectedSubCategory(cat.children[0]);
                } else {
                  setSelectedSubCategory(null);
                }
              }}
              className={`text-[12px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border-b-2 py-3 ${
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

        {/* Selection Area: Image + Product Line */}
        <div className="relative flex items-stretch gap-12 overflow-visible">
          {/* 1. Category Image (First Item) */}
          <div className="relative flex-shrink-0 w-[450px] aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden group rounded-xl shadow-sm">
            <img
              src={selectedSubCategory?.image || ""} // Fallback to empty if no image
              alt={selectedSubCategory?.label || "Category"}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

          {/* 2. Products Line (Scrollable) */}
          <div className="relative flex-1 flex flex-col justify-center overflow-visible pr-20">
            <div
              ref={scrollContainerRef}
              onScroll={checkOverflow}
              className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth items-center py-4"
            >
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-72 h-[450px] bg-gray-50 dark:bg-gray-900 animate-pulse rounded-xl"
                  ></div>
                ))
              ) : products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-72 group cursor-pointer"
                  >
                    <div className="aspect-[4/5] bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8 mb-4 group-hover:bg-gray-100 dark:group-hover:bg-gray-800/50 transition-all rounded-xl border border-transparent group-hover:border-gray-100 dark:group-hover:border-gray-800">
                      <img
                        src={product.primary_photo}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                      />
                    </div>
                    <h5 className="text-center font-black uppercase tracking-[0.2em] text-[13px] group-hover:text-red-600 transition-colors px-4 truncate">
                      {product.name}
                    </h5>
                    <p className="text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.price}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center w-full text-gray-300 italic py-20">
                  No products available in this sub-category.
                </div>
              )}
            </div>

            {/* Next Button - Ultra Visible & Center-Aligned */}
            {showNext && (
              <button
                onClick={scrollRight}
                className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(220,38,38,0.7)] z-[999] hover:bg-black transition-all active:scale-95 group border-4 border-white dark:border-gray-900 animate-pulse-subtle"
                aria-label="Next Products"
              >
                <i className="pi pi-chevron-right text-3xl font-black group-hover:translate-x-2 transition-transform"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Close Overlay when background clicked */}
      <div
        className={`fixed inset-0 top-[64px]  -z-10 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
    </div>
  );
}
