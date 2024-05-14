import { getPromoByIdOne, getPromoByIdThree, getPromoByIdTwo } from "@/api/requests";
import PromoById from "@/components/HomeComponents/Promotion/PromoById/PromoById";
import { IPromoById, IPromoProduct } from "@/types/Promo/PromoById";

async function delayedRequest(
  requestFunction: () => Promise<IPromoById>
): Promise<IPromoById> {
  return new Promise(async (resolve) => {
    await new Promise((innerResolve) => setTimeout(innerResolve, 100));
    resolve(await requestFunction());
  });
}

export default async function IDPage({ params: { id } }: any) {

  const [dataOne, dataTwo, dataThree]: IPromoById[] = await Promise.all([
    delayedRequest(() => getPromoByIdOne(id)),
    delayedRequest(() => getPromoByIdTwo(id)),
    delayedRequest(() => getPromoByIdThree(id)),
  ]);

  // Объединяем данные из всех запросов в один общий массив
  const result: IPromoProduct[] = [
    dataOne.items,
    dataTwo.items,
    dataThree.items,
  ].flat();

  return <PromoById promo={result} main={dataOne.ak} />;
}
