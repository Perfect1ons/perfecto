import { Metadata } from "next";
import FavoriteMain from "@/components/FavoritesComponents/FavoriteMain/FavoriteMain";
export const metadata: Metadata = {
  title: "Избранное",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};

export default async function Favorites ()  {
  return (
    <>
      <FavoriteMain />
    </>
  );
};

