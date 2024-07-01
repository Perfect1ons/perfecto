import {
  getPopularGoods,
  getSearchItem,
  getSearchItemThree,
  getSearchItemTwo,
} from "@/api/requests";
import dynamic from "next/dynamic";
const Seek = dynamic(() => import("@/components/Seek/Seek"));
const SeekNotFound = dynamic(
  () => import("@/components/NotFound/SeekNotFound")
);

export async function generateMetadata({ params: { slug } }: any) {
  const decodedPath = decodeURIComponent(slug);
  const dataTitle = await getSearchItem(decodedPath);
  const title = dataTitle.model.items[0]?.naim;
  const extractedValue = decodedPath.replace(/^search=/, "");
  return {
    title: title || extractedValue,
    description:
      "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  };
}

export default async function PathPage({ params: { slug } }: any) {
  const [goodsOne, goodsTwo, goodsThree] = await Promise.all([
    getPopularGoods(1),
    getPopularGoods(2),
    getPopularGoods(3),
  ]);
  const goods = [goodsOne, goodsTwo, goodsThree].flat();

  const decodedPath = decodeURIComponent(slug);
  const [dataOne, dataTwo, dataThree] = await Promise.all([
    getSearchItem(decodedPath),
    getSearchItemTwo(decodedPath),
    getSearchItemThree(decodedPath),
  ]);

  const result = [
    ...(dataOne.model.items || []),
    ...(dataTwo.model.items || []),
    ...(dataThree.model.items || []),
  ];

  const catalog = dataOne.catalog || dataTwo.catalog || dataThree.catalog;

  if (
    !result.length ||
    (!catalog && (!dataOne.model || !dataTwo.model || !dataThree.model))
  ) {
    return <SeekNotFound goods={goods} search={decodedPath} />;
  }

  return <Seek catalog={catalog} product={result} />;
}
