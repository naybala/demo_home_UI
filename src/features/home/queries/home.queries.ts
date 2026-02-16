import { useQuery } from "@tanstack/react-query";
import { HomeAPI } from "../api/home.api";
import { HomeApiResponse } from "../types/home.types";

export const HOME_KEYS = {
  all: ["home"] as const,
  data: () => [...HOME_KEYS.all, "data"] as const,
};

export const useHome = (initialData?: HomeApiResponse) => {
  return useQuery({
    queryKey: HOME_KEYS.data(),
    queryFn: () => HomeAPI.getHomeData(),
    initialData,
  });
};
