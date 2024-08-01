import { getFavorites } from "@/api/requests";
import FavoriteMain from "@/components/FavoritesComponents/FavoriteMain/FavoriteMain";
import FavoritesIsEmpty from "@/components/FavoritesComponents/FavoriteMain/FavoritesIsEmpty";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Избранное",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};
interface FavoritesProps {
  searchParams: {
    page?: string;
  };
}

export default async function Favorites({ searchParams }: FavoritesProps) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("identify")?.value;
  if (authToken) {
    const favoriteData = await getFavorites(authToken);
    if (favoriteData !== null) {
      return <FavoriteMain favoriteData={favoriteData.model} />;
    } else {
      return <FavoritesIsEmpty />;
    }
  }
}
