import {
  getBasketAuthed,
  getDeliveryMethod,
  getMetaKorzinaPage,
  getPaymentMethod,
  getProductBasket,
  getSelectCity,
} from "@/api/requests";
import Basket from "@/components/BasketComponents/Basket";
import { generatePageMetadata } from "@/utils/metadata";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const authToken = cookieStore.get("identify")?.value;
  const cart = cookieStore.get("cart")?.value;
  const match = cart?.match(/s:7:"cart_id";i:(\d+)/);
  const cartId = match && match[1];

  const cartProducts = await getProductBasket(1, cartId);

  const paymentMethod = await getPaymentMethod(userId);
  const deliveryMehod = await getDeliveryMethod(userId);
  const deliveryCity = await getSelectCity();

  if (authToken) {
    const cartAuth = await getBasketAuthed(authToken, 1);
    console.log(cartAuth);
  }

  return (
    <Basket
      deliveryCity={deliveryCity}
      paymentMethod={paymentMethod}
      deliveryMethod={deliveryMehod}
      authToken={authToken}
      cart={cartProducts}
      cartId={cartId}
    />
  );
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaKorzinaPage);
}
export const revalidate = 0.05;
