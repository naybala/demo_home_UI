import React, { useState, useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useThemeStore } from "@/stores/theme";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
          },
        },
      }),
  );
  const { isDark } = useThemeStore();

  // Sync theme from Zustand store to the document class (client-only)
  // The initial theme is already server-applied via html className in layout.tsx
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        {children}
        <Toast
          ref={(el) => {
            if (el) (window as any).toast = el;
          }}
        />
        <ConfirmDialog />
      </PrimeReactProvider>
    </QueryClientProvider>
  );
}
