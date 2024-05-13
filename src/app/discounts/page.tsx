import { getDiscountsPageOne, getDiscountsPageTwo } from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import AllDiscounts from "@/components/HomeComponents/Discounts/AllDiscounts/AllDiscounts";
import { IDiscounts } from "@/types/discounts";
import { Metadata } from "next";


export const metadata: Metadata = {
  title:
    "Скидки",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};

async function delayedRequest(
  requestFunction: () => Promise<IDiscounts[]>
): Promise<IDiscounts[]> {
  return new Promise(async (resolve) => {
    await new Promise((innerResolve) => setTimeout(innerResolve, 100));
    resolve(await requestFunction());
  });
}

export default async function page() {
  const [discountsOne, discountsTwo] = await Promise.all([
    delayedRequest(getDiscountsPageOne),
    delayedRequest(getDiscountsPageTwo),
    ,
  ]);

  return (
    <>
      <AllDiscounts discountsOne={discountsOne} discountsTwo={discountsTwo} />
    </>
  );
}
