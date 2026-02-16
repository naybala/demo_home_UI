"use client";

import React from "react";
import { Image } from "primereact/image";

export default function Footer() {
  return (
    <>
      <div className=" bg-[#ece7e7f6] dark:bg-[#0f1114f5] shadow-lg">
        <footer className=" text-black dark:text-white py-12 max-w-7xl mx-auto">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                We build digital solutions for everyday people. Trust, quality,
                and innovation drive us.
              </p>
            </div>
            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Web Development
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Mobile Apps
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                UI/UX Design
              </p>
            </div>
            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Documentation
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">Blog</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Support
              </p>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-bold mb-4">Let's Try Out</h3>
              <img
                src="/images/playstore-mobile.png"
                alt="playstore"
                width="150"
                className="rounded-lg"
              />
              <br />
              <img
                src="/images/ios-download.png"
                alt="ios"
                width="150"
                className="rounded-lg"
              />
            </div>
          </div>
        </footer>
      </div>
      <div className="bg-[#b9adadf6] dark:bg-[#2d323bf5] shadow-lg">
        <div className="text-center pt-5 pb-5 text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Lucky Click. All rights reserved.
        </div>
      </div>
    </>
  );
}
