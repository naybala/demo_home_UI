import Link from "next/link";
import { MobileNavProps } from "../../types/MobileNavProps";
import ThemeToggle from "../common/ThemeToggle";
import { LanguageSwitcher } from "../common/LanguageSwitcher";
import { NavLinks } from "./NavLinks";
import Logo from "@/public/images/logo.png";

export default function MobileNav({ isOpen, closeSidebar, t }: MobileNavProps) {
  const style: string = "w-full text-left px-3 py-2 rounded mt-5";
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4 space-y-4">
          <div className="text-xl font-bold flex items-center border rounded-lg p-2">
            <img
              src={Logo.src}
              alt="Tha Dar Aung Logo"
              className="h-12 w-12 mr-2 rounded-lg shadow-lg object-contain"
            />
            {t["app-name"]}
          </div>
          <NavLinks
            className="w-full text-left px-3 py-2"
            onClick={closeSidebar}
            t={t}
          />
          <LanguageSwitcher className={style} />

          <ThemeToggle />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
