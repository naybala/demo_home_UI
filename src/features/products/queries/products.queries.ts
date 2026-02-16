import { useQuery } from "@tanstack/react-query";
import { ProductsAPI } from "../api/products.api";
import { Product, ProductList } from "../types/product.types";

export const PRODUCT_KEYS = {
  all: ["products"] as const,
  list: () => [...PRODUCT_KEYS.all, "list"] as const,
  details: () => [...PRODUCT_KEYS.all, "detail"] as const,
  detail: (id: string | number) => [...PRODUCT_KEYS.details(), id] as const,
};

export const useProducts = (initialData?: ProductList) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(),
    queryFn: () => ProductsAPI.getProducts(),
    initialData,
  });
};

export const useProductDetail = (
  id: string | number,
  initialData?: Product,
) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => ProductsAPI.getProduct(id),
    enabled: !!id,
    initialData,
  });
};
