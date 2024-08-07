import {
  getBoughts,
  getBrands,
  getDekstopData,
  getDiscounts,
  getMetaMainPage,
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
import BrandsSkeleton from "@/components/HomeComponents/Brands/BrandsSkeleton";
import DiscountsSkeleton from "@/components/HomeComponents/Discounts/DiscountsSkeleton";
import CategorySkeleton from "@/components/UI/CategorySkeleton/CategorySkeleton";
import InfoCardLoading from "@/components/UI/InfoCard/InfoCardLoading";
import MainPageJsonLd from "@/utils/JsonLd/MainPageJsonLd/MainPageJsonLd";
import { generatePageMetadata } from "@/utils/metadata";
import dynamic from "next/dynamic";
const DynamicPopularCategory = dynamic(
  () => import("@/components/HomeComponents/PopularCategory/PopularCategory"),
  {
    ssr: false,
    loading: () => <CategorySkeleton title="Популярные категории" />,
  }
);
const LazySecondBanner = dynamic(
  () => import("@/components/HomeComponents/Banner/SecondBanner"),
  {
    ssr: true,
  }
);
const LazyThirdBanner = dynamic(
  () => import("@/components/HomeComponents/Banner/ThirdBanner"),
  {
    ssr: true,
  }
);
const DynamicSeasonCategory = dynamic(
  () => import("@/components/HomeComponents/SeasonCategory/SeasonCategory"),
  {
    ssr: true,
    loading: () => <CategorySkeleton title="Сезонные категории" />,
  }
);
const LazyTodaysBoughts = dynamic(
  () => import("@/components/HomeComponents/TodayBoughts/TodayBoughts"),
  {
    ssr: true,
  }
);
const DynamicNews = dynamic(
  () => import("@/components/HomeComponents/News/News"),
  {
    ssr: true,
    loading: () => <InfoCardLoading title="Новости" />,
  }
);

const DynamicDiscounts = dynamic(
  () => import("@/components/HomeComponents/Discounts/Discounts"),
  {
    ssr: true,
    loading: () => <DiscountsSkeleton />,
  }
);
const DynamicPromotions = dynamic(
  () => import("@/components/HomeComponents/Promotion/Promotion"),
  {
    ssr: true,
    loading: () => <InfoCardLoading title="Акции" />,
  }
);
const LazyPopularGoods = dynamic(
  () => import("@/components/HomeComponents/PopularGoods/PopularGoods"),
  {
    ssr: true,
  }
);

const DynamicBrands = dynamic(
  () => import("@/components/HomeComponents/Brands/Brands"),
  {
    ssr: true,
    loading: () => <BrandsSkeleton />,
  }
);

export default async function Home() {
  const [
    mobileData,
    desktopData,
    popularCategoryData,
    goodsData,
    newsData,
    discounts,
    secondBanner,
    promotionData,
    seasonCategoryData,
    brandsData,
  ] = await Promise.all([
    getMobileData(),
    getDekstopData(),
    getPopularCategory(),
    getPopularGoods(1),
    getNewsByLimit(),
    getDiscounts(1),
    getSecondBanner(),
    getPromotion(),
    getSeasonCategory(),
    getBrands(),
  ]);

  const [todayBoughtsData, thirdBanner] = await Promise.all([
    getBoughts(1),
    getThirdBanner(),
  ]);

  return (
    <>
      <Banner mobileData={mobileData} deskstopData={desktopData} />
      <DynamicPopularCategory category={popularCategoryData} />
      <LazyPopularGoods goods={goodsData} />
      <DynamicNews news={newsData} />
      <DynamicDiscounts discounts={discounts} />
      <LazySecondBanner banner={secondBanner.baner} />
      <DynamicPromotions promotions={promotionData} />
      <DynamicSeasonCategory seasonItems={seasonCategoryData} />
      <DynamicBrands brands={brandsData} />
      <LazyTodaysBoughts boughts={todayBoughtsData.lastz} />
      <LazyThirdBanner banner={thirdBanner.baner} />
      <MainPageJsonLd />
    </>
  );
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaMainPage);
}
