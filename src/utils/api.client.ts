import { useAuthStore } from "@/stores/auth";

export async function apiClient<T>(
  api: string,
  isLocal = false,
  options: RequestInit & { body?: any } = {},
  retrying = false,
): Promise<T> {
  let body = options.body;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (body && typeof body === "object" && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  const baseUrl = isLocal
    ? process.env.NEXT_PUBLIC_LOCAL_URL
    : process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}${api}`, {
    ...options,
    body,
    headers,
    credentials: "include", // important
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
