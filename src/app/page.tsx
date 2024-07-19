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
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import Banner from "@/components/HomeComponents/Banner/Banner";
import PopularCategory from "@/components/HomeComponents/PopularCategory/PopularCategory";
import YouWatched from "@/components/HomeComponents/YouWatched/YouWatched";
import MainPageJsonLd from "@/utils/JsonLd/MainPageJsonLd/MainPageJsonLd";
import { generatePageMetadata } from "@/utils/metadata";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const LazySecondBanner = dynamic(
  () => import("@/components/HomeComponents/Banner/SecondBanner")
);
const LazyThirdBanner = dynamic(
  () => import("@/components/HomeComponents/Banner/ThirdBanner")
);
const LazySeasonCategorySwiper = dynamic(
  () =>
    import(
      "@/components/HomeComponents/SeasonCategorySwiper/SeasonCategorySwiper"
    )
);
const LazyTodaysBoughts = dynamic(
  () => import("@/components/HomeComponents/TodayBoughts/TodayBoughts")
);
const LazyNews = dynamic(() => import("@/components/HomeComponents/News/News"));
const LazyDiscounts = dynamic(
  () => import("@/components/HomeComponents/Discounts/Discounts")
);
const LazyPromotion = dynamic(
  () => import("@/components/HomeComponents/Promotion/Promotion")
);
const LazyPopularGoods = dynamic(
  () => import("@/components/HomeComponents/PopularGoods/PopularGoods")
);
const LazyBrands = dynamic(
  () => import("@/components/HomeComponents/Brands/Brands")
);

export default async function Home() {
 const cookieStore = cookies();
 const existingWatched = JSON.parse(
   cookieStore.get("youWatched")?.value || "[]"
 );
  let popularCategoryData, goodsData;

  try {
    [popularCategoryData, goodsData] = await Promise.all([
      getPopularCategory(),
      getPopularGoods(1),
    ]);
  } catch (error) {
    console.error("Error fetching popular category or goods data:", error);
    return <ErrorPage />;
  }

  try {
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
        <MainPageJsonLd />
        <Banner mobileData={mobileData} deskstopData={desktopData} />
        {existingWatched.length > 0 ? (
          <YouWatched data={existingWatched} />
        ) : (
          null
        )}
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
  } catch (error) {
    console.error("Error fetching other data:", error);
    return <ErrorPage />;
  }
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaMainPage);
}
