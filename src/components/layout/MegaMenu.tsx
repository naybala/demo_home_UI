"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  // Animated category switch: fade-out → swap → fade-in
  const changeCategory = (cat: NestedCategory) => {
    if (selectedCategory?.id === cat.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(cat);
      setSelectedSubCategory(
        cat.children && cat.children.length > 0 ? cat.children[0] : null,
      );
      setIsTransitioning(false);
    }, 180);
  };

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
      setTimeout(() => {
        setLoading(false);
      }, 100);
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
    <>
      {/* ── MOBILE MEGA MENU (< md) ───────────────────────── */}
      <div
        className={`md:hidden fixed inset-0 top-[64px] z-40 bg-white dark:bg-[#0f1114] flex flex-col transition-all duration-500 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        {/* ── Category tabs (horizontal scrollable pills) */}
        <div className="flex gap-3 px-4 pt-5 pb-3 overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-gray-800 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => changeCategory(cat)}
              className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all border ${
                selectedCategory?.id === cat.id
                  ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-200 dark:shadow-red-900/30"
                  : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Sub-category pills */}
        {selectedCategory?.children && (
          <div className="flex gap-2 px-4 py-3 overflow-x-auto no-scrollbar shrink-0 border-b border-gray-100 dark:border-gray-800">
            {selectedCategory.children.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-4 py-1.5 rounded-full border text-[9px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                  selectedSubCategory?.id === sub.id
                    ? "bg-red-600 border-red-600 text-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-500"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 pb-8">
          {/* Hero image */}
          <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden mt-4 mb-5 shadow-md">
            <img
              src={selectedSubCategory?.image || "default"}
              alt={selectedSubCategory?.label || "Category"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-5">
              <h4 className="text-white text-2xl font-black uppercase tracking-tight leading-none mb-1">
                {selectedSubCategory?.label}
              </h4>
              <p className="text-white/80 text-[9px] uppercase font-bold tracking-[0.35em]">
                Discover the Collection
              </p>
            </div>
          </div>

          {/* Product grid — 2 columns */}
          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full aspect-[4/5] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="aspect-[4/5] bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-3 mb-2 rounded-xl border border-transparent group-active:border-gray-200 dark:group-active:border-gray-700 transition-all">
                    <img
                      src={product.primary_photo}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h5 className="text-center font-black uppercase tracking-[0.15em] text-[10px] group-active:text-red-600 transition-colors px-1 truncate">
                    {product.name}
                  </h5>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-300 italic text-sm">
              No products available.
            </div>
          )}
        </div>
      </div>

      {/* ── DESKTOP MEGA MENU (≥ md) ─────────────────────── */}
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
              className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth items-center py-4"
            >
              {/* Hero card */}
              <div className="relative flex-shrink-0 w-[450px] aspect-square bg-gray-50 dark:bg-gray-900 overflow-hidden group rounded-xl shadow-sm">
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
                    className="flex-shrink-0 w-72 group cursor-pointer"
                  >
                    <div className="aspect-[4/5] bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-5 mb-4 group-hover:bg-gray-100 dark:group-hover:bg-gray-800/50 transition-all rounded-xl border border-transparent group-hover:border-gray-100 dark:group-hover:border-gray-800">
                      <img
                        src={product.primary_photo}
                        alt={product.name}
                        className="max-h-full max-w-full rounded-lg object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
                      />
                    </div>
                    <h5 className="text-center font-black uppercase tracking-[0.2em] text-[13px] group-hover:text-red-600 transition-colors px-4 truncate">
                      {product.name}
                    </h5>
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
    </>
  );
}
