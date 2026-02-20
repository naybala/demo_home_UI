import { apiServer } from "@/utils/api.server";
import { apiClient } from "@/utils/api.client";
import { HomeApiResponse } from "../types/home.types";

const getFetcher = () =>
  typeof window !== "undefined" ? apiClient : apiServer;

export const HomeAPI = {
  getHomeData: async (): Promise<HomeApiResponse> => {
    const fetcher = getFetcher();
    const res = await fetcher<HomeApiResponse>("/home", true, {
      next: { revalidate: 0 }, // Revalidate every hour
    } as any);
    return res;
  },
};
