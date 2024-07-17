import { getNotification, getPersonalDataProfileServer } from "@/api/requests";
import NotFound from "@/app/not-found";
import ProfileTabs from "@/components/Profile/ProfileTabs/ProfileTabs";
import NotificationPage from "@/components/Profile/UserNotification/NotificationPage";
import NotificationSettings from "@/components/Profile/UserNotification/NotificationSettings/NotificationSettings";
import { Notifications } from "@/types/Profile/Notifications/notifications";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

export const metadata: Metadata = {
  title: "Уведомления",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
};

interface NotificationProps {
  searchParams: {
    type?: string;
  };
}

export default async function page({ searchParams }: NotificationProps) {
  const cookieAuth = cookies();
  const settingsPage = searchParams?.type;
  const isAuthed = cookieAuth.get("identify")?.value;


  if (isAuthed) {
    try {
      const userInfo = await getPersonalDataProfileServer(isAuthed);
      const userId = userInfo.id;
      const notification = await getNotification(userId);

        if (!settingsPage) {
    return (
      <div>
        <ProfileTabs />
        <NotificationPage notifications={notification} />
      </div>
    );
  }
    } catch (error) {
      console.log(error);
    }
  }


  if (settingsPage !== "notification") {
    return <NotFound />;
  }

  return (
    <div>
      <ProfileTabs />
      <NotificationSettings />
    </div>
  );
}
