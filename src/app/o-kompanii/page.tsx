import { getFooterPages } from "@/api/requests";
import OKompanii from "@/components/O-kompaniiComponents/OKompanii";
import { Metadata } from "next";


export const metadata: Metadata = {
  title:
    "О компании max.kg",
  description:
    "Маркетплейс №1 в Кыргызстане, самый большой выбор товаров, бесплатная доставка, пункты выдачи, все виды оплат.",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};
export default async function page() {

    const aboutCompany = await getFooterPages("o-kompanii");

  return (
    <>
    <OKompanii about={aboutCompany}/>
    </>
  );
}
