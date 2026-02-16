import Link from "next/link";
import { MobileNavProps } from "../../types/MobileNavProps";
import ThemeToggle from "../common/ThemeToggle";
import { LanguageSwitcher } from "../common/LanguageSwitcher";
import { NavLinks } from "./NavLinks";

export default function MobileNav({ isOpen, closeSidebar, t }: MobileNavProps) {
  const style: string = "w-full text-left px-3 py-2 border rounded";
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 space-y-4">
          <div className="text-xl font-bold">
            <Link href="/" onClick={closeSidebar}>
              MyLogo
            </Link>
          </div>
          <hr className="border-gray-300 dark:border-gray-600" />
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
