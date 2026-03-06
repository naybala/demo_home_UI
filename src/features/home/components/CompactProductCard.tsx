import Link from "next/link";
import { Product } from "../types/home.types";
import { useAuthStore } from "@/stores/auth";

interface CompactProductCardProps {
  product: Product;
  locale: string;
  isBg?: boolean;
}

export default function CompactProductCard({
  product,
  locale,
  isBg,
}: CompactProductCardProps) {
  const { isAuthenticated } = useAuthStore();

  if (isBg) {
    return (
      <Link href={`/${locale}/products/${product.id}`} className="block">
        <div className="group cursor-pointer relative pt-4">
          {/* Cover Photo Background */}
          <div className="absolute top-0 left-0 w-full h-[65%] rounded-t-lg overflow-hidden z-0 shadow-sm border border-gray-100/20 transition-all group-hover:shadow-md">
            <img
              src={
                product.cover_photo ||
                "https://fastly.picsum.photos/id/250/200/300.jpg?hmac=igVdxs-AgITpHwPAZ80mpAfmhrGBvN_xThJlhp7vOqE"
              }
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 rounded-t-lg"
            />
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/60 to-transparent" />
          </div>

          {/* Top Text / Badge overlay */}
          <div className="relative z-10 w-full flex items-center justify-center gap-2 pt-4 pb-2 px-4 text-white pointer-events-none">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M2 12h7M15 12h7" strokeLinecap="round" />
            </svg>
            <span className="text-[12px] font-black uppercase tracking-[0.2em] pt-0.5 truncate drop-shadow-md">
              {locale === "mm" ? product.name_other : product.name}
            </span>
          </div>

          {/* Primary Product Image Overlapping */}
          <div className="relative z-10 w-full aspect-[4/5] flex items-end justify-center pointer-events-none mt-2">
            <img
              src={product.primary_photo}
              alt={product.name}
              className="max-h-[90%] max-w-[85%] object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500"
            />
          </div>
        </div>
      </Link>
    );
  }

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
