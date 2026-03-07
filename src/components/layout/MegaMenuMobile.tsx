"use client";

import {
  NestedCategory,
  Product,
} from "@/features/products/types/product.types";

interface MegaMenuMobileProps {
  isOpen: boolean;
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

export default function MegaMenuMobile({
  isOpen,
  categories,
  selectedCategory,
  selectedSubCategory,
  changeCategory,
  setSelectedSubCategory,
  loading,
  products,
}: MegaMenuMobileProps) {
  return (
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
        {loading ? (
          <div
            key={1}
            className="w-full aspect-[4/5] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"
          />
        ) : (
          <>
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
          </>
        )}

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
              <div
                key={product.id}
                className="group cursor-pointer relative pt-2 shadow-xl"
              >
                {/* Cover Photo Background */}
                <div className="absolute top-0 left-0 w-full h-[65%] rounded-t-lg overflow-hidden z-0 shadow-sm border border-gray-100 dark:border-gray-800 transition-all">
                  <img
                    src={
                      product.cover_photo ||
                      "https://fastly.picsum.photos/id/250/200/300.jpg?hmac=igVdxs-AgITpHwPAZ80mpAfmhrGBvN_xThJlhp7vOqE"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-active:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/60 to-transparent" />
                </div>

                {/* Top Text / Badge overlay */}
                <div className="relative z-10 w-full flex items-center justify-center gap-1.5 pt-3 pb-2 px-2 text-white pointer-events-none">
                  <svg
                    className="w-3 h-3 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M2 12h7M15 12h7" strokeLinecap="round" />
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] pt-0.5 truncate drop-shadow-md">
                    {product.name}
                  </span>
                </div>

                {/* Primary Product Image Overlapping */}
                <div className="relative z-10 w-full aspect-[4/5] flex items-end justify-center pointer-events-none mt-2">
                  <img
                    src={product.primary_photo}
                    alt={product.name}
                    className="max-h-[90%] max-w-[85%] object-contain drop-shadow-2xl group-active:scale-110 group-active:-translate-y-1 transition-all duration-500"
                  />
                </div>
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
  );
}
