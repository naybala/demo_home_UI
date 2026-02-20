import Link from "next/link";
import { Product } from "../types/home.types";
import { useAuthStore } from "@/stores/auth";

interface CompactProductCardProps {
  product: Product;
  locale: string;
}

export default function CompactProductCard({
  product,
  locale,
}: CompactProductCardProps) {
  const { isAuthenticated } = useAuthStore();

  return (
    <Link href={`/${locale}/products/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4">
        <img
          src={product.primary_photo}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {locale === "mm" ? product.name_other : product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {product.category_names.join(", ")}
        </p>
        {isAuthenticated() && (
          <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {product.price} Ks
          </p>
        )}
      </div>
    </Link>
  );
}
