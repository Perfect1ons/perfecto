import {
  getPromoByIdOne,
  getPromoByIdThree,
  getPromoByIdTwo,
} from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import PromoById from "@/components/HomeComponents/Promotion/PromoById/PromoById";

export async function generateMetadata({ params: { id } }: any) {
  const data = await getPromoByIdOne(id);
  const title = data.ak.naim;
  
  return {
    title: title,
  };
}

export default async function IDPage({ params: { id } }: any) {
  // Выполняем запросы параллельно, чтобы ускорить загрузку данных
  const [dataOne, dataTwo, dataThree] = await Promise.all([
    getPromoByIdOne(id),
    getPromoByIdTwo(id),
    getPromoByIdThree(id),
  ]);
  ;

  // Объединяем данные из всех запросов в один общий массив
  const result = [dataOne.items, dataTwo.items, dataThree.items].flat();

  return (
    <>
      <PromoById promo={result} main={dataOne.ak} />
      <Application />
    </>
  );
}
