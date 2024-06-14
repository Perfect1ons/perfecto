import {
  getPromoByIdOne,
  getPromoByIdThree,
  getPromoByIdTwo,
} from "@/api/requests";
import PromoById from "@/components/HomeComponents/Promotion/PromoById/PromoById";
import { IPromoById, IPromoProduct } from "@/types/Promo/PromoById";
import ErrorPage from "@/components/ErrorPage/ErrorPage"; // Импортируем компонент для отображения ошибок

export default async function IDPage({ params: { id } }: any) {
  try {
    const [dataOne, dataTwo, dataThree]: IPromoById[] = await Promise.all([
      getPromoByIdOne(id),
      getPromoByIdTwo(id),
      getPromoByIdThree(id),
    ]);

    const result: IPromoProduct[] = [
      dataOne.items,
      dataTwo.items,
      dataThree.items,
    ].flat();

    return <PromoById promo={result} main={dataOne.ak} />;
  } catch (error) {
    console.error("Error fetching promo data:", error);
    return <ErrorPage />;
  }
}
