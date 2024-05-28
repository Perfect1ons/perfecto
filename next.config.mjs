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
      {
        protocol: "https",
        hostname: "goods-photos.static1-sima-land.com",
      },
      {
        protocol: "https",
        hostname: "www.4glaza.ru",
      },
    ],
  },
};

export default nextConfig;
