import { getOrdersHistory } from "@/api/requests";
import DetailedHistoryItem from "@/components/OrderHistoryComponents/DetailedHistoryItem";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import { cookies } from "next/headers";

// interface Params {
//   id: number;
// }

export default async function page() {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("identify")?.value;

  if (isAuthed) {
    const ordersHistory = await getOrdersHistory(isAuthed);
    return (
      <>
        <ProfileTabs />
        <DetailedHistoryItem orders={ordersHistory.items} />;
      </>
    );
  }
}
