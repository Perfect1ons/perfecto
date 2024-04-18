<<<<<<< HEAD
import { getBannerData } from "@/api/requests";
import Catalog from "@/components/Catalog/Catalog";
=======
import { getBannerData, getPopularCategories, getTodayBought } from "@/api/requests";
>>>>>>> 10ab96e1a6d12fd5723bebc77512cdea5965277e
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
<<<<<<< HEAD
  const bannerData = await getBannerData();

  return (
    <div>
      {/* {bannerData.map((item) => {
        return <h1 key={item.id}>{item.naim}</h1>;
      })} */}
      <Catalog />
=======

const bannerData = await getBannerData()
const popularCategoryData = await getPopularCategories()
// const boughtTodayData = await getTodayBought();

  return (
    <div>
    
>>>>>>> 10ab96e1a6d12fd5723bebc77512cdea5965277e
    </div>
  );
}
