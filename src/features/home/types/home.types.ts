import { Product } from "@/features/products/types/product.types";
export type { Product };

export interface HomeData {
  banner_data: Product[];
  mini_banner_data: Product[];
  normal_data: Product[];
  normal_data_two: Product[];
}

export interface HomeApiResponse {
  code: number;
  status: string;
  message: string;
  data: HomeData;
}
