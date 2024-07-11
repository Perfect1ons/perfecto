import FavoriteAuth from "@/components/FavoritesComponents/FavoriteAuth/FavoriteAuth";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const FavoriteMain = dynamic(
  () => import("@/components/FavoritesComponents/FavoriteMain/FavoriteMain"),
);


export const metadata: Metadata = {
  title: "Избранное",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};

export default async function Favorites() {
    const cookieStore = cookies();
    const isAuthed = cookieStore.get("isAuthenticated")?.value;
  
  if (isAuthed) {
    return (
        <FavoriteMain />
    );
  }
  return (
      <FavoriteAuth />
  );
}


