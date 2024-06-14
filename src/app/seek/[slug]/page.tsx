import {
  getPopularGoods,
  getSearchItem,
  getSearchItemThree,
  getSearchItemTwo,
} from "@/api/requests";
import dynamic from "next/dynamic";
import Seek from "@/components/Seek/Seek";
import SeekNotFound from "@/components/NotFound/SeekNotFound";
import ErrorPage from "@/components/ErrorPage/ErrorPage";

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
