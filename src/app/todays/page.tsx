import { getBoughts } from "@/api/requests"
import AllTodayBoughts from "@/components/HomeComponents/TodayBoughts/AllTodayBoughts/AllTodayBoughts"
import { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Сегодня купили",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};
export default async function page() {
    const boughts = await getBoughts(1)
  return (
    <AllTodayBoughts boughts={boughts.lastz}/>
  )
}
