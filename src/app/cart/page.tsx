import {
  getDeliveryMethod,
  getMetaKorzinaPage,
  getPaymentMethod,
  getSelectCity,
} from "@/api/requests";
import Basket from "@/components/BasketComponents/Basket";
import { generatePageMetadata } from "@/utils/metadata";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const authToken = cookieStore.get("identify")?.value;

  const paymentMethod = await getPaymentMethod(userId);
  const deliveryMehod = await getDeliveryMethod(userId);
  const deliveryCity = await getSelectCity();

  return (
    <Basket
      deliveryCity={deliveryCity}
      paymentMethod={paymentMethod}
      deliveryMethod={deliveryMehod}
      authToken={authToken}
    />
  );
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaKorzinaPage);
}
