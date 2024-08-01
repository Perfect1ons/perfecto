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

  let cartData: any;

  if (!authToken) {
    cartData = (await getProductBasket(1, cartId)).model;
  } else {
    cartData = await getBasketAuthed(authToken, 1);
  }

  const [paymentMethod, deliveryMethod, deliveryCity] = await Promise.all([
    getPaymentMethod(userId),
    getDeliveryMethod(userId),
    getSelectCity(),
  ]);

  return (
    <Basket
      deliveryCity={deliveryCity}
      paymentMethod={paymentMethod}
      deliveryMethod={deliveryMethod}
      authToken={authToken}
      cart={cartData}
      cartId={cartId}
    />
  );
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaKorzinaPage);
}
export const revalidate = 0.05;
