import { getCurrentOrder, getStatusDetails } from "@/api/requests";
import OrderById from "@/components/Profile/Orders/OrderById/OrderById";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Оформление заказа",
};

export default async function page({ params: { id } }: any) {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("identify")?.value;

  if (isAuthed) {
    const order = await getCurrentOrder(isAuthed, id);
    const details = await getStatusDetails(isAuthed);

    return (
      <>
        <ProfileTabs />
        <OrderById details={details} order={order} />
      </>
    );
  }
}
