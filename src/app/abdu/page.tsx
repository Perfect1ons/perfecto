import { getCity, getDeliveryMethod, getPaymentMethod } from "@/api/requests";
import Abdu from "@/components/Abdu/Abdu";
import { cookies } from "next/headers";

export default async function page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const authToken = cookieStore.get("identify")?.value;
  const cart = cookieStore.get("cart")?.value;
  const match = cart?.match(/s:7:"cart_id";i:(\d+)/);


  const [paymentMethod, deliveryMethod, deliveryCity] = await Promise.all([
    getPaymentMethod(userId),
    getDeliveryMethod(userId),
    getCity(),
  ]);
  


  return <Abdu deliveryMethod={deliveryMethod} paymentMethod={paymentMethod}/>;
}
