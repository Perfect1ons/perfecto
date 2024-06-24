import { getDiscountsById } from "@/api/requests";
import DiscountsById from "@/components/HomeComponents/Discounts/DiscountsById/DiscountsById";
import { IDiscountsById } from "@/types/Discounts/discountById";

async function delayedRequest(
  requestFunction: () => Promise<IDiscountsById>
): Promise<IDiscountsById> {
  return new Promise(async (resolve) => {
    await new Promise((innerResolve) => setTimeout(innerResolve, 100));
    resolve(await requestFunction());
  });
}

export default async function IDPage({ params: { id } }: any) {
  const data = await delayedRequest(() => getDiscountsById(id));

  return (
    <>
      <DiscountsById discount={data} />
    </>
  );
}

export async function generateMetadata({ params: { id } }: any) {
  const data = await getDiscountsById(id);

  const title = data.promotion.name;
  return {
    title: title,
  };
}
