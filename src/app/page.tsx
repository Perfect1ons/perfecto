<<<<<<< HEAD
import {
  getNews,
  getPopularCategory,
  getPromotion,
  getSeasonCategory,
} from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import Auth from "@/components/HomeComponents/Auth/Auth";
import Banner from "@/components/HomeComponents/Banner/Banner";
import News from "@/components/HomeComponents/News/News";
=======

import { getBrands, getPopularCategory, getSeasonCategory } from "@/api/requests";
import Auth from "@/components/HomeComponents/Auth/Auth";
import Banner from "@/components/HomeComponents/Banner/Banner";
import Brands from "@/components/HomeComponents/Brands/Brands";
>>>>>>> 99751e6560d30e9ec21a03914dbf8ab4ac8d5a09
import PopularCategory from "@/components/HomeComponents/PopularCategory/PopularCategory";
import Promotion from "@/components/HomeComponents/Promotion/Promotion"; // Импортируем компонент Promotion
import SeasonCategory from "@/components/HomeComponents/SeasonCategory/SeasonCategory";
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
  const popularCategoryData = await getPopularCategory();
  const newsData = await getNews();
  const promotionData = await getPromotion(); 
  const seasonCategoryData = await getSeasonCategory();

  const brandsData = await getBrands();

  return (
    <>
<<<<<<< HEAD
      <Banner />
      <Auth />
      <PopularCategory category={popularCategoryData} />
      <News news={newsData}/>
      <Promotion promotion={promotionData} />
      <SeasonCategory seasonItems={seasonCategoryData} />
      <Application/>
=======
      <Banner/>
      <Auth/>
      <PopularCategory category={popularCategoryData}/>
      <SeasonCategory seasonItems={seasonCategoryData}/>
      <Brands brands={brandsData}/>
>>>>>>> 99751e6560d30e9ec21a03914dbf8ab4ac8d5a09
    </>
  );
}
