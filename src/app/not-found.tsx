import { getPopularGoods } from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import PopularGoods from "@/components/HomeComponents/PopularGoods/PopularGoods";
import NotFounded from "@/components/NotFound/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена | MaxKg",
  description:
    "К сожалению запрошенная вами страница не существует - Ошибка #404",
};

const NotFound = async () => {
  const popularGoodsData = await getPopularGoods();

  return (
    <>
    <NotFounded/>
    <PopularGoods goods={popularGoodsData}/>
    <Application/>
    </>
  );
};

export default NotFound;
