export interface Product {
  id: number;
  name: string;
  name_other: string;
  price: string;
  description: string;
  description_other: string;
  photos: string[];
  photo_paths: string[];
  category_ids: number[];
  category_names: string[];
  primary_photo: string;
  is_banner: boolean;
  is_mini_banner: boolean;
}

export interface PaginatedData<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface ProductListResponse {
  code: number;
  status: string;
  message: string;
  data: PaginatedData<Product>;
}

export interface ProductDetailResponse {
  code: number;
  status: string;
  message: string;
  data: Product;
}

export type ProductList = Product[];
