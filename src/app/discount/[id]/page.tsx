import { getDiscountsById } from "@/api/requests";
import DiscountsById from "@/components/HomeComponents/Discounts/DiscountsById/DiscountsById";


export async function generateMetadata({ params: { id } }: any) {
  const data = await getDiscountsById(id);

  const title = data.promotion.name;
  return {
    title: title,
  };
}

export default async function generateStaticParams({ params: { id } }: any) {
  const data = await getDiscountsById(id);

  return (
    <>
      <DiscountsById discount={data} />
    </>
  );
}