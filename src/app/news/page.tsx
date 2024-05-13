import { getNews } from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import AllNews from "@/components/HomeComponents/News/AllNews/AllNews";
import MainLoader from "@/components/UI/Loader/MainLoader";
import { INews } from "@/types/news";
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

async function delayedRequest(
  requestFunction: () => Promise<INews[]>
): Promise<INews[]> {
  return new Promise(async (resolve) => {
    await new Promise((innerResolve) => setTimeout(innerResolve, 100));
    resolve(await requestFunction());
  });
}

export default async function news() {
  const newsData = await delayedRequest(getNews);
  // {searchParams: {page}}

  return <AllNews allnews={newsData} />;
}
