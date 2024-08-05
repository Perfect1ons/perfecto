import {
  getBasket,
  getCity,
  getDeliveryMethod,
  getPaymentMethod,
  getUserInfo,
} from "@/api/requests";
import Abdu from "@/components/Abdu/Abdu";
import BasketEmpty from "@/components/Abdu/BasketEmpty/BasketEmpty";
import BasketConfirmModal from "@/components/Abdu/ModalCase/BasketConfirmModal/BasketConfirmModal";
import { IBasketItems } from "@/interfaces/baskets/basket";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const authToken = cookieStore.get("identify")?.value;
  const cart = cookieStore.get("cart")?.value;
  const match = cart?.match(/s:7:"cart_id";i:(\d+)/);
  const cartId = match && match[1];

  let userInfo: any;
  let cartData: IBasketItems[] = []; // Инициализация пустым массивом
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
          // userInfo={userInfo}
          cities={deliveryCity}
          deliveryMethod={deliveryMethod}
          paymentMethod={paymentMethod}
          items={cartData}
        />
    );
  }

  return <BasketEmpty/>;
}
