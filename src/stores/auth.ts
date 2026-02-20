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
        const { user } = get();
        try {
          await apiClient(`/logout`, true, {
            method: "POST",
            body: { id: user?.id },
          } as any);
        } catch (error) {
          console.error("Logout API failed:", error);
        }

        // Clear logged_in cookie so middleware can detect unauthenticated state
        document.cookie =
          "logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        set({ user: null });

        // Show logout toast
        if (typeof window !== "undefined") {
          (window as any).toast?.show({
            severity: "danger",
            summary: "Logged out",
            detail: "You have been logged out successfully.",
            life: 3000,
            className: "bg-gray-400 border-gray-500",
            contentClassName: "bg-gray-400 text-white",
          });
        }
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
