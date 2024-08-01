import { getPopularGoods, getSearchItem } from "@/api/requests";
import SeekPagination from "@/components/Seek/SeekPagination/SeekPagination";
import dynamic from "next/dynamic";
import NotFound from "../not-found";
import SeekCatalogSkeletons from "@/components/UI/Skeletons/SeekCatalogSkeletons/SeekCatalogSkeletons";

const DynamicSeekCatalog = dynamic(
  () => import("@/components/Seek/SeekCatalog"),
  {
    loading: () => <SeekCatalogSkeletons count={7}/>,
    ssr: false,
  }
);

const DynamicProductList = dynamic(
  () => import("@/components/Seek/ProductList"),
);


const SeekNotFound = dynamic(
  () => import("@/components/NotFound/SeekNotFound"),
  {
    ssr: false,
  }
);

interface NewsProps {
  searchParams: {
    search?: string;
    page?: string;
  };
}

export default async function page({ searchParams }: NewsProps) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const searchQuery = searchParams.search || "";
  const decodedSearch = decodeURIComponent(searchQuery);
  const data = await getSearchItem(decodedSearch, currentPage);
  const dataInit = await getSearchItem(decodedSearch, 1);

  let pageCount = 1;
  if (data.model._meta.totalCount > 0) {
    pageCount = Math.ceil(data.model._meta.totalCount / 20);
  }

  const [goodsOne, goodsTwo, goodsThree] = await Promise.all([
    getPopularGoods(1),
    getPopularGoods(2),
    getPopularGoods(3),
  ]);
  const goods = [goodsOne, goodsTwo, goodsThree].flat();

  if (currentPage > pageCount) {
    return <NotFound />;
  }

  if (!data.model.items.length) {
    return <SeekNotFound goods={goods} search={decodedSearch} />;
  }

  return (
    <section className="seek">
      {dataInit.catalog.length > 0 && (
        <div className="container">
          <h1 className="seek__catalog_title">Найдено в категориях</h1>
          <DynamicSeekCatalog catalog={dataInit.catalog} />
        </div>
      )}
      {dataInit.model.items.length > 0 && (
        <>
          <div className="container">
            <h1 className="seek__catalog_title">По вашему запросу найдено</h1>
          </div>
          <DynamicProductList items={data.model.items} />
        </>
      )}
      {pageCount > 1 && (
        <SeekPagination
          path={decodedSearch}
          pageCount={pageCount}
          currentPage={currentPage}
        />
      )}
    </section>
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
      "Оптом Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  };
}
