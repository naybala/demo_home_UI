import {
  CategoryResponse,
  ProductDetailResponse,
  ProductListResponse,
} from "../types/product.types";
import { apiServer } from "@/utils/api.server";

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

    const res = await apiServer<ProductListResponse>(url, false, {
      next: { revalidate: 60 },
    });
    return res;
  },

  getProduct: async (id: string | number): Promise<ProductDetailResponse> => {
    const res = await apiServer<ProductDetailResponse>(
      `/products/${id}`,
      false,
      // {
      //   next: { revalidate: 60 },
      // },
    );
    return res;
  },

  getCategories: async (): Promise<CategoryResponse> => {
    const res = await apiServer<CategoryResponse>(
      "/fetch-all-categories",
      false,
      {
        next: { revalidate: 3600 },
      },
    );
    return res;
  },
};
