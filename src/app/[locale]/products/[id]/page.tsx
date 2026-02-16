import { getDictionary } from "@/lib/get-dictionary";
import { ProductsAPI } from "@/features/products/api/products.api";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductDetailCard } from "@/components/products/productDetailCard";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getDictionary(locale as any, "product");

  let product;
  try {
    product = await ProductsAPI.getProduct(id);
  } catch (error) {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <main className="pt-32 min-h-screen px-4 pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors group"
        >
          <i className="pi pi-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
          Back to Products
        </Link>

        <ProductDetailCard product={product} />
      </div>
    </main>
  );
}
