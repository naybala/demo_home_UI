import "@/styles/globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "@/components/common/ThemeToggle.css";
import Providers from "./providers";
import RootLayoutComponent from "@/components/layout/RootLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lucky Click",
  description: "Stay tuned for the latest updates and features of Lucky Click.",
  icons: {
    icon: "/images/lucky_click.png",
  },
};

import { cookies } from "next/headers";
import { getDictionary } from "@/lib/get-dictionary";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "mm" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as any, "common");

  // Read theme from cookie (Server-side)
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";

  return (
    <html lang={locale} className={theme} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <RootLayoutComponent t={t}>{children}</RootLayoutComponent>
        </Providers>
      </body>
    </html>
  );
}
