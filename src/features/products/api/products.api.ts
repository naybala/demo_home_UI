import {
  CategoryResponse,
  ProductDetailResponse,
  ProductListResponse,
} from "../types/product.types";
import { apiServer } from "@/utils/api.server";
import { apiClient } from "@/utils/api.client";

const getFetcher = () =>
  typeof window !== "undefined" ? apiClient : apiServer;

export const ProductsAPI = {
  getProducts: async (
    page = 1,
    perPage = 12,
    categoryId?: string | number,
    search?: string,
  ): Promise<ProductListResponse> => {
    let url = `/products?page=${page}&per_page=${perPage}`;
    if (categoryId) url += `&category_id=${categoryId}`;
    if (search) url += `&search=${search}`;

    const fetcher = getFetcher();
    const res = await fetcher<ProductListResponse>(url, true, {
      // next: { revalidate: 60 },
    });
    return res;
  },

  getProduct: async (id: string | number): Promise<ProductDetailResponse> => {
    const fetcher = getFetcher();
    const res = await fetcher<ProductDetailResponse>(
      `/products/${id}`,
      true,
      // {
      //   next: { revalidate: 60 },
      // },
    );
    return res;
  },

  getCategories: async (): Promise<CategoryResponse> => {
    const fetcher = getFetcher();
    const res = await fetcher<CategoryResponse>("/fetch-all-categories", true, {
      next: { revalidate: 3600 },
    } as any);
    return res;
  },
};
