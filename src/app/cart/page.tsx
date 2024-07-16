import { getMetaKorzinaPage } from "@/api/requests";
import Basket from "@/components/BasketComponents/Basket";
import TokenForm from "@/components/temporary/tokemed";
import { generatePageMetadata } from "@/utils/metadata";

export default async function Page() {
  return <TokenForm/>;
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaKorzinaPage);
}
