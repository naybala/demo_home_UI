"use client";
import { Product } from "@/features/products/types/product.types";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";

export const ProductDetailCard = ({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) => {
  const [activePhoto, setActivePhoto] = useState(product.primary_photo);
  const { isAuthenticated } = useAuthStore();

  const isMM = locale === "mm";
  const name = isMM ? product.name_other : product.name;
  let description = isMM ? product.description_other : product.description;

  // Fix relative URLs in Quill content (e.g., /storage/...)
  const fixQuillUrls = (content: string) => {
    if (!content) return "";
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    try {
      const url = new URL(apiUrl);
      const origin = url.origin;
      // Replace src="/storage/..." with src="http://127.0.0.1:8000/storage/..."
      return content.replace(/src="\/storage\//g, `src="${origin}/storage/`);
    } catch (e) {
      return content;
    }
  };

  const formattedDescription = fixQuillUrls(description);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-gray-200 dark:bg-gray-700/50 p-6 md:p-12 flex flex-col gap-6">
          <div className="relative w-full aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
            <img
              src={activePhoto}
              alt={name}
              className="absolute inset-0 w-full h-full object-contain p-4 transition-all duration-300"
            />
          </div>

          {/* Photo Gallery */}
          {product.photos && product.photos.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {product.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setActivePhoto(photo)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activePhoto === photo
                      ? "border-blue-500 scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={photo}
                    alt={`${name} ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-10 flex flex-col justify-center">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {product.category_names.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white leading-tight mb-4">
              {name}
            </h1>
          </div>

          <div className="mb-10">
            <div
              className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: formattedDescription }}
            />
            {isAuthenticated() && (
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
                  {product.price} Ks
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-auto">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 transition-all active:scale-95 flex items-center justify-center">
              <i className="pi pi-shopping-cart mr-2"></i>
              Add to Cart
            </button>
            <button className="bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-600 dark:hover:border-indigo-400 text-gray-800 dark:text-white font-bold py-4 px-8 rounded-2xl transition-all active:scale-95 flex items-center justify-center">
              <i className="pi pi-heart mr-2"></i>
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
