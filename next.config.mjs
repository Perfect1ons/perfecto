/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "max.kg",
      },
      {
        protocol: "https",
        hostname: "cdn2.static1-sima-land.com",
      },
    ],
  },
};

export default nextConfig;
