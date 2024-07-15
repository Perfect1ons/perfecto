import Orders from "@/components/Profile/Orders/Orders";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Текущие заказы",
};

const page = () => {
  return (
    <div>
      <ProfileTabs />
      <Orders />
    </div>
  );
};

export default page;
