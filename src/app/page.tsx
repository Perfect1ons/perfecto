import {
  getBoughts,
  getBrands,
  getCatalogs,
  getDiscounts,
  getNews,
  getNewsByLimit,
  getPopularCategory,
  getPopularGoods,
  getPromotion,
  getSeasonCategory,
  getSubCatalogs,
} from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
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
  // запрос на популярные категории
  const popularCategoryData = await getPopularCategory();
  // todays boughts requests 
  const boughtsPageOne = await getBoughts(1);
  const boughtsPageTwo = await getBoughts(2);
  const boughtsPageThree = await getBoughts(3);
  // запрос на новости
  const newsData = await getNews();
  // скидки
  const discounts = await getDiscounts();
  // акции
  const promotionData = await getPromotion();
  // сезонные товары
  const seasonCategoryData = await getSeasonCategory();
  // бренды
  const brandsData = await getBrands();

  // popular goods requests 
  const goodsPageOne = await getPopularGoods(1);
  const goodsPageTwo = await getPopularGoods(2);
  const goodsPageThree = await getPopularGoods(3);


  return (
    <>
      <Banner />
      <PopularCategory category={popularCategoryData} />
      <TodayBoughts pageOne={boughtsPageOne.lastz} pageTwo={boughtsPageTwo.lastz} pageThree={boughtsPageThree.lastz}/>
      <News news={newsData} />
      <Discounts discounts={discounts} />
      <Promotion promotion={promotionData} />
      <SeasonCategory seasonItems={seasonCategoryData} />
      <Brands brands={brandsData} />
      <PopularGoods pageOne={goodsPageOne} pageTwo={goodsPageTwo} pageThree={goodsPageThree}/>
      <Application />
    </>
  );
}
