import { getBrandsData } from "@/api/requests";
import BrandsList from "@/components/Brands/BrandList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Бренды",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};


export default async function page() {
    const brands = await getBrandsData();
  return (
    <>
        <BrandsList brands={brands}/>
    </>
  )
}
