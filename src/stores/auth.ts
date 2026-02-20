import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  id: number;
  fullname: string;
  email: string;
  avatar: string;
}

interface AuthState {
  token: string | null;
  user: UserInfo | null;
  setAuthData: (token: string, user: UserInfo) => void;
  setToken: (token: string) => void;
  clearAuthData: () => void;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      setAuthData: (token, user) => set({ token, user }),

      setToken: (token) => set({ token }),

      clearAuthData: () =>
        set({
          token: null,
          user: null,
        }),

      logout: async () => {
        const { user } = get();
        if (user) {
          try {
            const apiUrl =
              process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
            await fetch(`${apiUrl}/api/v1/spa/logout`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${get().token}`,
              },
              body: JSON.stringify({ id: user.id }),
            });
          } catch (error) {
            console.error("Logout API failed:", error);
          }
        }
        set({ token: null, user: null });
      },

      isAuthenticated: () => !!get().token,
    }),
    {
      name: "auth-storage",
      // Persist the token and user data
    },
  ),
);
