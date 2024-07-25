const MAXKG = process.env.NEXT_PUBLIC_API;

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    formats: [ "image/webp","image/avif"],
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
        hostname: "www.levenhuk-opt.ru",
      },
      {
        protocol: "https",
        hostname: "www.4glaza.ru",
      },
      {
        protocol: "https",
        hostname: "avatars.mds.yandex.net",
      },
      {
        protocol: "https",
        hostname: "static-basket-01.wbbasket.ru",
      },
      {
        protocol: "https",
        hostname: "ru.bekhost.com",
      },
      {
        protocol: "https",
        hostname: "mnogogerz.ru",
      },
      {
        protocol: "https",
        hostname: "ua.powerwalker.com",
      },
      {
        protocol: "https",
        hostname: "www.emscorp.ru",
      },
      { protocol: "https", hostname: "cdn2.top-shop.ru" },
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


module.exports = nextConfig;
