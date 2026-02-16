import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ProductsAPI } from "../api/products.api";
import {
  ProductDetailResponse,
  ProductListResponse,
} from "../types/product.types";

export const PRODUCT_KEYS = {
  all: ["products"] as const,
  list: () => [...PRODUCT_KEYS.all, "list"] as const,
  infiniteList: () => [...PRODUCT_KEYS.list(), "infinite"] as const,
  details: () => [...PRODUCT_KEYS.all, "detail"] as const,
  detail: (id: string | number) => [...PRODUCT_KEYS.details(), id] as const,
};

export const useProducts = (initialData?: ProductListResponse) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(),
    queryFn: () => ProductsAPI.getProducts(),
    initialData,
  });
};

export const useInfiniteProducts = (initialData?: ProductListResponse) => {
  return useInfiniteQuery({
    queryKey: PRODUCT_KEYS.infiniteList(),
    queryFn: ({ pageParam = 1 }) => ProductsAPI.getProducts(pageParam, 8),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const meta = lastPage.data.meta;
      return meta.current_page < meta.last_page
        ? meta.current_page + 1
        : undefined;
    },
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
  });
};

export const useProductDetail = (
  id: string | number,
  initialData?: ProductDetailResponse,
) => {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => ProductsAPI.getProduct(id),
    enabled: !!id,
    initialData,
  });
};
