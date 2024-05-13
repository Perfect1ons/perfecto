import {
  getNewsByIdOne,
  getNewsByIdThree,
  getNewsByIdTwo,
} from "@/api/requests";
import NewsById from "@/components/HomeComponents/News/NewsById/NewsById";
import MainLoader from "@/components/UI/Loader/MainLoader";
import { Suspense } from "react";

export async function generateMetadata({ params: { id } }: any) {
  const data = await getNewsByIdOne(id);
  const title = data.news.naim;
  return {
    title: title,
  };
}

export default async function IDPage({ params: { id } }: any) {
  // Выполняем запросы параллельно, чтобы ускорить загрузку данных
  const [dataOne, dataTwo, dataThree] = await Promise.all([
    getNewsByIdOne(id),
    getNewsByIdTwo(id),
    getNewsByIdThree(id),
  ]);

  

  // Объединяем данные из всех запросов в один общий массив
  const result = [dataOne.result, dataTwo.result, dataThree.result].flat();
  // console.log(result);
  
  return (
      <NewsById news={result} main={dataOne.news} />
  );
}
