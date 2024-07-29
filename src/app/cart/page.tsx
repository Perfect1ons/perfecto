import {
  getDeliveryMethod,
  getMetaKorzinaPage,
  getPaymentMethod,
  getProductBasket,
  getSelectCity,
} from "@/api/requests";
import MainLoader from "@/components/UI/Loader/MainLoader";
import { generatePageMetadata } from "@/utils/metadata";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const Basket = dynamic(() => import("@/components/BasketComponents/Basket"), {
  ssr: false,
  loading: () => <MainLoader />,
});

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
