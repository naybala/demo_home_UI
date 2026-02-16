import { getDictionary } from "@/lib/get-dictionary";
import { apiServer } from "@/utils/api.server";
import { HomeApiResponse } from "@/types/home";
import HeroBanner from "@/components/home/HeroBanner";
import FeaturedGrid from "@/components/home/FeaturedGrid";
import ProductCarousel from "@/components/home/ProductCarousel";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale as any, "common");

  let homeData = null;
  try {
    const response = await apiServer<HomeApiResponse>("/home");
    homeData = response.data;
  } catch (error) {
    console.error("Failed to fetch home data:", error);
  }

  return (
    <main className="overflow-x-hidden transition-colors duration-500">
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
