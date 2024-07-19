import { getOrdersHistory, getStatusDetails } from "@/api/requests";
import OrdersHistory from "@/components/Profile/Orders/OrdersHistory";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "История заказов",
};

export default async function page() {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("identify")?.value;

  if (isAuthed) {
    const ordersHistory = await getOrdersHistory(isAuthed);
    const details = await getStatusDetails(isAuthed);

    return (
      <div>
        <ProfileTabs />
        <OrdersHistory details={details} orders={ordersHistory.items} />
      </div>
    );
  }
}
