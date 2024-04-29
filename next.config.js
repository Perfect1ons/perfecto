const { hostname } = require("os");

const MAXKG = process.env.PUBLIC_NEXT_API;

module.exports = {
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
        hostname: "megabike74.ru",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Content-Type", value: "application/json" },
          // Добавьте другие заголовки, если это необходимо для вашего API
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `/:path*`,
      },
      {
        source: "/catalog/cathome/:path*",
        destination: `${MAXKG}/catalog/:path*`, // Обработка запросов к /catalog/*
      },
    ];
  },
};
