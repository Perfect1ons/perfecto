import {
  getNewsByIdOne,
  getNewsByIdThree,
  getNewsByIdTwo,
} from "@/api/requests";
import NewsById from "@/components/HomeComponents/News/NewsById/NewsById";
import { INewsByPath } from "@/types/News/NewsById";

async function delayedRequest(
  requestFunction: () => Promise<INewsByPath>
): Promise<INewsByPath> {
  return new Promise(async (resolve) => {
    await new Promise((innerResolve) => setTimeout(innerResolve, 100));
    resolve(await requestFunction());
  });
}


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
    delayedRequest(() => getNewsByIdOne(id)),
    delayedRequest(() => getNewsByIdTwo(id)),
    delayedRequest(() => getNewsByIdThree(id)),
  ]);

  

  const result = [dataOne.result, dataTwo.result, dataThree.result].flat();
  
  return (
      <NewsById news={result} main={dataOne.news} />
  );
}
