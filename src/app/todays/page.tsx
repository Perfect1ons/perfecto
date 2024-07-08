import { getBoughts } from "@/api/requests";
import { Metadata } from "next";
import dynamic from "next/dynamic";
const ErrorPage = dynamic(() => import("@/components/ErrorPage/ErrorPage"));
const AllTodayBoughts = dynamic(
  () =>
    import(
      "@/components/HomeComponents/TodayBoughts/AllTodayBoughts/AllTodayBoughts"
    )
);
export const metadata: Metadata = {
  title: "Сегодня купили",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};

export default async function page() {
  let boughts;

  try {
    boughts = await getBoughts(1);
  } catch (error) {
    console.error("Error fetching boughts data:", error);
    return <ErrorPage />;
  }

  return <AllTodayBoughts boughts={boughts.lastz} />;
}
