import { getOrdersHistory } from "@/api/requests";
import DetailedHistoryItem from "@/components/OrderHistoryComponents/DetailedHistoryItem";
import { cookies } from "next/headers";

export default async function Page({ params: { id } }: any) {

  const cookieStore = cookies();
  const isAuthed = cookieStore.get("identify")?.value;

  if (isAuthed) {
    const ordersHistory = await getOrdersHistory(isAuthed);
    return <DetailedHistoryItem orders={ordersHistory.items} />;
  }
}
