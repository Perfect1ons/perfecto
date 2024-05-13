import { getPromotion } from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import AllPromo from "@/components/HomeComponents/Promotion/AllPromo/AllPromo";
import MainLoader from "@/components/UI/Loader/MainLoader";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title:
    "Акции",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};


export default async function promotions() {
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const promotionData = await getPromotion();
  return (
    <Suspense fallback={<MainLoader/>}>
      <AllPromo allpromo={promotionData} />
    </Suspense>
  );
}
