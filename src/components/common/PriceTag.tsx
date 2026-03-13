"use client";
interface ContentLoaderProps {
  price: string;
  discount_price: string;
  discount_percentage: string;
}

export default function PriceTag({
  price,
  discount_price,
  discount_percentage,
}: ContentLoaderProps) {
  return (
    <div className="flex-row items-center justify-between mt-4">
      <span className="flex justify-between">
        <s>{discount_price} Ks</s>
        <p>{discount_percentage} off</p>
      </span>

      <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
        {price} Ks
      </span>
    </div>
  );
}
