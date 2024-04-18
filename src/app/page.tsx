// import { getBannerData } from "@/api/requests";
import { getPopularCategory } from "@/api/requests";
import PopularCategory from "@/components/HomeComponents/PopularCategory/PopularCategory";
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
  // const bannerData = await getBannerData();
  return (
    <div>
      <PopularCategory category={popularCategoryData} />
      {/* {
        bannerData.map((item)=>{
          return <h1 key={item.id}>
            {item.naim}
          </h1>
        })
        } */}
    </div>
  );
}
