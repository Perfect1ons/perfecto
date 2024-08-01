import { cookies } from "next/headers";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import { Metadata } from "next";
import { getCurrentOrders, getOrdersHistory, getPersonalDataProfileServer } from "@/api/requests";
import dynamic from "next/dynamic";
import ProfileSkeleton from "@/components/Profile/ProfileSkeleton";
const Profile = dynamic(() => import("@/components/Profile/Profile"), {ssr: false, loading: () => <ProfileSkeleton/> });

export const metadata: Metadata = {
  title: "Личный кабинет",
};

const page = async () => {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get("identify")?.value;

  if (isAuthed) {
    const profileData = await getPersonalDataProfileServer(isAuthed);
    const ordersHistory = await getOrdersHistory(isAuthed);
    const orders = await getCurrentOrders(isAuthed);

    return (
        <Profile data={profileData} history={ordersHistory.items} orders={orders} />
    );
  }
};

export default page;
