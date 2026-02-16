import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "mm"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // Define protected routes (without locale prefix)
  const protectedRoutes = ["/dashboard", "/profile"]; // Add more as needed

  // Get pathname without locale
  const pathnameWithoutLocale = pathnameHasLocale
    ? pathname.replace(/^\/(en|mm)/, "")
    : pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathnameWithoutLocale.startsWith(route),
  );

  if (isProtectedRoute && !refreshToken) {
    const locale = pathnameHasLocale ? pathname.split("/")[1] : defaultLocale;
    const url = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(url);
  }

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  // Try to get locale from cookie, fallback to default
  const locale = request.cookies.get("NEXT_LOCALE")?.value || defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|_next/image|favicon.ico|images|public).*)",
  ],
};
