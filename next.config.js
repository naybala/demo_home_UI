/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  output: "standalone", // OK for Docker / PM2

  images: {
    unoptimized: true, //  THIS disables sharp

    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "proptechapp.sgp1.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "images2024.sgp1.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
    ],
  },
};
