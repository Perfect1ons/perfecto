import {
  getBoughts,
  getBrands,
  getDiscounts,
  getNewsByLimit,
  getPopularCategory,
  getPopularGoods,
  getPromotion,
  getSeasonCategory,
} from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import Auth from "@/components/HomeComponents/Auth/Auth";
import Banner from "@/components/HomeComponents/Banner/Banner";
import Brands from "@/components/HomeComponents/Brands/Brands";
import Discounts from "@/components/HomeComponents/Discounts/Discounts";
import News from "@/components/HomeComponents/News/News";
import PopularCategory from "@/components/HomeComponents/PopularCategory/PopularCategory";
import PopularGoods from "@/components/HomeComponents/PopularGoods/PopularGoods";
import Promotion from "@/components/HomeComponents/Promotion/Promotion";
import SeasonCategory from "@/components/HomeComponents/SeasonCategory/SeasonCategory";
import TodayBoughts from "@/components/HomeComponents/TodayBoughts/TodayBoughts";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title:
    "Маркетплейс Max.kg №1☑️ в Бишкеке и Кыргызстане ▶️ Маркетплейс для всей страны",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  robots: "index,follow",
};

export default async function Home() {
  const popularCategoryData = await getPopularCategory();
  const newsData = await getNewsByLimit();
  const promotionData = await getPromotion();
  const seasonCategoryData = await getSeasonCategory();
  const discounts = await getDiscounts();

  const brandsData = await getBrands();

  const boughtsData = await getBoughts();

  const popularGoodsData = await getPopularGoods();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Banner />
      <Auth />
      <PopularCategory category={popularCategoryData} />
      <TodayBoughts boughts={boughtsData.lastz} />
      <News news={newsData} />
      <Discounts discounts={discounts} />
      <Promotion promotion={promotionData} />
      <SeasonCategory seasonItems={seasonCategoryData} />
      <Brands brands={brandsData} />
      <PopularGoods goods={popularGoodsData}/>
      <Application />
    </>
  );
}
