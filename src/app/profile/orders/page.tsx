import { getCurrentOrders, getStatusDetails } from "@/api/requests";
import Orders from "@/components/Profile/Orders/Orders";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Текущие заказы",
};

const page = async () => {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("identify")?.value;
  if (isAuthed) {
    const currentOrders = await getCurrentOrders(isAuthed);
    const details = await getStatusDetails(isAuthed);
    return (
      <Orders
        isAuthed={isAuthed}
        details={details}
        currentOrders={currentOrders}
      />
    );
  }
};

export default page;
