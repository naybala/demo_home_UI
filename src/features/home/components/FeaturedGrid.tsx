import Link from "next/link";
import { Product } from "../types/home.types";

interface FeaturedGridProps {
  products: Product[];
  locale: string;
  title: string;
}

export default function FeaturedGrid({
  products,
  locale,
  title,
}: FeaturedGridProps) {
  if (!products || products.length === 0) return null;

  // Nike style featured grid (usually 2x2 or 2 big containers)
  return (
    <section className="py-12 px-2 " id="feature">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {products.slice(0, 4).map((product) => (
          <div
            key={product.id}
            className="relative group aspect-square md:aspect-[4/5] overflow-hidden bg-gray-100 "
          >
            <img
              src={product.primary_photo}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

            <div className="absolute bottom-10 left-10 space-y-4">
              <h3 className="text-white text-xl font-bold tracking-tight">
                {locale === "mm" ? product.name_other : product.name}
              </h3>
              <Link
                href={`/${locale}/products/${product.id}`}
                className="inline-block bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
              >
                Shop
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
