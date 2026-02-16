import { apiServer } from "@/utils/api.server";
import { HomeApiResponse } from "../types/home.types";

export const HomeAPI = {
  getHomeData: async (): Promise<HomeApiResponse> => {
    const res = await apiServer<HomeApiResponse>("/home", false, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    return res;
  },
};
