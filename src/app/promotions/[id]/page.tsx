import {
  getPromoByIdOne,
  getPromoByIdThree,
  getPromoByIdTwo,
} from "@/api/requests";
import PromoById from "@/components/HomeComponents/Promotion/PromoById/PromoById";
import { IPromoById, IPromoProduct } from "@/types/Promo/PromoById";

export async function generateMetadata({ params: { id } }: any) {
  const data = await getPromoByIdOne(id);

  const title = data.ak.naim;
  return {
    title: title,
  };
}

export default async function IDPage({ params: { id } }: any) {
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
}
