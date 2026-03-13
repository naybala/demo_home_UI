"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import MobileNav from "./MobileNav";
import ThemeToggle from "../common/ThemeToggle";
import Link from "next/link";
import AuthModal from "@/features/auth/components/AuthModal";
import MegaMenu from "./MegaMenu";

import { useAuthStore } from "@/stores/auth";
import { confirmDialog } from "primereact/confirmdialog";

export default function Header({ t }: { t: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const { isAuthenticated, user, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide header on scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 80) {
        // Always show near the top of the page
        setIsVisible(true);
      } else if (delta > 8) {
        // Scrolling down — hide
        setIsVisible(false);
        setIsMenuOpen(false); // also close mega menu
      } else if (delta < -8) {
        // Scrolling up — reveal
        setIsVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toastShownRef = useRef(false);

  // Show toast when redirected from a protected route
  useEffect(() => {
    if (searchParams.get("unauthorized") === "true" && !toastShownRef.current) {
      toastShownRef.current = true;
      // Clean the URL first so effect doesn't re-trigger
      router.replace(window.location.pathname);
      (window as any).toast?.show({
        severity: "error",
        summary: "Access Denied",
        detail: "Please login to access this page.",
        life: 4000,
        className: "bg-red-600 border-red-700",
        contentClassName: "bg-red-600 text-white",
      });
    }
  }, [searchParams]);

  const handleLogout = () => {
    confirmDialog({
      message: "Are you sure you want to logout?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "px-2 rounded-lg ml-2",
      rejectClassName: "px-2 rounded-lg mr-2",
      accept: async () => {
        await logout();
      },
    });
  };

  const getAvatarUrl = (path: string | null | undefined) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    return `${apiUrl}${path}`;
  };

  const handleScrollTo = (sectionId: string) => {
    const segments = pathname.split("/");
    const locale = segments[1] || "en";

    if (pathname !== `/${locale}` && pathname !== `/${locale}/`) {
      router.push(`/${locale}/#${sectionId}`);
      closeSidebar();
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      closeSidebar();
    }
  };

  return (
    <>
      <header
        className={`bg-white dark:bg-[#0f1114]/80 backdrop-blur-md text-black dark:text-white shadow-sm px-4 py-3 fixed top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto max-w-[1700px] flex items-center justify-between">
          {/* Left Side: Menu & Favorites */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col items-center gap-1 group"
            >
              <i
                className={`pi ${isMenuOpen ? "pi-times" : "pi-bars"} text-xl group-hover:text-red-600 transition-colors`}
              ></i>
              <span className="text-[10px] font-bold tracking-widest uppercase mt-1">
                {isMenuOpen ? "Close" : "Menu"}
              </span>
            </button>
            <button className="hidden sm:flex flex-col items-center gap-1 group">
              <i className="pi pi-heart text-xl group-hover:text-red-600 transition-colors"></i>
              <span className="text-[10px] font-bold tracking-widest uppercase mt-1">
                Favorites
              </span>
            </button>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              onClick={() => handleScrollTo("home")}
              className="flex items-center"
            >
              <i
                className="pi pi-hourglass  mr-2 text-red-600"
                style={{ fontSize: "1.8rem" }}
              ></i>
              <p className="text-2xl font-bold">Time</p>
              <p className="text-2xl font-bold text-red-600 ms-1">On You</p>
            </Link>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center gap-6">
            <Link href="/products" onClick={() => handleScrollTo("products")}>
              <div className="hidden lg:flex flex-col items-center gap-1 group cursor-pointer">
                <i className="pi pi-th-large text-xl group-hover:text-red-600 transition-colors"></i>
                <span className="text-[10px] font-bold tracking-widest uppercase mt-1">
                  Products
                </span>
              </div>
            </Link>
            {/* <div className="flex items-center gap-6">
              <Link href="/workshop" onClick={() => handleScrollTo("workshop")}>
                <div className="hidden lg:flex flex-col items-center gap-1 group cursor-pointer">
                  <i className="pi pi-map-marker text-xl group-hover:text-red-600 transition-colors"></i>
                  <span className="text-[10px] font-bold tracking-widest uppercase mt-1">
                    Retailers
                  </span>
                </div>
              </Link>
            </div> */}

            {/* <div className="hidden sm:flex flex-col items-center gap-1">
              <LanguageSwitcher className="text-[10px] font-bold tracking-widest uppercase !border-none !p-0" />
              <span className="text-[10px] font-bold tracking-widest uppercase mt-1">
                Lang
              </span>
            </div> */}

            {mounted &&
              (isAuthenticated() ? (
                <div className="flex flex-col items-center gap-1">
                  <img
                    src={getAvatarUrl(user?.avatar)}
                    alt={user?.fullname || "User"}
                    className="w-5 h-5 rounded-full object-cover border border-gray-300 dark:border-gray-700"
                  />
                  <button
                    onClick={handleLogout}
                    className="text-[10px] font-bold text-red-500 hover:text-red-600 uppercase tracking-widest"
                  >
                    log out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <i className="pi pi-user text-xl group-hover:text-red-600 transition-colors"></i>
                  <span className="text-[10px] font-bold tracking-widest uppercase mt-1">
                    Login
                  </span>
                </button>
              ))}

            {/* <div className="hidden sm:block">
              <ThemeToggle />
            </div> */}
          </div>
        </div>
      </header>

      <MegaMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        t={t}
      />

      <MobileNav isOpen={isOpen} closeSidebar={closeSidebar} t={t} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
