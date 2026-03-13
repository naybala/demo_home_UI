"use client";

import { Product } from "../types/product.types";
import ProductCard from "./ProductCard";
import { useAuthStore } from "@/stores/auth";
import { useEffect, useState } from "react";

interface RelatedProductsProps {
  products: Product[];
  locale: string;
}

export const RelatedProducts = ({ products, locale }: RelatedProductsProps) => {
  const { isAuthenticated } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="mt-20 border-t border-gray-100 dark:border-gray-800 pt-20">
      <h2 className="text-xl lg:text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase mb-10">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            locale={locale}
            isAuthenticated={isAuthenticated()}
            mounted={mounted}
          />
        ))}
      </div>
    </section>
  );
};
