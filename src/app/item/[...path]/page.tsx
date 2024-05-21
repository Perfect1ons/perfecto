import { getCardProduct, getSimilarProduct } from "@/api/requests";
import ItemPage from "@/components/Item/Item";

interface Params {
  params: { path: string };
}
export async function generateMetadata({ params: { path } }: Params) {
  const data = await getCardProduct(path[0]);
    
  const title = data.items.naim;
  return {
    title: title,
    description:
      "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
    keywords:
      "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  };
}

export default async function item({ params: { path } }: Params) {
  const data = await getCardProduct(path[0]);
  const similarData = await getSimilarProduct(path[0]);

  return <ItemPage data={data.items} similar={similarData} />;
}
