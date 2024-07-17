import { getCurrentOrders } from "@/api/requests";
import Orders from "@/components/Profile/Orders/Orders";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
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
    return (
      <div>
        <ProfileTabs />
        <Orders currentOrders={currentOrders} />
      </div>
    );
  }
};

export default page;
