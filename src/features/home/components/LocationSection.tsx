"use client";

import React from "react";

interface LocationSectionProps {
  title: string;
  id?: string;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  title,
  id = "location",
}) => {
  const lat = 18.76753;
  const lng = 98.981199;

  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <section id={id} className="py-16 md:py-24 transition-all duration-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 group">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="transition-all duration-700 ease-in-out"
          ></iframe>

          {/* Decorative glassmorphism overlay for address info if needed */}
          {/* <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-auto md:w-80 p-6 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-xl border border-white/20 dark:border-gray-700 shadow-xl transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Our Location
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Find us at our main office. We are located at the heart of the
              city, easily accessible for all our customers.
            </p>
            <div className="mt-4 flex items-center gap-2 text-primary">
              <span className="text-xs font-mono">
                {lat}, {lng}
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
