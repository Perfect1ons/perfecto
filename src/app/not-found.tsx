import { getPopularGoods } from "@/api/requests";
import { Metadata } from "next";
import React from "react";

const PopularGoods = React.lazy(
  () => import("@/components/HomeComponents/PopularGoods/PopularGoods")
);
const NotFounded = React.lazy(() => import("@/components/NotFound/NotFound"));

export const metadata: Metadata = {
  title: "Страница не найдена | MaxKg",
  description:
    "К сожалению запрошенная вами страница не существует - Ошибка #404",
};

const NotFound = async () => {

  const [goodsOne, goodsTwo, goodsThree] = await Promise.all([
    getPopularGoods(1),
    getPopularGoods(2),
    getPopularGoods(3),
  ]);
  const goods = [goodsOne, goodsTwo, goodsThree].flat();

  return (
    <>
      <NotFounded />
      <PopularGoods goods={goods} />
    </>
  );
};

export default NotFound;
