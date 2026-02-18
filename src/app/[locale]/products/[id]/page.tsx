import { getDictionary } from "@/lib/get-dictionary";
import { ProductsAPI } from "@/features/products/api/products.api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailCard } from "@/features/products/components/productDetailCard";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  try {
    const response = await ProductsAPI.getProduct(id);
    const product = response.data;

    const title = locale === "mm" ? product.name_other : product.name;
    // Description might contain HTML from a rich text editor, strip it for meta description
    const rawDescription =
      locale === "mm" ? product.description_other : product.description;
    const description = rawDescription?.replace(/<[^>]*>/g, "").slice(0, 160);
    const imageUrl = product.primary_photo;

    return {
      title: `${title} | Tha Dar Aung`,
      description: description,
      openGraph: {
        title: `${title} | Tha Dar Aung`,
        description: description,
        images: imageUrl ? [{ url: imageUrl }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Tha Dar Aung`,
        description: description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found | Tha Dar Aung",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getDictionary(locale as any, "product");

  let response;
  try {
    response = await ProductsAPI.getProduct(id);
  } catch (error) {
    notFound();
  }

  if (!response || !response.data) {
    notFound();
  }

  const product = response.data;

  return (
    <main className="pt-32 min-h-screen px-4 pb-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-[90rem] mx-auto">
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors group"
        >
          <i className="pi pi-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
          Back to Products
        </Link>

        <ProductDetailCard product={product} locale={locale} />
      </div>
    </main>
  );
}
