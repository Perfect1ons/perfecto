import { getPromotion } from "@/api/requests";
import AllPromo from "@/components/HomeComponents/Promotion/AllPromo/AllPromo";
import { IPromotion } from "@/types/promotion";
import { Metadata } from "next";


export const metadata: Metadata = {
  title:
    "Акции",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};


async function delayedRequest(
  requestFunction: () => Promise<IPromotion[]>
): Promise<IPromotion[]> {
  return new Promise(async (resolve) => {
    await new Promise((innerResolve) => setTimeout(innerResolve, 200));
    resolve(await requestFunction());
  });
}



export default async function promotions() {
  const delayedPromotionData = await delayedRequest(getPromotion);
  return (
      <AllPromo allpromo={delayedPromotionData} />
  );
}
