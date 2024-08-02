import {
  getNews,
  getNewsByIdOne,
  getNewsByIdThree,
  getNewsByIdTwo,
} from "@/api/requests";
import NewsById from "@/components/HomeComponents/News/NewsById/NewsById";

export async function generateMetadata({ params: { id } }: any) {
  const data = await getNewsByIdOne(id);
  const title = data.news.naim;
  return {
    title: title,
    description:
      "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
    keywords:
      "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  };
}

export default async function IDPage({ params: { id } }: any) {
  const [dataOne, dataTwo, dataThree] = await Promise.all([
    getNewsByIdOne(id),
    getNewsByIdTwo(id),
    getNewsByIdThree(id),
  ]);

  const result = [dataOne.result, dataTwo.result, dataThree.result].flat();

  return <NewsById news={result} main={dataOne.news} />;
}

export const revalidate = 10;
