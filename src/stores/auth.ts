import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiClient } from "@/utils/api.client";

interface UserInfo {
  id: number;
  fullname: string;
  email: string;
  avatar: string;
}

interface AuthState {
  user: UserInfo | null;

  setUser: (user: UserInfo | null) => void;
  clearAuthData: () => void;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,

      setUser: (user) => set({ user }),

      clearAuthData: () => set({ user: null }),

      logout: async () => {
        try {
          await apiClient(`/logout`, true, {
            method: "POST",
          });
        } catch (error) {
          console.error("Logout API failed:", error);
        }

        // Clear user state only
        set({ user: null });
      },

      isAuthenticated: () => !!get().user,
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user, // only persist user
      }),
    },
  ),
);
