export interface MobileNavProps {
  isOpen: boolean;
  closeSidebar: () => void;
  t?: any;
}

export interface LanguageSwitcherProps {
  className?: string;
  variant?: "header" | "sidebar";
}

export interface NavLinksProps {
  className?: string;
  onClick?: () => void;
  t?: any;
  isMobile?: boolean;
}
