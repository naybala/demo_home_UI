"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcherProps } from "../../types/MobileNavProps";

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const locale = segments[1]; // assuming /[locale]/...

  const getTargetLocale = () => (locale === "mm" ? "en" : "mm");
  const getTargetHref = () => {
    const targetLocale = getTargetLocale();
    const newSegments = [...segments];
    newSegments[1] = targetLocale;

    // Set cookie for middleware persistence
    if (typeof document !== "undefined") {
      document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`; // 1 year
    }

    return newSegments.join("/");
  };

  return (
    <>
      {locale === "mm" ? (
        <Link href={getTargetHref()}>
          <button className={className}>
            <img
              className="w-7 rounded-sm shadow-lg"
              src="/images/Flag_of_the_United_States.svg.webp"
              alt="english flag"
            />
          </button>
        </Link>
      ) : (
        <Link href={getTargetHref()}>
          <button className={className}>
            <img
              className="w-7 rounded-sm shadow-lg"
              src="/images/Flag_of_Myanmar.svg.png"
              alt="myanmar flag"
            />
          </button>
        </Link>
      )}
    </>
  );
};
