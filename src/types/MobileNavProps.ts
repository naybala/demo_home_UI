export interface MobileNavProps {
  isOpen: boolean;
  closeSidebar: () => void;
  t?: any;
}

export interface LanguageSwitcherProps {
  className?: string;
}

export interface NavLinksProps {
  className?: string;
  onClick?: () => void;
  t?: any;
}
