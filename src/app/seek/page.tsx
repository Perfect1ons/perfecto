import { getPopularGoods, getSearchItem } from "@/api/requests";
import Seek from "@/components/Seek/Seek";
import SeekPagination from "@/components/Seek/SeekPagination/SeekPagination";
import dynamic from "next/dynamic";

const SeekNotFound = dynamic(
  () => import("@/components/NotFound/SeekNotFound")
);

interface NewsProps {
  searchParams: {
    search?: string;
    page?: string;
  };
}




export default async function Page({ searchParams }: NewsProps) {
  const [goodsOne, goodsTwo, goodsThree] = await Promise.all([
    getPopularGoods(1),
    getPopularGoods(2),
    getPopularGoods(3),
  ]);
  const goods = [goodsOne, goodsTwo, goodsThree].flat();

  const searchQuery = searchParams.search || "";
  const decodedSearch = decodeURIComponent(searchQuery);
  const currentPage = parseInt(searchParams.page || "1", 10);

  const data = await getSearchItem(decodedSearch, currentPage);
  const dataInit = await getSearchItem(decodedSearch, 1);
  const pageCount = Math.ceil(data.model._meta.totalCount / 20);

  if (!data.model.items.length || (!data.catalog && !data.model)) {
    return <SeekNotFound goods={goods} search={decodedSearch} />;
  }

  return (
    <>
      <Seek catalog={dataInit.catalog} product={data.model.items} />
      <SeekPagination
        path={decodedSearch}
        pageCount={pageCount}
        currentPage={currentPage}
      />
    </>
  );
}

export async function generateMetadata({ searchParams }: NewsProps) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const searchQuery = searchParams.search || "";

  const title = `${searchQuery} - стр. ${currentPage}`;
  return {
    title: title,
    description:
      "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
    keywords:
      "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  };
}