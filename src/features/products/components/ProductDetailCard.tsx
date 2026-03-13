"use client";
import { Product } from "@/features/products/types/product.types";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { Carousel } from "primereact/carousel";
import { Image } from "primereact/image";
import { Fieldset } from "primereact/fieldset";
import PriceTag from "@/components/common/PriceTag";

export const ProductDetailCard = ({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) => {
  const [showFullSpecs, setShowFullSpecs] = useState(true);
  const { isAuthenticated } = useAuthStore();

  const isMM = locale === "mm";
  const name = isMM ? product.name_other : product.name;

  const allPhotos = product.photos || [];

  // Technical Specs List for the left panel
  const highlights = [
    product.movement && `Manufacture ${product.movement}`,
    product.dial_size && `${product.dial_size} steel case`,
    product.strap_material && `${product.strap_material} bracelet`,
  ].filter(Boolean);

  const fullSpecs = [
    { label: "Model No", value: product.model_no },
    { label: "Brand", value: product.brand },
    { label: "Dial Size", value: product.dial_size },
    { label: "Dial Color", value: product.dial_color },
    { label: "Gender", value: product.gender },
    { label: "Movement", value: product.movement },
    { label: "Case Shape", value: product.case_shape },
    { label: "Crystal", value: product.crystal },
    { label: "Water Resistance", value: product.water_resistance },
    { label: "Strap Material", value: product.strap_material },
    { label: "Strap Style", value: product.strap_style },
    { label: "Strap Size", value: product.strap_size },
    { label: "Strap Color", value: product.strap_color },
    { label: "Clasp Type", value: product.clasp_type },
    { label: "Quick Release", value: product.quick_release },
    { label: "Warranty", value: product.warranty },
    { label: "Origin", value: product.origin },
  ].filter((spec) => spec.value);

  return (
    <div className="pt-10">
      <div className="max-w-[1600px] mx-auto px-3 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Info Panel */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right space-y-8 order-2 lg:order-1">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                {product.model_no || "REFERENCE"}
              </span>
              <h1 className="text-xl lg:text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase leading-none">
                {name}
              </h1>
            </div>

            <div className="space-y-1">
              {highlights.map((highlight, idx) => (
                <p
                  key={idx}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  {highlight}
                </p>
              ))}
            </div>

            <button
              onClick={() => setShowFullSpecs(!showFullSpecs)}
              className="flex items-center gap-2 text-xs font-bold tracking-widest text-red-600 hover:text-red-700 transition-colors uppercase group"
            >
              <span className="text-lg font-light group-hover:rotate-90 transition-transform">
                +
              </span>
              VIEW FULL SPECIFICATIONS
            </button>

            {isAuthenticated() && (
              <PriceTag
                price={product.price}
                discount_price={product.discount_price}
                discount_percentage={product.discount_percentage}
              />
            )}

            {/* <div className="flex items-center gap-8 py-4">
              <button className="flex flex-col items-center gap-2 group">
                <div className="p-2 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900 dark:text-white">
                  Configure
                </span>
              </button>
              <button className="flex flex-col items-center gap-2 group">
                <div className="p-2 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                  <span className="text-xl font-light">DD</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900 dark:text-white">
                  Compare
                </span>
              </button>
              <button className="flex flex-col items-center gap-2 group">
                <div className="p-2 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-900 dark:text-white">
                  Save
                </span>
              </button>
            </div> */}

            {/* <button className="mt-4 px-8 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-[10px] font-bold tracking-widest text-red-600 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all uppercase">
              Find a watch retailer
            </button> */}
          </div>

          {/* Right Product Carousel */}
          <div className="lg:col-span-8 relative group order-1 lg:order-2">
            <div className="product-carousel">
              <Carousel
                value={allPhotos}
                numVisible={2}
                numScroll={1}
                responsiveOptions={[
                  {
                    breakpoint: "1024px",
                    numVisible: 2,
                    numScroll: 1,
                  },
                  {
                    breakpoint: "768px",
                    numVisible: 1,
                    numScroll: 1,
                  },
                ]}
                circular
                itemTemplate={(photo) => (
                  <Image
                    src={photo}
                    alt={name}
                    preview
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                )}
                prevIcon={
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                }
                nextIcon={
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        {/* Full Specifications Section */}
        {showFullSpecs && (
          <div className="mt-20 border-t border-gray-100 dark:border-gray-800 pt-20 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-sm font-bold tracking-[0.2em] text-gray-900 dark:text-white uppercase mb-12">
                Full Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-4">
                {fullSpecs.map((spec, idx) => (
                  <div className="card" key={idx}>
                    <Fieldset legend={spec.label}>
                      <p className="m-0">{spec.value}</p>
                    </Fieldset>
                  </div>
                  // <div
                  //   key={idx}
                  //   className="flex justify-between py-3 border-b border-gray-50 dark:border-gray-800/50"
                  // >
                  //   <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  //     {spec.label}
                  //   </span>
                  //   <span className="text-xs font-semibold text-gray-900 dark:text-white uppercase">
                  //     {spec.value}
                  //   </span>
                  // </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
