"use client";

import Link from "next/link";
import { Product } from "../types/home.types";
import { useState, useEffect, useCallback } from "react";

interface HeroBannerProps {
  banners: Product[];
  locale: string;
}

export default function HeroBanner({ banners, locale }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < banners.length - 1 ? prev + 1 : 0));
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : banners.length - 1));
  };

  // Handle auto-slide timer via CSS animation event
  // No manual setInterval needed as onAnimationEnd handles the trigger

  if (!banners || banners.length === 0) return null;

  return (
    <section
      className="relative h-[80vh] w-full overflow-hidden bg-black"
      id="home"
    >
      {/* Background Images with Cross-fade Transition */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentIndex
              ? "translate-x-0 z-0"
              : index < currentIndex
                ? "-translate-x-full z-0"
                : "translate-x-full z-0"
          }`}
        >
          <img
            src={banner.primary_photo}
            alt={banner.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-center px-6 pointer-events-none">
        {/* Using key to re-trigger animations on slide change */}
        <div
          key={currentIndex}
          className="max-w-4xl space-y-6 pointer-events-auto"
        >
          <h1 className="text-white text-2xl md:text-5xl font-black tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-8 duration-700">
            {locale === "mm"
              ? banners[currentIndex].name_other
              : banners[currentIndex].name}
          </h1>
          <p className="text-white text-lg md:text-xl font-medium animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            {locale === "mm"
              ? banners[currentIndex].name
              : banners[currentIndex].name_other}
          </p>
          <div className="pt-4 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
            <Link
              href={`/${locale}/products/${banners[currentIndex].id}`}
              className="inline-block bg-white text-black px-10 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors"
            >
              Buy now
            </Link>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? "bg-white w-8" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 right-8 hidden items-center gap-4 md:flex">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
          >
            <svg
              className="w-6 h-6 rotate-180"
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

          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative flex items-center justify-center z-20 cursor-pointer"
          >
            {/* Loading Indicator */}
            <svg className="w-20 h-20 -rotate-90 pointer-events-none overflow-visible">
              <circle
                cx="40"
                cy="40"
                r="30"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="4"
                fill="none"
              />
              <circle
                key={currentIndex}
                onAnimationEnd={nextSlide}
                cx="40"
                cy="40"
                r="30"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeDasharray="190"
                strokeDashoffset="190"
                className="animate-progress"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(255,255,255,0.6))",
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              />
            </svg>

            <button
              onClick={nextSlide}
              className="absolute p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-lg transition-all border border-white/10"
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
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
