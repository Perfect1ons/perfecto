import {
  getBoughts,
  getBrands,
  getDekstopData,
  getDiscounts,
  getMobileData,
  getNews,
  getNewsByLimit,
  getPopularCategory,
  getPopularGoods,
  getPromotion,
  getSeasonCategory,
  getSecondBanner,
  getThirdBanner,
} from "@/api/requests";

import Banner from "@/components/HomeComponents/Banner/Banner";
import SecondBanner from "@/components/HomeComponents/Banner/SecondBanner";
import ThirdBanner from "@/components/HomeComponents/Banner/ThirdBanner";
import Brands from "@/components/HomeComponents/Brands/Brands";
import Discounts from "@/components/HomeComponents/Discounts/Discounts";
import News from "@/components/HomeComponents/News/News";
import PopularCategory from "@/components/HomeComponents/PopularCategory/PopularCategory";
import PopularGoods from "@/components/HomeComponents/PopularGoods/PopularGoods";
import Promotion from "@/components/HomeComponents/Promotion/Promotion";
import SeasonCategory from "@/components/HomeComponents/SeasonCategory/SeasonCategory";
import TodayBoughts from "@/components/HomeComponents/TodayBoughts/TodayBoughts";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title:
    "Маркетплейс Max.kg №1☑️ в Бишкеке и Кыргызстане ▶️ Маркетплейс для всей страны",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};

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
      <TodayBoughts boughts={boughtsAll} />
      <News news={newsData} />
      <Discounts discounts={discounts} />
      <SecondBanner banner={secondBanner.baner} />
      <Promotion promotion={promotionData} />
      <SeasonCategory seasonItems={seasonCategoryData} />
      <Brands brands={brandsData} />
      <PopularGoods goods={goods} />
      <ThirdBanner banner={thirdBanner.baner} />
    </>
  );
}
