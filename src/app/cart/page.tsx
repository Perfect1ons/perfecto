import { getMetaKorzinaPage } from "@/api/requests";
import Basket from "@/components/BasketComponents/Basket";
import { generatePageMetadata } from "@/utils/metadata";

export default async function Page() {
  return <Basket />;
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaKorzinaPage);
}
