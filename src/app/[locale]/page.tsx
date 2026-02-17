import { getDictionary } from "@/lib/get-dictionary";
import { HomeAPI } from "@/features/home/api/home.api";
import HeroBanner from "@/features/home/components/HeroBanner";
import FeaturedGrid from "@/features/home/components/FeaturedGrid";
import ProductCarousel from "@/features/home/components/ProductCarousel";
import LocationSection from "@/features/home/components/LocationSection";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as any, "common");

  let homeData = null;
  try {
    const response = await HomeAPI.getHomeData();
    homeData = response.data;
  } catch (error) {
    console.error("Failed to fetch home data:", error);
  }

  return (
    <main className="overflow-x-hidden pt-20 transition-colors duration-500">
      {homeData ? (
        <>
          {/* Hero Section */}
          <HeroBanner banners={homeData.banner_data} locale={locale} />

          <div className="container mx-auto max-w-[1700px]">
            {/* Featured Grid Section */}
            <FeaturedGrid
              products={homeData.mini_banner_data}
              locale={locale}
              title="Featured"
            />

            {/* New Arrivals Section */}
            <ProductCarousel
              products={homeData.normal_data}
              locale={locale}
              title="New Arrivals"
              id="new-arrival"
            />

            {/* More to Explore Section */}
            <ProductCarousel
              products={homeData.normal_data_two}
              locale={locale}
              title="More to Explore"
              id="more-to-explore"
            />

            {/* Location Section */}
            <LocationSection title={t["location"]} id="location" />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Loading home data...</p>
        </div>
      )}
    </main>
  );
}
