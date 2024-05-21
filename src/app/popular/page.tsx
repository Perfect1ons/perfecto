import { getPopularGoods } from "@/api/requests"
import AllPopularGoods from "@/components/HomeComponents/PopularGoods/AllPopularGoods/AllPopularGoods"
import { Metadata } from "next";

import React from 'react'

export const metadata: Metadata = {
  title: "Популярные товары",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};

export default async function page() {
    const allGoodsData = await getPopularGoods(1);
  return (
    <AllPopularGoods goods={allGoodsData}/>
  )
}