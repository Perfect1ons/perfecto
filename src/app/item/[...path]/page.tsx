import { getCardProduct, getSimilarProduct } from "@/api/requests";
import ItemPage from "@/components/Item/Item";

interface Params {
  params: { path: string };
}

export default async function item({ params: { path } }: Params) {
  const data = await getCardProduct(path[0]);
  const similarData = await getSimilarProduct(path[0]);

  return <ItemPage data={data.items} similar={similarData} />;
}
