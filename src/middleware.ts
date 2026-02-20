import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "mm"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Check the logged_in cookie (set by the client on login, cleared on logout)
  const loggedIn = request.cookies.get("logged_in")?.value;

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

  // If trying to access a protected route without a refresh_token cookie,
  // redirect to home with an "unauthorized" query param so a toast can be shown
  if (isProtectedRoute && !loggedIn) {
    const locale = pathnameHasLocale ? pathname.split("/")[1] : defaultLocale;
    const url = new URL(`/${locale}`, request.url);
    url.searchParams.set("unauthorized", "true");
    return NextResponse.redirect(url);
  }

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = request.cookies.get("NEXT_LOCALE")?.value || defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|favicon.ico|images|public).*)",
  ],
};
