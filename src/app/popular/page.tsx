import { getMetaPopularPage, getPopularGoods } from "@/api/requests";
import AllPopularGoods from "@/components/HomeComponents/PopularGoods/AllPopularGoods/AllPopularGoods";
import { generatePageMetadata } from "@/utils/metadata";

export default async function PopularPage() {
  const allGoodsData = await getPopularGoods(1);
  return <AllPopularGoods goods={allGoodsData} />;
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaPopularPage);
}