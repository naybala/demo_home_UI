"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import ThemeToggle from "../common/ThemeToggle";
import { LanguageSwitcher } from "../common/LanguageSwitcher";
import { NavLinks } from "./NavLinks";
import Logo from "@/public/images/logo.png";
import AuthModal from "@/features/auth/components/AuthModal";

export default function Header({ t }: { t: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);
  const style: string = "px-3 py-1 border rounded";

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
      <header className="bg-[#ece7e7] dark:bg-[#0f1114] text-black dark:text-white shadow p-4 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto max-w-[1700px] flex items-center justify-between">
          <div className="text-xl font-bold">
            <span
              onClick={() => {
                handleScrollTo("home");
              }}
              className="flex items-center cursor-pointer"
            >
              <img
                src={Logo.src}
                alt="Tha Dar Aung Logo"
                className="h-12 w-12 mr-2 rounded-lg shadow-lg object-contain"
              />
              {t["app-name"]}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <NavLinks className="px-3 py-1" t={t} />
            <i
              onClick={() => setIsAuthOpen(true)}
              className="pi pi-user cursor-pointer hover:text-blue-500 transition-colors"
              style={{ fontSize: "1.2rem" }}
            ></i>
            <LanguageSwitcher className={style} />
            <ThemeToggle />
          </div>

          <button
            onClick={toggleSidebar}
            className="md:hidden px-2 py-1 border rounded"
          >
            ☰
          </button>
        </div>
      </header>
      <MobileNav isOpen={isOpen} closeSidebar={closeSidebar} t={t} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
