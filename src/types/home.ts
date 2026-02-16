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

export interface HomeData {
  bannerData: Product[];
  miniBannerData: Product[];
  normalData: Product[];
  normalDataTwo: Product[];
}

export interface HomeApiResponse {
  code: number;
  status: string;
  message: string;
  data: HomeData;
}
