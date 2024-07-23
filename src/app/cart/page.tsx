import {
  getDeliveryMethod,
  getMetaKorzinaPage,
  getPaymentMethod,
} from "@/api/requests";
import MainLoader from "@/components/UI/Loader/MainLoader";
import { generatePageMetadata } from "@/utils/metadata";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const Basket = dynamic(() => import("@/components/BasketComponents/Basket"), {
  ssr: false,
  loading: () => <MainLoader/>,
});


export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const paymentMethod = await getPaymentMethod(userId);
  const deliveryMehod = await getDeliveryMethod(userId);

  return (
    <Basket paymentMethod={paymentMethod} deliveryMethod={deliveryMehod} />
  );
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaKorzinaPage);
}
