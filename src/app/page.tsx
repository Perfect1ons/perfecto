import { getBannerData, getCatalog, getCatalogSecond } from "@/api/requests";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title:
    "Маркетплейс Max.kg №1☑️ в Бишкеке и Кыргызстане ▶️ Маркетплейс для всей страны",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  robots: "index,follow",
};

export default async function Home() {
  const bannerData = await getBannerData();

  return (
    <div>
      {/* {bannerData.map((item) => {
        return <h1 key={item.id}>{item.naim}</h1>;
      })} */}
      {/* <Catalog /> */}
    </div>
  );
}
