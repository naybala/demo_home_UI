import { getDictionary } from "@/lib/get-dictionary";
import { ProductsAPI } from "@/features/products/api/products.api";
import ProductsClient from "@/features/products/components/ProductsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Tha Dar Aung",
  description: "Browse our latest products and collections at Tha Dar Aung.",
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as any, "product");
  const products = await ProductsAPI.getProducts();

  return <ProductsClient locale={locale} t={t} initialData={products} />;
}
