import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userId: number | null;
  name: string | null;
  roleId: number | null;
  setAuthData: (data: {
    token: string;
    userId: number;
    name: string;
    roleId: number;
  }) => void;
  setToken: (token: string) => void;
  clearAuthData: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      userId: null,
      name: null,
      roleId: null,

      setAuthData: (data) => set({ ...data }),

      setToken: (token) => set({ token }),

      clearAuthData: () =>
        set({
          token: null,
          userId: null,
          name: null,
          roleId: null,
        }),

      isAuthenticated: () => !!get().token,
    }),
    {
      name: "auth-storage",
      // Exclude functions from persistence as they cannot be serialized
      partialize: (state) => ({
        userId: state.userId,
        name: state.name,
        roleId: state.roleId,
      }),
    },
  ),
);
