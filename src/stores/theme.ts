import { create } from "zustand";

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark:
    typeof document !== "undefined"
      ? document.cookie.includes("theme=dark")
      : false,
  toggle: () => {
    const next = !get().isDark;
    const theme = next ? "dark" : "light";

    // 1. Update Cookie (for SSR on next visit/navigation)
    document.cookie = `theme=${theme}; path=/`;

    // 2. Update DOM imperatively (for instant UI feedback)
    if (typeof document !== "undefined") {
      document.documentElement.className = theme;
    }

    // 3. Update State
    set({ isDark: next });
  },
}));
