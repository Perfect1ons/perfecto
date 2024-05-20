
const MAXKG = process.env.NEXT_PUBLIC_API;

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
      {
        protocol: "https",
        hostname: "cdn3.static1-sima-land.com",
      },
      {
        protocol: "https",
        hostname: "ostrov-sokrovisch.ru",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.pandashop.md",
      },
      {
        protocol: "https",
        hostname: "www.jtcrussia.ru",
      },
      {
        protocol: "https",
        hostname: "www.jtcrussia.ru",
      },
      {
        protocol: "https",
        hostname: "www.levenhuk-opt.ru",
      },
      {
        protocol: "https",
        hostname: "www.levenhuk-opt.ru",
      },
      // {
      //   protocol: "https",
      //   hostname: "lh3.googleusercontent.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "lh3.googleusercontent.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "lh3.googleusercontent.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "lh3.googleusercontent.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "lh3.googleusercontent.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "lh3.googleusercontent.com",
      // },
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
        destination: `${MAXKG}/:path*`,
      },
      // {
      //   source: "/catalog/cathome/:path*",
      //   destination: `${MAXKG}/catalog/:path*`, // Обработка запросов к /catalog/*
      // },
      // {
      //   source: "/api/catalog/:path*",
      //   destination: `${MAXKG}/catalog/:path*`, // Обработка запросов к /catalog/*
      // },
    ];
  },
};
