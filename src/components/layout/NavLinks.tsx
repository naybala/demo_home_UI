import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { NavLinksProps } from "../../types/MobileNavProps";

type Props = NavLinksProps & { t: Record<string, string> };

export const NavLinks = ({ className = "", onClick, t }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  /** ---------------- Locale ---------------- */
  const locale = useMemo(() => pathname.split("/")[1] || "en", [pathname]);

  /** ---------------- Navigation config ---------------- */
  const scrollSections = useMemo(
    () => ["home", "feature", "new-arrival", "more-to-explore", "location"],
    [],
  );

  const pageLinks = useMemo(() => [{ id: "products", href: "/products" }], []);

  /** ---------------- Active state ---------------- */
  const [active, setActive] = useState<string>("home");

  /** ---------------- Sync active with pathname ---------------- */
  useEffect(() => {
    const currentPage = pageLinks.find(
      (page) =>
        pathname === `/${locale}${page.href}` ||
        pathname.startsWith(`/${locale}${page.href}/`),
    );

    // Case 1: normal page
    if (currentPage) {
      setActive(currentPage.id);
      return;
    }

    // Case 2: not home → stop
    const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
    if (!isHome) return;

    // Case 3: hash section
    const hash = window.location.hash.replace("#", "");
    if (scrollSections.includes(hash)) {
      setActive(hash);
      return;
    }

    // Case 4: top of page
    if (window.scrollY < 100) {
      setActive("home");
    }
  }, [pathname, locale, pageLinks, scrollSections]);

  /** ---------------- Smooth scroll handling ---------------- */
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleScrollTo = useCallback(
    (sectionId: string, offset = -100) => {
      const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

      // Redirect if not home
      if (!isHome) {
        router.push(`/${locale}/#${sectionId}`);
        return;
      }

      const section = document.getElementById(sectionId);
      if (!section) return;

      const y =
        section.getBoundingClientRect().top + window.pageYOffset + offset;

      isScrolling.current = true;
      setActive(sectionId);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 700);

      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [pathname, locale, router],
  );

  /** ---------------- Intersection Observer ---------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -75% 0px",
        threshold: 0,
      },
    );

    const observeElements = () => {
      scrollSections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    // Initial attempt
    observeElements();

    // Retry to catch elements that might mount later after language change
    const timers = [
      setTimeout(observeElements, 100),
      setTimeout(observeElements, 500),
      setTimeout(observeElements, 1000),
      setTimeout(observeElements, 2000),
    ];

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [scrollSections, pathname, t]);

  /** ---------------- UI helpers ---------------- */
  const getButtonClass = useCallback(
    (item: string) =>
      `${className} nav-link-item ${active === item ? "active" : ""}`,
    [className, active],
  );

  /** ---------------- Render ---------------- */
  return (
    <>
      {scrollSections.map((section) => (
        <button
          key={section}
          className={getButtonClass(section)}
          onClick={() => {
            handleScrollTo(section);
            onClick?.();
          }}
        >
          {t[section]}
        </button>
      ))}

      {pageLinks.map((page) => (
        <button key={page.id}>
          <Link
            href={`/${locale}${page.href}`}
            className={getButtonClass(page.id)}
            onClick={() => {
              setActive(page.id);
              onClick?.();
            }}
            prefetch
          >
            {t[page.id]}
          </Link>
        </button>
      ))}
    </>
  );
};
