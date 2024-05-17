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
import dynamic from "next/dynamic";

const LazySecondBanner = dynamic(
  () => import("@/components/HomeComponents/Banner/SecondBanner"),{
    ssr: false
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
 const popularCategoryData = await getPopularCategory();
 const [
   mobileData,
   desktopData,
   newsData,
   discounts,
   secondBanner,
   promotionData,
   seasonCategoryData,
   brandsData,
   thirdBanner,
 ] = await Promise.all([
   getMobileData(),
   getDekstopData(),
   getNewsByLimit(),
   getDiscounts(),
   getSecondBanner(),
   getPromotion(),
   getSeasonCategory(),
   getBrands(),
   getThirdBanner(),
 ]);
 const [boughtsOne, boughtsTwo, boughtsThree] = await Promise.all([
   getBoughts(1),
   getBoughts(2),
   getBoughts(3),
 ]);
 const boughtsAll = [
   boughtsOne.lastz,
   boughtsTwo.lastz,
   boughtsThree.lastz,
 ].flat();
 const [goodsOne, goodsTwo, goodsThree] = await Promise.all([
   getPopularGoods(1),
   getPopularGoods(2),
   getPopularGoods(3),
 ]);
 const goods = [goodsOne, goodsTwo, goodsThree].flat();

  return (
    <>
      <Banner mobileData={mobileData} deskstopData={desktopData} />
      <PopularCategory category={popularCategoryData} />
      <LazyTodaysBoughts boughts={boughtsAll} />
      <LazyNews news={newsData} />
      <LazyDiscounts discounts={discounts} />
      <LazySecondBanner banner={secondBanner.baner} />
      <LazyPromotion promotion={promotionData} />
      <LazySeasonCategorySwiper seasonItems={seasonCategoryData} />
      <LazyBrands brands={brandsData} />
      <LazyPopularGoods goods={goods} />
      <LazyThirdBanner banner={thirdBanner.baner} />
    </>
  );
}
