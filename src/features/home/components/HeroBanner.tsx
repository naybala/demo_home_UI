"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/home.types";
import { useState, useEffect, useCallback } from "react";

interface HeroBannerProps {
  banners: Product[];
  locale: string;
}

export default function HeroBanner({ banners, locale }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev < banners.length - 1 ? prev + 1 : 0));
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : banners.length - 1));
  };

  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide, banners.length, currentIndex]);

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
          <Image
            src={banner.primary_photo}
            alt={banner.name}
            fill
            priority={index === 0}
            className="object-cover object-center"
            quality={100}
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
          <h1 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic animate-in fade-in slide-in-from-bottom-8 duration-700">
            {banners[currentIndex].name}
          </h1>
          <p className="text-white text-lg md:text-xl font-medium animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            {banners[currentIndex].name_other}
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
        <div className="absolute bottom-8 right-8 hidden gap-4 md:flex">
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
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
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
      )}
    </section>
  );
}
