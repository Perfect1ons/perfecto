import {
  getBasket,
  getCity,
  getDeliveryMethod,
  getMetaKorzinaPage,
  getPaymentMethod,
  getProductBasket,
} from "@/api/requests";
import BasketEmpty from "@/components/Abdu/BasketEmpty/BasketEmpty";
import MainLoader from "@/components/UI/Loader/MainLoader";
import { generatePageMetadata } from "@/utils/metadata";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const Abdu = dynamic(() => import("@/components/Abdu/Abdu"), {
  ssr: false,
  loading: () => <MainLoader />,
});

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
    } else if (cart) {
      const response = await getProductBasket(1, cartId ?? 0);
      cartData = response?.model ?? []; // Ensure cartData is always an array or default value
    } else {
      cartData = [];
    }
  } catch (error) {
    console.error("Ошибка при получении данных корзины:", error);
    cartData = []; // Default to an empty array if there's an error
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
