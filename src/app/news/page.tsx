import { getNews } from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import AllNews from "@/components/HomeComponents/News/AllNews/AllNews";
import { Metadata } from "next";


export const metadata: Metadata = {
  title:
    "Новости",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  robots: "index,follow",
};


export default async function news() {
  // await new Promise((resolve) => setTimeout(resolve, 10000))
  const newsData = await getNews();

  return (
    <>
      <AllNews allnews={newsData}/>
      <Application/>
    </>
  )
}
