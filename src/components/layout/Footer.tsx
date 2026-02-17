"use client";

import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-[#f3f3f3] dark:bg-[#0f1114f5] shadow-lg">
        <footer className=" text-black dark:text-white py-12 mx-auto">
          <div className="max-w-[90rem] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Our Shop</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Thadar Aung is a leading online shopping platform in Myanmar,
                offering a wide range of products from daily needs.
              </p>
            </div>
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Fast Delivery
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                24/7 Customer Support
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Easy Return
              </p>
            </div>
            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Location</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                House 428 , Nyaug Pin Zat Market , 3rd Street , Zalun TownShip ,
                Ayeyarwady Region , Myanmar
              </p>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Email: thadaraung@gmail.com
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Phone: +95 9 123456789
              </p>
            </div>
          </div>
        </footer>
      </div>
      <div className="bg-[#f8f8f8f6] dark:bg-[#2d323bf5] shadow-lg">
        <div className="text-center pt-5 pb-5 text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Thadar Aung. All rights reserved.
        </div>
      </div>
    </>
  );
}
