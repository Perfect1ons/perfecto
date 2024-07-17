import { getOrdersHistory } from "@/api/requests";
import DetailedHistoryItem from "@/components/OrderHistoryComponents/DetailedHistoryItem";
import { cookies } from "next/headers";

interface Params {
  id: string;
}

export default async function page({ id }: Params) {
  const data = 1;

  const cookieStore = cookies();
  const isAuthed = cookieStore.get("identify")?.value;

  if (isAuthed) {
    const ordersHistory = await getOrdersHistory(isAuthed);
    return <DetailedHistoryItem orders={ordersHistory.items} />;
  }
}
