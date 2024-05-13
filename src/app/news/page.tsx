import { getNews } from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import AllNews from "@/components/HomeComponents/News/AllNews/AllNews";
import MainLoader from "@/components/UI/Loader/MainLoader";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title:
    "Новости",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};


export default async function news() {
  // {searchParams: {page}}
  const newsData = await getNews();

  return (
    <Suspense fallback={<MainLoader />}>
      <AllNews allnews={newsData} />
    </Suspense>
  );
}
