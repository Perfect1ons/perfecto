import {
  getBoughts,
  getBrands,
  getDekstopData,
  getDiscounts,
  getMobileData,
  getNewsByLimit,
  getPopularCategory,
  getPopularGoods,
  getPromotion,
  getSeasonCategory,
  getSecondBanner,
  getThirdBanner,
} from "@/api/requests";
import Banner from "@/components/HomeComponents/Banner/Banner";
import PopularCategory from "@/components/HomeComponents/PopularCategory/PopularCategory";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title:
    "Маркетплейс Max.kg №1☑️ в Бишкеке и Кыргызстане ▶️ Маркетплейс для всей страны",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};


const LazySecondBanner = dynamic(
  () => import("@/components/HomeComponents/Banner/SecondBanner"),
  {
    ssr: false,
  }
);
const LazyThirdBanner = dynamic(
  () => import("@/components/HomeComponents/Banner/ThirdBanner"),
  {
    ssr: false,
  }
);

const LazySeasonCategorySwiper = dynamic(
  () =>
    import(
      "@/components/HomeComponents/SeasonCategorySwiper/SeasonCategorySwiper"
    ),
  {
    ssr: false,
  }
);
const LazyTodaysBoughts = dynamic(
  () => import("@/components/HomeComponents/TodayBoughts/TodayBoughts"),
  {
    ssr: false,
  }
);
const LazyNews = dynamic(
  () => import("@/components/HomeComponents/News/News"),
  {
    ssr: false,
  }
);
const LazyDiscounts = dynamic(
  () => import("@/components/HomeComponents/Discounts/Discounts"),
  {
    ssr: false,
  }
);
const LazyPromotion = dynamic(
  () => import("@/components/HomeComponents/Promotion/Promotion"),
  {
    ssr: false,
  }
);
const LazyPopularGoods = dynamic(
  () => import("@/components/HomeComponents/PopularGoods/PopularGoods"),
  {
    ssr: false,
  }
);

const LazyBrands = dynamic(
  () => import("@/components/HomeComponents/Brands/Brands"),
  {
    ssr: false,
  }
);

export default async function Home() {
  const [popularCategoryData,goodsData] = await Promise.all([
    getPopularCategory(),
    getPopularGoods(1),
  ])
  const [
    mobileData,
    desktopData,
    newsData,
    discounts,
    secondBanner,
    promotionData,
    seasonCategoryData,
    brandsData,
  ] = await Promise.all([
    getMobileData(),
    getDekstopData(),
    getNewsByLimit(),
    getDiscounts(),
    getSecondBanner(),
    getPromotion(),
    getSeasonCategory(),
    getBrands(),
  ]);

  const [todayBoughtsData, thirdBanner] = await Promise.all([
    getBoughts(1),
    getThirdBanner(),
  ])

  return (
    <>
      <Banner mobileData={mobileData} deskstopData={desktopData} />
      <PopularCategory category={popularCategoryData} />
      <LazyPopularGoods goods={goodsData} />
      <LazyNews news={newsData} />
      <LazyDiscounts discounts={discounts} />
      <LazySecondBanner banner={secondBanner.baner} />
      <LazyPromotion promotion={promotionData} />
      <LazySeasonCategorySwiper seasonItems={seasonCategoryData} />
      <LazyBrands brands={brandsData} />
      <LazyTodaysBoughts boughts={todayBoughtsData.lastz} />
      <LazyThirdBanner banner={thirdBanner.baner} />
    </>
  );
}
