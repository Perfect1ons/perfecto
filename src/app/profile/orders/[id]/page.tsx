import { getCurrentOrder, getOrdersHistory } from "@/api/requests";
import DetailedHistoryItem from "@/components/OrderHistoryComponents/DetailedHistoryItem";
import OrderById from "@/components/Profile/Orders/OrderById/OrderById";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import { cookies } from "next/headers";


export default async function page({ params: { id } }: any) {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("identify")?.value;

  if (isAuthed) {
    const order = await getCurrentOrder(isAuthed, id);
    return (
      <>
        <ProfileTabs />
        <OrderById order={order} />
      </>
    );
  }
}



