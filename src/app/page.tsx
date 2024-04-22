import {
  getPopularCategory,
  getPromotion,
  getSeasonCategory,
} from "@/api/requests";
import Auth from "@/components/HomeComponents/Auth/Auth";
import Banner from "@/components/HomeComponents/Banner/Banner";
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
  const seasonCategoryData = await getSeasonCategory();

  const promotionData = await getPromotion(); 

  return (
    <>
      <Banner />
      <Auth />
      <PopularCategory category={popularCategoryData} />
      <Promotion promotion={promotionData} />
      <SeasonCategory seasonItems={seasonCategoryData} />
    </>
  );
}
