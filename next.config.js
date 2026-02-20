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
    ],
  },
};
