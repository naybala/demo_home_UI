import {
  ProductDetailResponse,
  ProductListResponse,
} from "../types/product.types";
import { apiServer } from "@/utils/api.server";

export const ProductsAPI = {
  getProducts: async (page = 1, perPage = 8): Promise<ProductListResponse> => {
    const res = await apiServer<ProductListResponse>(
      `/products?page=${page}&per_page=${perPage}`,
      false,
      {
        next: { revalidate: 0 },
      },
    );
    return res;
  },

  getProduct: async (id: string | number): Promise<ProductDetailResponse> => {
    const res = await apiServer<ProductDetailResponse>(
      `/products/${id}`,
      false,
      {
        next: { revalidate: 60 },
      },
    );
    return res;
  },
};
