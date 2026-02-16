import { useAuthStore } from "@/stores/auth";

let refreshPromise: Promise<boolean> | null = null;

export async function tryRefreshToken(): Promise<boolean> {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) return false;

      const data = await res.json();
      const token = data?.data?.accessToken;

      if (token) {
        useAuthStore.getState().setToken(token);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}
