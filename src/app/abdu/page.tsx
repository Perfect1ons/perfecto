import {
  getBasket,
  getCity,
  getDeliveryMethod,
  getMetaKorzinaPage,
  getPaymentMethod,
  getUserInfo,
} from "@/api/requests";
import Abdu from "@/components/Abdu/Abdu";
import BasketEmpty from "@/components/Abdu/BasketEmpty/BasketEmpty";
import { IBasketItems } from "@/interfaces/baskets/basket";
import { generatePageMetadata } from "@/utils/metadata";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const authToken = cookieStore.get("identify")?.value;
  let userInfo: any;
  let cartData: IBasketItems[] = [];
  if (authToken) {
    userInfo = await getUserInfo(authToken);
    cartData = await getBasket(authToken, 1);
  }

  const [paymentMethod, deliveryMethod, deliveryCity] = await Promise.all([
    getPaymentMethod(userId),
    getDeliveryMethod(userId),
    getCity(),
  ]);

  if (cartData.length > 0) {
    return (
      <Abdu
        authToken={authToken}
        cities={deliveryCity}
        deliveryMethod={deliveryMethod}
        paymentMethod={paymentMethod}
        items={cartData}
      />
    );
  }

  return <BasketEmpty />;
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaKorzinaPage);
}
