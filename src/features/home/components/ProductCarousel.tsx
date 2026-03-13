"use client";

import { Product } from "../types/home.types";
import CompactProductCard from "./CompactProductCard";
import { useRef } from "react";
import Link from "next/link";
import "./productCard.css";
import localFont from "next/font/local";

interface ProductCarouselProps {
  products: Product[];
  locale: string;
  title: string;
  id: string;
  isBg?: boolean;
}

const myFont = localFont({
  src: "../../../../public/fonts/Matemasie-Regular.ttf",
});

export default function ProductCarousel({
  products,
  locale,
  title,
  id,
  isBg,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!products || products.length === 0) return null;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section
      className={
        isBg
          ? "py-24 bg-red-500 border-t border-gray-100 dark:border-gray-800 px-6 md:px-10 bg-image relative min-h-[600px] flex items-center overflow-hidden"
          : "py-12 px-6  dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
      }
      id={id}
    >
      {isBg ? (
        /* Title Overlay for Background Mode - Lower Z-Index so products cover it */
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none z-0 hidden md:flex items-center px-10 md:px-24">
          <div className="md:max-w-[45%] pointer-events-auto">
            {isBg ? (
              <h2
                className={`ms-6 text-2xl md:text-8xl font-black text-red-600  leading-none mb-10 tracking-tighter drop-shadow-2xl ${myFont.className}`}
              >
                {title}
              </h2>
            ) : (
              <h2 className="text-6xl md:text-8xl font-black text-white uppercase leading-none mb-10 tracking-tighter drop-shadow-2xl">
                {title}
              </h2>
            )}
            <Link
              href={`/${locale}/products`}
              className="text-white font-black uppercase tracking-[0.2em] text-[13px] flex items-center gap-3 hover:gap-5 transition-all group drop-shadow-lg"
            >
              <span></span>
            </Link>
          </div>
        </div>
      ) : (
        /* Standard Header */
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white uppercase tracking-tight italic">
            {title}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-5 h-5 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Carousel Container - Higher Z-Index and pointer-events-none to allow clicks through the spacer */}
      <div className="relative w-full z-10 pointer-events-none">
        {isBg && (
          <div className="md:hidden mb-10 pointer-events-auto">
            <h2 className="text-4xl font-black text-gray-900 uppercase leading-none mb-4 tracking-tighter">
              {title}
            </h2>
            <Link
              href={`/${locale}/products`}
              className="text-red-600 font-black uppercase tracking-[0.2em] text-[11px] flex items-center gap-2"
            >
              <i className="pi pi-minus text-[10px]"></i>
              <span>View all</span>
            </Link>
          </div>
        )}

        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 pointer-events-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {isBg && (
            <div className="hidden md:block w-1/2 flex-none pointer-events-none snap-start" />
          )}
          {products.map((product) => (
            <div
              key={product.id}
              className={`snap-start shrink-0 pointer-events-auto ${
                isBg
                  ? "w-[85vw] md:w-[450px]"
                  : "min-w-[280px] md:min-w-[350px]"
              }`}
            >
              <CompactProductCard
                product={product}
                locale={locale}
                isBg={isBg}
              />
            </div>
          ))}
        </div>

        {/* Overlay Scroll Buttons for Background Mode */}
        {isBg && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 dark:bg-gray-800 backdrop-blur rounded-full shadow-xl z-20 hover:bg-red-600 hover:text-white transition-all active:scale-90 hidden md:flex md:items-center md:justify-center ml-4 pointer-events-auto border border-gray-100 dark:border-gray-800"
            >
              <i className="pi pi-chevron-left text-xl"></i>
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 
              dark:bg-gray-800 backdrop-blur rounded-full shadow-xl z-20 hover:bg-red-600 hover:text-white transition-all active:scale-90 hidden md:flex md:items-center md:justify-center mr-4 pointer-events-auto border border-gray-100 dark:border-gray-800"
            >
              <i className="pi pi-chevron-right text-xl"></i>
            </button>
          </>
        )}
      </div>

      {!isBg && (
        <div className="mt-8 flex justify-center">
          <Link
            href={`/${locale}/products`}
            className="text-[#2D4356] dark:text-gray-300 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group"
          >
            <span>See All Products</span>
            <i className="pi pi-arrow-right text-sm transition-transform group-hover:translate-x-1"></i>
          </Link>
        </div>
      )}
    </section>
  );
}
