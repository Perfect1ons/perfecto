import { getPopularGoods, getSearchItem, getSearchItemThree, getSearchItemTwo } from "@/api/requests";
import MainLoader from "@/components/UI/Loader/MainLoader";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Seek = dynamic(() => import("@/components/Seek/Seek"));
const SeekNotFound = dynamic(() => import("@/components/NotFound/SeekNotFound"));



export async function generateMetadata({ params: { path } }: any) {
  const decodedPath = decodeURIComponent(path);
  const searchIndex = decodedPath.indexOf("search=");
  let searchData = decodedPath;
  if (searchIndex !== -1) {
    searchData = decodedPath.substring(searchIndex + "search=".length);
  }
  const title = `${searchData}`;
  return {
    title: title,
    description:
      "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  };
}

export async function PathPage({ params: { path } }: any) {
  
    const [goodsOne, goodsTwo, goodsThree] = await Promise.all([
      getPopularGoods(1),
      getPopularGoods(2),
      getPopularGoods(3),
    ]);
    const goods = [goodsOne, goodsTwo, goodsThree].flat();

    const decodedPath = decodeURIComponent(path);
    const data = await getSearchItem(decodedPath);
      const [dataOne, dataTwo, dataThree] = await Promise.all([
        getSearchItem(decodedPath),
        getSearchItemTwo(decodedPath),
        getSearchItemThree(decodedPath),
      ]);

      // Объединяем данные из всех запросов в один общий массив
      const result = [dataOne.model.items, dataTwo.model.items, dataThree.model.items].flat();

    if (
      !data ||
      (!data.catalog &&
        (!data.model || !data.model.items || data.model.items.length === 0)) ||
      data.id_qseek === 0
    ) {
      return <SeekNotFound goods={goods} search={decodedPath}/>;
    }

    return (
        <Seek catalog={data.catalog} product={result} />
    );
  };


export default PathPage;
