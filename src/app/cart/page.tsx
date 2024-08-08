import {
  getBasket,
  getCity,
  getDeliveryMethod,
  getMetaKorzinaPage,
  getPaymentMethod,
  getProductBasket,
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
  const cartId = match && match[1] ? parseInt(match[1], 10) : undefined;
  let cartData: any;

  try {
    if (authToken) {
      cartData = await getBasket(authToken, 1);
    } else {
      cartData = (await getProductBasket(1, cartId ?? 0)).model;
    }
  } catch (error) {
    console.error("Ошибка при получении данных корзины:", error);
    cartData = null;
  }

  const [paymentMethod, deliveryMethod, deliveryCity] = await Promise.all([
    getPaymentMethod(userId),
    getDeliveryMethod(userId),
    getCity(),
  ]);

  if (cartData && cartData.length > 0) {
    return (
      <Abdu
      cartId={cartId}
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
