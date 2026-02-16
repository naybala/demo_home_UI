import AppHeader from "./Header";
import AppFooter from "./Footer";
import ScrollToTop from "../common/ScrollToTop";

interface RootLayoutProps {
  children: React.ReactNode;
  t: any;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children, t }) => {
  return (
    <>
      <ScrollToTop />
      <div className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <AppHeader t={t} />
        {children}
        <AppFooter />
      </div>
    </>
  );
};

export default RootLayout;
