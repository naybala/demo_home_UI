import { useAuthStore } from "@/stores/auth";
import { tryRefreshToken } from "./auth-refresh";

export async function apiClient<T>(
  api: string,
  isFakeStore = false,
  options: RequestInit & { body?: any } = {},
  retrying = false,
): Promise<T> {
  const { token, clearAuthData } = useAuthStore.getState();

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  let body = options.body;
  if (body && typeof body === "object" && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  // Determine the base URL: Use empty string for local /api routes,
  // otherwise choose between FakeStore and Properties API.
  const baseUrl = api.startsWith("/api")
    ? ""
    : isFakeStore
      ? process.env.NEXT_PUBLIC_BASE_URL
      : process.env.NEXT_PUBLIC_PROPERTIES_API_URL;

  const res = await fetch(`${baseUrl}${api}`, {
    ...options,
    body,
    headers,
    credentials: "include",
  });

  if (res.status === 401 && !retrying) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      return apiClient<T>(api, isFakeStore, options, true);
    }

    clearAuthData();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Session expired");
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
