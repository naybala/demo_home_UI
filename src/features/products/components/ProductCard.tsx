"use client";

import { Product } from "../types/product.types";
import Link from "next/link";
import PriceTag from "@/components/common/PriceTag";

interface ProductCardProps {
  product: Product;
  locale: string;
  isAuthenticated: boolean;
  mounted: boolean;
}

export default function ProductCard({
  product,
  locale,
  isAuthenticated,
  mounted,
}: ProductCardProps) {
  const isMM = locale === "mm";
  const name = isMM ? product.name_other : product.name;

  return (
    <Link
      href={`/${locale}/products/${product.id}`}
      prefetch={true}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 block"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100 p-8">
        <img
          src={product.primary_photo}
          alt={name}
          className="absolute inset-0 w-full h-full object-fill transition-transform duration-500 group-hover:scale-110"
        />
        {product.category_names && product.category_names.length > 0 && (
          <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-400">
            {product.category_names[0]}
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-white line-clamp-2 min-h-[3.5rem]">
          {name}
        </h2>
        {mounted && isAuthenticated && (
          <PriceTag
            price={product.price}
            discount_price={product.discount_price}
            discount_percentage={product.discount_percentage}
          />
        )}
      </div>
    </Link>
  );
}
