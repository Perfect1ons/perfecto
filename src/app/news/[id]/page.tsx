import {
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
  };
}

export default async function IDPage({ params: { id } }: any) {
  // Выполняем запросы параллельно, чтобы ускорить загрузку данных
  const [dataOne, dataTwo, dataThree] = await Promise.all([
    getNewsByIdOne(id),
    getNewsByIdTwo(id),
    getNewsByIdThree(id),
  ]);

  

  const result = [dataOne.result, dataTwo.result, dataThree.result].flat();
  
  return (
      <NewsById news={result} main={dataOne.news} />
  );
}
