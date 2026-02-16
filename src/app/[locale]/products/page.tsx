import { getDictionary } from "@/lib/get-dictionary";
import { ProductsAPI } from "@/features/products/api/products.api";
import ProductsClient from "@/features/products/components/ProductsClient";

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
