// app/[locale]/providers.tsx
"use client";

import { PrimeReactProvider } from "primereact/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useRef } from "react";
import ClientOnly from "@/components/layout/ClientOnly";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClientRef = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
          refetchOnWindowFocus: false,
        },
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ClientOnly>
        <PrimeReactProvider>
          {children}
          <Toast ref={(el: any) => el && ((window as any).toast = el)} />
          <ConfirmDialog />
        </PrimeReactProvider>
      </ClientOnly>
    </QueryClientProvider>
  );
}
