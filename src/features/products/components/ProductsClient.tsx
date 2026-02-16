"use client";

import { useProducts } from "../queries/products.queries";
import ContentLoader from "@/components/common/ContentLoader";
import Link from "next/link";
import Image from "next/image";
import { ProductList } from "../types/product.types";
import { useEffect, useState } from "react";

interface ProductsClientProps {
  locale: string;
  t: any;
  initialData?: ProductList;
}

export default function ProductsClient({
  locale,
  t,
  initialData,
}: ProductsClientProps) {
  const [mounted, setMounted] = useState(false);
  const { data: products, isLoading, error } = useProducts(initialData);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use either the fetched data or the initial server-provided data
  // This ensures that during hydration, we render exactly what the server did.
  const displayProducts = products || initialData;

  // We should NOT return early for isLoading or error during the first render (hydration)
  // because the server-rendered HTML (which contains the list) must match the client-render.
  // After mounting, it is safe to show error or loading states if no data is present.

  if (mounted && error && !displayProducts) {
    return (
      <div className="pt-32 min-h-screen px-4 pb-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Error loading products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
        </div>
      </div>
    );
  }

  // Only show the loader if we are mounted, it's loading, AND we have no data at all
  if (mounted && isLoading && !displayProducts) {
    return <ContentLoader message="Loading products..." />;
  }

  return (
    <main className="pt-32 min-h-screen px-4 pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            {t["product-title"]}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t["product-description"]}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayProducts?.map((product) => (
            <Link
              key={product.id}
              href={`/${locale}/products/${product.id}`}
              prefetch={true}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 block"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100 p-8">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                  priority={product.id <= 4}
                />
                <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400">
                  {product.category}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-white line-clamp-2 min-h-[3.5rem]">
                  {product.title}
                </h2>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <i className="pi pi-star-fill text-yellow-400 mr-1"></i>
                    <span>
                      {product.rating?.rate} ({product.rating?.count})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
