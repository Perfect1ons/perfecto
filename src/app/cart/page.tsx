import {
  getBasket,
  getCity,
  getDeliveryMethod,
  getMetaKorzinaPage,
  getPaymentMethod,
  getProductBasket,
  getUserInfo,
} from "@/api/requests";
import Abdu from "@/components/Abdu/Abdu";
import BasketEmpty from "@/components/Abdu/BasketEmpty/BasketEmpty";
import { generatePageMetadata } from "@/utils/metadata";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const authToken = cookieStore.get("identify")?.value;
  const cart = cookieStore.get("cart")?.value;
  const match = cart?.match(/s:7:"cart_id";i:(\d+)/);
  const cartId = match && match[1];

  let cartData: any;

  if (!authToken) {
    cartData = await getProductBasket(1, cartId);
  } else {
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
