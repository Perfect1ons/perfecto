
import { getBoughts, getBrands, getPopularCategory, getSeasonCategory } from "@/api/requests";
import Auth from "@/components/HomeComponents/Auth/Auth";
import Banner from "@/components/HomeComponents/Banner/Banner";
import Brands from "@/components/HomeComponents/Brands/Brands";
import PopularCategory from "@/components/HomeComponents/PopularCategory/PopularCategory";
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

  const popularCategoryData = await getPopularCategory()

  const seasonCategoryData = await getSeasonCategory();

  const brandsData = await getBrands();

  const boughtsData = await getBoughts();
  return (
    <>
      <Banner/>
      <Auth/>
      <PopularCategory category={popularCategoryData}/>
      <TodayBoughts boughts={boughtsData.lastz}/>
      <SeasonCategory seasonItems={seasonCategoryData}/>
      <Brands brands={brandsData}/>
      
    </>
  );
}

