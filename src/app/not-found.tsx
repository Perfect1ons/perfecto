import { getPopularGoods } from "@/api/requests";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const PopularGoods = dynamic(
  () => import("@/components/HomeComponents/PopularGoods/PopularGoods"),
  {
    ssr: false,
  }
);

const NotFounded = dynamic(() => import("@/components/NotFound/NotFound"), {
  loading: () => <h1>loading...</h1>,
});

export const metadata: Metadata = {
  title: "Страница не найдена | MaxKg",
  description:
    "К сожалению запрошенная вами страница не существует - Ошибка #404",
};

const NotFound = async () => {
  const goodsOne = await getPopularGoods(1);

  return (
    <>
      <NotFounded />
      <PopularGoods goods={goodsOne} />
    </>
  );
};

export default NotFound;
