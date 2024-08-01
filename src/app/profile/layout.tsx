import { getCurrentOrders, getNotification } from "@/api/requests";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import { cookies } from "next/headers";

export const revalidate = 10;

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  const token = cookieStore.get("identify")?.value;

  if (userId && token) {
    const notificationCount = await getNotification(parseInt(userId));
    const orders = await getCurrentOrders(token);
    return (
      <>
        <ProfileTabs orders={orders} notifCount={notificationCount} />
        {children}
      </>
    );
  }
}
